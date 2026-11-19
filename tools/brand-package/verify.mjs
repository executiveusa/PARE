#!/usr/bin/env node
// Pstack-style user-journey verifier for the PARÉ Brand Package CLI.
// Uses synthetic data; writes durable evidence, never touches client projects.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";
const base=path.dirname(fileURLToPath(import.meta.url));
const fixture=path.join(base,"fixtures/demo-brand.json");
const master=path.join(base,"fixtures/demo-master.svg");
const cli=path.join(base,"cli.mjs");
const proofRoot=path.resolve(process.argv[2]||path.join(base,"evidence"));
const checks=[];
function check(name,ok,detail){checks.push({name,ok:!!ok,detail});if(!ok)throw Error(name+": "+detail);}
function exec(exe,args){return spawnSync(exe,args,{encoding:"utf8",timeout:30000});}
let scratch;
try {
 check("doctor",fs.existsSync(fixture)&&fs.existsSync(master)&&fs.existsSync(cli),"fixtures, master and CLI must be present");
 check("node",Number(process.versions.node.split(".")[0])>=22,process.version);
 scratch=fs.mkdtempSync(path.join(os.tmpdir(),"pare-brand-proof-"));
 const out=path.join(scratch,"verified-export");
 const run=exec(process.execPath,[cli,fixture,master,out]);
 check("CLI success",run.status===0,run.stderr||run.stdout);
 const receipt=JSON.parse(run.stdout);
 check("folder and ZIP exist",fs.existsSync(out)&&fs.existsSync(receipt.zip),receipt.zip);
 const manifest=JSON.parse(fs.readFileSync(path.join(out,"manifest.json"),"utf8"));
 check("approved revision preserved",manifest.revision==="synthetic-fixture-01",manifest.revision);
 for(const entry of manifest.assets){
  const bytes=fs.readFileSync(path.join(out,entry.path));
  check("hash "+entry.path,crypto.createHash("sha256").update(bytes).digest("hex")===entry.sha256,"SHA256");
 }
 check("ten branded social files",manifest.assets.filter(x=>x.path.startsWith("05-social/")).length===10,"expected 10");
 check("human readable documents",fs.readFileSync(path.join(out,"06-guidelines/brand-guidelines.html"),"utf8").includes("Sample Identity"),"brand book loaded");
 const denied=JSON.parse(fs.readFileSync(fixture,"utf8"));denied.rights.confirmed=false;
 const deniedFile=path.join(scratch,"denied.json");fs.writeFileSync(deniedFile,JSON.stringify(denied));
 const failed=exec(process.execPath,[cli,deniedFile,master,path.join(scratch,"denied-output")]);
 check("rights gate rejects CLI",failed.status!==0&&!fs.existsSync(path.join(scratch,"denied-output")),"expected refusal");
 const python=exec("python",["-c","import sys,zipfile; z=zipfile.ZipFile(sys.argv[1]); assert z.testzip() is None; print(len(z.namelist()))",receipt.zip]);
 check("external ZIP reader accepts archive",python.status===0&&Number(python.stdout.trim())===manifest.assets.length+1,python.stderr||python.stdout);
 fs.mkdirSync(proofRoot,{recursive:true});
 const receiptFile=path.join(proofRoot,"brand-package-proof.json");
 const artifact={generator:"verify-pare-brand-package",createdAt:new Date().toISOString(),fixture:"synthetic only",node:process.version,head:process.env.GITHUB_SHA||"local checkout",checks,archiveBytes:fs.statSync(receipt.zip).size,passed:true};
 fs.writeFileSync(receiptFile,JSON.stringify(artifact,null,2));
 console.log(JSON.stringify({passed:true,checks:checks.length,evidence:receiptFile,archiveBytes:artifact.archiveBytes},null,2));
}catch(err){
 fs.mkdirSync(proofRoot,{recursive:true});
 const file=path.join(proofRoot,"brand-package-proof.json");
 fs.writeFileSync(file,JSON.stringify({createdAt:new Date().toISOString(),passed:false,checks,error:String(err)},null,2));
 console.error(err);
 process.exitCode=1;
}finally{if(scratch)fs.rmSync(scratch,{recursive:true,force:true});}
