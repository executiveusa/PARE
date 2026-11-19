// PARÉ Brand Package Factory — dependency-free, owner-controlled export.
// This adapter consumes APPROVED identity assets. It never approves a design.
// MIT ideas studied: lerna-soft/lerna-brand; implementation is independently written.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const directory = ["01-logo-masters","02-logo-variations","03-web","04-print","05-social","06-guidelines","07-presentation","08-mockups","09-tokens","10-source"];
const socials = [
 ["instagram-post",1080,1080],["instagram-story",1080,1920],
 ["facebook-cover",1640,924],["x-header",1500,500],
 ["linkedin-banner",1584,396],["youtube-banner",2560,1440],
 ["business-card-front",1050,600],["business-card-back",1050,600],
 ["letterhead-a4",2480,3508],["email-signature",600,200]
];
const esc = s => String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const validColor = c=>typeof c==="string" && /^#[0-9a-fA-F]{6}$/.test(c);
function xmlSafe(s) {
 // Intentionally conservative: the exporter handles reviewed, self-contained logo art.
 // Unknown SVG animation, HTML/CSS, remote links or active content fail closed.
 if (/<\s*(?:!|\?|script\b|foreignObject\b|image\b|iframe\b|a\b|style\b|animate\w*\b|set\b|feImage\b)/i.test(s)) return false;
 if (/\bon\w+\s*=|(?:javascript|vbscript|data|file)\s*:|@import\b|url\s*\(|\bxml:base\s*=/i.test(s)) return false;
 const links=[...s.matchAll(/\b(?:href|src)\s*=\s*(["'])(.*?)\1/gi)];
 if (/\b(?:href|src)\s*=\s*(?!["'])/i.test(s)) return false;
 return links.every(m=>/^#[A-Za-z_][\w:.-]*$/.test(m[2]));
}
function parseMaster(svg) {
 if(typeof svg!=="string"||!/<svg[\s>]/i.test(svg)||!xmlSafe(svg)) throw Error("Unsafe or absent SVG master");
 const box=svg.match(/<svg\b[^>]*\bviewBox\s*=\s*["']\s*([0-9.\s-]+)\s*["']/i);
 if(!box) throw Error("SVG master requires a numeric viewBox");
 const v=box[1].trim().split(/[\s,]+/).map(Number);
 if(v.length!==4||v.some(n=>!Number.isFinite(n))||v[2]<=0||v[3]<=0) throw Error("Invalid viewBox");
 const inner=svg.replace(/^[\s\S]*?<svg\b[^>]*>/i,"").replace(/<\/svg>\s*$/i,"");
 return {viewBox:v.join(" "),inner};
}
function embed(master,x,y,w,h) {
 return '<svg x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" viewBox="'+master.viewBox+'" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">'+master.inner+'</svg>';
}
function svgDocument(w,h,body) {
 return '<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'">'+body+'</svg>';
}
function socialSvg(master,brand,w,h,style) {
 const bg=style==="light"?brand.colors.background:brand.colors.foreground;
 const ink=style==="light"?brand.colors.foreground:brand.colors.background;
 const square=Math.min(w,h),size=square*.54;
 const logo=embed(master,(w-size)/2,(h-size)/2,size,size);
 return svgDocument(w,h,'<rect width="'+w+'" height="'+h+'" fill="'+bg+'"/>'+logo+
 '<text x="'+(w*.05)+'" y="'+(h*.92)+'" fill="'+ink+'" font-family="Arial,sans-serif" font-size="'+Math.max(13,Math.round(square*.027))+'">'+esc(brand.name)+'</text>');
}
function htmlDocument(title,body,brand) {
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'+
 '<title>'+esc(title)+'</title><style>:root{--ink:'+brand.colors.foreground+';--paper:'+brand.colors.background+';--accent:'+brand.colors.accent+
 ';}*{box-sizing:border-box}body{font-family:Arial,sans-serif;background:#eee;margin:0;color:var(--ink)}main{max-width:920px;margin:auto}.page{background:var(--paper);padding:55px;margin:24px 0;min-height:650px;break-after:page}h1{font-size:48px;line-height:1.1}h2{font-size:28px}.mark{max-width:65%;max-height:290px}small{letter-spacing:.15em;text-transform:uppercase}ul{line-height:1.9}@media print{body{background:white}.page{margin:0;min-height:90vh}@page{size:A4;margin:0}}</style></head><body><main>'+body+'</main></body></html>';
}
function page(n,title,body){return '<section class="page"><small>'+esc(n)+'</small><h2>'+esc(title)+'</h2>'+body+'</section>';}
function htmls(brand,master,source) {
 const svg='<div class="mark">'+source+'</div>';
 const data='<p><strong>Primary</strong>: '+esc(brand.colors.accent)+'<br><strong>Ink</strong>: '+esc(brand.colors.foreground)+
 '<br><strong>Background</strong>: '+esc(brand.colors.background)+'</p>';
 const book=page("01 / brand","Identity guidelines","<h1>"+esc(brand.name)+"</h1>"+svg+"<p>"+esc(brand.description||"Approved brand identity")+"</p>")+
 page("02 / brand","Logo master",svg+"<p>Use approved vector master without distortion.</p>")+
 page("03 / brand","Color specifications",data)+
 page("04 / brand","Typography","<p>Heading: "+esc(brand.fonts.heading)+"<br>Body: "+esc(brand.fonts.body)+"</p>")+
 page("05 / brand","Correct usage","<ul><li>Keep original proportions</li><li>Use approved colors</li><li>Maintain clear surrounding space</li><li>Verify logo at small size</li></ul>")+
 page("06 / brand","Ownership and limitations","<p>Refer to RIGHTS.md for asset licenses and client handoff terms. Print readiness, trademarks and type licenses require separate approval.</p>");
 const slides=page("01 / concept",brand.name+" — Identity presentation","<h1>"+esc(brand.name)+"</h1>"+svg)+
 page("02 / concept","Design rationale","<p>"+esc(brand.description||"Identity rationale to be approved by the client.")+"</p>")+
 page("03 / concept","Approved visual system",svg+data)+
 page("04 / concept","Applications","<p>Exported social, web and stationery formats accompany this presentation.</p>");
 return {"06-guidelines/brand-guidelines.html":htmlDocument(brand.name+" brand guidelines",book,brand),
 "07-presentation/logo-presentation.html":htmlDocument(brand.name+" identity presentation",slides,brand)};
}
function checkBrand(brand) {
 if(!brand||typeof brand!=="object"||!brand.name||!brand.colors||!brand.fonts)throw Error("Missing brand metadata");
 for(const k of ["accent","background","foreground"])if(!validColor(brand.colors[k]))throw Error("Invalid "+k+" color");
 if(!brand.fonts.heading||!brand.fonts.body)throw Error("Approved heading and body fonts required");
 if(brand.approval?.status!=="approved"||!brand.approval?.revision||!brand.approval?.reviewer)throw Error("Explicit human approval of exact revision required");
 if(!brand.rights?.confirmed)throw Error("Rights confirmation is required");
}
export function makePackage(brand,masterSvg) {
 checkBrand(brand);
 const master=parseMaster(masterSvg);
 const files={};
 files["01-logo-masters/logo-primary.svg"]=masterSvg;
 const mark=embed(master,20,20,360,160);
 files["02-logo-variations/logo-on-light.svg"]=svgDocument(400,200,'<rect width="400" height="200" fill="'+brand.colors.background+'"/>'+mark);
 files["02-logo-variations/logo-on-dark.svg"]=svgDocument(400,200,'<rect width="400" height="200" fill="'+brand.colors.foreground+'"/>'+mark);
 files["03-web/logo.svg"]=masterSvg;
 for(const [name,w,h] of socials)files["05-social/"+name+".svg"]=socialSvg(master,brand,w,h,"light");
 files["09-tokens/brand.json"]=JSON.stringify({name:brand.name,colors:brand.colors,fonts:brand.fonts},null,2);
 files["09-tokens/variables.css"]=":root {\n"+Object.entries(brand.colors).map(([k,v])=>"  --brand-"+k+": "+v+";").join("\n")+"\n}\n";
 Object.assign(files,htmls(brand,master,masterSvg));
 files["10-source/approved-master.svg"]=masterSvg;
 files["RIGHTS.md"]=brand.rights.notes||"Approved by the project owner; verify third-party assets before delivery.";
 files["README.md"]="# "+brand.name+" — Brand Delivery\n\nApproved revision: "+brand.approval.revision+"\nReviewer: "+brand.approval.reviewer+
 "\n\nSVG masters and presentation/guidelines HTML are included. HTML can be printed to PDF after visual approval. "+
 "PNG, EPS and CMYK outputs are NOT included or certified. Do not claim a print-ready package until they are verified.\n";
 const manifest={generator:"pare-brand-package-v1",revision:brand.approval.revision,approvedBy:brand.approval.reviewer,assets:[]};
 for(const [name,data] of Object.entries(files))manifest.assets.push({path:name,sha256:crypto.createHash("sha256").update(data).digest("hex"),bytes:Buffer.byteLength(data)});
 files["manifest.json"]=JSON.stringify(manifest,null,2);
 return {files,manifest,directory};
}
function crc32(buf){let crc=0xFFFFFFFF;for(const b of buf){crc^=b;for(let i=0;i<8;i++)crc=(crc&1)?(crc>>>1)^0xEDB88320:crc>>>1;}return (crc^0xFFFFFFFF)>>>0;}
export function zipStore(files){
 const local=[],central=[];let offset=0;
 for(const [name,contents] of Object.entries(files)){
  const data=Buffer.from(contents),nm=Buffer.from(name),crc=crc32(data),l=Buffer.alloc(30),c=Buffer.alloc(46);
  l.writeUInt32LE(0x04034b50,0);l.writeUInt16LE(20,4);l.writeUInt16LE(0x800,6);l.writeUInt32LE(crc,14);
  l.writeUInt32LE(data.length,18);l.writeUInt32LE(data.length,22);l.writeUInt16LE(nm.length,26);
  c.writeUInt32LE(0x02014b50,0);c.writeUInt16LE(20,4);c.writeUInt16LE(20,6);c.writeUInt16LE(0x800,8);
  c.writeUInt32LE(crc,16);c.writeUInt32LE(data.length,20);c.writeUInt32LE(data.length,24);c.writeUInt16LE(nm.length,28);c.writeUInt32LE(offset,42);
  local.push(l,nm,data);central.push(c,nm);offset+=l.length+nm.length+data.length;
 }
 const cd=Buffer.concat(central),end=Buffer.alloc(22);
 end.writeUInt32LE(0x06054b50,0);end.writeUInt16LE(central.length/2,8);end.writeUInt16LE(central.length/2,10);end.writeUInt32LE(cd.length,12);end.writeUInt32LE(offset,16);
 return Buffer.concat([...local,cd,end]);
}
export function writePackage(brand,svg,out) {
 const built=makePackage(brand,svg);const root=path.resolve(out);fs.mkdirSync(root,{recursive:true});
 for(const [name,data] of Object.entries(built.files)){const dest=path.join(root,name);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,data);}
 const zip=root+".zip";fs.writeFileSync(zip,zipStore(built.files));return {root,zip,assets:built.manifest.assets.length};
}
