import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Button-vVz-IwGO.js";import{c as i,s as a}from"./FieldLayout-CygWdrMQ.js";import{n as o,t as s}from"./Checkbox-DNe5DeqB.js";var c,l,u,d,f,p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{i(),o(),n(),c=t(),l={title:`Form/Checkbox`,component:s,parameters:{layout:`centered`},tags:[`autodocs`],decorators:[e=>(0,c.jsx)(a,{defaultValues:{field:!1},onSubmit:()=>{},children:(0,c.jsx)(`div`,{style:{width:`350px`},children:(0,c.jsx)(e,{})})})],argTypes:{size:{control:`select`,options:[`sm`,`md`,`lg`]},required:{control:`boolean`},disabled:{control:`boolean`}}},u={args:{name:`field`,label:`I agree to the terms`}},d={args:{name:`field`,label:`Subscribe to newsletter`,helperText:`Get updates about new features and promotions`}},f={args:{name:`field`,label:`I agree to the terms and conditions`,required:`You must accept the terms to continue`}},p={args:{name:`field`,label:(0,c.jsxs)(`span`,{children:[`I agree to the`,` `,(0,c.jsx)(`a`,{href:`#`,style:{color:`#1890ff`,textDecoration:`underline`},children:`Terms of Service`}),` `,`and`,` `,(0,c.jsx)(`a`,{href:`#`,style:{color:`#1890ff`,textDecoration:`underline`},children:`Privacy Policy`})]}),required:!0}},m={args:{name:`field`,label:`Disabled checkbox`,disabled:!0}},h={args:{name:`field`,label:`Small checkbox`,size:`sm`}},g={args:{name:`field`,label:`Large checkbox`,size:`lg`}},_={args:{name:`field`,label:`Checkbox`},render:()=>(0,c.jsx)(a,{defaultValues:{sm:!1,md:!1,lg:!1},onSubmit:()=>{},children:(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`1rem`},children:[(0,c.jsx)(s,{name:`sm`,label:`Small checkbox`,size:`sm`}),(0,c.jsx)(s,{name:`md`,label:`Medium checkbox`,size:`md`}),(0,c.jsx)(s,{name:`lg`,label:`Large checkbox`,size:`lg`})]})})},v={args:{name:`field`,label:`Option`},render:()=>(0,c.jsx)(a,{defaultValues:{option1:!1,option2:!1,option3:!1,option4:!1},onSubmit:e=>alert(JSON.stringify(e,null,2)),children:(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`0.75rem`,width:`350px`},children:[(0,c.jsx)(s,{name:`option1`,label:`Option 1`}),(0,c.jsx)(s,{name:`option2`,label:`Option 2`}),(0,c.jsx)(s,{name:`option3`,label:`Option 3`}),(0,c.jsx)(s,{name:`option4`,label:`Option 4 (disabled)`,disabled:!0}),(0,c.jsx)(r,{type:`submit`,style:{marginTop:`0.5rem`},children:`Submit`})]})})},y={args:{name:`field`,label:`Terms`},render:()=>(0,c.jsx)(a,{defaultValues:{terms:!1,newsletter:!1},onSubmit:e=>alert(JSON.stringify(e,null,2)),children:(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`1rem`,width:`350px`},children:[(0,c.jsx)(s,{name:`terms`,label:`I agree to the terms and conditions`,required:`You must accept the terms`}),(0,c.jsx)(s,{name:`newsletter`,label:`Subscribe to newsletter`,helperText:`Optional`}),(0,c.jsx)(r,{type:`submit`,children:`Submit`})]})})},b=[`Default`,`WithHelperText`,`Required`,`WithRichLabel`,`Disabled`,`SmallSize`,`LargeSize`,`AllSizes`,`MultipleCheckboxes`,`WithFormSubmit`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'I agree to the terms'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Subscribe to newsletter',
    helperText: 'Get updates about new features and promotions'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'I agree to the terms and conditions',
    required: 'You must accept the terms to continue'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: <span>
        I agree to the{' '}
        <a href="#" style={{
        color: '#1890ff',
        textDecoration: 'underline'
      }}>
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" style={{
        color: '#1890ff',
        textDecoration: 'underline'
      }}>
          Privacy Policy
        </a>
      </span>,
    required: true
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Disabled checkbox',
    disabled: true
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Small checkbox',
    size: 'sm'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Large checkbox',
    size: 'lg'
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Checkbox'
  },
  render: () => <Form defaultValues={{
    sm: false,
    md: false,
    lg: false
  }} onSubmit={() => {}}>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
        <Checkbox name="sm" label="Small checkbox" size="sm" />
        <Checkbox name="md" label="Medium checkbox" size="md" />
        <Checkbox name="lg" label="Large checkbox" size="lg" />
      </div>
    </Form>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Option'
  },
  render: () => <Form defaultValues={{
    option1: false,
    option2: false,
    option3: false,
    option4: false
  }} onSubmit={data => alert(JSON.stringify(data, null, 2))}>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      width: '350px'
    }}>
        <Checkbox name="option1" label="Option 1" />
        <Checkbox name="option2" label="Option 2" />
        <Checkbox name="option3" label="Option 3" />
        <Checkbox name="option4" label="Option 4 (disabled)" disabled />
        <Button type="submit" style={{
        marginTop: '0.5rem'
      }}>Submit</Button>
      </div>
    </Form>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Terms'
  },
  render: () => <Form defaultValues={{
    terms: false,
    newsletter: false
  }} onSubmit={data => alert(JSON.stringify(data, null, 2))}>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '350px'
    }}>
        <Checkbox name="terms" label="I agree to the terms and conditions" required="You must accept the terms" />
        <Checkbox name="newsletter" label="Subscribe to newsletter" helperText="Optional" />
        <Button type="submit">Submit</Button>
      </div>
    </Form>
}`,...y.parameters?.docs?.source}}}})))()}x();export{_ as AllSizes,u as Default,m as Disabled,g as LargeSize,v as MultipleCheckboxes,f as Required,h as SmallSize,y as WithFormSubmit,d as WithHelperText,p as WithRichLabel,b as __namedExportsOrder,l as default};