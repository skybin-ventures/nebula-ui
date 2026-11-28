import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{f as n}from"./iframe-Cq38_uAt.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./Button-vVz-IwGO.js";import{a as o,c as s,i as c,n as l,o as u,r as d,s as f,t as p}from"./toast-Ts8LZa1g.js";function m({onDone:e}){let[t,n]=h.useState(!0);return(0,g.jsxs)(p,{open:t,onOpenChange:e?n:void 0,duration:e?4e3:1/0,children:[e?(0,g.jsx)(l,{altText:`Undo`,onClick:e,children:`Undo`}):null,(0,g.jsx)(u,{children:`You have a new message.`}),(0,g.jsx)(c,{children:`from the Radix toast primitive · just now`}),(0,g.jsx)(d,{})]})}var h,g,_,v,y,b,x,S;function C(){return(C=t((()=>{h=e(n(),1),i(),s(),g=r(),_={title:`Feedback/Toast`,parameters:{layout:`centered`},decorators:[e=>(0,g.jsx)(`div`,{className:`relative h-[300px] w-full`,children:(0,g.jsxs)(o,{children:[(0,g.jsx)(`div`,{className:`flex flex-wrap justify-end gap-2 p-4`,children:(0,g.jsx)(e,{})}),(0,g.jsx)(f,{className:`top-4 bottom-auto`})]})})]},v={render:()=>(0,g.jsx)(m,{})},y={render:()=>(0,g.jsx)(m,{onDone:()=>{}})},b={render:()=>(0,g.jsxs)(p,{variant:`destructive`,children:[(0,g.jsx)(u,{children:`Something went wrong.`}),(0,g.jsx)(c,{children:`Your session expired. Please log in again.`}),(0,g.jsx)(d,{})]})},x={render:()=>(0,g.jsx)(`div`,{className:`w-full max-w-md`,children:(0,g.jsxs)(p,{children:[(0,g.jsx)(l,{altText:`Retry`,asChild:!0,children:(0,g.jsx)(a,{size:`sm`,variant:`outline`,children:`Retry`})}),(0,g.jsx)(u,{children:`Upload failed.`}),(0,g.jsx)(c,{children:`The network timed out after 30 seconds.`}),(0,g.jsx)(d,{})]})})},S=[`Static`,`AutoDismiss`,`Destructive`,`WithButton`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <ToastDemo />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <ToastDemo onDone={() => {}} />
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Toast variant="destructive">
      <ToastTitle>Something went wrong.</ToastTitle>
      <ToastDescription>Your session expired. Please log in again.</ToastDescription>
      <ToastClose />
    </Toast>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-md">
      <Toast>
        <ToastAction altText="Retry" asChild>
          <Button size="sm" variant="outline">
            Retry
          </Button>
        </ToastAction>
        <ToastTitle>Upload failed.</ToastTitle>
        <ToastDescription>The network timed out after 30 seconds.</ToastDescription>
        <ToastClose />
      </Toast>
    </div>
}`,...x.parameters?.docs?.source}}}})))()}C();export{y as AutoDismiss,b as Destructive,v as Static,x as WithButton,S as __namedExportsOrder,_ as default};