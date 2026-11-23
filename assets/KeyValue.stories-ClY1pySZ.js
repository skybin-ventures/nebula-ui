import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./cn-B3YN0wfp.js";function i({items:e,className:t,columns:n=1}){return(0,a.jsx)(`dl`,{className:r(`grid gap-x-6 gap-y-3 text-sm`,n===2?`sm:grid-cols-2`:`grid-cols-1`,t),children:e.map((e,t)=>(0,a.jsxs)(`div`,{className:`grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-3`,children:[(0,a.jsx)(`dt`,{className:`text-muted-foreground`,children:e.label}),(0,a.jsx)(`dd`,{className:`font-medium text-foreground`,children:e.value})]},e.key??t))})}var a;function o(){return(o=e((()=>{n(),a=t(),i.displayName=`KeyValue`,i.__docgenInfo={description:``,methods:[],displayName:`KeyValue`,props:{items:{required:!0,tsType:{name:`Array`,elements:[{name:`KeyValueItem`}],raw:`KeyValueItem[]`},description:``},className:{required:!1,tsType:{name:`string`},description:``},columns:{required:!1,tsType:{name:`union`,raw:`1 | 2`,elements:[{name:`literal`,value:`1`},{name:`literal`,value:`2`}]},description:``,defaultValue:{value:`1`,computed:!1}}}}})))()}var s,c,l;function u(){return(u=e((()=>{o(),s={title:`Components/KeyValue`,component:i},c={args:{items:[{label:`Status`,value:`Active`},{label:`Owner`,value:`Ada Lovelace`},{label:`Created`,value:`2026-01-12`}]}},l=[`Default`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      label: "Status",
      value: "Active"
    }, {
      label: "Owner",
      value: "Ada Lovelace"
    }, {
      label: "Created",
      value: "2026-01-12"
    }]
  }
}`,...c.parameters?.docs?.source}}}})))()}u();export{c as Default,l as __namedExportsOrder,s as default};