import{S as R,i as V,s as F,e as v,a as j,b as E,c as T,d as I,f as fe,g as m,t as N,h as Y,l as D,j as P,k as de,m as M,n as J,u as G,o as H,p as _e,q as me,r as pe,v as U,w as z,x as he,y as X,z as be,A as ke,B as ve,C as ge,D as O,E as ye,F as we,G as Q,H as Z,I as $,J as x,K as Ee,L as Ie}from"./vendor.89bd61f5.js";const Se=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function l(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(o){if(o.ep)return;o.ep=!0;const n=l(o);fetch(o.href,n)}};Se();var je="/autoskola/assets/data.4fd139bf.json";function ee(s,e,l){const t=s.slice();return t[10]=e[l][0],t[11]=e[l][1],t[12]=e[l][2],t}function te(s,e,l){const t=s.slice();return t[15]=e[l],t}function le(s){let e,l=s[1].images,t=[];for(let o=0;o<l.length;o+=1)t[o]=ne(te(s,l,o));return{c(){e=v("div");for(let o=0;o<t.length;o+=1)t[o].c();j(e,"class","media svelte-1ru5yh8")},m(o,n){E(o,e,n);for(let r=0;r<t.length;r+=1)t[r].m(e,null)},p(o,n){if(n&6){l=o[1].images;let r;for(r=0;r<l.length;r+=1){const p=te(o,l,r);t[r]?t[r].p(p,n):(t[r]=ne(p),t[r].c(),t[r].m(e,null))}for(;r<t.length;r+=1)t[r].d(1);t.length=l.length}},d(o){o&&I(e),fe(t,o)}}}function ne(s){let e,l;return{c(){e=v("img"),T(e.src,l=s[2][s[15]])||j(e,"src",l),j(e,"alt","Question detail"),j(e,"class","svelte-1ru5yh8")},m(t,o){E(t,e,o)},p(t,o){o&6&&!T(e.src,l=t[2][t[15]])&&j(e,"src",l)},d(t){t&&I(e)}}}function se(s){let e,l,t;return{c(){e=v("div"),l=v("video"),l.autoplay=!0,l.loop=!0,l.muted=!0,T(l.src,t=s[2][s[1].video])||j(l,"src",t),j(l,"class","svelte-1ru5yh8"),j(e,"class","media svelte-1ru5yh8")},m(o,n){E(o,e,n),m(e,l)},p(o,n){n&6&&!T(l.src,t=o[2][o[1].video])&&j(l,"src",t)},d(o){o&&I(e)}}}function oe(s,e){let l,t,o,n=e[10]+"",r,p,d=e[12]+"",_,h,S;function y(){return e[8](e[11])}return{key:s,first:null,c(){l=v("div"),t=v("button"),o=N("<"),r=N(n),p=N(">: "),_=N(d),j(t,"class","answer svelte-1ru5yh8"),t.disabled=e[0],Y(t,"correct",e[0]&&e[11]===e[1].answerId),j(l,"class","svelte-1ru5yh8"),this.first=l},m(a,c){E(a,l,c),m(l,t),m(t,o),m(t,r),m(t,p),m(t,_),h||(S=D(t,"click",y),h=!0)},p(a,c){e=a,c&8&&n!==(n=e[10]+"")&&P(r,n),c&8&&d!==(d=e[12]+"")&&P(_,d),c&1&&(t.disabled=e[0]),c&11&&Y(t,"correct",e[0]&&e[11]===e[1].answerId)},d(a){a&&I(l),h=!1,S()}}}function Ne(s){let e,l,t=s[1].question+"",o,n,r,p,d,_=[],h=new Map,S,y,a,c,g,f=s[1].images!==void 0&&le(s),b=s[1].video!==void 0&&se(s),C=s[3];const A=i=>i[11];for(let i=0;i<C.length;i+=1){let k=ee(s,C,i),u=A(k);h.set(u,_[i]=oe(u,k))}const B=s[6].default,q=de(B,s,s[5],null);return{c(){e=v("div"),l=v("p"),o=N(t),n=M(),f&&f.c(),r=M(),b&&b.c(),p=M(),d=v("div");for(let i=0;i<_.length;i+=1)_[i].c();S=M(),y=v("div"),q&&q.c(),J(y,"grid-column","2"),j(d,"class","answers svelte-1ru5yh8")},m(i,k){E(i,e,k),m(e,l),m(l,o),m(e,n),f&&f.m(e,null),m(e,r),b&&b.m(e,null),m(e,p),m(e,d);for(let u=0;u<_.length;u+=1)_[u].m(d,null);m(d,S),m(d,y),q&&q.m(y,null),a=!0,c||(g=D(window,"keyup",s[7]),c=!0)},p(i,[k]){(!a||k&2)&&t!==(t=i[1].question+"")&&P(o,t),i[1].images!==void 0?f?f.p(i,k):(f=le(i),f.c(),f.m(e,r)):f&&(f.d(1),f=null),i[1].video!==void 0?b?b.p(i,k):(b=se(i),b.c(),b.m(e,p)):b&&(b.d(1),b=null),k&27&&(C=i[3],_=G(_,k,A,1,i,C,h,d,H,oe,S,ee)),q&&q.p&&(!a||k&32)&&_e(q,B,i,i[5],a?pe(B,i[5],k,null):me(i[5]),null)},i(i){a||(U(q,i),a=!0)},o(i){z(q,i),a=!1},d(i){i&&I(e),f&&f.d(),b&&b.d();for(let k=0;k<_.length;k+=1)_[k].d();q&&q.d(i),c=!1,g()}}}function qe(s,e,l){let{$$slots:t={},$$scope:o}=e,{data:n}=e,{answered:r}=e,{mediaIndex:p}=e;const d=he();let _;function h(a){if(r)return;const c=a===n.answerId;d("answer",c),l(0,r=!0)}const S=a=>{for(let c=1;c<=_.length;c++)(a.code===`Digit${c}`||a.code===`Numpad${c}`)&&h(_[c-1][1])},y=a=>{h(a)};return s.$$set=a=>{"data"in a&&l(1,n=a.data),"answered"in a&&l(0,r=a.answered),"mediaIndex"in a&&l(2,p=a.mediaIndex),"$$scope"in a&&l(5,o=a.$$scope)},s.$$.update=()=>{if(s.$$.dirty&2){const a=[...Object.entries(n.answers)];n.noShuffle||a.sort(()=>Math.random()>.5?1:-1),l(3,_=a.map(([c,g],f)=>[f+1,c,g]))}},[r,n,p,_,h,o,t,S,y]}class Le extends R{constructor(e){super();V(this,e,qe,Ne,F,{data:1,answered:0,mediaIndex:2})}}function re(s,e,l){const t=s.slice();return t[17]=e[l][0],t[18]=e[l][1],t}function ie(s,e){let l,t=e[17]+"",o,n,r=e[18].length+"",p;return{key:s,first:null,c(){l=v("li"),o=N(t),n=N(": "),p=N(r),this.first=l},m(d,_){E(d,l,_),m(l,o),m(l,n),m(l,p)},p(d,_){e=d,_&64&&t!==(t=e[17]+"")&&P(o,t),_&64&&r!==(r=e[18].length+"")&&P(p,r)},d(d){d&&I(l)}}}function Oe(s){let e,l,t,o;return{c(){e=v("div"),l=v("button"),l.textContent="Start",j(l,"class","svelte-o95ijy"),j(e,"class","start svelte-o95ijy")},m(n,r){E(n,e,r),m(e,l),t||(o=D(l,"click",s[8]),t=!0)},p:O,i:O,o:O,d(n){n&&I(e),t=!1,o()}}}function Me(s){let e,l;return e=new Le({props:{mediaIndex:s[0],data:s[7],answered:s[4],$$slots:{default:[De]},$$scope:{ctx:s}}}),e.$on("answer",s[15]),{c(){Z(e.$$.fragment)},m(t,o){$(e,t,o),l=!0},p(t,o){const n={};o&1&&(n.mediaIndex=t[0]),o&128&&(n.data=t[7]),o&16&&(n.answered=t[4]),o&2097212&&(n.$$scope={dirty:o,ctx:t}),e.$set(n)},i(t){l||(U(e.$$.fragment,t),l=!0)},o(t){z(e.$$.fragment,t),l=!1},d(t){x(e,t)}}}function Ce(s){let e;return{c(){e=N("Nespr\xE1vn\xE1 odpov\u011B\u010F")},m(l,t){E(l,e,t)},p:O,d(l){l&&I(e)}}}function Ae(s){let e,l=s[3][s[2]]+"",t,o;return{c(){e=N("Spr\xE1vn\xE1 odpov\u011B\u010F ("),t=N(l),o=N(".)")},m(n,r){E(n,e,r),E(n,t,r),E(n,o,r)},p(n,r){r&12&&l!==(l=n[3][n[2]]+"")&&P(t,l)},d(n){n&&I(e),n&&I(t),n&&I(o)}}}function Be(s){let e;return{c(){e=N("Vyberte odpov\u011B\u010F")},m(l,t){E(l,e,t)},p:O,d(l){l&&I(e)}}}function De(s){let e,l,t,o,n,r,p,d,_,h,S,y;function a(f,b){return f[4]?f[5]?Ae:Ce:Be}let c=a(s),g=c(s);return{c(){e=v("div"),l=v("span"),t=N("Ot\xE1zka "),o=N(s[2]),n=M(),r=v("span"),g.c(),p=M(),d=v("button"),_=N("<Enter>: Pokra\u010Dovat"),J(r,"color",s[4]?s[5]?"#191":"#911":"unset",!1),d.disabled=h=!s[4],J(d,"width","100%"),J(d,"margin-top","1rem"),j(e,"class","info svelte-o95ijy")},m(f,b){E(f,e,b),m(e,l),m(l,t),m(l,o),m(e,n),m(e,r),g.m(r,null),m(e,p),m(e,d),m(d,_),S||(y=D(d,"click",s[8]),S=!0)},p(f,b){b&4&&P(o,f[2]),c===(c=a(f))&&g?g.p(f,b):(g.d(1),g=c(f),g&&(g.c(),g.m(r,null))),b&48&&J(r,"color",f[4]?f[5]?"#191":"#911":"unset",!1),b&16&&h!==(h=!f[4])&&(d.disabled=h)},d(f){f&&I(e),g.d(),S=!1,y()}}}function Pe(s){let e,l,t=[],o=new Map,n,r,p,d,_,h,S,y,a,c,g,f,b,C,A=[...s[6].entries()];const B=u=>u[17];for(let u=0;u<A.length;u+=1){let w=re(s,A,u),L=B(w);o.set(L,t[u]=ie(L,w))}const q=[Me,Oe],i=[];function k(u,w){return u[7]?0:1}return a=k(s),c=i[a]=q[a](s),{c(){e=v("div"),l=v("ul");for(let u=0;u<t.length;u+=1)t[u].c();n=M(),r=v("div"),p=v("button"),p.textContent="Resetovat statistiku",d=M(),_=v("button"),_.textContent="Export",h=M(),S=v("button"),S.textContent="Import",y=M(),c.c(),g=X(),j(p,"class","svelte-o95ijy"),j(_,"class","svelte-o95ijy"),j(S,"class","svelte-o95ijy"),j(r,"class","buttons svelte-o95ijy"),j(e,"class","stats")},m(u,w){E(u,e,w),m(e,l);for(let L=0;L<t.length;L+=1)t[L].m(l,null);m(e,n),m(e,r),m(r,p),m(r,d),m(r,_),m(r,h),m(r,S),E(u,y,w),i[a].m(u,w),E(u,g,w),f=!0,b||(C=[D(window,"keyup",s[11]),D(p,"click",s[12]),D(_,"click",s[13]),D(S,"click",s[14])],b=!0)},p(u,[w]){w&64&&(A=[...u[6].entries()],t=G(t,w,B,1,u,A,o,l,H,ie,null,re));let L=a;a=k(u),a===L?i[a].p(u,w):(be(),z(i[L],1,1,()=>{i[L]=null}),ke(),c=i[a],c?c.p(u,w):(c=i[a]=q[a](u),c.c()),U(c,1),c.m(g.parentNode,g))},i(u){f||(U(c),f=!0)},o(u){z(c),f=!1},d(u){u&&I(e);for(let w=0;w<t.length;w+=1)t[w].d();u&&I(y),i[a].d(u),u&&I(g),b=!1,ve(C)}}}function Ue(s,e,l){let t,o,n,r=O,p=()=>(r(),r=we(h,i=>l(3,n=i)),h);s.$$.on_destroy.push(()=>r());let{questions:d}=e,{mediaIndex:_}=e,h;function S(){let i=0;const k=[];for(const[ue,ce]of f.entries()){const W=ce.length/Math.pow(2,ue);i+=W,k.push(W)}const u=Math.random()*i;let w=0,L=0;for(;u>=w;)w+=k[L++];let K=f[L-1];return K[Math.floor(Math.random()*K.length)]}let y;ge(()=>{var k;let i;try{i=JSON.parse((k=localStorage.getItem("stats"))!=null?k:"{")}catch{i={}}p(l(1,h=ye(i))),h.subscribe(u=>{localStorage.setItem("stats",JSON.stringify(u))})});let a=!1,c=null;function g(){l(4,a=!1),l(5,c=null),l(2,y=S())}let f=[];const b=i=>{a&&(i.code==="Enter"||i.code==="NumpadEnter")&&g()},C=()=>{confirm("Opravdu resetovat statistiky?")&&Q(h,n={},n)},A=async()=>{try{await navigator.clipboard.writeText(JSON.stringify(n)),alert("Copied")}catch(i){alert(i)}},B=async()=>{try{const i=prompt("Import");if(i===null)return;Q(h,n=JSON.parse(i),n)}catch(i){alert(i)}},q=({detail:i})=>{i?(n[y]===void 0&&Q(h,n[y]=0,n),Q(h,n[y]+=1,n)):delete n[y],l(5,c=i),l(4,a=!0)};return s.$$set=i=>{"questions"in i&&l(9,d=i.questions),"mediaIndex"in i&&l(0,_=i.mediaIndex)},s.$$.update=()=>{if(s.$$.dirty&512&&l(10,t=[...Object.keys(d)].sort()),s.$$.dirty&516&&l(7,o=d[y]),s.$$.dirty&1034){e:{if(!h)break e;l(6,f=t.reduce((i,k)=>{var w;const u=(w=n[k])!=null?w:0;for(;u>=i.length;)i.push([]);return i[u].push(k),i},[]))}}},[_,h,y,n,a,c,f,o,g,d,t,b,C,A,B,q]}class ze extends R{constructor(e){super();V(this,e,Ue,Pe,F,{questions:9,mediaIndex:0})}}var Je="/autoskola/assets/media-bundle.e506fb5b.bin";async function Te(){const s=await fetch(Je),e=new TextDecoder,l=await s.arrayBuffer(),t=new DataView(l),o={};let n=0;for(;n<l.byteLength;){const r=t.getUint16(n);n+=Uint16Array.BYTES_PER_ELEMENT;const p=e.decode(new Uint8Array(l,n,r));n+=r;const d=t.getUint32(n);n+=Uint32Array.BYTES_PER_ELEMENT;const _=new Blob([new Uint8Array(l,n,d)]);n+=d,o[p]=URL.createObjectURL(_)}return o}function ae(s){s[1]=s[3][0],s[2]=s[3][1]}function Qe(s){let e,l,t,o=s[4]+"",n;return{c(){e=v("p"),e.textContent="Chyba",l=M(),t=v("pre"),n=N(o)},m(r,p){E(r,e,p),E(r,l,p),E(r,t,p),m(t,n)},p:O,i:O,o:O,d(r){r&&I(e),r&&I(l),r&&I(t)}}}function Re(s){ae(s);let e,l;return e=new ze({props:{questions:s[1],mediaIndex:s[2]}}),{c(){Z(e.$$.fragment)},m(t,o){$(e,t,o),l=!0},p(t,o){ae(t)},i(t){l||(U(e.$$.fragment,t),l=!0)},o(t){z(e.$$.fragment,t),l=!1},d(t){x(e,t)}}}function Ve(s){let e;return{c(){e=v("p"),e.textContent="Vy\u010Dkejte chvilku, stahuji data ot\xE1zek"},m(l,t){E(l,e,t)},p:O,i:O,o:O,d(l){l&&I(e)}}}function Fe(s){let e,l,t={ctx:s,current:null,token:null,hasCatch:!0,pending:Ve,then:Re,catch:Qe,value:3,error:4,blocks:[,,,]};return Ee(s[0],t),{c(){e=X(),t.block.c()},m(o,n){E(o,e,n),t.block.m(o,t.anchor=n),t.mount=()=>e.parentNode,t.anchor=e,l=!0},p(o,[n]){s=o,Ie(t,s,n)},i(o){l||(U(t.block),l=!0)},o(o){for(let n=0;n<3;n+=1){const r=t.blocks[n];z(r)}l=!1},d(o){o&&I(e),t.block.d(o),t.token=null,t=null}}}function Ke(s){return[Promise.all([fetch(je).then(l=>l.json()),Te()])]}class We extends R{constructor(e){super();V(this,e,Ke,Fe,F,{})}}new We({target:document.body});(async()=>{var s,e;localStorage.getItem("worker-info")!=="y"&&(alert(await((e=(s=navigator==null?void 0:navigator.serviceWorker)==null?void 0:s.register)==null?void 0:e.call(s,"/autoskola/sw.js",{scope:"/autoskola/"}))?"Service Worker byl sta\u017Een, znovu na\u010Dt\u011Bte str\xE1nku a pot\xE9 bude mo\u017En\xE9 aplikaci pou\u017E\xEDvat pln\u011B offline":"Nepoda\u0159ilo se st\xE1hnout Service Worker - obr\xE1zky a seznam ot\xE1zek tak mohou b\xFDt stahov\xE1ny opakovan\u011B"),localStorage.setItem("worker-info","y"))})();
