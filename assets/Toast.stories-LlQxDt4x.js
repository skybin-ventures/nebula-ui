import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{f as n}from"./iframe-DeOB6YXf.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./Button-mFzRuj6K.js";import{c as o,i as s,n as c,o as l,r as u,s as d,t as f}from"./toast-C_Oop-gD.js";function p({onDone:e}){let[t,n]=m.useState(!0);return(0,h.jsxs)(f,{open:t,onOpenChange:e?n:void 0,duration:e?4e3:1/0,children:[e?(0,h.jsx)(c,{altText:`Undo`,onClick:e,children:`Undo`}):null,(0,h.jsx)(l,{children:`You have a new message.`}),(0,h.jsx)(s,{children:`from @radix-ui · just now`}),(0,h.jsx)(u,{})]})}var m,h,g,_,v,y,b,x;function S(){return(S=t((()=>{m=e(n(),1),i(),o(),h=r(),g={title:`Feedback/Toast`,parameters:{layout:`centered`},decorators:[e=>(0,h.jsxs)(`div`,{className:`relative h-[300px] w-full`,children:[(0,h.jsx)(`div`,{className:`flex flex-wrap justify-end gap-2 p-4`,children:(0,h.jsx)(e,{})}),(0,h.jsx)(d,{className:`top-4 bottom-auto`})]})]},_={render:()=>(0,h.jsx)(p,{})},v={render:()=>(0,h.jsx)(p,{onDone:()=>{}})},y={render:()=>(0,h.jsxs)(f,{children:[(0,h.jsx)(l,{children:`Something went wrong.`}),(0,h.jsx)(s,{children:`Your session expired. Please log in again.`}),(0,h.jsx)(u,{})]})},b={render:()=>(0,h.jsx)(`div`,{className:`w-full max-w-md`,children:(0,h.jsxs)(f,{children:[(0,h.jsx)(c,{altText:`Retry`,asChild:!0,children:(0,h.jsx)(a,{size:`sm`,variant:`outline`,children:`Retry`})}),(0,h.jsx)(l,{children:`Upload failed.`}),(0,h.jsx)(s,{children:`The network timed out after 30 seconds.`}),(0,h.jsx)(u,{})]})})},x=[`Static`,`AutoDismiss`,`Destructive`,`WithButton`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <ToastDemo />
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <ToastDemo onDone={() => {}} />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Toast>\r
      <ToastTitle>Something went wrong.</ToastTitle>\r
      <ToastDescription>Your session expired. Please log in again.</ToastDescription>\r
      <ToastClose />\r
    </Toast>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-md">\r
      <Toast>\r
        <ToastAction altText="Retry" asChild>\r
          <Button size="sm" variant="outline">\r
            Retry\r
          </Button>\r
        </ToastAction>\r
        <ToastTitle>Upload failed.</ToastTitle>\r
        <ToastDescription>The network timed out after 30 seconds.</ToastDescription>\r
        <ToastClose />\r
      </Toast>\r
    </div>
}`,...b.parameters?.docs?.source}}}})))()}S();export{v as AutoDismiss,y as Destructive,_ as Static,b as WithButton,x as __namedExportsOrder,g as default};