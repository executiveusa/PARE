/**
 * Infisical API v3 client for sovereign PARÉ secret resolution.
 *
 * Resolves credentials securely using the master bootstrap token (INFISCAL_API_TOKEN or PARE_BOOTSTRAP_SECRET).
 * Never logs or returns secret values in diagnostic errors.
 */

export interface InfisicalSecretValue {
  secretKey: string;
  secretValue: string;
  environment?: string;
  workspaceId?: string;
}

export class InfisicalClient {
  private readonly baseUrl: string;
  private readonly token: string;

  constructor(token: string, baseUrl = 'https://app.infisical.com') {
    this.token = token.trim();
    this.baseUrl = baseUrl.replace(/\/+$/, '');
  }

  /**
   * Fetch raw secret by key from Infisical v3 API.
   */
  async getSecret(key: string, workspaceId: string, environment = 'prod'): Promise<string | undefined> {
    if (!this.token) return undefined;
    const url = `${this.baseUrl}/api/v3/secrets/raw/${encodeURIComponent(key)}?workspaceId=${encodeURIComponent(workspaceId)}&environment=${encodeURIComponent(environment)}`;
    try {
      const resp = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'User-Agent': 'PARE-Runtime-Agent',
        },
      });

      if (resp.status === 404) return undefined;
      if (!resp.ok) {
        return undefined;
      }

      const data = (await resp.json()) as { secret?: { secretValue?: string } };
      return data?.secret?.secretValue;
    } catch {
      return undefined;
    }
  }

  /**
   * Fetch all secrets for a workspace and environment in bulk for caching.
   */
  async getAllSecrets(workspaceId: string, environment = 'prod'): Promise<Record<string, string>> {
    if (!this.token) return {};
    const url = `${this.baseUrl}/api/v3/secrets/raw?workspaceId=${encodeURIComponent(workspaceId)}&environment=${encodeURIComponent(environment)}`;
    try {
      const resp = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'User-Agent': 'PARE-Runtime-Agent',
        },
      });

      if (!resp.ok) return {};

      const data = (await resp.json()) as { secrets?: Array<{ secretKey: string; secretValue: string }> };
      const out: Record<string, string> = {};
      if (Array.isArray(data?.secrets)) {
        for (const s of data.secrets) {
          if (s.secretKey && s.secretValue) {
            out[s.secretKey] = s.secretValue;
          }
        }
      }
      return out;
    } catch {
      return {};
    }
  }
}
