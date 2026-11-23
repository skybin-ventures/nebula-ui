import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{f as t}from"./iframe-DeOB6YXf.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Button-mFzRuj6K.js";import{a,c as o,i as s,n as c,o as l,r as u,s as d,t as f,u as p}from"./alert-dialog-CgzOp0tc.js";function m({open:e=!1,onOpenChange:t,onConfirm:n,onCancel:r,title:i=`Are you sure?`,description:p=`This action cannot be undone.`,confirmLabel:m=`Confirm`,cancelLabel:h=`Cancel`,variant:g=`default`,loading:_=!1,disabled:y=!1,className:b}){return(0,v.jsx)(f,{open:e,onOpenChange:t,children:(0,v.jsxs)(s,{className:b,children:[(0,v.jsxs)(d,{children:[(0,v.jsx)(o,{children:i}),(0,v.jsx)(a,{children:p})]}),(0,v.jsxs)(l,{children:[(0,v.jsx)(u,{disabled:y||_,onClick:r,children:h}),(0,v.jsx)(c,{disabled:y||_,className:g===`destructive`?`bg-destructive text-destructive-foreground hover:bg-destructive/90`:void 0,onClick:n,children:_?`Working…`:m})]})]})})}function h({children:e}){let[t,n]=(0,_.useState)({open:!1}),r=(0,_.useRef)(void 0),i=(0,_.useCallback)(e=>new Promise(t=>{r.current=t,n({title:e?.title,description:e?.description,confirmLabel:e?.confirmLabel,cancelLabel:e?.cancelLabel,variant:e?.variant,loading:e?.loading,open:!0})}),[]),a=e=>{r.current?.(e),r.current=void 0,n(e=>({...e,open:!1}))},o=(0,_.useMemo)(()=>i,[i]);return(0,v.jsxs)(y.Provider,{value:o,children:[e,(0,v.jsx)(m,{open:t.open,title:t.title,description:t.description,confirmLabel:t.confirmLabel,cancelLabel:t.cancelLabel,variant:t.variant,loading:t.loading,onOpenChange:e=>{e||a(!1)},onConfirm:()=>a(!0),onCancel:()=>a(!1)})]})}function g(){let e=(0,_.useContext)(y);if(!e)throw Error(`useConfirm must be used within ConfirmProvider`);return e}var _,v,y;function b(){return(b=e((()=>{_=t(),p(),v=n(),y=(0,_.createContext)(null),m.displayName=`ConfirmDialog`,m.__docgenInfo={description:``,methods:[],displayName:`ConfirmDialog`,props:{open:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},onOpenChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(open: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`open`}],return:{name:`void`}}},description:``},onConfirm:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onCancel:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},title:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"Are you sure?"`,computed:!1}},description:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"This action cannot be undone."`,computed:!1}},confirmLabel:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"Confirm"`,computed:!1}},cancelLabel:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"Cancel"`,computed:!1}},variant:{required:!1,tsType:{name:`union`,raw:`"default" | "destructive"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"destructive"`}]},description:``,defaultValue:{value:`"default"`,computed:!1}},loading:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``},children:{required:!1,tsType:{name:`ReactNode`},description:``}}},h.__docgenInfo={description:``,methods:[],displayName:`ConfirmProvider`,props:{children:{required:!0,tsType:{name:`ReactNode`},description:``}}}})))()}function x(){let e=g();return(0,C.jsx)(i,{type:`button`,onClick:async()=>{await e({title:`Continue?`})},children:`Ask`})}var S,C,w,T,E,D,O,k,A,j,M;function N(){return(N=e((()=>{S=t(),r(),b(),C=n(),w={title:`Components/ConfirmDialog`,component:m},T={args:{open:!0,title:`Delete file?`}},E={render:function(){let[e,t]=(0,S.useState)(!0);return(0,C.jsx)(m,{open:e,onOpenChange:t})}},D={args:{open:!0,disabled:!0}},O={args:{open:!0,loading:!0}},k={args:{open:!0,description:``}},A={args:{open:!0,variant:`destructive`,title:`Delete workspace?`}},j={render:()=>(0,C.jsx)(h,{children:(0,C.jsx)(x,{})})},M=[`Default`,`Controlled`,`Disabled`,`Loading`,`Empty`,`Error`,`WithHook`],T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    title: "Delete file?"
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [open, setOpen] = useState(true);
    return <ConfirmDialog open={open} onOpenChange={setOpen} />;
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    disabled: true
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    loading: true
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    description: ""
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    variant: "destructive",
    title: "Delete workspace?"
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <ConfirmProvider>\r
      <ConfirmButton />\r
    </ConfirmProvider>
}`,...j.parameters?.docs?.source}}}})))()}N();export{E as Controlled,T as Default,D as Disabled,k as Empty,A as Error,O as Loading,j as WithHook,M as __namedExportsOrder,w as default};