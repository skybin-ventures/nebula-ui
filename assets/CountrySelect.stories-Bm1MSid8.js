import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Button-C78C7-DY.js";import{c as i,s as a}from"./FieldLayout-CtLfyMDe.js";import{n as o,t as s}from"./CountrySelect-CwRFKnFZ.js";var c,l,u,d,f,p;function m(){return(m=e((()=>{i(),o(),n(),c=t(),l={title:`Form/CountrySelect`,component:s,parameters:{layout:`centered`},tags:[`autodocs`],decorators:[e=>(0,c.jsx)(a,{defaultValues:{country:``},onSubmit:e=>alert(JSON.stringify(e,null,2)),children:(0,c.jsxs)(`div`,{style:{width:`360px`,display:`flex`,flexDirection:`column`,gap:`1rem`},children:[(0,c.jsx)(e,{}),(0,c.jsx)(r,{type:`submit`,children:`Submit`})]})})]},u={args:{name:`country`,label:`Country`,placeholder:`Select a country`,priorityCountries:[`IN`,`US`,`GB`],helperText:`Submitted value is ISO alpha-2 (e.g. IN, US)`}},d={args:{name:`country`,label:`Country`,placeholder:`Select a country`,required:`Please select a country`,priorityCountries:[`IN`,`US`,`GB`]}},f={decorators:[e=>(0,c.jsx)(a,{defaultValues:{country:`IN`},onSubmit:e=>alert(JSON.stringify(e,null,2)),children:(0,c.jsxs)(`div`,{style:{width:`360px`,display:`flex`,flexDirection:`column`,gap:`1rem`},children:[(0,c.jsx)(e,{}),(0,c.jsx)(r,{type:`submit`,children:`Submit`})]})})],args:{name:`country`,label:`Country`,allowClear:!0}},p=[`Default`,`Required`,`Preselected`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    name: "country",
    label: "Country",
    placeholder: "Select a country",
    priorityCountries: ["IN", "US", "GB"],
    helperText: "Submitted value is ISO alpha-2 (e.g. IN, US)"
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    name: "country",
    label: "Country",
    placeholder: "Select a country",
    required: "Please select a country",
    priorityCountries: ["IN", "US", "GB"]
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Form defaultValues={{
    country: "IN"
  }} onSubmit={data => alert(JSON.stringify(data, null, 2))}>
        <div style={{
      width: "360px",
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    }}>
          <Story />
          <Button type="submit">Submit</Button>
        </div>
      </Form>],
  args: {
    name: "country",
    label: "Country",
    allowClear: true
  }
}`,...f.parameters?.docs?.source}}}})))()}m();export{u as Default,f as Preselected,d as Required,p as __namedExportsOrder,l as default};