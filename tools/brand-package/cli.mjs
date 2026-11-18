#!/usr/bin/env node
import fs from "node:fs";
import {writePackage} from "./factory.mjs";
const [manifest,svg,output]=process.argv.slice(2);
if(!manifest||!svg||!output){console.error("Usage: node tools/brand-package/cli.mjs approved-brand.json approved-logo.svg output-directory");process.exit(2);}
try {
 const brand=JSON.parse(fs.readFileSync(manifest,"utf8"));
 const result=writePackage(brand,fs.readFileSync(svg,"utf8"),output);
 process.stdout.write(JSON.stringify(result,null,2)+"\n");
}catch(e){console.error("Brand package generation FAILED: "+e.message);process.exit(1);}
