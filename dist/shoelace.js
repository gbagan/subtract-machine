(()=>{var le=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ne=Symbol(),Oe=new Map,We=class{constructor(t,e){if(this._$cssResult$=!0,e!==ne)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=Oe.get(this.cssText);return le&&t===void 0&&(Oe.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}},ae=t=>new We(typeof t=="string"?t:t+"",ne),_=(t,...e)=>{let o=t.length===1?t[0]:e.reduce((r,i,l)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[l+1],t[0]);return new We(o,ne)},er=(t,e)=>{le?t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet):e.forEach(o=>{let r=document.createElement("style"),i=window.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=o.cssText,t.appendChild(r)})},De=le?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(let r of e.cssRules)o+=r.cssText;return ae(o)})(t):t,te,Me=window.trustedTypes,or=Me?Me.emptyScript:"",Re=window.reactiveElementPolyfillSupport,se={toAttribute(t,e){switch(e){case Boolean:t=t?or:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},qe=(t,e)=>e!==t&&(e==e||t==t),ee={attribute:!0,type:String,converter:se,reflect:!1,hasChanged:qe},mt=class extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;(e=this.l)!==null&&e!==void 0||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();let t=[];return this.elementProperties.forEach((e,o)=>{let r=this._$Eh(o,e);r!==void 0&&(this._$Eu.set(r,o),t.push(r))}),t}static createProperty(t,e=ee){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){let o=typeof t=="symbol"?Symbol():"__"+t,r=this.getPropertyDescriptor(t,o,e);r!==void 0&&Object.defineProperty(this.prototype,t,r)}}static getPropertyDescriptor(t,e,o){return{get(){return this[e]},set(r){let i=this[t];this[e]=r,this.requestUpdate(t,i,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||ee}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;let t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){let e=this.properties,o=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(let r of o)this.createProperty(r,e[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let o=new Set(t.flat(1/0).reverse());for(let r of o)e.unshift(De(r))}else t!==void 0&&e.push(De(t));return e}static _$Eh(t,e){let o=e.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Em(),this.requestUpdate(),(t=this.constructor.l)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,o;((e=this._$Eg)!==null&&e!==void 0?e:this._$Eg=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((o=t.hostConnected)===null||o===void 0||o.call(t))}removeController(t){var e;(e=this._$Eg)===null||e===void 0||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;let e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return er(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$Eg)===null||t===void 0||t.forEach(e=>{var o;return(o=e.hostConnected)===null||o===void 0?void 0:o.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$Eg)===null||t===void 0||t.forEach(e=>{var o;return(o=e.hostDisconnected)===null||o===void 0?void 0:o.call(e)})}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ES(t,e,o=ee){var r,i;let l=this.constructor._$Eh(t,o);if(l!==void 0&&o.reflect===!0){let n=((i=(r=o.converter)===null||r===void 0?void 0:r.toAttribute)!==null&&i!==void 0?i:se.toAttribute)(e,o.type);this._$Ei=t,n==null?this.removeAttribute(l):this.setAttribute(l,n),this._$Ei=null}}_$AK(t,e){var o,r,i;let l=this.constructor,n=l._$Eu.get(t);if(n!==void 0&&this._$Ei!==n){let c=l.getPropertyOptions(n),u=c.converter,d=(i=(r=(o=u)===null||o===void 0?void 0:o.fromAttribute)!==null&&r!==void 0?r:typeof u=="function"?u:null)!==null&&i!==void 0?i:se.fromAttribute;this._$Ei=n,this[n]=d(e,c.type),this._$Ei=null}}requestUpdate(t,e,o){let r=!0;t!==void 0&&(((o=o||this.constructor.getPropertyOptions(t)).hasChanged||qe)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),o.reflect===!0&&this._$Ei!==t&&(this._$E_===void 0&&(this._$E_=new Map),this._$E_.set(t,o))):r=!1),!this.isUpdatePending&&r&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((r,i)=>this[i]=r),this._$Et=void 0);let e=!1,o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),(t=this._$Eg)===null||t===void 0||t.forEach(r=>{var i;return(i=r.hostUpdate)===null||i===void 0?void 0:i.call(r)}),this.update(o)):this._$EU()}catch(r){throw e=!1,this._$EU(),r}e&&this._$AE(o)}willUpdate(t){}_$AE(t){var e;(e=this._$Eg)===null||e===void 0||e.forEach(o=>{var r;return(r=o.hostUpdated)===null||r===void 0?void 0:r.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){this._$E_!==void 0&&(this._$E_.forEach((e,o)=>this._$ES(o,this[o],e)),this._$E_=void 0),this._$EU()}updated(t){}firstUpdated(t){}};mt.finalized=!0,mt.elementProperties=new Map,mt.elementStyles=[],mt.shadowRootOptions={mode:"open"},Re?.({ReactiveElement:mt}),((te=globalThis.reactiveElementVersions)!==null&&te!==void 0?te:globalThis.reactiveElementVersions=[]).push("1.2.3");var oe,bt=globalThis.trustedTypes,Be=bt?bt.createPolicy("lit-html",{createHTML:t=>t}):void 0,ot=`lit$${(Math.random()+"").slice(9)}$`,Ke="?"+ot,rr=`<${Ke}>`,gt=document,kt=(t="")=>gt.createComment(t),$t=t=>t===null||typeof t!="object"&&typeof t!="function",Xe=Array.isArray,ir=t=>{var e;return Xe(t)||typeof((e=t)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},xt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ie=/-->/g,Fe=/>/g,ct=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,Ve=/'/g,Ue=/"/g,Ye=/^(?:script|style|textarea|title)$/i,Ze=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),b=Ze(1),Je=Ze(2),I=Symbol.for("lit-noChange"),z=Symbol.for("lit-nothing"),Ne=new WeakMap,sr=(t,e,o)=>{var r,i;let l=(r=o?.renderBefore)!==null&&r!==void 0?r:e,n=l._$litPart$;if(n===void 0){let c=(i=o?.renderBefore)!==null&&i!==void 0?i:null;l._$litPart$=n=new Mt(e.insertBefore(kt(),c),c,void 0,o??{})}return n._$AI(t),n},ft=gt.createTreeWalker(gt,129,null,!1),lr=(t,e)=>{let o=t.length-1,r=[],i,l=e===2?"<svg>":"",n=xt;for(let u=0;u<o;u++){let d=t[u],p,h,m=-1,A=0;for(;A<d.length&&(n.lastIndex=A,h=n.exec(d),h!==null);)A=n.lastIndex,n===xt?h[1]==="!--"?n=Ie:h[1]!==void 0?n=Fe:h[2]!==void 0?(Ye.test(h[2])&&(i=RegExp("</"+h[2],"g")),n=ct):h[3]!==void 0&&(n=ct):n===ct?h[0]===">"?(n=i??xt,m=-1):h[1]===void 0?m=-2:(m=n.lastIndex-h[2].length,p=h[1],n=h[3]===void 0?ct:h[3]==='"'?Ue:Ve):n===Ue||n===Ve?n=ct:n===Ie||n===Fe?n=xt:(n=ct,i=void 0);let S=n===ct&&t[u+1].startsWith("/>")?" ":"";l+=n===xt?d+rr:m>=0?(r.push(p),d.slice(0,m)+"$lit$"+d.slice(m)+ot+S):d+ot+(m===-2?(r.push(void 0),u):S)}let c=l+(t[o]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[Be!==void 0?Be.createHTML(c):c,r]},Dt=class{constructor({strings:t,_$litType$:e},o){let r;this.parts=[];let i=0,l=0,n=t.length-1,c=this.parts,[u,d]=lr(t,e);if(this.el=Dt.createElement(u,o),ft.currentNode=this.el.content,e===2){let p=this.el.content,h=p.firstChild;h.remove(),p.append(...h.childNodes)}for(;(r=ft.nextNode())!==null&&c.length<n;){if(r.nodeType===1){if(r.hasAttributes()){let p=[];for(let h of r.getAttributeNames())if(h.endsWith("$lit$")||h.startsWith(ot)){let m=d[l++];if(p.push(h),m!==void 0){let A=r.getAttribute(m.toLowerCase()+"$lit$").split(ot),S=/([.?@])?(.*)/.exec(m);c.push({type:1,index:i,name:S[2],strings:A,ctor:S[1]==="."?ar:S[1]==="?"?ur:S[1]==="@"?dr:Rt})}else c.push({type:6,index:i})}for(let h of p)r.removeAttribute(h)}if(Ye.test(r.tagName)){let p=r.textContent.split(ot),h=p.length-1;if(h>0){r.textContent=bt?bt.emptyScript:"";for(let m=0;m<h;m++)r.append(p[m],kt()),ft.nextNode(),c.push({type:2,index:++i});r.append(p[h],kt())}}}else if(r.nodeType===8)if(r.data===Ke)c.push({type:2,index:i});else{let p=-1;for(;(p=r.data.indexOf(ot,p+1))!==-1;)c.push({type:7,index:i}),p+=ot.length-1}i++}}static createElement(t,e){let o=gt.createElement("template");return o.innerHTML=t,o}};function vt(t,e,o=t,r){var i,l,n,c;if(e===I)return e;let u=r!==void 0?(i=o._$Cl)===null||i===void 0?void 0:i[r]:o._$Cu,d=$t(e)?void 0:e._$litDirective$;return u?.constructor!==d&&((l=u?._$AO)===null||l===void 0||l.call(u,!1),d===void 0?u=void 0:(u=new d(t),u._$AT(t,o,r)),r!==void 0?((n=(c=o)._$Cl)!==null&&n!==void 0?n:c._$Cl=[])[r]=u:o._$Cu=u),u!==void 0&&(e=vt(t,u._$AS(t,e.values),u,r)),e}var nr=class{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;let{el:{content:o},parts:r}=this._$AD,i=((e=t?.creationScope)!==null&&e!==void 0?e:gt).importNode(o,!0);ft.currentNode=i;let l=ft.nextNode(),n=0,c=0,u=r[0];for(;u!==void 0;){if(n===u.index){let d;u.type===2?d=new Mt(l,l.nextSibling,this,t):u.type===1?d=new u.ctor(l,u.name,u.strings,this,t):u.type===6&&(d=new pr(l,this,t)),this.v.push(d),u=r[++c]}n!==u?.index&&(l=ft.nextNode(),n++)}return i}m(t){let e=0;for(let o of this.v)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}},Mt=class{constructor(t,e,o,r){var i;this.type=2,this._$AH=z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=r,this._$Cg=(i=r?.isConnected)===null||i===void 0||i}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=vt(this,t,e),$t(t)?t===z||t==null||t===""?(this._$AH!==z&&this._$AR(),this._$AH=z):t!==this._$AH&&t!==I&&this.$(t):t._$litType$!==void 0?this.T(t):t.nodeType!==void 0?this.S(t):ir(t)?this.A(t):this.$(t)}M(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==z&&$t(this._$AH)?this._$AA.nextSibling.data=t:this.S(gt.createTextNode(t)),this._$AH=t}T(t){var e;let{values:o,_$litType$:r}=t,i=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Dt.createElement(r.h,this.options)),r);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===i)this._$AH.m(o);else{let l=new nr(i,this),n=l.p(this.options);l.m(o),this.S(n),this._$AH=l}}_$AC(t){let e=Ne.get(t.strings);return e===void 0&&Ne.set(t.strings,e=new Dt(t)),e}A(t){Xe(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,o,r=0;for(let i of t)r===e.length?e.push(o=new Mt(this.M(kt()),this.M(kt()),this,this.options)):o=e[r],o._$AI(i),r++;r<e.length&&(this._$AR(o&&o._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var o;for((o=this._$AP)===null||o===void 0||o.call(this,!1,!0,e);t&&t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){var e;this._$AM===void 0&&(this._$Cg=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}},Rt=class{constructor(t,e,o,r,i){this.type=1,this._$AH=z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=i,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=z}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,o,r){let i=this.strings,l=!1;if(i===void 0)t=vt(this,t,e,0),l=!$t(t)||t!==this._$AH&&t!==I,l&&(this._$AH=t);else{let n=t,c,u;for(t=i[0],c=0;c<i.length-1;c++)u=vt(this,n[o+c],e,c),u===I&&(u=this._$AH[c]),l||(l=!$t(u)||u!==this._$AH[c]),u===z?t=z:t!==z&&(t+=(u??"")+i[c+1]),this._$AH[c]=u}l&&!r&&this.k(t)}k(t){t===z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ar=class extends Rt{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===z?void 0:t}},cr=bt?bt.emptyScript:"",ur=class extends Rt{constructor(){super(...arguments),this.type=4}k(t){t&&t!==z?this.element.setAttribute(this.name,cr):this.element.removeAttribute(this.name)}},dr=class extends Rt{constructor(t,e,o,r,i){super(t,e,o,r,i),this.type=5}_$AI(t,e=this){var o;if((t=(o=vt(this,t,e,0))!==null&&o!==void 0?o:z)===I)return;let r=this._$AH,i=t===z&&r!==z||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,l=t!==z&&(r===z||i);i&&this.element.removeEventListener(this.name,this,r),l&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,o;typeof this._$AH=="function"?this._$AH.call((o=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&o!==void 0?o:this.element,t):this._$AH.handleEvent(t)}},pr=class{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){vt(this,t)}},He=window.litHtmlPolyfillSupport;He?.(Dt,Mt),((oe=globalThis.litHtmlVersions)!==null&&oe!==void 0?oe:globalThis.litHtmlVersions=[]).push("2.1.3");var re,ie,y=class extends mt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;let o=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=o.firstChild),o}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=sr(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Dt)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Dt)===null||t===void 0||t.setConnected(!1)}render(){return I}};y.finalized=!0,y._$litElement$=!0,(re=globalThis.litElementHydrateSupport)===null||re===void 0||re.call(globalThis,{LitElement:y});var je=globalThis.litElementPolyfillSupport;je?.({LitElement:y});((ie=globalThis.litElementVersions)!==null&&ie!==void 0?ie:globalThis.litElementVersions=[]).push("3.1.2");var ce=(t,...e)=>({_$litStatic$:e.reduce((o,r,i)=>o+(l=>{if(l._$litStatic$!==void 0)return l._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${l}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(r)+t[i+1],t[0])}),Ge=new Map,Qe=t=>(e,...o)=>{var r;let i=o.length,l,n,c=[],u=[],d,p=0,h=!1;for(;p<i;){for(d=e[p];p<i&&(n=o[p],(l=(r=n)===null||r===void 0?void 0:r._$litStatic$)!==void 0);)d+=l+e[++p],h=!0;u.push(n),c.push(d),p++}if(p===i&&c.push(e[i]),h){let m=c.join("$$lit$$");(e=Ge.get(m))===void 0&&(c.raw=c,Ge.set(m,e=c)),o=u}return t(e,...o)},Bt=Qe(b),xi=Qe(Je);var Ct=(()=>{let t=document.createElement("style"),e;try{document.head.appendChild(t),t.sheet.insertRule(":focus-visible { color: inherit }"),e=!0}catch{e=!1}finally{t.remove()}return e})(),T=ae(Ct?":focus-visible":":focus");var $=_`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;var to=_`
  ${$}

  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition: var(--sl-transition-x-fast) background-color, var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border, var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label ::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default${T}:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
    box-shadow: var(--sl-focus-ring);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary${T}:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success${T}:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral${T}:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning${T}:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger${T}:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default${T}:not(.button--disabled) {
    border-color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary${T}:not(.button--disabled) {
    border-color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success${T}:not(.button--disabled) {
    border-color: var(--sl-color-success-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral${T}:not(.button--disabled) {
    border-color: var(--sl-color-neutral-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning${T}:not(.button--disabled) {
    border-color: var(--sl-color-warning-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger${T}:not(.button--disabled) {
    border-color: var(--sl-color-danger-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text${T}:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    font-size: var(--sl-button-font-size-small);
    height: var(--sl-input-height-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    font-size: var(--sl-button-font-size-medium);
    height: var(--sl-input-height-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    font-size: var(--sl-button-font-size-large);
    height: var(--sl-input-height-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    display: flex;
    align-items: center;
  }

  .button--caret .button__caret svg {
    width: 1em;
    height: 1em;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-50%) translateX(50%);
    pointer-events: none;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-left: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-left: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-right: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-right: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-right: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-right: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-right: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-right: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host(.sl-button-group__button--first:not(.sl-button-group__button--last)) .button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  :host(.sl-button-group__button--inner) .button {
    border-radius: 0;
  }

  :host(.sl-button-group__button--last:not(.sl-button-group__button--first)) .button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  /* All except the first */
  :host(.sl-button-group__button:not(.sl-button-group__button--first)) {
    margin-left: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(.sl-button-group__button:not(.sl-button-group__button--focus, .sl-button-group__button--first, [variant='default']):not(:hover, :active, :focus))
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host(.sl-button-group__button--hover) {
    z-index: 1;
  }

  :host(.sl-button-group__button--focus),
  :host(.sl-button-group__button[checked]) {
    z-index: 2;
  }
`;var oo=Object.defineProperty,hr=Object.defineProperties,mr=Object.getOwnPropertyDescriptor,fr=Object.getOwnPropertyDescriptors;var It=Object.getOwnPropertySymbols;var ro=Object.prototype.hasOwnProperty,io=Object.prototype.propertyIsEnumerable,eo=(t,e,o)=>e in t?oo(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,x=(t,e)=>{for(var o in e||(e={}))ro.call(e,o)&&eo(t,o,e[o]);if(It)for(var o of It(e))io.call(e,o)&&eo(t,o,e[o]);return t},V=(t,e)=>hr(t,fr(e));var Ft=(t,e)=>{var o={};for(var r in t)ro.call(t,r)&&e.indexOf(r)<0&&(o[r]=t[r]);if(t!=null&&It)for(var r of It(t))e.indexOf(r)<0&&io.call(t,r)&&(o[r]=t[r]);return o};var s=(t,e,o,r)=>{for(var i=r>1?void 0:r?mr(e,o):e,l=t.length-1,n;l>=0;l--)(n=t[l])&&(i=(r?n(e,o,i):n(i))||i);return r&&i&&oo(e,o,i),i};var br=class extends Event{constructor(t){super("formdata"),this.formData=t}},gr=class extends FormData{constructor(t){super(t),this.form=t,t.dispatchEvent(new br(this))}append(t,e){let o=this.form.elements[t];if(o||(o=document.createElement("input"),o.type="hidden",o.name=t,this.form.appendChild(o)),this.has(t)){let r=this.getAll(t),i=r.indexOf(o.value);i!==-1&&r.splice(i,1),r.push(e),this.set(t,r)}else super.append(t,e);o.value=e}};function vr(){let t=document.createElement("form"),e=!1;return document.body.append(t),t.addEventListener("submit",o=>{new FormData(o.target),o.preventDefault()}),t.addEventListener("formdata",()=>e=!0),t.dispatchEvent(new Event("submit",{cancelable:!0})),t.remove(),e}function so(){!window.FormData||vr()||(window.FormData=gr,window.addEventListener("submit",t=>{t.defaultPrevented||new FormData(t.target)}))}document.readyState==="complete"?so():window.addEventListener("DOMContentLoaded",()=>so());var K=class{constructor(t,e){(this.host=t).addController(this),this.options=x({form:o=>o.closest("form"),name:o=>o.name,value:o=>o.value,disabled:o=>o.disabled,reportValidity:o=>typeof o.reportValidity=="function"?o.reportValidity():!0},e),this.handleFormData=this.handleFormData.bind(this),this.handleFormSubmit=this.handleFormSubmit.bind(this)}hostConnected(){document.addEventListener("formdata",this.handleFormData,{capture:!0}),document.addEventListener("submit",this.handleFormSubmit,{capture:!0})}hostDisconnected(){document.removeEventListener("formdata",this.handleFormData,{capture:!0}),document.removeEventListener("submit",this.handleFormSubmit,{capture:!0})}handleFormData(t){let e=this.options.disabled(this.host),o=this.options.name(this.host),r=this.options.value(this.host);!e&&typeof o=="string"&&typeof r<"u"&&(Array.isArray(r)?r.forEach(i=>{t.formData.append(o,i.toString())}):t.formData.append(o,r.toString()))}handleFormSubmit(t){let e=this.options.form(this.host),o=this.options.disabled(this.host),r=this.options.reportValidity;t.target===e&&!o&&!e?.noValidate&&!r(this.host)&&(t.preventDefault(),t.stopImmediatePropagation())}submit(t){let e=this.options.form(this.host);if(e){let o=document.createElement("button");o.type="submit",o.style.position="absolute",o.style.width="0",o.style.height="0",o.style.clipPath="inset(50%)",o.style.overflow="hidden",o.style.whiteSpace="nowrap",t&&["formaction","formmethod","formnovalidate","formtarget"].forEach(r=>{t.hasAttribute(r)&&o.setAttribute(r,t.getAttribute(r))}),e.append(o),o.click(),o.remove()}}};var X=class{constructor(t,...e){this.slotNames=[],(this.host=t).addController(this),this.slotNames=e,this.handleSlotChange=this.handleSlotChange.bind(this)}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===t.ELEMENT_NODE){let e=t;if(e.tagName.toLowerCase()==="sl-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}handleSlotChange(t){let e=t.target;(this.slotNames.includes("[default]")&&!e.name||e.name&&this.slotNames.includes(e.name))&&this.host.requestUpdate()}};function Vt(t){if(!t)return"";let e=t.assignedNodes({flatten:!0}),o="";return[...e].forEach(r=>{r.nodeType===Node.TEXT_NODE&&(o+=r.textContent)}),o}var j={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},G=t=>(...e)=>({_$litDirective$:t,values:e}),rt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var P=G(class extends rt{constructor(t){var e;if(super(t),t.type!==j.ATTRIBUTE||t.name!=="class"||((e=t.strings)===null||e===void 0?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var o,r;if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.et=new Set(t.strings.join(" ").split(/\s/).filter(l=>l!=="")));for(let l in e)e[l]&&!(!((o=this.et)===null||o===void 0)&&o.has(l))&&this.st.add(l);return this.render(e)}let i=t.element.classList;this.st.forEach(l=>{l in e||(i.remove(l),this.st.delete(l))});for(let l in e){let n=!!e[l];n===this.st.has(l)||((r=this.et)===null||r===void 0?void 0:r.has(l))||(n?(i.add(l),this.st.add(l)):(i.remove(l),this.st.delete(l)))}return I}});var f=t=>t??z;function g(t,e,o){let r=new CustomEvent(e,x({bubbles:!0,cancelable:!1,composed:!0,detail:{}},o));return t.dispatchEvent(r),r}function ue(t,e){return new Promise(o=>{function r(i){i.target===t&&(t.removeEventListener(e,r),o())}t.addEventListener(e,r)})}var C=t=>e=>typeof e=="function"?((o,r)=>(window.customElements.define(o,r),r))(t,e):((o,r)=>{let{kind:i,elements:l}=r;return{kind:i,elements:l,finisher(n){window.customElements.define(o,n)}}})(t,e),yr=(t,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?V(x({},e),{finisher(o){o.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(o){o.createProperty(e.key,t)}};function a(t){return(e,o)=>o!==void 0?((r,i,l)=>{i.constructor.createProperty(l,r)})(t,e,o):yr(t,e)}function F(t){return a(V(x({},t),{state:!0}))}var _r=({finisher:t,descriptor:e})=>(o,r)=>{var i;if(r===void 0){let l=(i=o.originalKey)!==null&&i!==void 0?i:o.key,n=e!=null?{kind:"method",placement:"prototype",key:l,descriptor:e(o.key)}:V(x({},o),{key:l});return t!=null&&(n.finisher=function(c){t(c,l)}),n}{let l=o.constructor;e!==void 0&&Object.defineProperty(o,r,e(r)),t?.(l,r)}};function L(t,e){return _r({descriptor:o=>{let r={get(){var i,l;return(l=(i=this.renderRoot)===null||i===void 0?void 0:i.querySelector(t))!==null&&l!==void 0?l:null},enumerable:!0,configurable:!0};if(e){let i=typeof o=="symbol"?Symbol():"__"+o;r.get=function(){var l,n;return this[i]===void 0&&(this[i]=(n=(l=this.renderRoot)===null||l===void 0?void 0:l.querySelector(t))!==null&&n!==void 0?n:null),this[i]}}return r}})}var de,Ji=((de=window.HTMLSlotElement)===null||de===void 0?void 0:de.prototype.assignedElements)!=null?(t,e)=>t.assignedElements(e):(t,e)=>t.assignedNodes(e).filter(o=>o.nodeType===Node.ELEMENT_NODE);var O=class extends y{constructor(){super(...arguments),this.formSubmitController=new K(this,{form:t=>{if(t.hasAttribute("form")){let e=t.getRootNode(),o=t.getAttribute("form");return e.getElementById(o)}return t.closest("form")}}),this.hasSlotController=new X(this,"[default]","prefix","suffix"),this.hasFocus=!1,this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button"}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}handleBlur(){this.hasFocus=!1,g(this,"sl-blur")}handleFocus(){this.hasFocus=!0,g(this,"sl-focus")}handleClick(t){if(this.disabled||this.loading){t.preventDefault(),t.stopPropagation();return}this.type==="submit"&&this.formSubmitController.submit(this)}render(){let t=!!this.href,e=t?ce`a`:ce`button`;return Bt`
      <${e}
        part="base"
        class=${P({button:!0,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${f(t?void 0:this.disabled)}
        type=${this.type}
        name=${f(t?void 0:this.name)}
        value=${f(t?void 0:this.value)}
        href=${f(this.href)}
        target=${f(this.target)}
        download=${f(this.download)}
        rel=${f(this.target?"noreferrer noopener":void 0)}
        role="button"
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <span part="prefix" class="button__prefix">
          <slot name="prefix"></slot>
        </span>
        <span part="label" class="button__label">
          <slot></slot>
        </span>
        <span part="suffix" class="button__suffix">
          <slot name="suffix"></slot>
        </span>
        ${this.caret?Bt`
                <span part="caret" class="button__caret">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              `:""}
        ${this.loading?Bt`<sl-spinner></sl-spinner>`:""}
      </${e}>
    `}};O.styles=to;s([L(".button")],O.prototype,"button",2);s([F()],O.prototype,"hasFocus",2);s([a({reflect:!0})],O.prototype,"variant",2);s([a({reflect:!0})],O.prototype,"size",2);s([a({type:Boolean,reflect:!0})],O.prototype,"caret",2);s([a({type:Boolean,reflect:!0})],O.prototype,"disabled",2);s([a({type:Boolean,reflect:!0})],O.prototype,"loading",2);s([a({type:Boolean,reflect:!0})],O.prototype,"outline",2);s([a({type:Boolean,reflect:!0})],O.prototype,"pill",2);s([a({type:Boolean,reflect:!0})],O.prototype,"circle",2);s([a()],O.prototype,"type",2);s([a()],O.prototype,"name",2);s([a()],O.prototype,"value",2);s([a()],O.prototype,"href",2);s([a()],O.prototype,"target",2);s([a()],O.prototype,"download",2);s([a()],O.prototype,"form",2);s([a({attribute:"formaction"})],O.prototype,"formAction",2);s([a({attribute:"formmethod"})],O.prototype,"formMethod",2);s([a({attribute:"formnovalidate",type:Boolean})],O.prototype,"formNoValidate",2);s([a({attribute:"formtarget"})],O.prototype,"formTarget",2);O=s([C("sl-button")],O);var lo=_`
  ${$}

  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
    mix-blend-mode: multiply;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.01em, 2.75em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.01em, 2.75em;
    }
  }
`;var pe=class extends y{render(){return b`
      <svg part="base" class="spinner" role="status">
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};pe.styles=lo;pe=s([C("sl-spinner")],pe);var no=_`
  ${$}

  :host {
    --border-color: var(--sl-color-neutral-200);
    --border-radius: var(--sl-border-radius-medium);
    --border-width: 1px;
    --padding: var(--sl-spacing-large);

    display: inline-block;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-small);
    border: solid var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
  }

  .card__image {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image ::slotted(img) {
    display: block;
    width: 100%;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card__header {
    border-bottom: solid var(--border-width) var(--border-color);
    padding: calc(var(--padding) / 2) var(--padding);
  }

  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card__body {
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    border-top: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }
`;var Ut=class extends y{constructor(){super(...arguments),this.hasSlotController=new X(this,"footer","header","image")}render(){return b`
      <div
        part="base"
        class=${P({card:!0,"card--has-footer":this.hasSlotController.test("footer"),"card--has-image":this.hasSlotController.test("image"),"card--has-header":this.hasSlotController.test("header")})}
      >
        <div part="image" class="card__image">
          <slot name="image"></slot>
        </div>

        <div part="header" class="card__header">
          <slot name="header"></slot>
        </div>

        <div part="body" class="card__body">
          <slot></slot>
        </div>

        <div part="footer" class="card__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `}};Ut.styles=no;Ut=s([C("sl-card")],Ut);var wr=t=>t.strings===void 0,xr={},kr=(t,e=xr)=>t._$AH=e,ut=G(class extends rt{constructor(t){if(super(t),t.type!==j.PROPERTY&&t.type!==j.ATTRIBUTE&&t.type!==j.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!wr(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===I||e===z)return e;let o=t.element,r=t.name;if(t.type===j.PROPERTY){if(e===o[r])return I}else if(t.type===j.BOOLEAN_ATTRIBUTE){if(!!e===o.hasAttribute(r))return I}else if(t.type===j.ATTRIBUTE&&o.getAttribute(r)===e+"")return I;return kr(t),e}});var ao=_`
  ${$}

  :host {
    display: inline-block;
  }

  .checkbox {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--sl-toggle-size);
    height: var(--sl-toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 2px;
    background-color: var(--sl-input-background-color);
    color: var(--sl-color-neutral-0);
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color, var(--sl-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__control .checkbox__icon {
    display: inline-flex;
    width: var(--sl-toggle-size);
    height: var(--sl-toggle-size);
  }

  .checkbox__control .checkbox__icon svg {
    width: 100%;
    height: 100%;
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled)
    .checkbox__input${T}
    ~ .checkbox__control {
    border-color: var(--sl-input-border-color-focus);
    background-color: var(--sl-input-background-color-focus);
    box-shadow: var(--sl-focus-ring);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input${T} ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled)
    .checkbox__input${T}
    ~ .checkbox__control {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    line-height: var(--sl-toggle-size);
    margin-left: 0.5em;
    user-select: none;
  }
`;function E(t,e){let o=x({waitUntilFirstUpdate:!1},e);return(r,i)=>{let{update:l}=r;if(t in r){let n=t;r.update=function(c){if(c.has(n)){let u=c.get(n),d=this[n];u!==d&&(!o.waitUntilFirstUpdate||this.hasUpdated)&&this[i](u,d)}l.call(this,c)}}}}var N=class extends y{constructor(){super(...arguments),this.formSubmitController=new K(this,{value:t=>t.checked?t.value:void 0}),this.hasFocus=!1,this.disabled=!1,this.required=!1,this.checked=!1,this.indeterminate=!1,this.invalid=!1}firstUpdated(){this.invalid=!this.input.checkValidity()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.invalid=!this.input.checkValidity()}handleClick(){this.checked=!this.checked,this.indeterminate=!1,g(this,"sl-change")}handleBlur(){this.hasFocus=!1,g(this,"sl-blur")}handleDisabledChange(){this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}handleFocus(){this.hasFocus=!0,g(this,"sl-focus")}handleStateChange(){this.invalid=!this.input.checkValidity()}render(){return b`
      <label
        part="base"
        class=${P({checkbox:!0,"checkbox--checked":this.checked,"checkbox--disabled":this.disabled,"checkbox--focused":this.hasFocus,"checkbox--indeterminate":this.indeterminate})}
      >
        <input
          class="checkbox__input"
          type="checkbox"
          name=${f(this.name)}
          value=${f(this.value)}
          .indeterminate=${ut(this.indeterminate)}
          .checked=${ut(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          aria-checked=${this.checked?"true":"false"}
          @click=${this.handleClick}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        />

        <span part="control" class="checkbox__control">
          ${this.checked?b`
                <span part="checked-icon" class="checkbox__icon">
                  <svg viewBox="0 0 16 16">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                      <g stroke="currentColor" stroke-width="2">
                        <g transform="translate(3.428571, 3.428571)">
                          <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
                          <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              `:""}
          ${!this.checked&&this.indeterminate?b`
                <span part="indeterminate-icon" class="checkbox__icon">
                  <svg viewBox="0 0 16 16">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                      <g stroke="currentColor" stroke-width="2">
                        <g transform="translate(2.285714, 6.857143)">
                          <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              `:""}
        </span>

        <span part="label" class="checkbox__label">
          <slot></slot>
        </span>
      </label>
    `}};N.styles=ao;s([L('input[type="checkbox"]')],N.prototype,"input",2);s([F()],N.prototype,"hasFocus",2);s([a()],N.prototype,"name",2);s([a()],N.prototype,"value",2);s([a({type:Boolean,reflect:!0})],N.prototype,"disabled",2);s([a({type:Boolean,reflect:!0})],N.prototype,"required",2);s([a({type:Boolean,reflect:!0})],N.prototype,"checked",2);s([a({type:Boolean,reflect:!0})],N.prototype,"indeterminate",2);s([a({type:Boolean,reflect:!0})],N.prototype,"invalid",2);s([E("disabled",{waitUntilFirstUpdate:!0})],N.prototype,"handleDisabledChange",1);s([E("checked",{waitUntilFirstUpdate:!0}),E("indeterminate",{waitUntilFirstUpdate:!0})],N.prototype,"handleStateChange",1);N=s([C("sl-checkbox")],N);var yt=_`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control_label {
    font-size: var(--sl-input-label-font-size-large);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
  }

  .form-control--has-help-text .form-control__help-text ::slotted(*) {
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }
`;var co=_`
  ${$}
  ${yt}

  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: var(--sl-focus-ring);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    box-shadow: var(--sl-focus-ring);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    padding-left: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    padding-right: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    padding-left: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    padding-right: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    padding-left: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    padding-right: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  .input--empty .input__clear {
    visibility: hidden;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }
`;var he=new Set,$r=new MutationObserver(uo),me=new Map,At=document.documentElement.lang||navigator.language,St;$r.observe(document.documentElement,{attributes:!0,attributeFilter:["lang"]});function Cr(...t){t.map(e=>{let o=e.$code.toLowerCase();me.set(o,e),St||(St=e)}),uo()}function Ar(t,e,...o){let r=t.toLowerCase().slice(0,2),i=t.length>2?t.toLowerCase():"",l=me.get(i),n=me.get(r),c;if(l&&l[e])c=l[e];else if(n&&n[e])c=n[e];else if(St&&St[e])c=St[e];else return console.error(`No translation found for: ${e}`),e;return typeof c=="function"?c(...o):c}function Sr(t,e,o){return e=new Date(e),new Intl.DateTimeFormat(t,o).format(e)}function Er(t,e,o){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(t,o).format(e)}function Tr(t,e,o,r){return new Intl.RelativeTimeFormat(t,r).format(e,o)}function uo(){At=document.documentElement.lang||navigator.language,[...he.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}var it=class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){he.add(this.host)}hostDisconnected(){he.delete(this.host)}term(t,...e){return Ar(this.host.lang||At,t,...e)}date(t,e){return Sr(this.host.lang||At,t,e)}number(t,e){return Er(this.host.lang||At,t,e)}relativeTime(t,e,o){return Tr(this.host.lang||At,t,e,o)}},zr={$code:"en",$name:"English",$dir:"ltr",clearEntry:"Clear entry",close:"Close",copy:"Copy",currentValue:"Current value",hidePassword:"Hide password",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",toggleColorFormat:"Toggle color format"};Cr(zr);var v=class extends y{constructor(){super(...arguments),this.formSubmitController=new K(this),this.hasSlotController=new X(this,"help-text","label"),this.localize=new it(this),this.hasFocus=!1,this.isPasswordVisible=!1,this.type="text",this.size="medium",this.value="",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.togglePassword=!1,this.disabled=!1,this.readonly=!1,this.required=!1,this.invalid=!1}get valueAsDate(){var t,e;return(e=(t=this.input)==null?void 0:t.valueAsDate)!=null?e:null}set valueAsDate(t){this.updateComplete.then(()=>{this.input.valueAsDate=t,this.value=this.input.value})}get valueAsNumber(){var t,e;return(e=(t=this.input)==null?void 0:t.valueAsNumber)!=null?e:parseFloat(this.value)}set valueAsNumber(t){this.updateComplete.then(()=>{this.input.valueAsNumber=t,this.value=this.input.value})}firstUpdated(){this.invalid=!this.input.checkValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,o="none"){this.input.setSelectionRange(t,e,o)}setRangeText(t,e,o,r="preserve"){this.input.setRangeText(t,e,o,r),this.value!==this.input.value&&(this.value=this.input.value,g(this,"sl-input"),g(this,"sl-change"))}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.invalid=!this.input.checkValidity()}handleBlur(){this.hasFocus=!1,g(this,"sl-blur")}handleChange(){this.value=this.input.value,g(this,"sl-change")}handleClearClick(t){this.value="",g(this,"sl-clear"),g(this,"sl-input"),g(this,"sl-change"),this.input.focus(),t.stopPropagation()}handleDisabledChange(){this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}handleFocus(){this.hasFocus=!0,g(this,"sl-focus")}handleInput(){this.value=this.input.value,g(this,"sl-input")}handleInvalid(){this.invalid=!0}handleKeyDown(t){let e=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!e&&this.formSubmitController.submit()}handlePasswordToggle(){this.isPasswordVisible=!this.isPasswordVisible}handleValueChange(){this.invalid=!this.input.checkValidity()}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),o=this.label?!0:!!t,r=this.helpText?!0:!!e;return b`
      <div
        part="form-control"
        class=${P({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":o,"form-control--has-help-text":r})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${o?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${P({input:!0,"input--small":this.size==="small","input--medium":this.size==="medium","input--large":this.size==="large","input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":this.value.length===0,"input--invalid":this.invalid})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type==="password"&&this.isPasswordVisible?"text":this.type}
              name=${f(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${f(this.placeholder)}
              minlength=${f(this.minlength)}
              maxlength=${f(this.maxlength)}
              min=${f(this.min)}
              max=${f(this.max)}
              step=${f(this.step)}
              .value=${ut(this.value)}
              autocapitalize=${f(this.autocapitalize)}
              autocomplete=${f(this.autocomplete)}
              autocorrect=${f(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${f(this.spellcheck)}
              pattern=${f(this.pattern)}
              enterkeyhint=${f(this.enterkeyhint)}
              inputmode=${f(this.inputmode)}
              aria-describedby="help-text"
              aria-invalid=${this.invalid?"true":"false"}
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${this.clearable&&this.value.length>0?b`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                `:""}
            ${this.togglePassword?b`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.isPasswordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.isPasswordVisible?b`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:b`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                `:""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};v.styles=co;s([L(".input__control")],v.prototype,"input",2);s([F()],v.prototype,"hasFocus",2);s([F()],v.prototype,"isPasswordVisible",2);s([a({reflect:!0})],v.prototype,"type",2);s([a({reflect:!0})],v.prototype,"size",2);s([a()],v.prototype,"name",2);s([a()],v.prototype,"value",2);s([a({type:Boolean,reflect:!0})],v.prototype,"filled",2);s([a({type:Boolean,reflect:!0})],v.prototype,"pill",2);s([a()],v.prototype,"label",2);s([a({attribute:"help-text"})],v.prototype,"helpText",2);s([a({type:Boolean})],v.prototype,"clearable",2);s([a({attribute:"toggle-password",type:Boolean})],v.prototype,"togglePassword",2);s([a()],v.prototype,"placeholder",2);s([a({type:Boolean,reflect:!0})],v.prototype,"disabled",2);s([a({type:Boolean,reflect:!0})],v.prototype,"readonly",2);s([a({type:Number})],v.prototype,"minlength",2);s([a({type:Number})],v.prototype,"maxlength",2);s([a()],v.prototype,"min",2);s([a()],v.prototype,"max",2);s([a({type:Number})],v.prototype,"step",2);s([a()],v.prototype,"pattern",2);s([a({type:Boolean,reflect:!0})],v.prototype,"required",2);s([a({type:Boolean,reflect:!0})],v.prototype,"invalid",2);s([a()],v.prototype,"autocapitalize",2);s([a()],v.prototype,"autocorrect",2);s([a()],v.prototype,"autocomplete",2);s([a({type:Boolean})],v.prototype,"autofocus",2);s([a()],v.prototype,"enterkeyhint",2);s([a({type:Boolean})],v.prototype,"spellcheck",2);s([a()],v.prototype,"inputmode",2);s([E("disabled",{waitUntilFirstUpdate:!0})],v.prototype,"handleDisabledChange",1);s([E("value",{waitUntilFirstUpdate:!0})],v.prototype,"handleValueChange",1);v=s([C("sl-input")],v);var ho="";function Et(t){ho=t}function fe(){return ho.replace(/\/$/,"")}var mo=[...document.getElementsByTagName("script")],po=mo.find(t=>t.hasAttribute("data-shoelace"));if(po)Et(po.getAttribute("data-shoelace"));else{let t=mo.find(o=>/shoelace(\.min)?\.js($|\?)/.test(o.src)),e="";t&&(e=t.getAttribute("src")),Et(e.split("/").slice(0,-1).join("/"))}var Pr={name:"default",resolver:t=>`${fe()}/assets/icons/${t}.svg`},fo=Pr;var bo={"check-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,x:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},Lr={name:"system",resolver:t=>t in bo?`data:image/svg+xml,${encodeURIComponent(bo[t])}`:""},go=Lr;var Or=[fo,go],be=[];function vo(t){be.push(t)}function yo(t){be=be.filter(e=>e!==t)}function ge(t){return Or.find(e=>e.name===t)}var ve=new Map;function _o(t,e="cors"){if(ve.has(t))return ve.get(t);let o=fetch(t,{mode:e}).then(async r=>({ok:r.ok,status:r.status,html:await r.text()}));return ve.set(t,o),o}var ye=new Map;async function wo(t){if(ye.has(t))return ye.get(t);let e=await _o(t),o={ok:e.ok,status:e.status,svg:null};if(e.ok){let r=document.createElement("div");r.innerHTML=e.html;let i=r.firstElementChild;o.svg=i?.tagName.toLowerCase()==="svg"?i.outerHTML:""}return ye.set(t,o),o}var xo=_`
  ${$}

  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    contain: strict;
    box-sizing: content-box !important;
  }

  .icon,
  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;var Nt=class extends rt{constructor(t){if(super(t),this.it=z,t.type!==j.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===z||t==null)return this.vt=void 0,this.it=t;if(t===I)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this.vt;this.it=t;let e=[t];return e.raw=e,this.vt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};Nt.directiveName="unsafeHTML",Nt.resultType=1;var On=G(Nt),_e=class extends Nt{};_e.directiveName="unsafeSVG",_e.resultType=2;var Dr=G(_e),Mr=new DOMParser,Q=class extends y{constructor(){super(...arguments),this.svg="",this.label="",this.library="default"}connectedCallback(){super.connectedCallback(),vo(this)}firstUpdated(){this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),yo(this)}getUrl(){let t=ge(this.library);return this.name&&t?t.resolver(this.name):this.src}redraw(){this.setIcon()}async setIcon(){var t;let e=ge(this.library),o=this.getUrl();if(o)try{let r=await wo(o);if(o!==this.getUrl())return;if(r.ok){let l=Mr.parseFromString(r.svg,"text/html").body.querySelector("svg");l!==null?((t=e?.mutator)==null||t.call(e,l),this.svg=l.outerHTML,g(this,"sl-load")):(this.svg="",g(this,"sl-error"))}else this.svg="",g(this,"sl-error")}catch{g(this,"sl-error")}else this.svg.length>0&&(this.svg="")}handleChange(){this.setIcon()}render(){let t=typeof this.label=="string"&&this.label.length>0;return b` <div
      part="base"
      class="icon"
      role=${f(t?"img":void 0)}
      aria-label=${f(t?this.label:void 0)}
      aria-hidden=${f(t?void 0:"true")}
    >
      ${Dr(this.svg)}
    </div>`}};Q.styles=xo;s([F()],Q.prototype,"svg",2);s([a()],Q.prototype,"name",2);s([a()],Q.prototype,"src",2);s([a()],Q.prototype,"label",2);s([a()],Q.prototype,"library",2);s([E("name"),E("src"),E("library")],Q.prototype,"setIcon",1);Q=s([C("sl-icon")],Q);var ko=_`
  ${$}

  :host {
    display: block;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    text-align: left;
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    color: var(--sl-color-neutral-400);
    cursor: not-allowed;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix ::slotted(*) {
    margin-right: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix ::slotted(*) {
    margin-left: var(--sl-spacing-x-small);
  }

  :host(:focus) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'])) .menu-item,
  :host(${T}:not(.sl-focus-invisible):not([aria-disabled='true'])) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }
`;var Y=class extends y{constructor(){super(...arguments),this.checked=!1,this.value="",this.disabled=!1}firstUpdated(){this.setAttribute("role","menuitem")}handleCheckedChange(){this.setAttribute("aria-checked",this.checked?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}render(){return b`
      <div
        part="base"
        class=${P({"menu-item":!0,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--has-submenu":!1})}
      >
        <span class="menu-item__check">
          <sl-icon name="check-lg" library="default" aria-hidden="true"></sl-icon>
        </span>

        <span part="prefix" class="menu-item__prefix">
          <slot name="prefix"></slot>
        </span>

        <span part="label" class="menu-item__label">
          <slot></slot>
        </span>

        <span part="suffix" class="menu-item__suffix">
          <slot name="suffix"></slot>
        </span>

        <span class="menu-item__chevron">
          <sl-icon name="chevron-right" library="default" aria-hidden="true"></sl-icon>
        </span>
      </div>
    `}};Y.styles=ko;s([L(".menu-item")],Y.prototype,"menuItem",2);s([a({type:Boolean,reflect:!0})],Y.prototype,"checked",2);s([a()],Y.prototype,"value",2);s([a({type:Boolean,reflect:!0})],Y.prototype,"disabled",2);s([E("checked")],Y.prototype,"handleCheckedChange",1);s([E("disabled")],Y.prototype,"handleDisabledChange",1);Y=s([C("sl-menu-item")],Y);var $o=_`
  ${$}

  :host {
    --height: 1rem;
    --track-color: var(--sl-color-neutral-200);
    --indicator-color: var(--sl-color-primary-600);
    --label-color: var(--sl-color-neutral-0);

    display: block;
  }

  .progress-bar {
    position: relative;
    background-color: var(--track-color);
    height: var(--height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset var(--sl-shadow-small);
    overflow: hidden;
  }

  .progress-bar__indicator {
    height: 100%;
    font-family: var(--sl-font-sans);
    font-size: 12px;
    font-weight: var(--sl-font-weight-normal);
    background-color: var(--indicator-color);
    color: var(--label-color);
    text-align: center;
    line-height: var(--height);
    white-space: nowrap;
    overflow: hidden;
    transition: 400ms width, 400ms background-color;
    user-select: none;
  }

  /* Indeterminate */
  .progress-bar--indeterminate .progress-bar__indicator {
    position: absolute;
    animation: indeterminate 2.5s infinite cubic-bezier(0.37, 0, 0.63, 1);
  }

  @keyframes indeterminate {
    0% {
      left: -50%;
      width: 50%;
    }
    75%,
    100% {
      left: 100%;
      width: 50%;
    }
  }
`;var Co=G(class extends rt{constructor(t){var e;if(super(t),t.type!==j.ATTRIBUTE||t.name!=="style"||((e=t.strings)===null||e===void 0?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,o)=>{let r=t[o];return r==null?e:e+`${o=o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(t,[e]){let{style:o}=t.element;if(this.ct===void 0){this.ct=new Set;for(let r in e)this.ct.add(r);return this.render(e)}this.ct.forEach(r=>{e[r]==null&&(this.ct.delete(r),r.includes("-")?o.removeProperty(r):o[r]="")});for(let r in e){let i=e[r];i!=null&&(this.ct.add(r),r.includes("-")?o.setProperty(r,i):o[r]=i)}return I}});var st=class extends y{constructor(){super(...arguments),this.localize=new it(this),this.value=0,this.indeterminate=!1,this.label=""}render(){return b`
      <div
        part="base"
        class=${P({"progress-bar":!0,"progress-bar--indeterminate":this.indeterminate})}
        role="progressbar"
        title=${f(this.title)}
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate?0:this.value}
      >
        <div part="indicator" class="progress-bar__indicator" style=${Co({width:`${this.value}%`})}>
          ${this.indeterminate?"":b`
                <span part="label" class="progress-bar__label">
                  <slot></slot>
                </span>
              `}
        </div>
      </div>
    `}};st.styles=$o;s([a({type:Number,reflect:!0})],st.prototype,"value",2);s([a({type:Boolean,reflect:!0})],st.prototype,"indeterminate",2);s([a()],st.prototype,"label",2);s([a()],st.prototype,"lang",2);st=s([C("sl-progress-bar")],st);var Ao=_`
  ${$}
  ${yt}

  :host {
    --thumb-size: 20px;
    --tooltip-offset: 10px;
    --track-color-active: var(--sl-color-neutral-200);
    --track-color-inactive: var(--sl-color-neutral-200);
    --track-height: 6px;

    display: block;
  }

  .range {
    position: relative;
  }

  .range__control {
    -webkit-appearance: none;
    border-radius: 3px;
    width: 100%;
    height: var(--track-height);
    background: transparent;
    line-height: var(--sl-input-height-medium);
    vertical-align: middle;
  }

  /* Webkit */
  .range__control::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--track-height);
    border-radius: 3px;
    border: none;
  }

  .range__control::-webkit-slider-thumb {
    border: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border: solid var(--sl-input-border-width) var(--sl-color-primary-600);
    -webkit-appearance: none;
    margin-top: calc(var(--thumb-size) / -2 + var(--track-height) / 2);
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color, var(--sl-transition-fast) box-shadow, var(--sl-transition-fast) transform;
    cursor: pointer;
  }

  .range__control:enabled::-webkit-slider-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled${T}::-webkit-slider-thumb {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  .range__control:enabled::-webkit-slider-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* Firefox */
  .range__control::-moz-focus-outer {
    border: 0;
  }

  .range__control::-moz-range-progress {
    background-color: var(--track-color-active);
    border-radius: 3px;
    height: var(--track-height);
  }

  .range__control::-moz-range-track {
    width: 100%;
    height: var(--track-height);
    background-color: var(--track-color-inactive);
    border-radius: 3px;
    border: none;
  }

  .range__control::-moz-range-thumb {
    border: none;
    height: var(--thumb-size);
    width: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color, var(--sl-transition-fast) box-shadow, var(--sl-transition-fast) transform;
    cursor: pointer;
  }

  .range__control:enabled::-moz-range-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled${T}::-moz-range-thumb {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  .range__control:enabled::-moz-range-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* States */
  .range__control${T} {
    outline: none;
  }

  .range__control:disabled {
    opacity: 0.5;
  }

  .range__control:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }

  .range__control:disabled::-moz-range-thumb {
    cursor: not-allowed;
  }

  /* Tooltip output */
  .range__tooltip {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    left: 1px;
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    opacity: 0;
    padding: var(--sl-tooltip-padding);
    transition: var(--sl-transition-fast) opacity;
    pointer-events: none;
  }

  .range__tooltip:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    margin-left: calc(-1 * var(--sl-tooltip-arrow-size));
  }

  .range--tooltip-visible .range__tooltip {
    opacity: 1;
  }

  /* Tooltip on top */
  .range--tooltip-top .range__tooltip {
    top: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-top .range__tooltip:after {
    border-top: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    top: 100%;
  }

  /* Tooltip on bottom */
  .range--tooltip-bottom .range__tooltip {
    bottom: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-bottom .range__tooltip:after {
    border-bottom: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    bottom: 100%;
  }
`;var R=class extends y{constructor(){super(...arguments),this.formSubmitController=new K(this),this.hasSlotController=new X(this,"help-text","label"),this.hasFocus=!1,this.hasTooltip=!1,this.name="",this.value=0,this.label="",this.helpText="",this.disabled=!1,this.invalid=!1,this.min=0,this.max=100,this.step=1,this.tooltip="top",this.tooltipFormatter=t=>t.toString()}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value||(this.value=this.min),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input)})}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.unobserve(this.input)}focus(t){this.input.focus(t)}blur(){this.input.blur()}setCustomValidity(t){this.input.setCustomValidity(t),this.invalid=!this.input.checkValidity()}handleInput(){this.value=parseFloat(this.input.value),g(this,"sl-change"),this.syncRange()}handleBlur(){this.hasFocus=!1,this.hasTooltip=!1,g(this,"sl-blur")}handleValueChange(){this.invalid=!this.input.checkValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange()}handleDisabledChange(){this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}handleFocus(){this.hasFocus=!0,this.hasTooltip=!0,g(this,"sl-focus")}handleThumbDragStart(){this.hasTooltip=!0}handleThumbDragEnd(){this.hasTooltip=!1}syncRange(){let t=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(t),this.tooltip!=="none"&&this.syncTooltip(t)}syncProgress(t){this.input.style.background=`linear-gradient(to right, var(--track-color-active) 0%, var(--track-color-active) ${t*100}%, var(--track-color-inactive) ${t*100}%, var(--track-color-inactive) 100%)`}syncTooltip(t){if(this.output!==null){let e=this.input.offsetWidth,o=this.output.offsetWidth,r=getComputedStyle(this.input).getPropertyValue("--thumb-size"),i=`calc(${e*t}px - calc(calc(${t} * ${r}) - calc(${r} / 2)))`;this.output.style.transform=`translateX(${i})`,this.output.style.marginLeft=`-${o/2}px`}}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),o=this.label?!0:!!t,r=this.helpText?!0:!!e;return b`
      <div
        part="form-control"
        class=${P({"form-control":!0,"form-control--medium":!0,"form-control--has-label":o,"form-control--has-help-text":r})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${o?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${P({range:!0,"range--disabled":this.disabled,"range--focused":this.hasFocus,"range--tooltip-visible":this.hasTooltip,"range--tooltip-top":this.tooltip==="top","range--tooltip-bottom":this.tooltip==="bottom"})}
            @mousedown=${this.handleThumbDragStart}
            @mouseup=${this.handleThumbDragEnd}
            @touchstart=${this.handleThumbDragStart}
            @touchend=${this.handleThumbDragEnd}
          >
            <input
              part="input"
              id="input"
              type="range"
              class="range__control"
              name=${f(this.name)}
              ?disabled=${this.disabled}
              min=${f(this.min)}
              max=${f(this.max)}
              step=${f(this.step)}
              .value=${ut(this.value.toString())}
              aria-describedby="help-text"
              @input=${this.handleInput}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />
            ${this.tooltip!=="none"&&!this.disabled?b`
                  <output part="tooltip" class="range__tooltip">
                    ${typeof this.tooltipFormatter=="function"?this.tooltipFormatter(this.value):this.value}
                  </output>
                `:""}
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};R.styles=Ao;s([L(".range__control")],R.prototype,"input",2);s([L(".range__tooltip")],R.prototype,"output",2);s([F()],R.prototype,"hasFocus",2);s([F()],R.prototype,"hasTooltip",2);s([a()],R.prototype,"name",2);s([a({type:Number})],R.prototype,"value",2);s([a()],R.prototype,"label",2);s([a({attribute:"help-text"})],R.prototype,"helpText",2);s([a({type:Boolean,reflect:!0})],R.prototype,"disabled",2);s([a({type:Boolean,reflect:!0})],R.prototype,"invalid",2);s([a({type:Number})],R.prototype,"min",2);s([a({type:Number})],R.prototype,"max",2);s([a({type:Number})],R.prototype,"step",2);s([a()],R.prototype,"tooltip",2);s([a({attribute:!1})],R.prototype,"tooltipFormatter",2);s([E("value",{waitUntilFirstUpdate:!0})],R.prototype,"handleValueChange",1);s([E("disabled",{waitUntilFirstUpdate:!0})],R.prototype,"handleDisabledChange",1);R=s([C("sl-range")],R);var So=_`
  ${$}
  ${yt}

  :host {
    display: block;
  }

  .select {
    display: block;
  }

  .select__control {
    display: inline-flex;
    align-items: center;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow;
    cursor: pointer;
  }

  .select__menu {
    max-height: 50vh;
    overflow: auto;
  }

  /* Standard selects */
  .select--standard .select__control {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    color: var(--sl-input-color);
  }

  .select--standard:not(.select--disabled) .select__control:hover {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
    color: var(--sl-input-color-hover);
  }

  .select--standard.select--focused:not(.select--disabled) .select__control {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: var(--sl-focus-ring);
    outline: none;
    color: var(--sl-input-color-focus);
  }

  .select--standard.select--disabled .select__control {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    color: var(--sl-input-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  /* Filled selects */
  .select--filled .select__control {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .select--filled:hover:not(.select--disabled) .select__control {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .select--filled.select--focused:not(.select--disabled) .select__control {
    outline: none;
    background-color: var(--sl-input-filled-background-color-focus);
    box-shadow: var(--sl-focus-ring);
  }

  .select--filled.select--disabled .select__control {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .select--disabled .select__tags,
  .select--disabled .select__clear {
    pointer-events: none;
  }

  .select__prefix {
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  .select__label {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    user-select: none;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .select__label::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .select__clear {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    width: 1.25em;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .select__clear:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .select__suffix {
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  .select__icon {
    flex: 0 0 auto;
    display: inline-flex;
    transition: var(--sl-transition-medium) transform ease;
  }

  .select--open .select__icon {
    transform: rotate(-180deg);
  }

  /* Placeholder */
  .select--placeholder-visible .select__label {
    color: var(--sl-input-placeholder-color);
  }

  .select--disabled.select--placeholder-visible .select__label {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Tags */
  .select__tags {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: left;
    margin-left: var(--sl-spacing-2x-small);
  }

  /* Hidden input (for form control validation to show) */
  .select__hidden-select {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    overflow: hidden;
    white-space: nowrap;
  }

  /*
   * Size modifiers
   */

  /* Small */
  .select--small .select__control {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    min-height: var(--sl-input-height-small);
  }

  .select--small .select__prefix ::slotted(*) {
    margin-left: var(--sl-input-spacing-small);
  }

  .select--small .select__label {
    margin: 0 var(--sl-input-spacing-small);
  }

  .select--small .select__clear {
    margin-right: var(--sl-input-spacing-small);
  }

  .select--small .select__suffix ::slotted(*) {
    margin-right: var(--sl-input-spacing-small);
  }

  .select--small .select__icon {
    margin-right: var(--sl-input-spacing-small);
  }

  .select--small .select__tags {
    padding-bottom: 2px;
  }

  .select--small .select__tags sl-tag {
    padding-top: 2px;
  }

  .select--small .select__tags sl-tag:not(:last-of-type) {
    margin-right: var(--sl-spacing-2x-small);
  }

  .select--small.select--has-tags .select__label {
    margin-left: 0;
  }

  /* Medium */
  .select--medium .select__control {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    min-height: var(--sl-input-height-medium);
  }

  .select--medium .select__prefix ::slotted(*) {
    margin-left: var(--sl-input-spacing-medium);
  }

  .select--medium .select__label {
    margin: 0 var(--sl-input-spacing-medium);
  }

  .select--medium .select__clear {
    margin-right: var(--sl-input-spacing-medium);
  }

  .select--medium .select__suffix ::slotted(*) {
    margin-right: var(--sl-input-spacing-medium);
  }

  .select--medium .select__icon {
    margin-right: var(--sl-input-spacing-medium);
  }

  .select--medium .select__tags {
    padding-bottom: 3px;
  }

  .select--medium .select__tags sl-tag {
    padding-top: 3px;
  }

  .select--medium .select__tags sl-tag:not(:last-of-type) {
    margin-right: var(--sl-spacing-2x-small);
  }

  .select--medium.select--has-tags .select__label {
    margin-left: 0;
  }

  /* Large */
  .select--large .select__control {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    min-height: var(--sl-input-height-large);
  }

  .select--large .select__prefix ::slotted(*) {
    margin-left: var(--sl-input-spacing-large);
  }

  .select--large .select__label {
    margin: 0 var(--sl-input-spacing-large);
  }

  .select--large .select__clear {
    margin-right: var(--sl-input-spacing-large);
  }

  .select--large .select__suffix ::slotted(*) {
    margin-right: var(--sl-input-spacing-large);
  }

  .select--large .select__icon {
    margin-right: var(--sl-input-spacing-large);
  }

  .select--large .select__tags {
    padding-bottom: 4px;
  }
  .select--large .select__tags sl-tag {
    padding-top: 4px;
  }

  .select--large .select__tags sl-tag:not(:last-of-type) {
    margin-right: var(--sl-spacing-2x-small);
  }

  .select--large.select--has-tags .select__label {
    margin-left: 0;
  }

  /*
   * Pill modifier
   */
  .select--pill.select--small .select__control {
    border-radius: var(--sl-input-height-small);
  }

  .select--pill.select--medium .select__control {
    border-radius: var(--sl-input-height-medium);
  }

  .select--pill.select--large .select__control {
    border-radius: var(--sl-input-height-large);
  }
`;var w=class extends y{constructor(){super(...arguments),this.formSubmitController=new K(this),this.hasSlotController=new X(this,"help-text","label"),this.localize=new it(this),this.hasFocus=!1,this.isOpen=!1,this.displayLabel="",this.displayTags=[],this.multiple=!1,this.maxTagsVisible=3,this.disabled=!1,this.name="",this.placeholder="",this.size="medium",this.hoist=!1,this.value="",this.filled=!1,this.pill=!1,this.label="",this.placement="bottom",this.helpText="",this.required=!1,this.clearable=!1,this.invalid=!1}connectedCallback(){super.connectedCallback(),this.handleMenuSlotChange=this.handleMenuSlotChange.bind(this),this.resizeObserver=new ResizeObserver(()=>this.resizeMenu()),this.updateComplete.then(()=>{this.resizeObserver.observe(this),this.syncItemsFromValue()})}firstUpdated(){this.invalid=!this.input.checkValidity()}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.unobserve(this)}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.invalid=!this.input.checkValidity()}getItemLabel(t){let e=t.shadowRoot.querySelector("slot:not([name])");return Vt(e)}getItems(){return[...this.querySelectorAll("sl-menu-item")]}getValueAsArray(){return this.multiple&&this.value===""?[]:Array.isArray(this.value)?this.value:[this.value]}focus(t){this.control.focus(t)}blur(){this.control.blur()}handleBlur(){this.isOpen||(this.hasFocus=!1,g(this,"sl-blur"))}handleClearClick(t){t.stopPropagation(),this.value=this.multiple?[]:"",g(this,"sl-clear"),this.syncItemsFromValue()}handleDisabledChange(){this.disabled&&this.isOpen&&this.dropdown.hide(),this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}handleFocus(){this.hasFocus||(this.hasFocus=!0,g(this,"sl-focus"))}handleKeyDown(t){let e=t.target,o=this.getItems(),r=o[0],i=o[o.length-1];if(e.tagName.toLowerCase()!=="sl-tag"){if(t.key==="Tab"){this.isOpen&&this.dropdown.hide();return}if(["ArrowDown","ArrowUp"].includes(t.key)){if(t.preventDefault(),this.isOpen||this.dropdown.show(),t.key==="ArrowDown"){this.menu.setCurrentItem(r),r.focus();return}if(t.key==="ArrowUp"){this.menu.setCurrentItem(i),i.focus();return}}t.ctrlKey||t.metaKey||!this.isOpen&&t.key.length===1&&(t.stopPropagation(),t.preventDefault(),this.dropdown.show(),this.menu.typeToSelect(t))}}handleLabelClick(){this.focus()}handleMenuSelect(t){let e=t.detail.item;this.multiple?this.value=this.value.includes(e.value)?this.value.filter(o=>o!==e.value):[...this.value,e.value]:this.value=e.value,this.syncItemsFromValue()}handleMenuShow(){this.resizeMenu(),this.isOpen=!0}handleMenuHide(){this.isOpen=!1,this.control.focus()}handleMultipleChange(){var t;let e=this.getValueAsArray();this.value=this.multiple?e:(t=e[0])!=null?t:"",this.syncItemsFromValue()}async handleMenuSlotChange(){let t=this.getItems(),e=[];t.forEach(o=>{e.includes(o.value)&&console.error(`Duplicate value found in <sl-select> menu item: '${o.value}'`,o),e.push(o.value)}),await Promise.all(t.map(o=>o.render)).then(()=>this.syncItemsFromValue())}handleTagInteraction(t){t.composedPath().find(r=>r instanceof HTMLElement?r.classList.contains("tag__remove"):!1)&&t.stopPropagation()}async handleValueChange(){this.syncItemsFromValue(),await this.updateComplete,this.invalid=!this.input.checkValidity(),g(this,"sl-change")}resizeMenu(){this.menu.style.width=`${this.control.clientWidth}px`,this.dropdown.reposition()}syncItemsFromValue(){let t=this.getItems(),e=this.getValueAsArray();if(t.map(o=>o.checked=e.includes(o.value)),this.multiple){let o=t.filter(r=>e.includes(r.value));if(this.displayLabel=o.length>0?this.getItemLabel(o[0]):"",this.displayTags=o.map(r=>b`
          <sl-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button
            "
            variant="neutral"
            size=${this.size}
            ?pill=${this.pill}
            removable
            @click=${this.handleTagInteraction}
            @keydown=${this.handleTagInteraction}
            @sl-remove=${i=>{i.stopPropagation(),this.disabled||(r.checked=!1,this.syncValueFromItems())}}
          >
            ${this.getItemLabel(r)}
          </sl-tag>
        `),this.maxTagsVisible>0&&this.displayTags.length>this.maxTagsVisible){let r=this.displayTags.length;this.displayLabel="",this.displayTags=this.displayTags.slice(0,this.maxTagsVisible),this.displayTags.push(b`
          <sl-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button
            "
            variant="neutral"
            size=${this.size}
          >
            +${r-this.maxTagsVisible}
          </sl-tag>
        `)}}else{let o=t.find(r=>r.value===e[0]);this.displayLabel=o?this.getItemLabel(o):"",this.displayTags=[]}}syncValueFromItems(){let o=this.getItems().filter(r=>r.checked).map(r=>r.value);this.multiple?this.value=this.value.filter(r=>o.includes(r)):this.value=o.length>0?o[0]:""}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),o=this.multiple?this.value.length>0:this.value!=="",r=this.label?!0:!!t,i=this.helpText?!0:!!e;return b`
      <div
        part="form-control"
        class=${P({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":r,"form-control--has-help-text":i})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${r?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-dropdown
            part="base"
            .hoist=${this.hoist}
            .placement=${this.placement}
            .stayOpenOnSelect=${this.multiple}
            .containingElement=${this}
            ?disabled=${this.disabled}
            class=${P({select:!0,"select--open":this.isOpen,"select--empty":this.value.length===0,"select--focused":this.hasFocus,"select--clearable":this.clearable,"select--disabled":this.disabled,"select--multiple":this.multiple,"select--standard":!this.filled,"select--filled":this.filled,"select--has-tags":this.multiple&&this.displayTags.length>0,"select--placeholder-visible":this.displayLabel==="","select--small":this.size==="small","select--medium":this.size==="medium","select--large":this.size==="large","select--pill":this.pill,"select--invalid":this.invalid})}
            @sl-show=${this.handleMenuShow}
            @sl-hide=${this.handleMenuHide}
          >
            <div
              part="control"
              slot="trigger"
              id="input"
              class="select__control"
              role="combobox"
              aria-describedby="help-text"
              aria-haspopup="true"
              aria-disabled=${this.disabled?"true":"false"}
              aria-expanded=${this.isOpen?"true":"false"}
              aria-controls="menu"
              tabindex=${this.disabled?"-1":"0"}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            >
              <span part="prefix" class="select__prefix">
                <slot name="prefix"></slot>
              </span>

              <div part="display-label" class="select__label">
                ${this.displayTags.length>0?b` <span part="tags" class="select__tags"> ${this.displayTags} </span> `:this.displayLabel.length>0?this.displayLabel:this.placeholder}
              </div>

              ${this.clearable&&o?b`
                    <button
                      part="clear-button"
                      class="select__clear"
                      @click=${this.handleClearClick}
                      aria-label=${this.localize.term("clearEntry")}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  `:""}

              <span part="suffix" class="select__suffix">
                <slot name="suffix"></slot>
              </span>

              <span part="icon" class="select__icon" aria-hidden="true">
                <sl-icon name="chevron-down" library="system"></sl-icon>
              </span>

              <!-- The hidden input tricks the browser's built-in validation so it works as expected. We use an input
              instead of a select because, otherwise, iOS will show a list of options during validation. The focus
              handler is used to move focus to the primary control when it's marked invalid.  -->
              <input
                class="select__hidden-select"
                aria-hidden="true"
                ?required=${this.required}
                .value=${o?"1":""}
                tabindex="-1"
                @focus=${()=>this.control.focus()}
              />
            </div>

            <sl-menu part="menu" id="menu" class="select__menu" @sl-select=${this.handleMenuSelect}>
              <slot @slotchange=${this.handleMenuSlotChange}></slot>
            </sl-menu>
          </sl-dropdown>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};w.styles=So;s([L(".select")],w.prototype,"dropdown",2);s([L(".select__control")],w.prototype,"control",2);s([L(".select__hidden-select")],w.prototype,"input",2);s([L(".select__menu")],w.prototype,"menu",2);s([F()],w.prototype,"hasFocus",2);s([F()],w.prototype,"isOpen",2);s([F()],w.prototype,"displayLabel",2);s([F()],w.prototype,"displayTags",2);s([a({type:Boolean,reflect:!0})],w.prototype,"multiple",2);s([a({attribute:"max-tags-visible",type:Number})],w.prototype,"maxTagsVisible",2);s([a({type:Boolean,reflect:!0})],w.prototype,"disabled",2);s([a()],w.prototype,"name",2);s([a()],w.prototype,"placeholder",2);s([a()],w.prototype,"size",2);s([a({type:Boolean})],w.prototype,"hoist",2);s([a()],w.prototype,"value",2);s([a({type:Boolean,reflect:!0})],w.prototype,"filled",2);s([a({type:Boolean,reflect:!0})],w.prototype,"pill",2);s([a()],w.prototype,"label",2);s([a()],w.prototype,"placement",2);s([a({attribute:"help-text"})],w.prototype,"helpText",2);s([a({type:Boolean,reflect:!0})],w.prototype,"required",2);s([a({type:Boolean})],w.prototype,"clearable",2);s([a({type:Boolean,reflect:!0})],w.prototype,"invalid",2);s([E("disabled",{waitUntilFirstUpdate:!0})],w.prototype,"handleDisabledChange",1);s([E("multiple")],w.prototype,"handleMultipleChange",1);s([E("value",{waitUntilFirstUpdate:!0})],w.prototype,"handleValueChange",1);w=s([C("sl-select")],w);var Eo=_`
  ${$}

  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    cursor: default;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--small .tag__remove {
    margin-left: var(--sl-spacing-2x-small);
    margin-right: calc(-1 * var(--sl-spacing-3x-small));
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag__remove {
    margin-left: var(--sl-spacing-2x-small);
    margin-right: calc(-1 * var(--sl-spacing-2x-small));
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    font-size: 1.4em;
    margin-left: var(--sl-spacing-2x-small);
    margin-right: calc(-1 * var(--sl-spacing-x-small));
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`;var dt=class extends y{constructor(){super(...arguments),this.localize=new it(this),this.variant="neutral",this.size="medium",this.pill=!1,this.removable=!1}handleRemoveClick(){g(this,"sl-remove")}render(){return b`
      <span
        part="base"
        class=${P({tag:!0,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <span part="content" class="tag__content">
          <slot></slot>
        </span>

        ${this.removable?b`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
              ></sl-icon-button>
            `:""}
      </span>
    `}};dt.styles=Eo;s([a({reflect:!0})],dt.prototype,"variant",2);s([a({reflect:!0})],dt.prototype,"size",2);s([a({type:Boolean,reflect:!0})],dt.prototype,"pill",2);s([a({type:Boolean})],dt.prototype,"removable",2);dt=s([C("sl-tag")],dt);var To=_`
  ${$}

  :host {
    display: block;
  }

  .menu {
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    background: var(--sl-panel-background-color);
    padding: var(--sl-spacing-x-small) 0;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`;var Tt=class extends y{constructor(){super(...arguments),this.typeToSelectString=""}firstUpdated(){this.setAttribute("role","menu")}getAllItems(t={includeDisabled:!0}){return[...this.defaultSlot.assignedElements({flatten:!0})].filter(e=>!(e.getAttribute("role")!=="menuitem"||!t.includeDisabled&&e.disabled))}getCurrentItem(){return this.getAllItems({includeDisabled:!1}).find(t=>t.getAttribute("tabindex")==="0")}setCurrentItem(t){let e=this.getAllItems({includeDisabled:!1}),o=t.disabled?e[0]:t;e.forEach(r=>{r.setAttribute("tabindex",r===o?"0":"-1")})}typeToSelect(t){var e;let o=this.getAllItems({includeDisabled:!1});clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?t.metaKey||t.ctrlKey?this.typeToSelectString="":this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase(),Ct||o.forEach(r=>r.classList.remove("sl-focus-invisible"));for(let r of o){let i=(e=r.shadowRoot)==null?void 0:e.querySelector("slot:not([name])");if(Vt(i).toLowerCase().trim().startsWith(this.typeToSelectString)){this.setCurrentItem(r),r.focus();break}}}handleClick(t){let o=t.target.closest("sl-menu-item");o?.disabled===!1&&g(this,"sl-select",{detail:{item:o}})}handleKeyUp(){Ct||this.getAllItems().forEach(e=>{e.classList.remove("sl-focus-invisible")})}handleKeyDown(t){if(t.key==="Enter"){let e=this.getCurrentItem();t.preventDefault(),e?.click()}if(t.key===" "&&t.preventDefault(),["ArrowDown","ArrowUp","Home","End"].includes(t.key)){let e=this.getAllItems({includeDisabled:!1}),o=this.getCurrentItem(),r=o?e.indexOf(o):0;if(e.length>0){t.preventDefault(),t.key==="ArrowDown"?r++:t.key==="ArrowUp"?r--:t.key==="Home"?r=0:t.key==="End"&&(r=e.length-1),r<0&&(r=e.length-1),r>e.length-1&&(r=0),this.setCurrentItem(e[r]),e[r].focus();return}}this.typeToSelect(t)}handleMouseDown(t){let e=t.target;e.getAttribute("role")==="menuitem"&&(this.setCurrentItem(e),Ct||e.classList.add("sl-focus-invisible"))}handleSlotChange(){let t=this.getAllItems({includeDisabled:!1});t.length>0&&this.setCurrentItem(t[0])}render(){return b`
      <div
        part="base"
        class="menu"
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @keyup=${this.handleKeyUp}
        @mousedown=${this.handleMouseDown}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};Tt.styles=To;s([L(".menu")],Tt.prototype,"menu",2);s([L("slot")],Tt.prototype,"defaultSlot",2);Tt=s([C("sl-menu")],Tt);function wt(t){return t.split("-")[0]}function Kt(t){return t.split("-")[1]}function Xt(t){return["top","bottom"].includes(wt(t))?"x":"y"}function Bo(t){return t==="y"?"height":"width"}function zo(t,e,o){let{reference:r,floating:i}=t,l=r.x+r.width/2-i.width/2,n=r.y+r.height/2-i.height/2,c=Xt(e),u=Bo(c),d=r[u]/2-i[u]/2,p=wt(e),h=c==="x",m;switch(p){case"top":m={x:l,y:r.y-i.height};break;case"bottom":m={x:l,y:r.y+r.height};break;case"right":m={x:r.x+r.width,y:n};break;case"left":m={x:r.x-i.width,y:n};break;default:m={x:r.x,y:r.y}}switch(Kt(e)){case"start":m[c]-=d*(o&&h?-1:1);break;case"end":m[c]+=d*(o&&h?-1:1);break}return m}var Rr=async(t,e,o)=>{let{placement:r="bottom",strategy:i="absolute",middleware:l=[],platform:n}=o,c=await(n.isRTL==null?void 0:n.isRTL(e)),u=await n.getElementRects({reference:t,floating:e,strategy:i}),{x:d,y:p}=zo(u,r,c),h=r,m={},A=new Set,S=0;for(let D=0;D<l.length;D++){let{name:M,fn:k}=l[D];if(A.has(M))continue;let{x:B,y:q,data:J,reset:H}=await k({x:d,y:p,initialPlacement:r,placement:h,strategy:i,middlewareData:m,rects:u,platform:n,elements:{reference:t,floating:e}});if(d=B??d,p=q??p,m=V(x({},m),{[M]:x(x({},m[M]),J)}),H){typeof H=="object"&&(H.placement&&(h=H.placement),H.rects&&(u=H.rects===!0?await n.getElementRects({reference:t,floating:e,strategy:i}):H.rects),{x:d,y:p}=zo(u,h,c),H.skip!==!1&&A.add(M)),D=-1;continue}}return{x:d,y:p,placement:h,strategy:i,middlewareData:m}};function Br(t){return x({top:0,right:0,bottom:0,left:0},t)}function Ir(t){return typeof t!="number"?Br(t):{top:t,right:t,bottom:t,left:t}}function Ht(t){return V(x({},t),{top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height})}async function xe(t,e){var o;e===void 0&&(e={});let{x:r,y:i,platform:l,rects:n,elements:c,strategy:u}=t,{boundary:d="clippingAncestors",rootBoundary:p="viewport",elementContext:h="floating",altBoundary:m=!1,padding:A=0}=e,S=Ir(A),M=c[m?h==="floating"?"reference":"floating":h],k=Ht(await l.getClippingRect({element:(o=await(l.isElement==null?void 0:l.isElement(M)))==null||o?M:M.contextElement||await(l.getDocumentElement==null?void 0:l.getDocumentElement(c.floating)),boundary:d,rootBoundary:p})),B=Ht(l.convertOffsetParentRelativeRectToViewportRelativeRect?await l.convertOffsetParentRelativeRectToViewportRelativeRect({rect:h==="floating"?V(x({},n.floating),{x:r,y:i}):n.reference,offsetParent:await(l.getOffsetParent==null?void 0:l.getOffsetParent(c.floating)),strategy:u}):n[h]);return{top:k.top-B.top+S.top,bottom:B.bottom-k.bottom+S.bottom,left:k.left-B.left+S.left,right:B.right-k.right+S.right}}var Fr=Math.min,pt=Math.max;function Po(t,e,o){return pt(t,Fr(e,o))}var Vr={left:"right",right:"left",bottom:"top",top:"bottom"};function jt(t){return t.replace(/left|right|bottom|top/g,e=>Vr[e])}function Ur(t,e,o){o===void 0&&(o=!1);let r=Kt(t),i=Xt(t),l=Bo(i),n=i==="x"?r===(o?"end":"start")?"right":"left":r==="start"?"bottom":"top";return e.reference[l]>e.floating[l]&&(n=jt(n)),{main:n,cross:jt(n)}}var Nr={start:"end",end:"start"};function Lo(t){return t.replace(/start|end/g,e=>Nr[e])}function Hr(t){let e=jt(t);return[Lo(t),e,Lo(e)]}var Io=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var o;let{placement:r,middlewareData:i,rects:l,initialPlacement:n,platform:c,elements:u}=e,d=t,{mainAxis:p=!0,crossAxis:h=!0,fallbackPlacements:m,fallbackStrategy:A="bestFit",flipAlignment:S=!0}=d,D=Ft(d,["mainAxis","crossAxis","fallbackPlacements","fallbackStrategy","flipAlignment"]),M=wt(r),B=m||(M===n||!S?[jt(n)]:Hr(n)),q=[n,...B],J=await xe(e,D),H=[],Lt=((o=i.flip)==null?void 0:o.overflows)||[];if(p&&H.push(J[M]),h){let{main:ht,cross:Ot}=Ur(r,l,await(c.isRTL==null?void 0:c.isRTL(u.floating)));H.push(J[ht],J[Ot])}if(Lt=[...Lt,{placement:r,overflows:H}],!H.every(ht=>ht<=0)){var Te,ze;let ht=((Te=(ze=i.flip)==null?void 0:ze.index)!=null?Te:0)+1,Ot=q[ht];if(Ot)return{data:{index:ht,overflows:Lt},reset:{skip:!1,placement:Ot}};let Gt="bottom";switch(A){case"bestFit":{var Pe;let Le=(Pe=Lt.slice().sort((Qo,tr)=>Qo.overflows.filter(at=>at>0).reduce((at,Qt)=>at+Qt,0)-tr.overflows.filter(at=>at>0).reduce((at,Qt)=>at+Qt,0))[0])==null?void 0:Pe.placement;Le&&(Gt=Le);break}case"initialPlacement":Gt=n;break}return{reset:{placement:Gt}}}return{}}}};function jr(t,e,o,r){r===void 0&&(r=!1);let i=wt(t),l=Kt(t),n=Xt(t)==="x",c=["left","top"].includes(i)?-1:1,u=1;l==="end"&&(u=-1),r&&n&&(u*=-1);let d=typeof o=="function"?o(V(x({},e),{placement:t})):o,{mainAxis:p,crossAxis:h}=typeof d=="number"?{mainAxis:d,crossAxis:0}:x({mainAxis:0,crossAxis:0},d);return n?{x:h*u,y:p*c}:{x:p*c,y:h*u}}var Fo=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){let{x:o,y:r,placement:i,rects:l,platform:n,elements:c}=e,u=jr(i,l,t,await(n.isRTL==null?void 0:n.isRTL(c.floating)));return{x:o+u.x,y:r+u.y,data:u}}}};function Wr(t){return t==="x"?"y":"x"}var Vo=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){let{x:o,y:r,placement:i}=e,l=t,{mainAxis:n=!0,crossAxis:c=!1,limiter:u={fn:k=>{let{x:B,y:q}=k;return{x:B,y:q}}}}=l,d=Ft(l,["mainAxis","crossAxis","limiter"]),p={x:o,y:r},h=await xe(e,d),m=Xt(wt(i)),A=Wr(m),S=p[m],D=p[A];if(n){let k=m==="y"?"top":"left",B=m==="y"?"bottom":"right",q=S+h[k],J=S-h[B];S=Po(q,S,J)}if(c){let k=A==="y"?"top":"left",B=A==="y"?"bottom":"right",q=D+h[k],J=D-h[B];D=Po(q,D,J)}let M=u.fn(V(x({},e),{[m]:S,[A]:D}));return V(x({},M),{data:{x:M.x-o,y:M.y-r}})}}},Uo=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){let{placement:o,rects:r,platform:i,elements:l}=e,n=t,{apply:c}=n,u=Ft(n,["apply"]),d=await xe(e,u),p=wt(o),h=Kt(o),m,A;p==="top"||p==="bottom"?(m=p,A=h===(await(i.isRTL==null?void 0:i.isRTL(l.floating))?"start":"end")?"left":"right"):(A=p,m=h==="end"?"top":"bottom");let S=pt(d.left,0),D=pt(d.right,0),M=pt(d.top,0),k=pt(d.bottom,0),B={height:r.floating.height-(["left","right"].includes(o)?2*(M!==0||k!==0?M+k:pt(d.top,d.bottom)):d[m]),width:r.floating.width-(["top","bottom"].includes(o)?2*(S!==0||D!==0?S+D:pt(d.left,d.right)):d[A])};return c?.(x(x({},B),r)),{reset:{rects:!0}}}}};function ke(t){return t?.toString()==="[object Window]"}function lt(t){if(t==null)return window;if(!ke(t)){let e=t.ownerDocument;return e&&e.defaultView||window}return t}function Pt(t){return lt(t).getComputedStyle(t)}function tt(t){return ke(t)?"":t?(t.nodeName||"").toLowerCase():""}function Z(t){return t instanceof lt(t).HTMLElement}function _t(t){return t instanceof lt(t).Element}function qr(t){return t instanceof lt(t).Node}function $e(t){let e=lt(t).ShadowRoot;return t instanceof e||t instanceof ShadowRoot}function Yt(t){let{overflow:e,overflowX:o,overflowY:r}=Pt(t);return/auto|scroll|overlay|hidden/.test(e+r+o)}function Kr(t){return["table","td","th"].includes(tt(t))}function No(t){let e=navigator.userAgent.toLowerCase().includes("firefox"),o=Pt(t);return o.transform!=="none"||o.perspective!=="none"||o.contain==="paint"||["transform","perspective"].includes(o.willChange)||e&&o.willChange==="filter"||e&&(o.filter?o.filter!=="none":!1)}var Oo=Math.min,zt=Math.max,Wt=Math.round;function et(t,e){e===void 0&&(e=!1);let o=t.getBoundingClientRect(),r=1,i=1;return e&&Z(t)&&(r=t.offsetWidth>0&&Wt(o.width)/t.offsetWidth||1,i=t.offsetHeight>0&&Wt(o.height)/t.offsetHeight||1),{width:o.width/r,height:o.height/i,top:o.top/i,right:o.right/r,bottom:o.bottom/i,left:o.left/r,x:o.left/r,y:o.top/i}}function nt(t){return((qr(t)?t.ownerDocument:t.document)||window.document).documentElement}function Zt(t){return ke(t)?{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}:{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}}function Ho(t){return et(nt(t)).left+Zt(t).scrollLeft}function Xr(t){let e=et(t);return Wt(e.width)!==t.offsetWidth||Wt(e.height)!==t.offsetHeight}function Yr(t,e,o){let r=Z(e),i=nt(e),l=et(t,r&&Xr(e)),n={scrollLeft:0,scrollTop:0},c={x:0,y:0};if(r||!r&&o!=="fixed")if((tt(e)!=="body"||Yt(i))&&(n=Zt(e)),Z(e)){let u=et(e,!0);c.x=u.x+e.clientLeft,c.y=u.y+e.clientTop}else i&&(c.x=Ho(i));return{x:l.left+n.scrollLeft-c.x,y:l.top+n.scrollTop-c.y,width:l.width,height:l.height}}function Jt(t){return tt(t)==="html"?t:t.assignedSlot||t.parentNode||($e(t)?t.host:null)||nt(t)}function Do(t){return!Z(t)||getComputedStyle(t).position==="fixed"?null:t.offsetParent}function Zr(t){let e=Jt(t);for($e(e)&&(e=e.host);Z(e)&&!["html","body"].includes(tt(e));){if(No(e))return e;e=e.parentNode}return null}function we(t){let e=lt(t),o=Do(t);for(;o&&Kr(o)&&getComputedStyle(o).position==="static";)o=Do(o);return o&&(tt(o)==="html"||tt(o)==="body"&&getComputedStyle(o).position==="static"&&!No(o))?e:o||Zr(t)||e}function Mo(t){if(Z(t))return{width:t.offsetWidth,height:t.offsetHeight};let e=et(t);return{width:e.width,height:e.height}}function Jr(t){let{rect:e,offsetParent:o,strategy:r}=t,i=Z(o),l=nt(o);if(o===l)return e;let n={scrollLeft:0,scrollTop:0},c={x:0,y:0};if((i||!i&&r!=="fixed")&&((tt(o)!=="body"||Yt(l))&&(n=Zt(o)),Z(o))){let u=et(o,!0);c.x=u.x+o.clientLeft,c.y=u.y+o.clientTop}return V(x({},e),{x:e.x-n.scrollLeft+c.x,y:e.y-n.scrollTop+c.y})}function Gr(t){let e=lt(t),o=nt(t),r=e.visualViewport,i=o.clientWidth,l=o.clientHeight,n=0,c=0;return r&&(i=r.width,l=r.height,Math.abs(e.innerWidth/r.scale-r.width)<.01&&(n=r.offsetLeft,c=r.offsetTop)),{width:i,height:l,x:n,y:c}}function Qr(t){var e;let o=nt(t),r=Zt(t),i=(e=t.ownerDocument)==null?void 0:e.body,l=zt(o.scrollWidth,o.clientWidth,i?i.scrollWidth:0,i?i.clientWidth:0),n=zt(o.scrollHeight,o.clientHeight,i?i.scrollHeight:0,i?i.clientHeight:0),c=-r.scrollLeft+Ho(t),u=-r.scrollTop;return Pt(i||o).direction==="rtl"&&(c+=zt(o.clientWidth,i?i.clientWidth:0)-l),{width:l,height:n,x:c,y:u}}function jo(t){return["html","body","#document"].includes(tt(t))?t.ownerDocument.body:Z(t)&&Yt(t)?t:jo(Jt(t))}function qt(t,e){var o;e===void 0&&(e=[]);let r=jo(t),i=r===((o=t.ownerDocument)==null?void 0:o.body),l=lt(r),n=i?[l].concat(l.visualViewport||[],Yt(r)?r:[]):r,c=e.concat(n);return i?c:c.concat(qt(Jt(n)))}function ti(t,e){let o=e.getRootNode==null?void 0:e.getRootNode();if(t.contains(e))return!0;if(o&&$e(o)){let r=e;do{if(r&&t===r)return!0;r=r.parentNode||r.host}while(r)}return!1}function ei(t){let e=et(t),o=e.top+t.clientTop,r=e.left+t.clientLeft;return{top:o,left:r,x:r,y:o,right:r+t.clientWidth,bottom:o+t.clientHeight,width:t.clientWidth,height:t.clientHeight}}function Ro(t,e){return e==="viewport"?Ht(Gr(t)):_t(e)?ei(e):Ht(Qr(nt(t)))}function oi(t){let e=qt(Jt(t)),r=["absolute","fixed"].includes(Pt(t).position)&&Z(t)?we(t):t;return _t(r)?e.filter(i=>_t(i)&&ti(i,r)&&tt(i)!=="body"):[]}function ri(t){let{element:e,boundary:o,rootBoundary:r}=t,l=[...o==="clippingAncestors"?oi(e):[].concat(o),r],n=l[0],c=l.reduce((u,d)=>{let p=Ro(e,d);return u.top=zt(p.top,u.top),u.right=Oo(p.right,u.right),u.bottom=Oo(p.bottom,u.bottom),u.left=zt(p.left,u.left),u},Ro(e,n));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}var ii={getClippingRect:ri,convertOffsetParentRelativeRectToViewportRelativeRect:Jr,isElement:_t,getDimensions:Mo,getOffsetParent:we,getDocumentElement:nt,getElementRects:t=>{let{reference:e,floating:o,strategy:r}=t;return{reference:Yr(e,we(o),r),floating:V(x({},Mo(o)),{x:0,y:0})}},getClientRects:t=>Array.from(t.getClientRects()),isRTL:t=>Pt(t).direction==="rtl"};function Wo(t,e,o,r){r===void 0&&(r={});let{ancestorScroll:i=!0,ancestorResize:l=!0,elementResize:n=!0,animationFrame:c=!1}=r,u=!1,d=i&&!c,p=l&&!c,h=n&&!c,m=d||p?[..._t(t)?qt(t):[],...qt(e)]:[];m.forEach(k=>{d&&k.addEventListener("scroll",o,{passive:!0}),p&&k.addEventListener("resize",o)});let A=null;h&&(A=new ResizeObserver(o),_t(t)&&A.observe(t),A.observe(e));let S,D=c?et(t):null;c&&M();function M(){if(u)return;let k=et(t);D&&(k.x!==D.x||k.y!==D.y||k.width!==D.width||k.height!==D.height)&&o(),D=k,S=requestAnimationFrame(M)}return()=>{var k;u=!0,m.forEach(B=>{d&&B.removeEventListener("scroll",o),p&&B.removeEventListener("resize",o)}),(k=A)==null||k.disconnect(),A=null,c&&cancelAnimationFrame(S)}}var qo=(t,e,o)=>Rr(t,e,x({platform:ii},o));var Ko=_`
  ${$}

  :host {
    display: inline-block;
  }

  .dropdown {
    position: relative;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__positioner {
    position: absolute;
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    color: var(--color);
    box-shadow: var(--sl-shadow-large);
    overflow: auto;
    overscroll-behavior: none;
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    pointer-events: all;
  }

  .dropdown__positioner[data-placement^='top'] .dropdown__panel {
    transform-origin: bottom;
  }

  .dropdown__positioner[data-placement^='bottom'] .dropdown__panel {
    transform-origin: top;
  }

  .dropdown__positioner[data-placement^='left'] .dropdown__panel {
    transform-origin: right;
  }

  .dropdown__positioner[data-placement^='right'] .dropdown__panel {
    transform-origin: left;
  }
`;function Xo(t){let e=t.tagName.toLowerCase();return t.getAttribute("tabindex")==="-1"||t.hasAttribute("disabled")||t.hasAttribute("aria-disabled")&&t.getAttribute("aria-disabled")!=="false"||e==="input"&&t.getAttribute("type")==="radio"&&!t.hasAttribute("checked")||t.offsetParent===null||window.getComputedStyle(t).visibility==="hidden"?!1:(e==="audio"||e==="video")&&t.hasAttribute("controls")||t.hasAttribute("tabindex")||t.hasAttribute("contenteditable")&&t.getAttribute("contenteditable")!=="false"?!0:["button","input","select","textarea","a","audio","video","summary"].includes(e)}function Yo(t){var e,o;let r=[];function i(c){c instanceof HTMLElement&&(r.push(c),c.shadowRoot!==null&&c.shadowRoot.mode==="open"&&i(c.shadowRoot)),[...c.querySelectorAll("*")].forEach(u=>i(u))}i(t);let l=(e=r.find(c=>Xo(c)))!=null?e:null,n=(o=r.reverse().find(c=>Xo(c)))!=null?o:null;return{start:l,end:n}}function si(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}function Zo(t,e,o="vertical",r="smooth"){let i=si(t,e),l=i.top+e.scrollTop,n=i.left+e.scrollLeft,c=e.scrollLeft,u=e.scrollLeft+e.offsetWidth,d=e.scrollTop,p=e.scrollTop+e.offsetHeight;(o==="horizontal"||o==="both")&&(n<c?e.scrollTo({left:n,behavior:r}):n+t.clientWidth>u&&e.scrollTo({left:n-e.offsetWidth+t.clientWidth,behavior:r})),(o==="vertical"||o==="both")&&(l<d?e.scrollTo({top:l,behavior:r}):l+t.clientHeight>p&&e.scrollTo({top:l-e.offsetHeight+t.clientHeight,behavior:r}))}function Ce(t,e,o){return new Promise(r=>{if(o?.duration===1/0)throw new Error("Promise-based animations must be finite.");let i=t.animate(e,V(x({},o),{duration:li()?0:o.duration}));i.addEventListener("cancel",r,{once:!0}),i.addEventListener("finish",r,{once:!0})})}function li(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Ae(t){return Promise.all(t.getAnimations().map(e=>new Promise(o=>{let r=requestAnimationFrame(o);e.addEventListener("cancel",()=>r,{once:!0}),e.addEventListener("finish",()=>r,{once:!0}),e.cancel()})))}var Jo=new Map,ni=new WeakMap;function ai(t){return t??{keyframes:[],options:{duration:0}}}function Se(t,e){Jo.set(t,ai(e))}function Ee(t,e){let o=ni.get(t);if(o?.[e])return o[e];let r=Jo.get(e);return r||{keyframes:[],options:{duration:0}}}var U=class extends y{constructor(){super(...arguments),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1}connectedCallback(){super.connectedCallback(),this.handleMenuItemActivate=this.handleMenuItemActivate.bind(this),this.handlePanelSelect=this.handlePanelSelect.bind(this),this.handleDocumentKeyDown=this.handleDocumentKeyDown.bind(this),this.handleDocumentMouseDown=this.handleDocumentMouseDown.bind(this),this.containingElement||(this.containingElement=this)}async firstUpdated(){this.panel.hidden=!this.open,this.open&&(await this.updateComplete,this.addOpenListeners(),this.startPositioner())}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide(),this.stopPositioner()}focusOnTrigger(){let e=this.trigger.querySelector("slot").assignedElements({flatten:!0})[0];typeof e?.focus=="function"&&e.focus()}getMenu(){return this.panel.querySelector("slot").assignedElements({flatten:!0}).find(e=>e.tagName.toLowerCase()==="sl-menu")}handleDocumentKeyDown(t){var e;if(t.key==="Escape"){this.hide(),this.focusOnTrigger();return}if(t.key==="Tab"){if(this.open&&((e=document.activeElement)==null?void 0:e.tagName.toLowerCase())==="sl-menu-item"){t.preventDefault(),this.hide(),this.focusOnTrigger();return}setTimeout(()=>{var o,r,i;let l=((o=this.containingElement)==null?void 0:o.getRootNode())instanceof ShadowRoot?(i=(r=document.activeElement)==null?void 0:r.shadowRoot)==null?void 0:i.activeElement:document.activeElement;(!this.containingElement||l?.closest(this.containingElement.tagName.toLowerCase())!==this.containingElement)&&this.hide()})}}handleDocumentMouseDown(t){let e=t.composedPath();this.containingElement&&!e.includes(this.containingElement)&&this.hide()}handleMenuItemActivate(t){let e=t.target;Zo(e,this.panel)}handlePanelSelect(t){let e=t.target;!this.stayOpenOnSelect&&e.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger())}handlePopoverOptionsChange(){this.updatePositioner()}handleTriggerClick(){this.open?this.hide():this.show()}handleTriggerKeyDown(t){if(t.key==="Escape"){this.focusOnTrigger(),this.hide();return}if([" ","Enter"].includes(t.key)){t.preventDefault(),this.handleTriggerClick();return}let e=this.getMenu();if(e){let o=e.defaultSlot.assignedElements({flatten:!0}),r=o[0],i=o[o.length-1];["ArrowDown","ArrowUp","Home","End"].includes(t.key)&&(t.preventDefault(),this.open||this.show(),o.length>0&&requestAnimationFrame(()=>{(t.key==="ArrowDown"||t.key==="Home")&&(e.setCurrentItem(r),r.focus()),(t.key==="ArrowUp"||t.key==="End")&&(e.setCurrentItem(i),i.focus())}));let l=["Tab","Shift","Meta","Ctrl","Alt"];this.open&&!l.includes(t.key)&&e.typeToSelect(t)}}handleTriggerKeyUp(t){t.key===" "&&t.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){let o=this.trigger.querySelector("slot").assignedElements({flatten:!0}).find(i=>Yo(i).start),r;if(o){switch(o.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":r=o.button;break;default:r=o}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,ue(this,"sl-after-show")}async hide(){if(!!this.open)return this.open=!1,ue(this,"sl-after-hide")}reposition(){this.updatePositioner()}addOpenListeners(){this.panel.addEventListener("sl-activate",this.handleMenuItemActivate),this.panel.addEventListener("sl-select",this.handlePanelSelect),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){this.panel.removeEventListener("sl-activate",this.handleMenuItemActivate),this.panel.removeEventListener("sl-select",this.handlePanelSelect),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown)}async handleOpenChange(){if(this.disabled){this.open=!1;return}if(this.updateAccessibleTrigger(),this.open){g(this,"sl-show"),this.addOpenListeners(),await Ae(this),this.startPositioner(),this.panel.hidden=!1;let{keyframes:t,options:e}=Ee(this,"dropdown.show");await Ce(this.panel,t,e),g(this,"sl-after-show")}else{g(this,"sl-hide"),this.removeOpenListeners(),await Ae(this);let{keyframes:t,options:e}=Ee(this,"dropdown.hide");await Ce(this.panel,t,e),this.panel.hidden=!0,this.stopPositioner(),g(this,"sl-after-hide")}}startPositioner(){this.stopPositioner(),this.updatePositioner(),this.positionerCleanup=Wo(this.trigger,this.positioner,this.updatePositioner.bind(this))}updatePositioner(){!this.open||!this.trigger||!this.positioner||qo(this.trigger,this.positioner,{placement:this.placement,middleware:[Fo({mainAxis:this.distance,crossAxis:this.skidding}),Io(),Vo(),Uo({apply:({width:t,height:e})=>{Object.assign(this.panel.style,{maxWidth:`${t}px`,maxHeight:`${e}px`})},padding:8})],strategy:this.hoist?"fixed":"absolute"}).then(({x:t,y:e,placement:o})=>{this.positioner.setAttribute("data-placement",o),Object.assign(this.positioner.style,{position:this.hoist?"fixed":"absolute",left:`${t}px`,top:`${e}px`})})}stopPositioner(){this.positionerCleanup&&(this.positionerCleanup(),this.positionerCleanup=void 0,this.positioner.removeAttribute("data-placement"))}render(){return b`
      <div
        part="base"
        id="dropdown"
        class=${P({dropdown:!0,"dropdown--open":this.open})}
      >
        <span
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
        >
          <slot name="trigger" @slotchange=${this.handleTriggerSlotChange}></slot>
        </span>

        <!-- Position the panel with a wrapper since the popover makes use of translate. This let's us add animations
        on the panel without interfering with the position. -->
        <div class="dropdown__positioner">
          <div
            part="panel"
            class="dropdown__panel"
            aria-hidden=${this.open?"false":"true"}
            aria-labelledby="dropdown"
          >
            <slot></slot>
          </div>
        </div>
      </div>
    `}};U.styles=Ko;s([L(".dropdown__trigger")],U.prototype,"trigger",2);s([L(".dropdown__panel")],U.prototype,"panel",2);s([L(".dropdown__positioner")],U.prototype,"positioner",2);s([a({type:Boolean,reflect:!0})],U.prototype,"open",2);s([a({reflect:!0})],U.prototype,"placement",2);s([a({type:Boolean})],U.prototype,"disabled",2);s([a({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],U.prototype,"stayOpenOnSelect",2);s([a({attribute:!1})],U.prototype,"containingElement",2);s([a({type:Number})],U.prototype,"distance",2);s([a({type:Number})],U.prototype,"skidding",2);s([a({type:Boolean})],U.prototype,"hoist",2);s([E("distance"),E("hoist"),E("placement"),E("skidding")],U.prototype,"handlePopoverOptionsChange",1);s([E("open",{waitUntilFirstUpdate:!0})],U.prototype,"handleOpenChange",1);U=s([C("sl-dropdown")],U);Se("dropdown.show",{keyframes:[{opacity:0,transform:"scale(0.9)"},{opacity:1,transform:"scale(1)"}],options:{duration:100,easing:"ease"}});Se("dropdown.hide",{keyframes:[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.9)"}],options:{duration:100,easing:"ease"}});var Go=_`
  ${$}

  :host {
    display: inline-block;
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-medium) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button${T} {
    box-shadow: var(--sl-focus-ring);
  }
`;var W=class extends y{constructor(){super(...arguments),this.label="",this.disabled=!1}render(){let t=!!this.href,e=b`
      <sl-icon
        name=${f(this.name)}
        library=${f(this.library)}
        src=${f(this.src)}
        aria-hidden="true"
      ></sl-icon>
    `;return t?b`
          <a
            part="base"
            class="icon-button"
            href=${f(this.href)}
            target=${f(this.target)}
            download=${f(this.download)}
            rel=${f(this.target?"noreferrer noopener":void 0)}
            role="button"
            aria-disabled=${this.disabled?"true":"false"}
            aria-label="${this.label}"
            tabindex=${this.disabled?"-1":"0"}
          >
            ${e}
          </a>
        `:b`
          <button
            part="base"
            class=${P({"icon-button":!0,"icon-button--disabled":this.disabled})}
            ?disabled=${this.disabled}
            type="button"
            aria-label=${this.label}
          >
            ${e}
          </button>
        `}};W.styles=Go;s([L(".icon-button")],W.prototype,"button",2);s([a()],W.prototype,"name",2);s([a()],W.prototype,"library",2);s([a()],W.prototype,"src",2);s([a()],W.prototype,"href",2);s([a()],W.prototype,"target",2);s([a()],W.prototype,"download",2);s([a()],W.prototype,"label",2);s([a({type:Boolean,reflect:!0})],W.prototype,"disabled",2);W=s([C("sl-icon-button")],W);Et(".");})();
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
