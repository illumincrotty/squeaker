var e=Object.defineProperty,t=Object.getOwnPropertySymbols,r={}.hasOwnProperty,n={}.propertyIsEnumerable,a=(t,r,n)=>r in t?e(t,r,{enumerable:1,configurable:1,writable:1,value:n}):t[r]=n,o=(e,o)=>{for(var i in o||(o={}))r.call(o,i)&&a(e,i,o[i]);if(t)for(var i of t(o))n.call(o,i)&&a(e,i,o[i]);return e};"undefined"!=typeof require&&require;import{c as i,i as s,p as l,_ as c,l as d,d as h,m as f,a as m,b as u,e as y,g as S,s as p,f as b}from"./perlinConstants.6b98d269.js";import{d as z,a as g}from"./index.d252ef4e.js";const x=e=>{const t=l(o(o({},m),e)),r=(e=>{S(e);const t=Math.SQRT1_2,r=p(d,e).slice(0,4096).map((e=>[Math.cos(e%(2*Math.PI))*t,Math.sin(e%(2*Math.PI))*t]));return(e,t)=>r[u(e,t)%4095]})(t.random),n=t.xSize?e=>i(e,t.xSize):e=>e,a=t.xSize?e=>t.xSize>e+1?e+1:0:e=>e+1,s=t.ySize?e=>i(e,t.ySize):e=>e,c=t.xSize?e=>t.ySize>e+1?e+1:0:e=>e+1;return(e,o)=>{const i=Math.floor(e),l=Math.floor(o),d=n(i),m=s(l),u=a(d),S=c(m),p=e-i,b=o-l,z=t.blendFunction(p),g=t.blendFunction(b),x=r(d,m),M=r(d,S),w=r(u,m),P=r(u,S),j=h(x,[p,b]),v=h(M,[p,b-1]),F=h(w,[p-1,b]),O=h(P,[p-1,b-1]),I=y(j,v,F,O,z,g);return Math.min(I+.5,f)}},M=async e=>{const t=(e=>{const t=l(o(o({},c),e)),r=d[Math.floor(d.length*t.random())],n=new Float32Array(255).map((()=>2*t.random()));return n[n.length-1]=n[0],e=>{const a=Math.floor(e),o=i(a,t.xSize),l=e-a,c=t.blendFunction(l);return s(n[o*r&255]*l,n[o+1*r&255]*(l-1),c)+.5}})({random:b("98iks").random,xSize:e.width/100});return z(e,(e=>t(e/100)))},w=async e=>{const t=x({random:b("plaigerism").random});return g(e,((e,r)=>t(e/20,r/20)),1)},P=async(e,t=5,r=5)=>{const n=x({random:b("67uyjh n,").random,xSize:e.width/(20*t),ySize:e.height/(20*r)});await g(e,((e,t)=>n(e/20,t/20)),1);const a=e.getContext("2d");if(a&&(t>1||r>1)){a.fillStyle="rgba(256, 0, 0, .3)";{const r=e.width/t;for(let n=1;t>n;n++)a.fillRect(r*n-1,0,2,e.height)}{const t=e.height/r;for(let n=1;r>n;n++)a.fillRect(0,t*n-1,e.width,2)}}return Promise.resolve()};export{M as drawPerlin1d,w as drawPerlin2d,P as drawPerlin2dTile};