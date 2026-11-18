import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {makePackage,writePackage,zipStore} from "./factory.mjs";
const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100"><path d="M1 1L99 99" fill="none" stroke="#000"/></svg>';
const brand={name:"Test Brand",description:"An original test identity",colors:{accent:"#396EA5",background:"#F2EFE7",foreground:"#171714"},fonts:{heading:"Inter",body:"Arial"},approval:{status:"approved",revision:"test-rev-01",reviewer:"fixture-reviewer"},rights:{confirmed:true,notes:"Synthetic fixture only."}};
test("unapproved designs never become deliverables",()=>assert.throws(()=>makePackage({...brand,approval:{status:"draft"}},svg),/approval/));
test("missing rights confirmation fails closed",()=>assert.throws(()=>makePackage({...brand,rights:{confirmed:false}},svg),/Rights/));
test("unsafe SVG scripts and external resources fail closed",()=>{assert.throws(()=>makePackage(brand,svg.replace("<path","<script>alert(1)</script><path")),/Unsafe/);assert.throws(()=>makePackage(brand,svg.replace("<path",'<image href="https://example.com/x.png"/><path')),/Unsafe/);});
test("produces reviewed source, guide, deck, ten social assets, tokens and manifest",()=>{
 const result=makePackage(brand,svg);
 assert.equal(Object.keys(result.files).filter(n=>n.startsWith("05-social/")).length,10);
 for(const required of ["01-logo-masters/logo-primary.svg","06-guidelines/brand-guidelines.html","07-presentation/logo-presentation.html","09-tokens/brand.json","manifest.json","RIGHTS.md"]) assert.ok(result.files[required],required);
 for(const a of result.manifest.assets)assert.ok(a.sha256.length===64);
});
test("writes an unpackable ZIP with a correct central directory",()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),"pare-brand-test-"));
 try{
  const result=writePackage(brand,svg,path.join(root,"delivery"));
  const b=fs.readFileSync(result.zip);
  assert.equal(b.readUInt32LE(b.length-22),0x06054b50);
  const count=b.readUInt16LE(b.length-22+10);
  assert.equal(count,result.assets+1);
  assert.equal(b.readUInt32LE(0),0x04034b50);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test("ZIP CRC header matches known test vector",()=>{
 const b=zipStore({"a.txt":"123456789"});
 assert.equal(b.readUInt32LE(14),0xCBF43926);
});
