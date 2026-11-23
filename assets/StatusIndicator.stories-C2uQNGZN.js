import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./cn-B3YN0wfp.js";import{n as i,t as a}from"./dist-C2cotSPy.js";function o({label:e,status:t=`neutral`,pulse:n=!1,className:i}){return(0,s.jsxs)(`span`,{className:r(`inline-flex items-center gap-2 text-sm`,i),children:[(0,s.jsxs)(`span`,{className:`relative flex h-2.5 w-2.5`,children:[n?(0,s.jsx)(`span`,{className:r(`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60`,c({status:t}))}):null,(0,s.jsx)(`span`,{className:r(`relative`,c({status:t}))})]}),(0,s.jsx)(`span`,{children:e})]})}var s,c;function l(){return(l=e((()=>{i(),n(),s=t(),c=a(`inline-block h-2.5 w-2.5 shrink-0 rounded-full`,{variants:{status:{success:`bg-emerald-500`,warning:`bg-amber-500`,danger:`bg-destructive`,info:`bg-sky-500`,neutral:`bg-muted-foreground`}},defaultVariants:{status:`neutral`}}),o.displayName=`StatusIndicator`,o.__docgenInfo={description:``,methods:[],displayName:`StatusIndicator`,props:{label:{required:!0,tsType:{name:`ReactNode`},description:``},pulse:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``},status:{defaultValue:{value:`"neutral"`,computed:!1},required:!1}},composes:[`VariantProps`]}})))()}var u,d,f,p;function m(){return(m=e((()=>{l(),u={title:`Components/StatusIndicator`,component:o},d={args:{label:`Operational`,status:`success`}},f={args:{label:`Live`,status:`danger`,pulse:!0}},p=[`Default`,`Pulsing`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Operational",
    status: "success"
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Live",
    status: "danger",
    pulse: true
  }
}`,...f.parameters?.docs?.source}}}})))()}m();export{d as Default,f as Pulsing,p as __namedExportsOrder,u as default};