import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./cn-B3YN0wfp.js";import{n as i,t as a}from"./Button-C78C7-DY.js";function o({brand:e,links:t=[],actions:n,className:i}){return(0,s.jsxs)(`header`,{className:r(`flex h-14 items-center gap-4 border-b bg-background px-4`,i),children:[e?(0,s.jsx)(`div`,{className:`shrink-0 font-semibold`,children:e}):null,(0,s.jsx)(`nav`,{className:`flex flex-1 items-center gap-1 overflow-x-auto`,"aria-label":`Primary`,children:t.map((e,t)=>{let n=r(`rounded-md px-3 py-1.5 text-sm transition-colors`,e.active?`bg-accent text-accent-foreground`:`text-muted-foreground hover:bg-accent/60 hover:text-foreground`);return e.href?(0,s.jsx)(`a`,{href:e.href,className:n,"aria-current":e.active?`page`:void 0,children:e.label},t):(0,s.jsx)(`button`,{type:`button`,className:n,"aria-current":e.active?`page`:void 0,onClick:e.onClick,children:e.label},t)})}),n?(0,s.jsx)(`div`,{className:`ml-auto flex shrink-0 items-center gap-2`,children:n}):null]})}var s;function c(){return(c=e((()=>{n(),s=t(),o.displayName=`TopNavigation`,o.__docgenInfo={description:``,methods:[],displayName:`TopNavigation`,props:{brand:{required:!1,tsType:{name:`ReactNode`},description:``},links:{required:!1,tsType:{name:`Array`,elements:[{name:`TopNavigationLink`}],raw:`TopNavigationLink[]`},description:``,defaultValue:{value:`[]`,computed:!1}},actions:{required:!1,tsType:{name:`ReactNode`},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}})))()}var l,u,d,f;function p(){return(p=e((()=>{c(),i(),l=t(),u={title:`Components/TopNavigation`,component:o},d={args:{brand:`Nebula`,links:[{label:`Overview`,href:`#`,active:!0},{label:`Projects`,href:`#`},{label:`Settings`,href:`#`}],actions:(0,l.jsx)(a,{size:`sm`,children:`Sign in`})}},f=[`Default`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    brand: "Nebula",
    links: [{
      label: "Overview",
      href: "#",
      active: true
    }, {
      label: "Projects",
      href: "#"
    }, {
      label: "Settings",
      href: "#"
    }],
    actions: <Button size="sm">Sign in</Button>
  }
}`,...d.parameters?.docs?.source}}}})))()}p();export{d as Default,f as __namedExportsOrder,u as default};