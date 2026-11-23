import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Button-C78C7-DY.js";import{c as i,s as a}from"./FieldLayout-CtLfyMDe.js";import{n as o,t as s}from"./Select-D6l9-ah5.js";var c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C;function w(){return(w=e((()=>{i(),o(),n(),c=t(),l={title:`Form/Select`,component:s,parameters:{layout:`centered`},tags:[`autodocs`],decorators:[e=>(0,c.jsx)(a,{defaultValues:{field:``},onSubmit:()=>{},children:(0,c.jsx)(`div`,{style:{width:`350px`},children:(0,c.jsx)(e,{})})})],argTypes:{size:{control:`select`,options:[`sm`,`md`,`lg`]},required:{control:`boolean`},disabled:{control:`boolean`}}},u=[{label:`United States`,value:`us`},{label:`Canada`,value:`ca`},{label:`United Kingdom`,value:`uk`},{label:`Australia`,value:`au`},{label:`Germany`,value:`de`},{label:`France`,value:`fr`},{label:`Japan`,value:`jp`}],d={args:{name:`field`,label:`Country`,options:u,placeholder:`Select a country`}},f={args:{name:`field`,label:`Country`,options:u,placeholder:`Select a country`,helperText:`Select your country of residence`}},p={args:{name:`field`,label:`Country`,options:u,placeholder:`Select a country`,required:`Please select a country`}},m={args:{name:`field`,label:`Country`,options:[{label:`United States`,value:`us`},{label:`Canada`,value:`ca`},{label:`United Kingdom (Unavailable)`,value:`uk`,disabled:!0},{label:`Australia`,value:`au`},{label:`Germany (Unavailable)`,value:`de`,disabled:!0}],placeholder:`Select a country`}},h={args:{name:`field`,label:`Country`,options:u,placeholder:`Select a country`,allowClear:!0}},g={args:{name:`field`,label:`Country`,options:u,placeholder:`Select a country`,disabled:!0}},_={args:{name:`field`,label:`Country`,options:u,placeholder:`Select`,size:`sm`}},v={args:{name:`field`,label:`Country`,options:u,placeholder:`Select`,size:`lg`}},y={args:{name:`field`,label:`Country`,options:u,placeholder:`Search a country`,searchable:!0,searchPlaceholder:`Filter countries...`}},b={args:{name:`field`,label:`Country`,options:u,placeholder:`Search a country`,searchable:!0,allowClear:!0}},x={args:{name:`field`,label:`Select`,options:u},render:()=>(0,c.jsx)(a,{defaultValues:{sm:``,md:``,lg:``},onSubmit:()=>{},children:(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`1rem`,width:`350px`},children:[(0,c.jsx)(s,{name:`sm`,label:`Small`,options:u,placeholder:`Select`,size:`sm`}),(0,c.jsx)(s,{name:`md`,label:`Medium`,options:u,placeholder:`Select`,size:`md`}),(0,c.jsx)(s,{name:`lg`,label:`Large`,options:u,placeholder:`Select`,size:`lg`})]})})},S={args:{name:`field`,label:`Country`,options:u},render:()=>(0,c.jsx)(a,{defaultValues:{country:``},onSubmit:e=>alert(JSON.stringify(e,null,2)),children:(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`1rem`,width:`350px`},children:[(0,c.jsx)(s,{name:`country`,label:`Country`,options:u,placeholder:`Select a country`,required:`Please select a country`}),(0,c.jsx)(r,{type:`submit`,children:`Submit`})]})})},C=[`Default`,`WithHelperText`,`Required`,`WithDisabledOptions`,`AllowClear`,`Disabled`,`SmallSize`,`LargeSize`,`Searchable`,`SearchableWithClear`,`AllSizes`,`WithFormSubmit`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country',
    helperText: 'Select your country of residence'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country',
    required: 'Please select a country'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Country',
    options: [{
      label: 'United States',
      value: 'us'
    }, {
      label: 'Canada',
      value: 'ca'
    }, {
      label: 'United Kingdom (Unavailable)',
      value: 'uk',
      disabled: true
    }, {
      label: 'Australia',
      value: 'au'
    }, {
      label: 'Germany (Unavailable)',
      value: 'de',
      disabled: true
    }],
    placeholder: 'Select a country'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country',
    allowClear: true
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country',
    disabled: true
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select',
    size: 'sm'
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select',
    size: 'lg'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Country',
    options: countryOptions,
    placeholder: 'Search a country',
    searchable: true,
    searchPlaceholder: 'Filter countries...'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Country',
    options: countryOptions,
    placeholder: 'Search a country',
    searchable: true,
    allowClear: true
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Select',
    options: countryOptions
  },
  render: () => <Form defaultValues={{
    sm: '',
    md: '',
    lg: ''
  }} onSubmit={() => {}}>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '350px'
    }}>
        <Select name="sm" label="Small" options={countryOptions} placeholder="Select" size="sm" />
        <Select name="md" label="Medium" options={countryOptions} placeholder="Select" size="md" />
        <Select name="lg" label="Large" options={countryOptions} placeholder="Select" size="lg" />
      </div>
    </Form>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Country',
    options: countryOptions
  },
  render: () => <Form defaultValues={{
    country: ''
  }} onSubmit={data => alert(JSON.stringify(data, null, 2))}>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '350px'
    }}>
        <Select name="country" label="Country" options={countryOptions} placeholder="Select a country" required="Please select a country" />
        <Button type="submit">Submit</Button>
      </div>
    </Form>
}`,...S.parameters?.docs?.source}}}})))()}w();export{x as AllSizes,h as AllowClear,d as Default,g as Disabled,v as LargeSize,p as Required,y as Searchable,b as SearchableWithClear,_ as SmallSize,m as WithDisabledOptions,S as WithFormSubmit,f as WithHelperText,C as __namedExportsOrder,l as default};