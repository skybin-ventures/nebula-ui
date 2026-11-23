import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{f as t}from"./iframe-D9grtZeD.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Button-C78C7-DY.js";function a(){return typeof window>`u`?`light`:window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`}function o(e){let t=document.documentElement;t.classList.toggle(`dark`,e===`dark`),t.style.colorScheme=e}function s({children:e,defaultTheme:t=`system`,storageKey:n=d}){let[r,i]=(0,l.useState)(()=>{if(typeof window>`u`||n===!1)return t;let e=window.localStorage.getItem(n);return e===`light`||e===`dark`||e===`system`?e:t}),[s,c]=(0,l.useState)(a);(0,l.useEffect)(()=>{let e=window.matchMedia(`(prefers-color-scheme: dark)`),t=()=>c(e.matches?`dark`:`light`);return t(),e.addEventListener(`change`,t),()=>e.removeEventListener(`change`,t)},[]);let p=r===`system`?s:r;(0,l.useEffect)(()=>{o(p)},[p]);let m=(0,l.useCallback)(e=>{i(e),n!==!1&&typeof window<`u`&&window.localStorage.setItem(n,e)},[n]),h=(0,l.useMemo)(()=>({theme:r,resolvedTheme:p,setTheme:m}),[r,p,m]);return(0,u.jsx)(f.Provider,{value:h,children:e})}function c(){let e=(0,l.useContext)(f);if(!e)throw Error(`useTheme must be used within <NebulaTheme>`);return e}var l,u,d,f;function p(){return(p=e((()=>{l=t(),u=n(),d=`nebula-ui-theme`,f=(0,l.createContext)(null),s.__docgenInfo={description:``,methods:[],displayName:`NebulaTheme`,props:{children:{required:!0,tsType:{name:`ReactNode`},description:``},defaultTheme:{required:!1,tsType:{name:`union`,raw:`"light" | "dark" | "system"`,elements:[{name:`literal`,value:`"light"`},{name:`literal`,value:`"dark"`},{name:`literal`,value:`"system"`}]},description:'Initial theme before storage / system resolution. Default: `"system"`.',defaultValue:{value:`"system"`,computed:!1}},storageKey:{required:!1,tsType:{name:`union`,raw:`string | false`,elements:[{name:`string`},{name:`literal`,value:`false`}]},description:"Persist preference to localStorage. Default: `true`.",defaultValue:{value:`"nebula-ui-theme"`,computed:!1}},attribute:{required:!1,tsType:{name:`literal`,value:`"class"`},description:'Attribute/class applied for dark mode. Default: class `"dark"` on `documentElement`.'}}}})))()}function m(){let{theme:e,resolvedTheme:t,setTheme:n}=c();return(0,h.jsxs)(`div`,{className:`space-y-2`,children:[(0,h.jsxs)(i,{variant:`outline`,onClick:()=>n(e===`dark`?`light`:`dark`),children:[`Switch to `,e===`dark`?`light`:`dark`,` mode`]}),(0,h.jsxs)(`p`,{className:`text-xs text-muted-foreground`,children:[`Theme: `,e,` (resolved: `,t,`)`]})]})}var h,g,_,v,y,b;function x(){return(x=e((()=>{p(),r(),h=n(),g={title:`Components/Theme`,parameters:{layout:`centered`}},_={render:()=>(0,h.jsx)(s,{children:(0,h.jsxs)(`div`,{className:`space-y-3`,children:[(0,h.jsx)(m,{}),(0,h.jsxs)(`div`,{className:`rounded-md border p-4 text-sm`,children:[`Content wrapped by `,(0,h.jsx)(`code`,{children:`<NebulaTheme>`}),` — toggling updates the `,(0,h.jsx)(`code`,{children:`dark`}),` class on `,(0,h.jsx)(`code`,{children:`document.documentElement`}),`.`]})]})})},v={render:()=>(0,h.jsx)(s,{storageKey:!1,children:(0,h.jsxs)(`div`,{className:`space-y-3`,children:[(0,h.jsx)(m,{}),(0,h.jsx)(`p`,{className:`text-xs text-muted-foreground`,children:`Preferences are not persisted to localStorage.`})]})})},y={render:()=>(0,h.jsx)(s,{defaultTheme:`dark`,children:(0,h.jsxs)(`div`,{className:`space-y-3`,children:[(0,h.jsx)(m,{}),(0,h.jsx)(`p`,{className:`text-xs text-muted-foreground`,children:`Starts in dark mode.`})]})})},b=[`Default`,`NoStorage`,`DefaultDark`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <NebulaTheme>
      <div className="space-y-3">
        <ThemePicker />
        <div className="rounded-md border p-4 text-sm">
          Content wrapped by <code>{"<NebulaTheme>"}</code> — toggling updates
          the <code>dark</code> class on <code>document.documentElement</code>.
        </div>
      </div>
    </NebulaTheme>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <NebulaTheme storageKey={false}>
      <div className="space-y-3">
        <ThemePicker />
        <p className="text-xs text-muted-foreground">
          Preferences are not persisted to localStorage.
        </p>
      </div>
    </NebulaTheme>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <NebulaTheme defaultTheme="dark">
      <div className="space-y-3">
        <ThemePicker />
        <p className="text-xs text-muted-foreground">Starts in dark mode.</p>
      </div>
    </NebulaTheme>
}`,...y.parameters?.docs?.source}}}})))()}x();export{_ as Default,y as DefaultDark,v as NoStorage,b as __namedExportsOrder,g as default};