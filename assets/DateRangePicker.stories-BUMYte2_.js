import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{f as t}from"./iframe-DeOB6YXf.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Button-mFzRuj6K.js";import{c as a,d as o,f as s,l as c,n as l,p as u,s as d,t as f,u as p}from"./FieldLayout-DE2tcXt4.js";import{n as m,t as h}from"./DateRangePicker-Cumj_oTZ.js";function g({name:e,label:t,helperText:n,showError:r=!0,error:i,fullWidth:a=!0,placeholder:o,disabled:l,loading:d,className:p,id:m,control:g,required:y,validate:b}){let x=(0,_.useId)(),S=m??x,C=(0,_.useContext)(c),w=C??{},T=u(),E=g??T?.control,D=C?.registerFieldValidation,O=C?.unregisterFieldValidation;(0,_.useEffect)(()=>{if(!D)return;let t={};return y!==void 0&&(t.required=y),b!==void 0&&(t.validate=b),D({name:e,type:`object`,rules:t}),()=>{O?.(e)}},[D,O,e,y,b]);let{field:k,fieldState:A}=s({name:e,control:E}),j=A.error?.message,M=i??j,N=k.value??{};return(0,v.jsx)(f,{inputId:S,label:t,required:!!y,helperText:n,errorMessage:r?M:void 0,showError:r,fullWidth:a,formConfig:w,children:(0,v.jsx)(h,{id:S,value:N,onChange:k.onChange,placeholder:o,disabled:l??w.disabled,loading:d,className:p,"aria-invalid":!!M,"aria-describedby":M?`${S}-error`:n?`${S}-helper`:void 0})})}var _,v;function y(){return(y=e((()=>{_=t(),o(),p(),l(),m(),v=n(),g.displayName=`FormDateRangePicker`,g.__docgenInfo={description:``,methods:[],displayName:`FormDateRangePicker`,props:{name:{required:!0,tsType:{name:`TName`},description:``},label:{required:!1,tsType:{name:`string`},description:``},helperText:{required:!1,tsType:{name:`string`},description:``},showError:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},error:{required:!1,tsType:{name:`string`},description:``},fullWidth:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},placeholder:{required:!1,tsType:{name:`string`},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``},loading:{required:!1,tsType:{name:`boolean`},description:``},className:{required:!1,tsType:{name:`string`},description:``},id:{required:!1,tsType:{name:`string`},description:``},control:{required:!1,tsType:{name:`Control`,elements:[{name:`TFieldValues`},{name:`any`},{name:`any`}],raw:`Control<TFieldValues, any, any>`},description:``},required:{required:!1,tsType:{name:`union`,raw:`boolean | string`,elements:[{name:`boolean`},{name:`string`}]},description:``},validate:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: unknown) => boolean | string | Promise<boolean | string>`,signature:{arguments:[{type:{name:`unknown`},name:`value`}],return:{name:`union`,raw:`boolean | string | Promise<boolean | string>`,elements:[{name:`boolean`},{name:`string`},{name:`Promise`,elements:[{name:`union`,raw:`boolean | string`,elements:[{name:`boolean`},{name:`string`}]}],raw:`Promise<boolean | string>`}]}}},description:``}}}})))()}var b,x,S,C,w,T,E,D,O,k,A;function j(){return(j=e((()=>{b=t(),a(),r(),m(),y(),x=n(),S={title:`Components/DateRangePicker`,component:h},C={},w={render:function(){let[e,t]=(0,b.useState)({from:new Date(2026,8,1),to:new Date(2026,8,10)});return(0,x.jsx)(h,{value:e,onChange:t})}},T={args:{disabled:!0}},E={args:{loading:!0}},D={args:{value:{}}},O={args:{"aria-invalid":!0}},k={render:()=>(0,x.jsxs)(d,{defaultValues:{trip:{from:void 0,to:void 0}},onSubmit:e=>console.log(e),config:{colon:!1},children:[(0,x.jsx)(g,{name:`trip`,label:`Trip dates`,required:!0}),(0,x.jsx)(i,{type:`submit`,className:`mt-4`,children:`Save`})]})},A=[`Default`,`Controlled`,`Disabled`,`Loading`,`Empty`,`Error`,`InForm`],C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [value, setValue] = useState<DateRangeValue>({
      from: new Date(2026, 8, 1),
      to: new Date(2026, 8, 10)
    });
    return <DateRangePicker value={value} onChange={setValue} />;
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    value: {}
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    "aria-invalid": true
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <Form defaultValues={{
    trip: {
      from: undefined,
      to: undefined
    }
  }} onSubmit={data => console.log(data)} config={{
    colon: false
  }}>\r
      <FormDateRangePicker name="trip" label="Trip dates" required />\r
      <Button type="submit" className="mt-4">\r
        Save\r
      </Button>\r
    </Form>
}`,...k.parameters?.docs?.source}}}})))()}j();export{w as Controlled,C as Default,T as Disabled,D as Empty,O as Error,k as InForm,E as Loading,A as __namedExportsOrder,S as default};