const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./client-DKoAjqTQ.js","./rolldown-runtime-sJBDdmOt.js","./iframe-Cq38_uAt.js","./preload-helper-Dt5pTa-y.js","./chunk-7PIQR4A3-DUuI6D6u.js","./chunk-IMSF75WX-CjLAjAi6.js","./iframe-DaWjJiDx.css","./react-dom-jISnIKEM.js"])))=>i.map(i=>d[i]);
import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{n,t as r}from"./preload-helper-Dt5pTa-y.js";import{f as i}from"./iframe-Cq38_uAt.js";import{t as a}from"./react-dom-jISnIKEM.js";import{t as o}from"./jsx-runtime-MKhVqBIO.js";import{n as s,t as c}from"./cn-B3YN0wfp.js";import{n as l,t as u}from"./Button-vVz-IwGO.js";function d(e,t){let n=e.getBoundingClientRect();return new DOMRect(n.left-t,n.top-t,n.width+t*2,n.height+t*2)}function f(e,t,n,r,i,a,o,s=12){if(r>n*.7||i>t*.7)return{top:16,left:16,maxWidth:t-32};let c=a===`left`||a===`right`,l,u;return c?(u=(a===`right`?1:-1)==1?e.right+s:e.left-i-s,l=e.top+e.height/2-r/2,l=Math.max(8,Math.min(l,n-r-8))):(l=(a===`bottom`?1:-1)==1?e.bottom+s:e.top-r-s,u=o===`start`?e.left:o===`end`?e.right-i:e.left+e.width/2-i/2,l=Math.max(8,Math.min(l,n-r-8)),u=Math.max(8,Math.min(u,t-i-8))),{top:l,left:u,maxWidth:i}}function p({value:e,onChange:t,defaultValue:n}){let[r,i]=(0,_.useState)(n),a=e!==void 0;return[a?e:r,(0,_.useCallback)(e=>{a||i(e),t?.(e)},[a,t])]}function m({steps:e,open:t,defaultOpen:n=!1,onOpenChange:r,onComplete:i,onSkip:a,showProgress:o=!0,nextLabel:s=`Next`,backLabel:l=`Back`,doneLabel:m=`Done`,skipLabel:h=`Skip`,className:g,backdropClassName:S,spotlightClassName:C,spotlightPadding:w=4,popoverClassName:T,progressClassName:E,progressFillClassName:D,skipClassName:O,nextClassName:k,backClassName:A}){let[j,M]=p({value:t,onChange:r,defaultValue:n}),[N,P]=(0,_.useState)(0),[F,I]=(0,_.useState)([]),[L,R]=(0,_.useState)(null),z=(0,_.useRef)(null),B=(0,_.useRef)(null),V=(0,_.useRef)(null),H=(0,_.useMemo)(()=>e.filter(e=>!e.optional||!!document.querySelector(e.target)),[e]);(0,_.useEffect)(()=>{if(!j)return;if(H.length===0){M(!1),a?.();return}z.current=document.activeElement;let e=[];for(let t of H){let n=document.querySelector(t.target);n&&e.push({...t,element:n,rect:n.getBoundingClientRect()})}e.length===0?(M(!1),a?.()):(P(t=>Math.min(t,e.length-1)),I(e),R(null))},[j,H.length]),(0,_.useLayoutEffect)(()=>{if(!j||F.length===0)return;let e=F[N];if(!e)return;let t=()=>{let t=e.element.getBoundingClientRect(),n=d(e.element,w);I(e=>e.map((e,n)=>n===N?{...e,rect:t}:e));let r=B.current,i=r?.offsetWidth??x,a=r?.offsetHeight??b;R(f(n,window.innerWidth,window.innerHeight,a,i,e.side??`bottom`,e.align??`center`))},n=requestAnimationFrame(t),r=()=>{V.current&&cancelAnimationFrame(V.current),V.current=requestAnimationFrame(t)};return window.addEventListener(`resize`,r),window.addEventListener(`scroll`,r,!0),()=>{cancelAnimationFrame(n),window.removeEventListener(`resize`,r),window.removeEventListener(`scroll`,r,!0),V.current&&cancelAnimationFrame(V.current)}},[j,N,F.length]),(0,_.useEffect)(()=>{if(!j)return;let e=e=>{e.key===`Escape`&&(e.preventDefault(),e.stopPropagation(),M(!1),a?.())};return window.addEventListener(`keydown`,e,!0),()=>window.removeEventListener(`keydown`,e,!0)},[j,M,a]),(0,_.useEffect)(()=>{if(!j)return;let e=document.createElement(`div`);return e.setAttribute(`data-tour-overlay`,``),e.style.cssText=`position:fixed;inset:0;z-index:100;pointer-events:auto;background:rgba(0,0,0,0.45);`,document.body.appendChild(e),()=>e.remove()},[j]),(0,_.useLayoutEffect)(()=>{if(!j||!B.current)return;let e=B.current,t=t=>{if(t.key!==`Tab`)return;let n=e.querySelectorAll(`a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])`);if(n.length===0){t.preventDefault();return}let r=n[0],i=n[n.length-1];t.shiftKey?document.activeElement!==r&&e.contains(document.activeElement)||(t.preventDefault(),i.focus()):document.activeElement!==i&&e.contains(document.activeElement)||(t.preventDefault(),r.focus())};return e.addEventListener(`keydown`,t),e.focus(),()=>e.removeEventListener(`keydown`,t)},[j]),(0,_.useLayoutEffect)(()=>()=>{z.current&&document.contains(z.current)&&z.current.focus(),z.current=null},[]);let U=(0,_.useCallback)(e=>{M(!1),e===`skip`?a?.():i?.()},[M,a,i]),W=(0,_.useCallback)(()=>{N>=F.length-1?U(`complete`):P(e=>e+1)},[N,F.length,U]),G=(0,_.useCallback)(()=>{N>0&&P(e=>e-1)},[N]);if(!j||F.length===0)return null;let K=F[N];if(!K)return null;let q=F.length,J=N===0,Y=N===q-1,X=w,Z={position:`fixed`,zIndex:101,...L?{top:L.top,left:L.left,maxWidth:L.maxWidth}:{top:0,left:0}};return(0,v.createPortal)((0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(`div`,{"aria-hidden":`true`,className:c(`fixed inset-0`,g),style:{zIndex:100,pointerEvents:`none`},children:[(0,y.jsx)(`div`,{className:c(`fixed inset-0`,S),style:{background:`rgba(0,0,0,0.45)`,pointerEvents:`auto`,zIndex:100}}),(0,y.jsx)(`div`,{className:c(C),style:{position:`fixed`,top:K.rect.top-X,left:K.rect.left-X,width:K.rect.width+X*2,height:K.rect.height+X*2,borderRadius:6,boxShadow:`0 0 0 9999px rgba(0,0,0,0.45), 0 0 0 3px rgba(255,255,255,0.85)`,pointerEvents:`none`,zIndex:101}})]}),(0,y.jsxs)(`div`,{ref:B,role:`dialog`,"aria-modal":`true`,"aria-label":K.title,tabIndex:-1,className:c(`rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-none`,T),style:Z,children:[o&&(0,y.jsxs)(`div`,{className:c(`mb-2 flex items-center gap-2`,E),children:[(0,y.jsx)(`div`,{className:`h-1 flex-1 overflow-hidden rounded-full bg-muted`,children:(0,y.jsx)(`div`,{className:c(`h-full rounded-full bg-primary transition-all duration-200`,D),style:{width:`${(N+1)/q*100}%`}})}),(0,y.jsxs)(`span`,{className:`text-xs text-muted-foreground tabular-nums`,children:[N+1,` / `,q]})]}),(0,y.jsxs)(`div`,{className:`mb-3`,children:[(0,y.jsx)(`h3`,{className:`text-sm font-semibold`,children:K.title}),K.description&&(0,y.jsx)(`p`,{className:`mt-1 text-sm text-muted-foreground`,children:K.description})]}),(0,y.jsxs)(`div`,{className:`flex items-center justify-between gap-2`,children:[(0,y.jsx)(`button`,{type:`button`,onClick:()=>U(`skip`),className:c(`text-xs text-muted-foreground transition-colors hover:text-foreground`,O),children:h}),(0,y.jsxs)(`div`,{className:`flex items-center gap-2`,children:[!J&&(0,y.jsx)(u,{type:`button`,variant:`ghost`,size:`sm`,onClick:G,className:A,children:l}),(0,y.jsx)(u,{type:`button`,size:`sm`,onClick:W,className:k,children:Y?m:s})]})]})]})]}),document.body)}function h({onClick:e,label:t=`Tour`,showLabel:n=!1,className:r,disabled:i=!1}){return(0,y.jsxs)(`button`,{type:`button`,onClick:e,disabled:i,className:c(`inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:pointer-events-none`,r),children:[(0,y.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:[(0,y.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,y.jsx)(`path`,{d:`M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3`}),(0,y.jsx)(`line`,{x1:`12`,y1:`17`,x2:`12.01`,y2:`17`})]}),n&&(0,y.jsx)(`span`,{children:t})]})}function g(t,n){let i=null,a=null;return i||(i=document.createElement(`div`),document.body.appendChild(i)),r(()=>import(`./client-DKoAjqTQ.js`).then(t=>e(t.t(),1)).then(e=>{if(!i)return;let{createRoot:r}=e,o=r(i);a=o,o.render((0,y.jsx)(m,{steps:t,defaultOpen:!0,onOpenChange:e=>{e||(o.unmount(),i?.remove(),i=null,a=null,n?.onSkip?.(),n?.onComplete?.())},...n}))}),__vite__mapDeps([0,1,2,3,4,5,6,7]),import.meta.url),{destroy:()=>{a&&=(a.unmount(),null),i?.remove(),i=null}}}var _,v,y,b,x;function S(){return(S=t((()=>{_=i(),v=a(),s(),l(),y=o(),n(),b=180,x=320,m.displayName=`Tour`,h.displayName=`TourTrigger`,h.__docgenInfo={description:``,methods:[],displayName:`TourTrigger`,props:{onClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},label:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"Tour"`,computed:!1}},showLabel:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}}}}})))()}var C,w,T,E,D,O,k,A,j,M,N,P,F,I;function L(){return(L=t((()=>{C=i(),S(),w=o(),T={title:`Components/Tour`,component:m,parameters:{layout:`fullscreen`}},E=(0,w.jsxs)(`div`,{style:{padding:24,display:`flex`,flexDirection:`column`,gap:16,maxWidth:600},children:[(0,w.jsxs)(`div`,{"data-tour":`step.one`,style:{padding:16,border:`1px solid #e5e7eb`,borderRadius:8},children:[(0,w.jsx)(`h2`,{style:{margin:0,fontSize:16,fontWeight:600},children:`Dashboard`}),(0,w.jsx)(`p`,{style:{margin:`4px 0 0`,fontSize:13,color:`#6b7280`},children:`Your overview panel.`})]}),(0,w.jsxs)(`div`,{"data-tour":`step.two`,style:{padding:16,border:`1px solid #e5e7eb`,borderRadius:8},children:[(0,w.jsx)(`h2`,{style:{margin:0,fontSize:16,fontWeight:600},children:`Settings`}),(0,w.jsx)(`p`,{style:{margin:`4px 0 0`,fontSize:13,color:`#6b7280`},children:`Configure your preferences here.`})]}),(0,w.jsxs)(`div`,{"data-tour":`step.three`,style:{padding:16,border:`1px solid #e5e7eb`,borderRadius:8},children:[(0,w.jsx)(`h2`,{style:{margin:0,fontSize:16,fontWeight:600},children:`Reports`}),(0,w.jsx)(`p`,{style:{margin:`4px 0 0`,fontSize:13,color:`#6b7280`},children:`Export and view reports.`})]})]}),D=[{target:`[data-tour='step.one']`,title:`Welcome to the Dashboard`,description:`This is your main overview. You can see key metrics and recent activity at a glance.`},{target:`[data-tour='step.two']`,title:`Configure Settings`,description:`Adjust your preferences, notifications, and account details here.`},{target:`[data-tour='step.three']`,title:`Generate Reports`,description:`Export data and build custom reports from this section.`,side:`left`}],O={render:function(){let[e,t]=(0,C.useState)(!1);return(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`div`,{style:{padding:16},children:(0,w.jsx)(h,{onClick:()=>t(!0),showLabel:!0})}),E,(0,w.jsx)(m,{open:e,onOpenChange:t,steps:D,onComplete:()=>alert(`Tour complete!`),onSkip:()=>alert(`Tour skipped.`)})]})}},k={render:function(){let[e,t]=(0,C.useState)(!1);return(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`div`,{style:{padding:16},children:(0,w.jsx)(h,{onClick:()=>t(!0),showLabel:!0})}),E,(0,w.jsx)(m,{open:e,onOpenChange:t,steps:[...D,{target:`[data-tour='nonexistent']`,title:`Optional step`,description:`This target doesn't exist, so this step is skipped.`,optional:!0}],onComplete:()=>alert(`Tour complete!`)})]})}},A={render:function(){return(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`div`,{style:{padding:16},children:(0,w.jsx)(h,{onClick:()=>g(D,{onComplete:()=>alert(`Tour complete!`)}),showLabel:!0})}),E]})}},j={render:function(){let[e,t]=(0,C.useState)(!1);return(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`div`,{style:{padding:16},children:(0,w.jsx)(h,{onClick:()=>t(!0),showLabel:!0})}),(0,w.jsxs)(`div`,{style:{padding:24,maxWidth:640},children:[(0,w.jsxs)(`div`,{"data-tour":`payroll.settings.intro`,style:{padding:16,border:`1px solid #e5e7eb`,borderRadius:8,marginBottom:12},children:[(0,w.jsx)(`h2`,{style:{margin:0,fontSize:16,fontWeight:600},children:`Payroll Settings`}),(0,w.jsx)(`p`,{style:{margin:`4px 0 0`,fontSize:13,color:`#6b7280`},children:`Defines company rules before a run can finalize.`})]}),(0,w.jsxs)(`div`,{"data-tour":`payroll.settings.tabs`,style:{padding:16,border:`1px solid #e5e7eb`,borderRadius:8},children:[(0,w.jsx)(`h2`,{style:{margin:0,fontSize:16,fontWeight:600},children:`Tabs`}),(0,w.jsx)(`p`,{style:{margin:`4px 0 0`,fontSize:13,color:`#6b7280`},children:`Finance rules, Statutory (TDS enabled), and TDS slabs.`})]})]}),(0,w.jsx)(m,{open:e,onOpenChange:t,steps:[{target:`[data-tour='payroll.settings.intro']`,title:`Why payroll settings?`,description:`Defines company rules before a run can finalize.`},{target:`[data-tour='payroll.settings.tabs']`,title:`What each tab is for`,description:`Finance rules, Statutory (TDS enabled), and TDS slabs.`,optional:!0}],onComplete:()=>alert(`Tour complete!`)})]})}},M={render:function(){let[e,t]=(0,C.useState)(!1);return(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`div`,{style:{padding:16},children:(0,w.jsx)(h,{onClick:()=>t(!0),showLabel:!0})}),(0,w.jsxs)(`div`,{style:{padding:24,display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:16,maxWidth:600},children:[(0,w.jsx)(`div`,{"data-tour":`side.top`,style:{padding:16,border:`1px solid #e5e7eb`,borderRadius:8},children:(0,w.jsx)(`h3`,{style:{margin:0},children:`Top`})}),(0,w.jsx)(`div`,{"data-tour":`side.right`,style:{padding:16,border:`1px solid #e5e7eb`,borderRadius:8},children:(0,w.jsx)(`h3`,{style:{margin:0},children:`Right`})}),(0,w.jsx)(`div`,{"data-tour":`side.bottom`,style:{padding:16,border:`1px solid #e5e7eb`,borderRadius:8},children:(0,w.jsx)(`h3`,{style:{margin:0},children:`Bottom`})}),(0,w.jsx)(`div`,{"data-tour":`side.left`,style:{padding:16,border:`1px solid #e5e7eb`,borderRadius:8},children:(0,w.jsx)(`h3`,{style:{margin:0},children:`Left`})})]}),(0,w.jsx)(m,{open:e,onOpenChange:t,steps:[{target:`[data-tour='side.top']`,title:`Popover on top`,description:`The popover appears above the target.`,side:`top`},{target:`[data-tour='side.right']`,title:`Popover on the right`,description:`The popover appears to the right of the target.`,side:`right`},{target:`[data-tour='side.bottom']`,title:`Popover below (default)`,description:`The popover appears below the target.`,side:`bottom`},{target:`[data-tour='side.left']`,title:`Popover on the left`,description:`The popover appears to the left of the target.`,side:`left`}],onComplete:()=>alert(`Tour complete!`)})]})}},N={render:function(){let[e,t]=(0,C.useState)(!1);return(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`div`,{style:{padding:16},children:(0,w.jsx)(h,{onClick:()=>t(!0),showLabel:!0})}),E,(0,w.jsx)(m,{open:e,onOpenChange:t,steps:D,nextLabel:`Continue`,backLabel:`Previous`,doneLabel:`Finish`,skipLabel:`Close`,onComplete:()=>alert(`Tour complete!`)})]})}},P={render:function(){let[e,t]=(0,C.useState)(!1);return(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`div`,{style:{padding:16},children:(0,w.jsx)(h,{onClick:()=>t(!0),showLabel:!0})}),(0,w.jsx)(`div`,{style:{padding:24,maxWidth:400},children:(0,w.jsx)(`div`,{"data-tour":`minimal.one`,style:{padding:16,border:`1px solid #e5e7eb`,borderRadius:8},children:(0,w.jsx)(`h2`,{style:{margin:0,fontSize:16,fontWeight:600},children:`Single step`})})}),(0,w.jsx)(m,{open:e,onOpenChange:t,showProgress:!1,skipLabel:`Dismiss`,steps:[{target:`[data-tour='minimal.one']`,title:`One step only`,description:`No progress bar, no back button — just a single tip.`}],onComplete:()=>{}})]})}},F={render:function(){let[e,t]=(0,C.useState)(!1);return(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`div`,{style:{padding:16},children:(0,w.jsx)(h,{onClick:()=>t(!0),showLabel:!0})}),E,(0,w.jsx)(m,{open:e,onOpenChange:t,steps:D,className:`[&_[data-tour-overlay]]:bg-blue-900/60`,backdropClassName:`bg-blue-900/40`,spotlightClassName:`!`,spotlightPadding:6,popoverClassName:`rounded-xl border-2 border-blue-500 bg-white shadow-2xl`,progressClassName:`h-1.5`,progressFillClassName:`bg-blue-500`,skipClassName:`text-blue-600 hover:text-blue-800`,nextClassName:`bg-blue-600 hover:bg-blue-700`,backClassName:`text-blue-600`,onComplete:()=>alert(`Tour complete!`)})]})}},I=[`Default`,`WithOptionalStep`,`Uncontrolled`,`PayrollSettings`,`AllSides`,`CustomLabels`,`Minimal`,`CustomStyling`],O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: function DefaultRender() {
    const [open, setOpen] = useState(false);
    return <div>
        <div style={{
        padding: 16
      }}>
          <TourTrigger onClick={() => setOpen(true)} showLabel />
        </div>
        {demoTargets}
        <Tour open={open} onOpenChange={setOpen} steps={steps} onComplete={() => alert("Tour complete!")} onSkip={() => alert("Tour skipped.")} />
      </div>;
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: function WithOptionalRender() {
    const [open, setOpen] = useState(false);
    return <div>
        <div style={{
        padding: 16
      }}>
          <TourTrigger onClick={() => setOpen(true)} showLabel />
        </div>
        {demoTargets}
        <Tour open={open} onOpenChange={setOpen} steps={[...steps, {
        target: "[data-tour='nonexistent']",
        title: "Optional step",
        description: "This target doesn't exist, so this step is skipped.",
        optional: true
      }]} onComplete={() => alert("Tour complete!")} />
      </div>;
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: function UncontrolledRender() {
    return <div>
        <div style={{
        padding: 16
      }}>
          <TourTrigger onClick={() => startTour(steps, {
          onComplete: () => alert("Tour complete!")
        })} showLabel />
        </div>
        {demoTargets}
      </div>;
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: function PayrollRender() {
    const [open, setOpen] = useState(false);
    return <div>
        <div style={{
        padding: 16
      }}>
          <TourTrigger onClick={() => setOpen(true)} showLabel />
        </div>
        <div style={{
        padding: 24,
        maxWidth: 640
      }}>
          <div data-tour="payroll.settings.intro" style={{
          padding: 16,
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          marginBottom: 12
        }}>
            <h2 style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 600
          }}>Payroll Settings</h2>
            <p style={{
            margin: "4px 0 0",
            fontSize: 13,
            color: "#6b7280"
          }}>Defines company rules before a run can finalize.</p>
          </div>
          <div data-tour="payroll.settings.tabs" style={{
          padding: 16,
          border: "1px solid #e5e7eb",
          borderRadius: 8
        }}>
            <h2 style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 600
          }}>Tabs</h2>
            <p style={{
            margin: "4px 0 0",
            fontSize: 13,
            color: "#6b7280"
          }}>Finance rules, Statutory (TDS enabled), and TDS slabs.</p>
          </div>
        </div>
        <Tour open={open} onOpenChange={setOpen} steps={[{
        target: "[data-tour='payroll.settings.intro']",
        title: "Why payroll settings?",
        description: "Defines company rules before a run can finalize."
      }, {
        target: "[data-tour='payroll.settings.tabs']",
        title: "What each tab is for",
        description: "Finance rules, Statutory (TDS enabled), and TDS slabs.",
        optional: true
      }]} onComplete={() => alert("Tour complete!")} />
      </div>;
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: function AllSidesRender() {
    const [open, setOpen] = useState(false);
    return <div>
        <div style={{
        padding: 16
      }}>
          <TourTrigger onClick={() => setOpen(true)} showLabel />
        </div>
        <div style={{
        padding: 24,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
        maxWidth: 600
      }}>
          <div data-tour="side.top" style={{
          padding: 16,
          border: "1px solid #e5e7eb",
          borderRadius: 8
        }}>
            <h3 style={{
            margin: 0
          }}>Top</h3>
          </div>
          <div data-tour="side.right" style={{
          padding: 16,
          border: "1px solid #e5e7eb",
          borderRadius: 8
        }}>
            <h3 style={{
            margin: 0
          }}>Right</h3>
          </div>
          <div data-tour="side.bottom" style={{
          padding: 16,
          border: "1px solid #e5e7eb",
          borderRadius: 8
        }}>
            <h3 style={{
            margin: 0
          }}>Bottom</h3>
          </div>
          <div data-tour="side.left" style={{
          padding: 16,
          border: "1px solid #e5e7eb",
          borderRadius: 8
        }}>
            <h3 style={{
            margin: 0
          }}>Left</h3>
          </div>
        </div>
        <Tour open={open} onOpenChange={setOpen} steps={[{
        target: "[data-tour='side.top']",
        title: "Popover on top",
        description: "The popover appears above the target.",
        side: "top"
      }, {
        target: "[data-tour='side.right']",
        title: "Popover on the right",
        description: "The popover appears to the right of the target.",
        side: "right"
      }, {
        target: "[data-tour='side.bottom']",
        title: "Popover below (default)",
        description: "The popover appears below the target.",
        side: "bottom"
      }, {
        target: "[data-tour='side.left']",
        title: "Popover on the left",
        description: "The popover appears to the left of the target.",
        side: "left"
      }]} onComplete={() => alert("Tour complete!")} />
      </div>;
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: function CustomLabelsRender() {
    const [open, setOpen] = useState(false);
    return <div>
        <div style={{
        padding: 16
      }}>
          <TourTrigger onClick={() => setOpen(true)} showLabel />
        </div>
        {demoTargets}
        <Tour open={open} onOpenChange={setOpen} steps={steps} nextLabel="Continue" backLabel="Previous" doneLabel="Finish" skipLabel="Close" onComplete={() => alert("Tour complete!")} />
      </div>;
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: function MinimalRender() {
    const [open, setOpen] = useState(false);
    return <div>
        <div style={{
        padding: 16
      }}>
          <TourTrigger onClick={() => setOpen(true)} showLabel />
        </div>
        <div style={{
        padding: 24,
        maxWidth: 400
      }}>
          <div data-tour="minimal.one" style={{
          padding: 16,
          border: "1px solid #e5e7eb",
          borderRadius: 8
        }}>
            <h2 style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 600
          }}>Single step</h2>
          </div>
        </div>
        <Tour open={open} onOpenChange={setOpen} showProgress={false} skipLabel="Dismiss" steps={[{
        target: "[data-tour='minimal.one']",
        title: "One step only",
        description: "No progress bar, no back button — just a single tip."
      }]} onComplete={() => {}} />
      </div>;
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: function CustomStylingRender() {
    const [open, setOpen] = useState(false);
    return <div>
        <div style={{
        padding: 16
      }}>
          <TourTrigger onClick={() => setOpen(true)} showLabel />
        </div>
        {demoTargets}
        <Tour open={open} onOpenChange={setOpen} steps={steps} className="[&_[data-tour-overlay]]:bg-blue-900/60" backdropClassName="bg-blue-900/40" spotlightClassName="!" spotlightPadding={6} popoverClassName="rounded-xl border-2 border-blue-500 bg-white shadow-2xl" progressClassName="h-1.5" progressFillClassName="bg-blue-500" skipClassName="text-blue-600 hover:text-blue-800" nextClassName="bg-blue-600 hover:bg-blue-700" backClassName="text-blue-600" onComplete={() => alert("Tour complete!")} />
      </div>;
  }
}`,...F.parameters?.docs?.source}}}})))()}L();export{M as AllSides,N as CustomLabels,F as CustomStyling,O as Default,P as Minimal,j as PayrollSettings,A as Uncontrolled,k as WithOptionalStep,I as __namedExportsOrder,T as default};