import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{f as t}from"./iframe-Cq38_uAt.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./cn-B3YN0wfp.js";import{n as a,t as o}from"./dist-C2cotSPy.js";import{r as s,t as c}from"./button-DOUBbJXy.js";import{c as l,d as u,f as d,l as f,n as p,p as m,s as h,t as g,u as _}from"./FieldLayout-CygWdrMQ.js";import{n as v,t as y}from"./calendar-DWHbGRzp.js";import{i as b,n as x,r as S,t as C}from"./popover-9CG5d6gK.js";import{a as w,c as T,i as E,n as D,o as O,r as k,s as A,t as j}from"./calendar-BYqrFhnx.js";function M(e){if(!e||e===``)return;let t=e instanceof Date?e:new Date(e);if(!Number.isNaN(t.getTime()))return T(t)}function N({name:e,label:t,helperText:n,help:r,helpIcon:a,showError:o=!0,error:s,size:l,variant:u,fullWidth:p=!0,placeholder:h=`Pick a date`,disabled:_,className:v,id:b,control:E,required:D,validate:O,locale:A=w,formatString:N=`PPP`}){let L=(0,P.useId)(),R=b??L,[z,B]=(0,P.useState)(!1),V=(0,P.useContext)(f),H=V??{},U=m(),W=E??U?.control,G=V?.registerFieldValidation,K=V?.unregisterFieldValidation;(0,P.useLayoutEffect)(()=>{if(G){let t={};return D!==void 0&&(t.required=D),O!==void 0&&(t.validate=O),G({name:e,type:`date`,rules:t}),()=>{K?.(e)}}},[G,K,e,D,O]);let{field:q,fieldState:J}=d({name:e,control:W}),Y=M(q.value),X=J.error?.message,Z=s??X,Q=!!Z,$=l??H.size??`md`,ee=_??H.disabled,te=Q?`error`:u;return(0,F.jsx)(g,{inputId:R,label:t,required:!!D,helperText:n,help:r,helpIcon:a,errorMessage:o?Z:void 0,showError:o,fullWidth:p,formConfig:H,children:(0,F.jsxs)(C,{open:z,onOpenChange:B,children:[(0,F.jsx)(S,{asChild:!0,children:(0,F.jsxs)(c,{id:R,type:`button`,variant:`outline`,disabled:ee,"aria-invalid":Q,"aria-describedby":Q?`${R}-error`:n?`${R}-helper`:void 0,className:i(I({size:$,variant:te}),!Y&&`text-muted-foreground`,v),children:[(0,F.jsx)(y,{className:`mr-2 h-4 w-4`}),Y?k(Y,N,{locale:A}):h]})}),(0,F.jsx)(x,{className:`w-auto p-0`,align:`start`,children:(0,F.jsx)(j,{mode:`single`,locale:A,selected:Y,onSelect:e=>{q.onChange(e?T(e):``),B(!1)}})})]})})}var P,F,I;function L(){return(L=e((()=>{P=t(),E(),A(),O(),v(),u(),a(),r(),s(),D(),b(),_(),p(),F=n(),I=o(`w-full justify-start text-left font-normal`,{variants:{size:{sm:`h-8 text-xs`,md:`h-10 text-sm`,lg:`h-12 text-base`},variant:{default:`border-input`,error:`border-destructive`,success:`border-success`}},defaultVariants:{size:`md`,variant:`default`}}),N.displayName=`DatePicker`,N.__docgenInfo={description:``,methods:[],displayName:`DatePicker`,props:{name:{required:!0,tsType:{name:`TName`},description:``},label:{required:!1,tsType:{name:`string`},description:``},helperText:{required:!1,tsType:{name:`string`},description:``},help:{required:!1,tsType:{name:`string`},description:`Tooltip copy for the label help icon (shown after the label).`},helpIcon:{required:!1,tsType:{name:`ReactNode`},description:`Optional icon override for the label help control; defaults to lucide Info.`},showError:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},error:{required:!1,tsType:{name:`string`},description:``},fullWidth:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},placeholder:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"Pick a date"`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:``},className:{required:!1,tsType:{name:`string`},description:``},id:{required:!1,tsType:{name:`string`},description:``},control:{required:!1,tsType:{name:`Control`,elements:[{name:`TFieldValues`},{name:`any`},{name:`any`}],raw:`Control<TFieldValues, any, any>`},description:``},required:{required:!1,tsType:{name:`union`,raw:`boolean | string`,elements:[{name:`boolean`},{name:`string`}]},description:``},validate:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: unknown) => boolean | string | Promise<boolean | string>`,signature:{arguments:[{type:{name:`unknown`},name:`value`}],return:{name:`union`,raw:`boolean | string | Promise<boolean | string>`,elements:[{name:`boolean`},{name:`string`},{name:`Promise`,elements:[{name:`union`,raw:`boolean | string`,elements:[{name:`boolean`},{name:`string`}]}],raw:`Promise<boolean | string>`}]}}},description:``},locale:{required:!1,tsType:{name:`Locale`},description:`date-fns locale for display formatting (default: enUS)`,defaultValue:{value:`{
  code: "en-US",
  formatDistance: formatDistance,
  formatLong: formatLong,
  formatRelative: formatRelative,
  localize: localize,
  match: match,
  options: {
    weekStartsOn: 0 /* Sunday */,
    firstWeekContainsDate: 1,
  },
}`,computed:!1}},formatString:{required:!1,tsType:{name:`string`},description:`date-fns format string (default: "PPP")`,defaultValue:{value:`"PPP"`,computed:!1}}},composes:[`VariantProps`]}})))()}var R,z,B,V,H,U;function W(){return(W=e((()=>{l(),L(),R=n(),z={title:`Form/DatePicker`,component:N,parameters:{layout:`centered`},decorators:[e=>(0,R.jsx)(h,{defaultValues:{date:``},onSubmit:()=>{},children:(0,R.jsx)(`div`,{style:{width:`350px`},children:(0,R.jsx)(e,{})})})]},B={args:{name:`date`,label:`Date of birth`,placeholder:`Pick a date`}},V={args:{name:`date`,label:`Start date`,placeholder:`Pick a date`,required:`Start date is required`}},H={args:{name:`date`,label:`Locked date`,placeholder:`Pick a date`,disabled:!0}},U=[`Default`,`Required`,`Disabled`],B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    name: "date",
    label: "Date of birth",
    placeholder: "Pick a date"
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    name: "date",
    label: "Start date",
    placeholder: "Pick a date",
    required: "Start date is required"
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    name: "date",
    label: "Locked date",
    placeholder: "Pick a date",
    disabled: true
  }
}`,...H.parameters?.docs?.source}}}})))()}W();export{B as Default,H as Disabled,V as Required,U as __namedExportsOrder,z as default};