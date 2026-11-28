import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Button-vVz-IwGO.js";import{c as i,s as a}from"./FieldLayout-CygWdrMQ.js";import{n as o,t as s}from"./TextArea-CvqHm35V.js";var c,l,u,d,f,p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{i(),o(),n(),c=t(),l={title:`Form/TextArea`,component:s,parameters:{layout:`centered`},tags:[`autodocs`],decorators:[e=>(0,c.jsx)(a,{defaultValues:{field:``},onSubmit:()=>{},children:(0,c.jsx)(`div`,{style:{width:`400px`},children:(0,c.jsx)(e,{})})})],argTypes:{size:{control:`select`,options:[`sm`,`md`,`lg`]},required:{control:`boolean`},disabled:{control:`boolean`},showCount:{control:`boolean`}}},u={args:{name:`field`,label:`Description`,placeholder:`Enter description...`}},d={args:{name:`field`,label:`Bio`,placeholder:`Tell us about yourself...`,helperText:`This will be displayed on your profile`}},f={args:{name:`field`,label:`Message`,placeholder:`Enter your message...`,required:`Message is required`}},p={args:{name:`field`,label:`Bio`,placeholder:`Tell us about yourself...`,showCount:!0,maxCount:200,maxLength:200}},m={args:{name:`field`,label:`Feedback`,placeholder:`Please provide detailed feedback...`,required:!0,minLength:{value:50,message:`Please provide at least 50 characters`}}},h={args:{name:`field`,label:`Disabled`,placeholder:`Cannot edit`,disabled:!0}},g={args:{name:`field`,label:`Small TextArea`,placeholder:`Small`,size:`sm`}},_={args:{name:`field`,label:`Large TextArea`,placeholder:`Large`,size:`lg`}},v={args:{name:`field`,label:`TextArea`},render:()=>(0,c.jsx)(a,{defaultValues:{sm:``,md:``,lg:``},onSubmit:()=>{},children:(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`1rem`,width:`400px`},children:[(0,c.jsx)(s,{name:`sm`,label:`Small`,placeholder:`Small textarea`,size:`sm`}),(0,c.jsx)(s,{name:`md`,label:`Medium`,placeholder:`Medium textarea`,size:`md`}),(0,c.jsx)(s,{name:`lg`,label:`Large`,placeholder:`Large textarea`,size:`lg`})]})})},y={args:{name:`field`,label:`Message`},render:()=>(0,c.jsx)(a,{defaultValues:{message:``},onSubmit:e=>alert(JSON.stringify(e,null,2)),children:(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`1rem`,width:`400px`},children:[(0,c.jsx)(s,{name:`message`,label:`Message`,placeholder:`Enter your message...`,required:`Message is required`,minLength:{value:10,message:`At least 10 characters`},showCount:!0,maxCount:500}),(0,c.jsx)(r,{type:`submit`,children:`Submit`})]})})},b=[`Default`,`WithHelperText`,`Required`,`WithCharacterCount`,`WithMinLength`,`Disabled`,`SmallSize`,`LargeSize`,`AllSizes`,`WithFormSubmit`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Description',
    placeholder: 'Enter description...'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    helperText: 'This will be displayed on your profile'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Message',
    placeholder: 'Enter your message...',
    required: 'Message is required'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    showCount: true,
    maxCount: 200,
    maxLength: 200
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Feedback',
    placeholder: 'Please provide detailed feedback...',
    required: true,
    minLength: {
      value: 50,
      message: 'Please provide at least 50 characters'
    }
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Disabled',
    placeholder: 'Cannot edit',
    disabled: true
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Small TextArea',
    placeholder: 'Small',
    size: 'sm'
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Large TextArea',
    placeholder: 'Large',
    size: 'lg'
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'TextArea'
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
      width: '400px'
    }}>
        <TextArea name="sm" label="Small" placeholder="Small textarea" size="sm" />
        <TextArea name="md" label="Medium" placeholder="Medium textarea" size="md" />
        <TextArea name="lg" label="Large" placeholder="Large textarea" size="lg" />
      </div>
    </Form>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'field',
    label: 'Message'
  },
  render: () => <Form defaultValues={{
    message: ''
  }} onSubmit={data => alert(JSON.stringify(data, null, 2))}>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '400px'
    }}>
        <TextArea name="message" label="Message" placeholder="Enter your message..." required="Message is required" minLength={{
        value: 10,
        message: 'At least 10 characters'
      }} showCount maxCount={500} />
        <Button type="submit">Submit</Button>
      </div>
    </Form>
}`,...y.parameters?.docs?.source}}}})))()}x();export{v as AllSizes,u as Default,h as Disabled,_ as LargeSize,f as Required,g as SmallSize,p as WithCharacterCount,y as WithFormSubmit,d as WithHelperText,m as WithMinLength,b as __namedExportsOrder,l as default};