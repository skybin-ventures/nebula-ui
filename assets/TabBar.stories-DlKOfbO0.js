import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./cn-BksUxDMQ.js";import{n as i,t as a}from"./useControllableState-XhQ54qg8.js";function o({items:e,value:t,defaultValue:n,onChange:a,className:o,"aria-label":c=`Filter tabs`}){let[l,u]=i(t,n??e[0]?.value??``,a);return(0,s.jsx)(`div`,{role:`tablist`,"aria-label":c,className:r(`inline-flex items-center gap-1 rounded-lg border bg-muted/40 p-1`,o),children:e.map(e=>{let t=e.value===l;return(0,s.jsx)(`button`,{type:`button`,role:`tab`,"aria-selected":t,disabled:e.disabled,className:r(`rounded-md px-3 py-1.5 text-sm transition-colors`,t?`bg-background text-foreground shadow-sm`:`text-muted-foreground hover:text-foreground`,e.disabled&&`cursor-not-allowed opacity-50`),onClick:()=>u(e.value),children:e.label},e.value)})})}var s;function c(){return(c=e((()=>{n(),a(),s=t(),o.displayName=`TabBar`,o.__docgenInfo={description:`Segmented filter tabs (not content Tabs).`,methods:[],displayName:`TabBar`,props:{items:{required:!0,tsType:{name:`Array`,elements:[{name:`TabBarItem`}],raw:`TabBarItem[]`},description:``},value:{required:!1,tsType:{name:`string`},description:``},defaultValue:{required:!1,tsType:{name:`string`},description:``},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: string) => void`,signature:{arguments:[{type:{name:`string`},name:`value`}],return:{name:`void`}}},description:``},className:{required:!1,tsType:{name:`string`},description:``},"aria-label":{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"Filter tabs"`,computed:!1}}}}})))()}var l,u,d;function f(){return(f=e((()=>{c(),l={title:`Components/TabBar`,component:o},u={args:{defaultValue:`all`,items:[{value:`all`,label:`All`},{value:`active`,label:`Active`},{value:`archived`,label:`Archived`}]}},d=[`Default`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: "all",
    items: [{
      value: "all",
      label: "All"
    }, {
      value: "active",
      label: "Active"
    }, {
      value: "archived",
      label: "Archived"
    }]
  }
}`,...u.parameters?.docs?.source}}}})))()}f();export{u as Default,d as __namedExportsOrder,l as default};