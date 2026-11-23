import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Button-mFzRuj6K.js";import{c as i,s as a}from"./FieldLayout-DE2tcXt4.js";import{n as o,t as s}from"./TextBox-BqxfGaLy.js";var c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E;function D(){return(D=e((()=>{i(),o(),n(),c=t(),l={title:`Form/TextBox`,component:s,parameters:{layout:`centered`},tags:[`autodocs`],decorators:[e=>(0,c.jsx)(a,{defaultValues:{field:``},onSubmit:()=>{},children:(0,c.jsx)(`div`,{style:{width:`350px`},children:(0,c.jsx)(e,{})})})],argTypes:{size:{control:`select`,options:[`sm`,`md`,`lg`]},required:{control:`boolean`},disabled:{control:`boolean`}}},u={args:{name:`field`,label:`Username`,placeholder:`Enter username`}},d={args:{name:`field`,label:`Email`,type:`email`,placeholder:`Enter email`,helperText:`We will never share your email`}},f={args:{name:`field`,label:`Username`,placeholder:`Enter username`,required:`This field is required`}},p={args:{name:`field`,label:`Password`,type:`password`,placeholder:`Enter password`,required:!0,minLength:{value:8,message:`Password must be at least 8 characters`}},parameters:{docs:{description:{story:"Password fields include a built-in eye toggle. Pass `passwordToggle={false}` to hide it."}}}},m={args:{name:`field`,label:`Username`,placeholder:`Enter username`,maxLength:{value:20,message:`Username cannot exceed 20 characters`}}},h={args:{name:`field`,label:`Email`,type:`email`,placeholder:`Enter email`,required:!0,email:`Please enter a valid email address`}},g={args:{name:`field`,label:`Website`,placeholder:`https://example.com`,url:`Please enter a valid URL`}},_={args:{name:`field`,label:`Price`,type:`number`,placeholder:`0.00`,prefix:(0,c.jsx)(`span`,{children:`$`})}},v={args:{name:`field`,label:`Weight`,type:`number`,placeholder:`0`,suffix:(0,c.jsx)(`span`,{children:`kg`})}},y={args:{name:`field`,label:`Price`,type:`number`,placeholder:`0.00`,prefix:(0,c.jsx)(`span`,{children:`$`}),suffix:(0,c.jsx)(`span`,{children:`USD`})}},b={args:{name:`field`,label:`Search`,placeholder:`Search...`,allowClear:!0}},x={args:{name:`field`,label:`Disabled Field`,placeholder:`Cannot edit`,disabled:!0}},S={args:{name:`field`,label:`Small Input`,placeholder:`Small`,size:`sm`}},C={args:{name:`field`,label:`Large Input`,placeholder:`Large`,size:`lg`}},w={args:{name:`field`,label:`Input`},render:()=>(0,c.jsx)(a,{defaultValues:{sm:``,md:``,lg:``},onSubmit:()=>{},children:(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`1rem`,width:`350px`},children:[(0,c.jsx)(s,{name:`sm`,label:`Small`,placeholder:`Small input`,size:`sm`}),(0,c.jsx)(s,{name:`md`,label:`Medium`,placeholder:`Medium input`,size:`md`}),(0,c.jsx)(s,{name:`lg`,label:`Large`,placeholder:`Large input`,size:`lg`})]})})},T={args:{name:`field`,label:`Username`},render:()=>(0,c.jsx)(a,{defaultValues:{username:``},onSubmit:e=>alert(JSON.stringify(e,null,2)),children:(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`1rem`,width:`350px`},children:[(0,c.jsx)(s,{name:`username`,label:`Username`,placeholder:`Enter username`,required:`Username is required`,minLength:{value:3,message:`At least 3 characters`}}),(0,c.jsx)(r,{type:`submit`,children:`Submit`})]})})},E=[`Default`,`WithHelperText`,`Required`,`WithMinLength`,`WithMaxLength`,`EmailValidation`,`URLValidation`,`WithPrefix`,`WithSuffix`,`WithPrefixAndSuffix`,`WithClearButton`,`Disabled`,`SmallSize`,`LargeSize`,`AllSizes`,`WithFormSubmit`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Username',
    placeholder: 'Enter username'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter email',
    helperText: 'We will never share your email'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Username',
    placeholder: 'Enter username',
    required: 'This field is required'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    required: true,
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Password fields include a built-in eye toggle. Pass \`passwordToggle={false}\` to hide it.'
      }
    }
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Username',
    placeholder: 'Enter username',
    maxLength: {
      value: 20,
      message: 'Username cannot exceed 20 characters'
    }
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter email',
    required: true,
    email: 'Please enter a valid email address'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Website',
    placeholder: 'https://example.com',
    url: 'Please enter a valid URL'
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Price',
    type: 'number',
    placeholder: '0.00',
    prefix: <span>$</span>
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Weight',
    type: 'number',
    placeholder: '0',
    suffix: <span>kg</span>
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Price',
    type: 'number',
    placeholder: '0.00',
    prefix: <span>$</span>,
    suffix: <span>USD</span>
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Search',
    placeholder: 'Search...',
    allowClear: true
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Disabled Field',
    placeholder: 'Cannot edit',
    disabled: true
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Small Input',
    placeholder: 'Small',
    size: 'sm'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Large Input',
    placeholder: 'Large',
    size: 'lg'
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Input'
  },
  render: () => <Form defaultValues={{
    sm: '',
    md: '',
    lg: ''
  }} onSubmit={() => {}}>\r
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '350px'
    }}>\r
        <TextBox name="sm" label="Small" placeholder="Small input" size="sm" />\r
        <TextBox name="md" label="Medium" placeholder="Medium input" size="md" />\r
        <TextBox name="lg" label="Large" placeholder="Large input" size="lg" />\r
      </div>\r
    </Form>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Username'
  },
  render: () => <Form defaultValues={{
    username: ''
  }} onSubmit={data => alert(JSON.stringify(data, null, 2))}>\r
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '350px'
    }}>\r
        <TextBox name="username" label="Username" placeholder="Enter username" required="Username is required" minLength={{
        value: 3,
        message: 'At least 3 characters'
      }} />\r
        <Button type="submit">Submit</Button>\r
      </div>\r
    </Form>
}`,...T.parameters?.docs?.source}}}})))()}D();export{w as AllSizes,u as Default,x as Disabled,h as EmailValidation,C as LargeSize,f as Required,S as SmallSize,g as URLValidation,b as WithClearButton,T as WithFormSubmit,d as WithHelperText,m as WithMaxLength,p as WithMinLength,_ as WithPrefix,y as WithPrefixAndSuffix,v as WithSuffix,E as __namedExportsOrder,l as default};