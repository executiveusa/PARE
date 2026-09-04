/**
 * Provider-neutral Secret Registry and Resolver for PARÉ.
 *
 * Implements the One-Secret Bootstrap architecture:
 * 1. Explicitly supplied runtime secret (highest precedence)
 * 2. Infisical Secret Registry (using PARE_BOOTSTRAP_SECRET or INFISCAL_API_TOKEN)
 * 3. Local environment variable (process.env)
 * 4. Unavailable (returns undefined)
 *
 * Invariants:
 * - Secret values are NEVER logged, printed, or sent to client responses.
 * - In-memory cache with 5-minute TTL to ensure low latency and high availability.
 */

import { InfisicalClient } from './infisical-client.js';

export interface SecretResolverOptions {
  bootstrapToken?: string;
  defaultWorkspaceId?: string;
  environment?: string;
  cacheTtlMs?: number;
}

interface CacheEntry {
  value: string;
  expiresAt: number;
}

export class SecretRegistry {
  private static instance: SecretRegistry | null = null;
  private readonly client: InfisicalClient | null = null;
  private readonly defaultWorkspaceId: string;
  private readonly environment: string;
  private readonly cacheTtlMs: number;
  private readonly cache = new Map<string, CacheEntry>();
  private readonly runtimeOverrides = new Map<string, string>();

  constructor(options: SecretResolverOptions = {}) {
    const token =
      options.bootstrapToken ??
      process.env.PARE_BOOTSTRAP_SECRET ??
      process.env.INFISCAL_API_TOKEN ??
      process.env.INFISICAL_API_TOKEN ??
      '';

    this.defaultWorkspaceId =
      options.defaultWorkspaceId ??
      process.env.INFISICAL_WORKSPACE_ID ??
      'e2f5c669-4fdd-4c9f-be8c-fc56bf62549c'; // Default HERMES workspace

    this.environment = options.environment ?? process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
    this.cacheTtlMs = options.cacheTtlMs ?? 5 * 60 * 1000; // 5 minutes

    if (token.trim()) {
      this.client = new InfisicalClient(token);
    }
  }

  public static getInstance(): SecretRegistry {
    if (!SecretRegistry.instance) {
      SecretRegistry.instance = new SecretRegistry();
    }
    return SecretRegistry.instance;
  }

  /**
   * Set explicit in-memory override for a specific execution / run.
   */
  public setRuntimeOverride(key: string, value: string): void {
    if (!key) return;
    this.runtimeOverrides.set(key.toUpperCase(), value);
  }

  /**
   * Clear runtime overrides.
   */
  public clearRuntimeOverrides(): void {
    this.runtimeOverrides.clear();
  }

  /**
   * Resolve secret asynchronously following strict precedence.
   */
  public async get(key: string, workspaceId?: string): Promise<string | undefined> {
    if (!key) return undefined;
    const normalizedKey = key.toUpperCase();

    // 1. Explicit runtime override
    if (this.runtimeOverrides.has(normalizedKey)) {
      return this.runtimeOverrides.get(normalizedKey);
    }

    // Check memory cache
    const now = Date.now();
    const cached = this.cache.get(normalizedKey);
    if (cached && cached.expiresAt > now) {
      return cached.value;
    }

    // 2. Infisical Secret Registry
    if (this.client) {
      const wsId = workspaceId ?? this.defaultWorkspaceId;
      try {
        const remoteValue = await this.client.getSecret(key, wsId, this.environment);
        if (typeof remoteValue === 'string' && remoteValue.length > 0) {
          this.cache.set(normalizedKey, {
            value: remoteValue,
            expiresAt: now + this.cacheTtlMs,
          });
          return remoteValue;
        }
      } catch {
        // Fall through safely to environment variable
      }
    }

    // 3. Environment variable fallback (process.env)
    const envVal = process.env[key] ?? process.env[normalizedKey];
    if (typeof envVal === 'string' && envVal.length > 0) {
      return envVal;
    }

    // 4. Unavailable
    return undefined;
  }

  /**
   * Synchronous get (from in-memory cache, overrides, or process.env only).
   */
  public getSync(key: string): string | undefined {
    if (!key) return undefined;
    const normalizedKey = key.toUpperCase();

    if (this.runtimeOverrides.has(normalizedKey)) {
      return this.runtimeOverrides.get(normalizedKey);
    }

    const cached = this.cache.get(normalizedKey);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.value;
    }

    return process.env[key] ?? process.env[normalizedKey];
  }

  /**
   * Warm the cache in bulk for high performance during task execution.
   */
  public async preload(keys?: string[], workspaceId?: string): Promise<void> {
    if (!this.client) return;
    const wsId = workspaceId ?? this.defaultWorkspaceId;
    const now = Date.now();
    try {
      const all = await this.client.getAllSecrets(wsId, this.environment);
      for (const [k, v] of Object.entries(all)) {
        if (v) {
          this.cache.set(k.toUpperCase(), {
            value: v,
            expiresAt: now + this.cacheTtlMs,
          });
        }
      }
    } catch {
      // Continue without failing
    }
  }
}

export const SecretResolver = SecretRegistry.getInstance();
