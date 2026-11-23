import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Button-mFzRuj6K.js";import{c as i,s as a}from"./FieldLayout-DE2tcXt4.js";import{n as o,t as s}from"./FormSwitch-DqOi2COB.js";var c,l,u,d,f,p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{i(),o(),n(),c=t(),l={title:`Form/Switch`,component:s,parameters:{layout:`centered`},tags:[`autodocs`],decorators:[e=>(0,c.jsx)(a,{defaultValues:{field:!1},onSubmit:()=>{},children:(0,c.jsx)(`div`,{style:{width:`350px`},children:(0,c.jsx)(e,{})})})],argTypes:{size:{control:`select`,options:[`sm`,`md`,`lg`]},required:{control:`boolean`},disabled:{control:`boolean`}}},u={args:{name:`field`,label:`Enable notifications`}},d={args:{name:`field`,label:`Dark mode`,helperText:`Toggle between light and dark theme`}},f={args:{name:`field`,label:`Status`,checkedText:`Active`,uncheckedText:`Inactive`}},p={args:{name:`field`,label:`Accept terms`,required:`You must accept the terms`}},m={args:{name:`field`,label:`Disabled switch`,disabled:!0}},h={args:{name:`field`,label:`Small switch`,size:`sm`}},g={args:{name:`field`,label:`Large switch`,size:`lg`}},_={args:{name:`field`,label:`Switch`},render:()=>(0,c.jsx)(a,{defaultValues:{sm:!1,md:!1,lg:!1},onSubmit:()=>{},children:(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`1rem`},children:[(0,c.jsx)(s,{name:`sm`,label:`Small switch`,size:`sm`}),(0,c.jsx)(s,{name:`md`,label:`Medium switch`,size:`md`}),(0,c.jsx)(s,{name:`lg`,label:`Large switch`,size:`lg`})]})})},v={args:{name:`field`,label:`Setting`},render:()=>(0,c.jsx)(a,{defaultValues:{notifications:!0,emails:!1,sms:!1,darkMode:!1},onSubmit:e=>alert(JSON.stringify(e,null,2)),children:(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`1rem`,width:`350px`},children:[(0,c.jsx)(`h3`,{style:{margin:0,fontSize:`1rem`,fontWeight:600},children:`Notification Settings`}),(0,c.jsx)(s,{name:`notifications`,label:`Push notifications`}),(0,c.jsx)(s,{name:`emails`,label:`Email notifications`}),(0,c.jsx)(s,{name:`sms`,label:`SMS notifications`}),(0,c.jsx)(`hr`,{style:{margin:`0.5rem 0`,border:`none`,borderTop:`1px solid #e5e5e5`}}),(0,c.jsx)(`h3`,{style:{margin:0,fontSize:`1rem`,fontWeight:600},children:`Appearance`}),(0,c.jsx)(s,{name:`darkMode`,label:`Dark mode`,checkedText:`On`,uncheckedText:`Off`}),(0,c.jsx)(r,{type:`submit`,style:{marginTop:`0.5rem`},children:`Save Settings`})]})})},y={args:{name:`field`,label:`Setting`},render:()=>(0,c.jsx)(a,{defaultValues:{terms:!1,newsletter:!1},onSubmit:e=>alert(JSON.stringify(e,null,2)),children:(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`1rem`,width:`350px`},children:[(0,c.jsx)(s,{name:`terms`,label:`Accept terms and conditions`,required:`You must accept the terms`}),(0,c.jsx)(s,{name:`newsletter`,label:`Subscribe to newsletter`,helperText:`Optional - receive updates about new features`}),(0,c.jsx)(r,{type:`submit`,children:`Submit`})]})})},b=[`Default`,`WithHelperText`,`WithCheckedText`,`Required`,`Disabled`,`SmallSize`,`LargeSize`,`AllSizes`,`MultipleSwitches`,`WithFormSubmit`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Enable notifications'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Dark mode',
    helperText: 'Toggle between light and dark theme'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Status',
    checkedText: 'Active',
    uncheckedText: 'Inactive'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Accept terms',
    required: 'You must accept the terms'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Disabled switch',
    disabled: true
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Small switch',
    size: 'sm'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Large switch',
    size: 'lg'
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Switch'
  },
  render: () => <Form defaultValues={{
    sm: false,
    md: false,
    lg: false
  }} onSubmit={() => {}}>\r
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>\r
        <FormSwitch name="sm" label="Small switch" size="sm" />\r
        <FormSwitch name="md" label="Medium switch" size="md" />\r
        <FormSwitch name="lg" label="Large switch" size="lg" />\r
      </div>\r
    </Form>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Setting'
  },
  render: () => <Form defaultValues={{
    notifications: true,
    emails: false,
    sms: false,
    darkMode: false
  }} onSubmit={data => alert(JSON.stringify(data, null, 2))}>\r
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '350px'
    }}>\r
        <h3 style={{
        margin: 0,
        fontSize: '1rem',
        fontWeight: 600
      }}>Notification Settings</h3>\r
        <FormSwitch name="notifications" label="Push notifications" />\r
        <FormSwitch name="emails" label="Email notifications" />\r
        <FormSwitch name="sms" label="SMS notifications" />\r
        <hr style={{
        margin: '0.5rem 0',
        border: 'none',
        borderTop: '1px solid #e5e5e5'
      }} />\r
        <h3 style={{
        margin: 0,
        fontSize: '1rem',
        fontWeight: 600
      }}>Appearance</h3>\r
        <FormSwitch name="darkMode" label="Dark mode" checkedText="On" uncheckedText="Off" />\r
        <Button type="submit" style={{
        marginTop: '0.5rem'
      }}>Save Settings</Button>\r
      </div>\r
    </Form>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Setting'
  },
  render: () => <Form defaultValues={{
    terms: false,
    newsletter: false
  }} onSubmit={data => alert(JSON.stringify(data, null, 2))}>\r
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '350px'
    }}>\r
        <FormSwitch name="terms" label="Accept terms and conditions" required="You must accept the terms" />\r
        <FormSwitch name="newsletter" label="Subscribe to newsletter" helperText="Optional - receive updates about new features" />\r
        <Button type="submit">Submit</Button>\r
      </div>\r
    </Form>
}`,...y.parameters?.docs?.source}}}})))()}x();export{_ as AllSizes,u as Default,m as Disabled,g as LargeSize,v as MultipleSwitches,p as Required,h as SmallSize,f as WithCheckedText,y as WithFormSubmit,d as WithHelperText,b as __namedExportsOrder,l as default};