function k(){}const kt=t=>t;function rt(t,e){for(const n in e)t[n]=e[n];return t}function Q(t){return t()}function J(){return Object.create(null)}function v(t){t.forEach(Q)}function L(t){return typeof t=="function"}function vt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function st(t){return Object.keys(t).length===0}function R(t,...e){if(t==null)return k;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Et(t){let e;return R(t,n=>e=n)(),e}function St(t,e,n){t.$$.on_destroy.push(R(e,n))}function Nt(t,e,n,i){if(t){const s=U(t,e,n,i);return t[0](s)}}function U(t,e,n,i){return t[1]&&i?rt(n.ctx.slice(),t[1](i(e))):n.ctx}function jt(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const a=[],r=Math.max(e.dirty.length,s.length);for(let c=0;c<r;c+=1)a[c]=e.dirty[c]|s[c];return a}return e.dirty|s}return e.dirty}function At(t,e,n,i,s,a){if(s){const r=U(e,n,i,a);t.p(r,s)}}function Mt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Ct(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function Ot(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function Pt(t,e,n){return t.set(n),e}function zt(t){return t&&L(t.destroy)?t.destroy:k}const V=typeof window<"u";let Bt=V?()=>window.performance.now():()=>Date.now(),X=V?t=>requestAnimationFrame(t):k;const w=new Set;function Y(t){w.forEach(e=>{e.c(t)||(w.delete(e),e.f())}),w.size!==0&&X(Y)}function Dt(t){let e;return w.size===0&&X(Y),{promise:new Promise(n=>{w.add(e={c:t,f:n})}),abort(){w.delete(e)}}}let C=!1;function ot(){C=!0}function ct(){C=!1}function ut(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function at(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let u=0;u<e.length;u++){const l=e[u];l.claim_order!==void 0&&o.push(l)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let o=0;o<e.length;o++){const u=e[o].claim_order,l=(s>0&&e[n[s]].claim_order<=u?s+1:ut(1,s,d=>e[n[d]].claim_order,u))-1;i[o]=n[l]+1;const _=l+1;n[_]=o,s=Math.max(_,s)}const a=[],r=[];let c=e.length-1;for(let o=n[s]+1;o!=0;o=i[o-1]){for(a.push(e[o-1]);c>=o;c--)r.push(e[c]);c--}for(;c>=0;c--)r.push(e[c]);a.reverse(),r.sort((o,u)=>o.claim_order-u.claim_order);for(let o=0,u=0;o<r.length;o++){for(;u<a.length&&r[o].claim_order>=a[u].claim_order;)u++;const l=u<a.length?a[u]:null;t.insertBefore(r[o],l)}}function ft(t,e){if(C){for(at(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Tt(t,e,n){C&&!n?ft(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function lt(t){t.parentNode&&t.parentNode.removeChild(t)}function qt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function dt(t){return document.createElement(t)}function H(t){return document.createTextNode(t)}function Ft(){return H(" ")}function Lt(){return H("")}function Ht(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function _t(t){return Array.from(t.childNodes)}function ht(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function Z(t,e,n,i,s=!1){ht(t);const a=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const c=t[r];if(e(c)){const o=n(c);return o===void 0?t.splice(r,1):t[r]=o,s||(t.claim_info.last_index=r),c}}for(let r=t.claim_info.last_index-1;r>=0;r--){const c=t[r];if(e(c)){const o=n(c);return o===void 0?t.splice(r,1):t[r]=o,s?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,c}}return i()})();return a.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,a}function mt(t,e,n,i){return Z(t,s=>s.nodeName===e,s=>{const a=[];for(let r=0;r<s.attributes.length;r++){const c=s.attributes[r];n[c.name]||a.push(c.name)}a.forEach(r=>s.removeAttribute(r))},()=>i(e))}function It(t,e,n){return mt(t,e,n,dt)}function pt(t,e){return Z(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>H(e),!0)}function Wt(t){return pt(t," ")}function Gt(t,e){e=""+e,t.data!==e&&(t.data=e)}function Jt(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Kt(t,e,n){t.classList[n?"add":"remove"](e)}function Qt(t,e){return new t(e)}let S;function E(t){S=t}function N(){if(!S)throw new Error("Function called outside component initialization");return S}function Rt(t){N().$$.on_mount.push(t)}function Ut(t){N().$$.after_update.push(t)}function Vt(t){N().$$.on_destroy.push(t)}function Xt(t,e){return N().$$.context.set(t,e),e}function Yt(t){return N().$$.context.get(t)}const $=[],K=[];let b=[];const T=[],tt=Promise.resolve();let q=!1;function et(){q||(q=!0,tt.then(nt))}function Zt(){return et(),tt}function F(t){b.push(t)}function te(t){T.push(t)}const D=new Set;let x=0;function nt(){if(x!==0)return;const t=S;do{try{for(;x<$.length;){const e=$[x];x++,E(e),yt(e.$$)}}catch(e){throw $.length=0,x=0,e}for(E(null),$.length=0,x=0;K.length;)K.pop()();for(let e=0;e<b.length;e+=1){const n=b[e];D.has(n)||(D.add(n),n())}b.length=0}while($.length);for(;T.length;)T.pop()();q=!1,D.clear(),E(t)}function yt(t){if(t.fragment!==null){t.update(),v(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(F)}}function gt(t){const e=[],n=[];b.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),b=e}const M=new Set;let g;function ee(){g={r:0,c:[],p:g}}function ne(){g.r||v(g.c),g=g.p}function it(t,e){t&&t.i&&(M.delete(t),t.i(e))}function xt(t,e,n,i){if(t&&t.o){if(M.has(t))return;M.add(t),g.c.push(()=>{M.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function ie(t,e){xt(t,1,1,()=>{e.delete(t.key)})}function re(t,e,n,i,s,a,r,c,o,u,l,_){let d=t.length,m=a.length,h=d;const O={};for(;h--;)O[t[h].key]=h;const j=[],P=new Map,z=new Map,I=[];for(h=m;h--;){const f=_(s,a,h),p=n(f);let y=r.get(p);y?i&&I.push(()=>y.p(f,e)):(y=u(p,f),y.c()),P.set(p,j[h]=y),p in O&&z.set(p,Math.abs(h-O[p]))}const W=new Set,G=new Set;function B(f){it(f,1),f.m(c,l),r.set(f.key,f),l=f.first,m--}for(;d&&m;){const f=j[m-1],p=t[d-1],y=f.key,A=p.key;f===p?(l=f.first,d--,m--):P.has(A)?!r.has(y)||W.has(y)?B(f):G.has(A)?d--:z.get(y)>z.get(A)?(G.add(y),B(f)):(W.add(A),d--):(o(p,r),d--)}for(;d--;){const f=t[d];P.has(f.key)||o(f,r)}for(;m;)B(j[m-1]);return v(I),j}function se(t,e){const n={},i={},s={$$scope:1};let a=t.length;for(;a--;){const r=t[a],c=e[a];if(c){for(const o in r)o in c||(i[o]=1);for(const o in c)s[o]||(n[o]=c[o],s[o]=1);t[a]=c}else for(const o in r)s[o]=1}for(const r in i)r in n||(n[r]=void 0);return n}function oe(t){return typeof t=="object"&&t!==null?t:{}}function ce(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function ue(t){t&&t.c()}function ae(t,e){t&&t.l(e)}function $t(t,e,n,i){const{fragment:s,after_update:a}=t.$$;s&&s.m(e,n),i||F(()=>{const r=t.$$.on_mount.map(Q).filter(L);t.$$.on_destroy?t.$$.on_destroy.push(...r):v(r),t.$$.on_mount=[]}),a.forEach(F)}function wt(t,e){const n=t.$$;n.fragment!==null&&(gt(n.after_update),v(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function bt(t,e){t.$$.dirty[0]===-1&&($.push(t),et(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function fe(t,e,n,i,s,a,r,c=[-1]){const o=S;E(t);const u=t.$$={fragment:null,ctx:[],props:a,update:k,not_equal:s,bound:J(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:J(),dirty:c,skip_bound:!1,root:e.target||o.$$.root};r&&r(u.root);let l=!1;if(u.ctx=n?n(t,e.props||{},(_,d,...m)=>{const h=m.length?m[0]:d;return u.ctx&&s(u.ctx[_],u.ctx[_]=h)&&(!u.skip_bound&&u.bound[_]&&u.bound[_](h),l&&bt(t,_)),d}):[],u.update(),l=!0,v(u.before_update),u.fragment=i?i(u.ctx):!1,e.target){if(e.hydrate){ot();const _=_t(e.target);u.fragment&&u.fragment.l(_),_.forEach(lt)}else u.fragment&&u.fragment.c();e.intro&&it(t.$$.fragment),$t(t,e.target,e.anchor,e.customElement),ct(),nt()}E(o)}class le{$destroy(){wt(this,1),this.$destroy=k}$on(e,n){if(!L(n))return k;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!st(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Pt as $,$t as A,wt as B,Nt as C,At as D,Mt as E,jt as F,ft as G,k as H,St as I,Yt as J,Xt as K,Vt as L,N as M,Ot as N,rt as O,Ct as P,Et as Q,zt as R,le as S,se as T,oe as U,Kt as V,ce as W,te as X,Bt as Y,Dt as Z,kt as _,Ft as a,re as a0,qt as a1,ie as a2,R as a3,v as a4,L as a5,Tt as b,Wt as c,xt as d,Lt as e,ne as f,it as g,lt as h,fe as i,Ut as j,dt as k,It as l,_t as m,Ht as n,Rt as o,Jt as p,H as q,pt as r,vt as s,Zt as t,Gt as u,ee as v,K as w,Qt as x,ue as y,ae as z};
