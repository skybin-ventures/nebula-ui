import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{f as t}from"./iframe-DeOB6YXf.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./cn-BksUxDMQ.js";import{n as a,t as o}from"./Button-mFzRuj6K.js";import{n as s,t as c}from"./check-ggwtOoqp.js";import{n as l,t as u}from"./useControllableState-XhQ54qg8.js";function d({steps:e,current:t,defaultCurrent:n=0,onCurrentChange:r,onFinish:a,disabled:s=!1,loading:u=!1,className:d,nextLabel:p=`Next`,backLabel:m=`Back`,finishLabel:h=`Finish`}){let[g,_]=l(t,n,r),v=s||u,y=g>=e.length-1,b=e[g];return(0,f.jsxs)(`div`,{className:i(`space-y-6`,d),children:[(0,f.jsx)(`ol`,{className:`flex flex-wrap gap-3`,"aria-label":`Progress`,children:e.map((e,t)=>{let n=t<g,r=t===g;return(0,f.jsxs)(`li`,{className:`flex items-center gap-2 text-sm`,children:[(0,f.jsx)(`span`,{className:i(`flex h-7 w-7 items-center justify-center rounded-full border text-xs`,r&&`border-primary bg-primary text-primary-foreground`,n&&`border-primary bg-primary/10 text-primary`),"aria-current":r?`step`:void 0,children:n?(0,f.jsx)(c,{className:`h-4 w-4`}):t+1}),(0,f.jsxs)(`span`,{children:[e.label,e.optional?(0,f.jsx)(`span`,{className:`ml-1 text-muted-foreground`,children:`(optional)`}):null]})]},e.id)})}),(0,f.jsx)(`div`,{children:b?.content}),(0,f.jsxs)(`div`,{className:`flex justify-between`,children:[(0,f.jsx)(o,{type:`button`,variant:`outline`,disabled:v||g===0,onClick:()=>_(e=>Math.max(0,e-1)),children:m}),(0,f.jsx)(o,{type:y?`submit`:`button`,loading:u,disabled:v,onClick:()=>{y?a?.():_(t=>Math.min(e.length-1,t+1))},children:y?h:p})]})]})}var f;function p(){return(p=e((()=>{s(),r(),a(),u(),f=n(),d.displayName=`Stepper`,d.__docgenInfo={description:``,methods:[],displayName:`Stepper`,props:{steps:{required:!0,tsType:{name:`Array`,elements:[{name:`StepperStep`}],raw:`StepperStep[]`},description:``},current:{required:!1,tsType:{name:`number`},description:``},defaultCurrent:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`0`,computed:!1}},onCurrentChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(index: number) => void`,signature:{arguments:[{type:{name:`number`},name:`index`}],return:{name:`void`}}},description:``},onFinish:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},loading:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``},nextLabel:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"Next"`,computed:!1}},backLabel:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"Back"`,computed:!1}},finishLabel:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"Finish"`,computed:!1}}}}})))()}var m,h,g,_,v,y,b,x,S,C,w;function T(){return(T=e((()=>{m=t(),p(),h=n(),g=[{id:`one`,label:`Account`,content:(0,h.jsx)(`p`,{children:`Account details`})},{id:`two`,label:`Plan`,content:(0,h.jsx)(`p`,{children:`Choose a plan`})},{id:`three`,label:`Confirm`,content:(0,h.jsx)(`p`,{children:`Review and finish`})}],_={title:`Components/Stepper`,component:d,args:{steps:g}},v={},y={render:function(){let[e,t]=(0,m.useState)(1);return(0,h.jsx)(d,{steps:g,current:e,onCurrentChange:t})}},b={args:{disabled:!0}},x={args:{loading:!0}},S={args:{steps:[]}},C={args:{steps:[{id:`err`,label:`Error`,content:(0,h.jsx)(`p`,{children:`Fix the highlighted fields`})}]}},w=[`Default`,`Controlled`,`Disabled`,`Loading`,`Empty`,`Error`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [current, setCurrent] = useState(1);
    return <Stepper steps={steps} current={current} onCurrentChange={setCurrent} />;
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    steps: []
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    steps: [{
      id: "err",
      label: "Error",
      content: <p>Fix the highlighted fields</p>
    }]
  }
}`,...C.parameters?.docs?.source}}}})))()}T();export{y as Controlled,v as Default,b as Disabled,S as Empty,C as Error,x as Loading,w as __namedExportsOrder,_ as default};