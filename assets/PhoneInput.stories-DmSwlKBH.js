import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{f as t}from"./iframe-Cq38_uAt.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./cn-B3YN0wfp.js";import{n as a,t as o}from"./dist-C2cotSPy.js";import{n as s,t as c}from"./Button-vVz-IwGO.js";import{c as l,d as u,f as d,l as f,n as p,p as m,s as h,t as g,u as _}from"./FieldLayout-CygWdrMQ.js";import{n as v,t as y}from"./textbox-CC1_JhU5.js";import{a as b,c as x,i as S,n as C,o as ee,r as w,s as T,t as E}from"./CountrySelect-BxjzSs3Z.js";function D(e,t){return e===void 0?null:typeof e==`object`&&e&&`value`in e?e:{value:e,message:t}}function te(e,t,n,r){let i=typeof e==`string`?e:`This field is required`;return async a=>{let o=x(String(a??``))?.nationalNumber??``;if(e!==void 0&&!o)return i;let s=D(t,`Minimum ${typeof t==`number`?t:t?.value} digits required`);if(s&&o.length<s.value)return s.message;let c=D(n,`Maximum ${typeof n==`number`?n:n?.value} digits allowed`);return c&&o.length>c.value?c.message:!r||r(a)}}function O({name:e,label:t,helperText:n,help:r,helpIcon:a,showError:o=!0,error:s,size:c,variant:l,fullWidth:u=!0,placeholder:p=`Mobile number`,disabled:h,className:_,id:v,control:S,defaultCountry:C=`IN`,priorityCountries:T,required:E,minLength:D,maxLength:O,validate:M}){let N=(0,k.useId)(),P=v??N,F=(0,k.useContext)(f),I=F??{},L=m(),R=S??L?.control,z=F?.registerFieldValidation,B=F?.unregisterFieldValidation;(0,k.useLayoutEffect)(()=>{if(z){let t={};return E!==void 0&&(t.required=E),(E!==void 0||D!==void 0||O!==void 0||M!==void 0)&&(t.validate=te(E,D,O,M)),z({name:e,type:`string`,rules:t}),()=>{B?.(e)}}},[z,B,e,E,D,O,M]);let{field:V,fieldState:H}=d({name:e,control:R}),U=(0,k.useMemo)(()=>x(V.value??``),[V.value]),[W,G]=(0,k.useState)(null),K=U?.countryCode??W??C,q=U?.nationalNumber??``,J=H.error?.message,Y=s??J,X=!!Y,Z=c??I.size??`md`,Q=h??I.disabled,ne=X?`error`:l,re=ee(K),$=(e,t)=>{G(e),V.onChange(b(e,t))};return(0,A.jsx)(g,{inputId:P,label:t,required:!!E,helperText:n,help:r,helpIcon:a,errorMessage:o?Y:void 0,showError:o,fullWidth:u,formConfig:I,children:(0,A.jsxs)(`div`,{className:i(`flex items-stretch overflow-hidden rounded-md border border-input bg-card focus-within:ring-2 focus-within:ring-offset-2`,j({size:Z,variant:ne}),_),children:[(0,A.jsx)(w,{compact:!0,value:K,onValueChange:e=>$(e,q),disabled:Q,priorityCountries:T,required:!!E,"aria-invalid":X,"aria-describedby":X?`${P}-error`:n?`${P}-helper`:void 0}),(0,A.jsx)(`div`,{className:`flex items-center border-l px-3 text-sm text-muted-foreground`,children:re}),(0,A.jsx)(y,{id:P,type:`tel`,inputMode:`numeric`,autoComplete:`tel-national`,value:q,onChange:e=>{let t=e.target.value.replace(/\D/g,``);$(K,t)},placeholder:p,disabled:Q,"aria-required":!!E,"aria-invalid":X,"aria-describedby":X?`${P}-error`:n?`${P}-helper`:void 0,className:i(`h-full min-w-0 flex-1 border-0 bg-transparent px-3 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0`)})]})})}var k,A,j;function M(){return(M=e((()=>{k=t(),u(),a(),r(),T(),v(),_(),p(),S(),A=n(),j=o(``,{variants:{size:{sm:`h-8 text-xs`,md:`h-10 text-sm`,lg:`h-12 text-base`},variant:{default:`border-input focus-within:ring-ring`,error:`border-destructive focus-within:ring-destructive`,success:`border-success focus-within:ring-success`}},defaultVariants:{size:`md`,variant:`default`}}),O.displayName=`PhoneInput`,O.__docgenInfo={description:``,methods:[],displayName:`PhoneInput`,props:{name:{required:!0,tsType:{name:`TName`},description:``},label:{required:!1,tsType:{name:`string`},description:``},helperText:{required:!1,tsType:{name:`string`},description:``},help:{required:!1,tsType:{name:`string`},description:`Tooltip copy for the label help icon (shown after the label).`},helpIcon:{required:!1,tsType:{name:`ReactNode`},description:`Optional icon override for the label help control; defaults to lucide Info.`},showError:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},error:{required:!1,tsType:{name:`string`},description:``},fullWidth:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},placeholder:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"Mobile number"`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:``},className:{required:!1,tsType:{name:`string`},description:``},id:{required:!1,tsType:{name:`string`},description:``},control:{required:!1,tsType:{name:`Control`,elements:[{name:`TFieldValues`},{name:`any`},{name:`any`}],raw:`Control<TFieldValues, any, any>`},description:``},defaultCountry:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"IN"`,computed:!1}},priorityCountries:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:``},required:{required:!1,tsType:{name:`union`,raw:`boolean | string`,elements:[{name:`boolean`},{name:`string`}]},description:"Field is required (`true` or custom error message string)"},minLength:{required:!1,tsType:{name:`union`,raw:`T | { value: T; message: string }`,elements:[{name:`number`},{name:`signature`,type:`object`,raw:`{ value: T; message: string }`,signature:{properties:[{key:`value`,value:{name:`number`,required:!0}},{key:`message`,value:{name:`string`,required:!0}}]}}]},description:`Minimum national number length`},maxLength:{required:!1,tsType:{name:`union`,raw:`T | { value: T; message: string }`,elements:[{name:`number`},{name:`signature`,type:`object`,raw:`{ value: T; message: string }`,signature:{properties:[{key:`value`,value:{name:`number`,required:!0}},{key:`message`,value:{name:`string`,required:!0}}]}}]},description:`Maximum national number length`},validate:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: unknown) => boolean | string | Promise<boolean | string>`,signature:{arguments:[{type:{name:`unknown`},name:`value`}],return:{name:`union`,raw:`boolean | string | Promise<boolean | string>`,elements:[{name:`boolean`},{name:`string`},{name:`Promise`,elements:[{name:`union`,raw:`boolean | string`,elements:[{name:`boolean`},{name:`string`}]}],raw:`Promise<boolean | string>`}]}}},description:``}},composes:[`VariantProps`]}})))()}var N,P,F,I,L,R,z;function B(){return(B=e((()=>{l(),M(),C(),s(),N=n(),P={title:`Form/PhoneInput`,component:O,parameters:{layout:`centered`},tags:[`autodocs`],decorators:[e=>(0,N.jsx)(h,{defaultValues:{phone:``},onSubmit:e=>alert(JSON.stringify(e,null,2)),children:(0,N.jsxs)(`div`,{style:{width:`380px`,display:`flex`,flexDirection:`column`,gap:`1rem`},children:[(0,N.jsx)(e,{}),(0,N.jsx)(c,{type:`submit`,children:`Submit`})]})})]},F={args:{name:`phone`,label:`Mobile number`,defaultCountry:`IN`,placeholder:`Enter mobile number`,helperText:`Submitted value is E.164 (e.g. +919876543210)`}},I={args:{name:`phone`,label:`Mobile number`,defaultCountry:`IN`,required:`Please enter your mobile number`,minLength:{value:10,message:`Enter at least 10 digits`},priorityCountries:[`IN`,`US`,`GB`,`AE`]}},L={decorators:[e=>(0,N.jsx)(h,{defaultValues:{phone:`+919876543210`},onSubmit:e=>alert(JSON.stringify(e,null,2)),children:(0,N.jsxs)(`div`,{style:{width:`380px`,display:`flex`,flexDirection:`column`,gap:`1rem`},children:[(0,N.jsx)(e,{}),(0,N.jsx)(c,{type:`submit`,children:`Submit`})]})})],args:{name:`phone`,label:`Mobile number`,defaultCountry:`IN`}},R={args:{name:`phone`,label:`Mobile number`},render:()=>(0,N.jsx)(h,{defaultValues:{country:`IN`,phone:``},onSubmit:e=>alert(JSON.stringify(e,null,2)),children:(0,N.jsxs)(`div`,{style:{width:`400px`,display:`flex`,flexDirection:`column`,gap:`1rem`},children:[(0,N.jsx)(E,{name:`country`,label:`Country`,required:!0,priorityCountries:[`IN`,`US`,`GB`]}),(0,N.jsx)(O,{name:`phone`,label:`Mobile number`,defaultCountry:`IN`,required:`Please enter your mobile number`,minLength:10}),(0,N.jsx)(c,{type:`submit`,children:`Submit contact`})]})})},z=[`Default`,`Required`,`WithExistingValue`,`ContactForm`],F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    name: "phone",
    label: "Mobile number",
    defaultCountry: "IN",
    placeholder: "Enter mobile number",
    helperText: "Submitted value is E.164 (e.g. +919876543210)"
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    name: "phone",
    label: "Mobile number",
    defaultCountry: "IN",
    required: "Please enter your mobile number",
    minLength: {
      value: 10,
      message: "Enter at least 10 digits"
    },
    priorityCountries: ["IN", "US", "GB", "AE"]
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Form defaultValues={{
    phone: "+919876543210"
  }} onSubmit={data => alert(JSON.stringify(data, null, 2))}>
        <div style={{
      width: "380px",
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    }}>
          <Story />
          <Button type="submit">Submit</Button>
        </div>
      </Form>],
  args: {
    name: "phone",
    label: "Mobile number",
    defaultCountry: "IN"
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    name: "phone",
    label: "Mobile number"
  },
  render: () => <Form defaultValues={{
    country: "IN",
    phone: ""
  }} onSubmit={data => alert(JSON.stringify(data, null, 2))}>
      <div style={{
      width: "400px",
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    }}>
        <CountrySelect name="country" label="Country" required priorityCountries={["IN", "US", "GB"]} />
        <PhoneInput name="phone" label="Mobile number" defaultCountry="IN" required="Please enter your mobile number" minLength={10} />
        <Button type="submit">Submit contact</Button>
      </div>
    </Form>
}`,...R.parameters?.docs?.source}}}})))()}B();export{R as ContactForm,F as Default,I as Required,L as WithExistingValue,z as __namedExportsOrder,P as default};