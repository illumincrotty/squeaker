var __defProp=Object.defineProperty,__defProps=Object.defineProperties,__getOwnPropDescs=Object.getOwnPropertyDescriptors,__getOwnPropSymbols=Object.getOwnPropertySymbols,__hasOwnProp={}.hasOwnProperty,__propIsEnum={}.propertyIsEnumerable,__defNormalProp=(e,r,t)=>r in e?__defProp(e,r,{enumerable:1,configurable:1,writable:1,value:t}):e[r]=t,__spreadValues=(e,r)=>{for(var t in r||(r={}))__hasOwnProp.call(r,t)&&__defNormalProp(e,t,r[t]);if(__getOwnPropSymbols)for(var t of __getOwnPropSymbols(r))__propIsEnum.call(r,t)&&__defNormalProp(e,t,r[t]);return e},__spreadProps=(e,r)=>__defProps(e,__getOwnPropDescs(r));"undefined"!=typeof require&&require,(()=>{const e=(e,r,t)=>e*(1-t)+r*t,r=e=>e,t=e=>e*e*(3-2*e),n=e=>e*e*e*(10+e*(6*e-15)),o=e=>(Math.sin((e-.5)*Math.PI)+1)/2,a=Number.EPSILON/2,s=4294967296,i=2**-32,c=(e=""+Date.now())=>{const r=(()=>{let e=4022871197;return r=>{r=""+r;for(var t=0;r.length>t;t++){e+=r.charCodeAt(t);var n=.02519603282416938*e;e=n>>>0,n-=e,e=(n*=e)>>>0,e+=(n-=e)*s}return(e>>>0)*i}})(),t=[r(" "),r(" "),r(" "),1];t[0]-=r(e),0>t[0]&&(t[0]+=1),t[1]-=r(e),0>t[1]&&(t[1]+=1),t[2]-=r(e),0>t[2]&&(t[2]+=1);const n={random(){const e=2091639*t[0]+t[3]*i;return t[0]=t[1],t[1]=t[2],t[2]=e-(t[3]=Math.floor(e))},uint32(){return n.random()*s},fract53(){return n.random()+Math.trunc(2097152*n.random())*a},exportState(){return{seed0:t[0],seed1:t[1],seed2:t[2],constant:t[3]}},importState(e){[t[0],t[1],t[2],t[3]]=[e.seed0,e.seed1,e.seed2,e.constant]}};return n};c("Best Of luck!");const l=(e,r)=>(e%r+r)%r,u=(e,r)=>e[0]*r[0]+e[1]*r[1]+e[2]*r[2];((e=1e3)=>{const r=Array.from({length:e}).fill(1),t=Math.sqrt(e),n=[];for(let o=2;e>o;o++)if(r[o])if(o>t)n.push(o);else{n.push(o);for(let t=2*o;e>t;t+=o)r[t]=0}return n})(2**17).filter((e=>e>=32768));const p=(e,r)=>r>e?r*r+e:e*e+e+r,d={xSize:0,blendFunction:n,seed:1178409733},_=1-Number.EPSILON,z=__spreadProps(__spreadValues({},d),{ySize:d.xSize}),S=__spreadProps(__spreadValues({},z),{zSize:z.ySize});Array.from({length:8}).map(((e,r)=>2*Math.PI/8*r)).map((e=>[Math.cos(e)*Math.SQRT1_2,Math.sin(e)*Math.SQRT1_2]));const f=r=>{const t=(e=>(e=>(e.xSize&&"number"==typeof e.xSize&&(e.xSize=Math.ceil(e.xSize)),"ySize"in e&&e.ySize&&"number"==typeof e.ySize&&(e.ySize=Math.ceil(e.ySize)),"zSize"in e&&e.zSize&&"number"==typeof e.zSize&&(e.zSize=Math.ceil(e.zSize)),e.seed&&!e.random&&(e.random=c(""+e.seed).random),e))(e))(__spreadValues(__spreadValues({},S),r)),n=(e=>{const r=(e=>{const r=[],t=1/Math.sqrt(3);for(let n=0;256>n;n++){const n=e()*Math.PI*2,o=Math.acos(2*e()-1);r.push([t*Math.sin(o)*Math.cos(n),t*Math.sin(o)*Math.sin(n),t*Math.cos(o)])}return r})(e);return(e,t,n)=>r[255&((e,r,t)=>p(17*p(e,r),t))(e,t,n)]})(t.random),o=t.xSize?e=>l(e,t.xSize):e=>e,a=t.xSize?e=>t.xSize>e+1?e+1:0:e=>e+1,s=t.ySize?e=>l(e,t.ySize):e=>e,i=t.ySize?e=>t.ySize>e+1?e+1:0:e=>e+1,d=t.zSize?e=>l(e,t.zSize):e=>e,z=t.zSize?e=>t.zSize>e+1?e+1:0:e=>e+1;return(r,c,l)=>{const p=Math.floor(r),S=Math.floor(c),f=Math.floor(l),h=o(p),m=s(S),y=d(f),M=a(h),P=i(m),b=z(y),g=r-p,w=c-S,O=l-f,v=t.blendFunction(g),x=t.blendFunction(w),I=t.blendFunction(O),N=n(h,m,y),E=n(h,m,b),q=n(h,P,y),D=n(h,P,b),F=n(M,m,y),V=n(M,m,b),j=n(M,P,y),A=n(M,P,b),H=u(N,[g,w,O]),L=u(E,[g,w,O-1]),C=u(q,[g,w-1,O]),Q=u(D,[g,w-1,O-1]),R=u(F,[g-1,w,O]),T=u(V,[g-1,w,O-1]),k=u(j,[g-1,w-1,O]),B=u(A,[g-1,w-1,O-1]),U=e(H,R,v),G=e(L,T,v),J=e(C,k,v),K=e(Q,B,v),W=e(U,J,x),X=e(G,K,x),Y=e(W,X,I);return Math.min(Y+.5,_)}},h=(e,r,t,n,o,a,s=500)=>{for(let i=r;r+n>i;i+=1)a.fill(o,4*e+4*i*s,4*(e+t)+4*i*s);return a};let m=[500,500,()=>.5];const y=(e="hermite")=>{switch(e){case"trig":return o;case"hermite":return t;case"quintic":return n;case"linear":return r;default:return t}};self.addEventListener("message",(e=>{var r;const t=e.data;var n;(null==(r=t.constructor)?void 0:r.canvasHeight)&&(m=[t.constructor.canvaswidth,t.constructor.canvasHeight,f((n=t.constructor,n||(n={canvasHeight:500,canvaswidth:500,xSize:256,ySize:256,zSize:256,interpolation:"hermite",forceHigh:0,forceLow:0}),{xSize:0,ySize:0,zSize:0,blendFunction:y(n.interpolation)}))]),t.update&&self.postMessage(M(t.update.frame))}));const M=e=>{const[r,t,n]=m,o=new Uint8ClampedArray(4*r*t);for(let a=0;r>a;a+=2)for(let r=0;t>r;r+=2){const t=Math.floor(255*n(a/10+e/75,r/10+e/100,e/50));h(a,r,2,2,t,o)}return new ImageData(o,500,500)}})();