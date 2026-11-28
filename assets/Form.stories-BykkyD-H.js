import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Button-vVz-IwGO.js";import{c as i,s as a}from"./FieldLayout-CygWdrMQ.js";import{n as o,t as s}from"./TextBox-bDHKp-ph.js";import{n as c,t as l}from"./TextArea-CvqHm35V.js";import{n as u,t as d}from"./Select-8AUaujE-.js";import{n as f,t as p}from"./Checkbox-DNe5DeqB.js";import{n as m,t as h}from"./Radio-BBcVkIi5.js";import{n as g,t as _}from"./FormSwitch-D7LsyADF.js";var v,y,b,x,S,C,w,T;function E(){return(E=e((()=>{i(),o(),c(),u(),f(),m(),g(),n(),v=t(),y={title:`Form/Form`,component:a,parameters:{layout:`padded`},tags:[`autodocs`]},b={args:{defaultValues:{username:``,email:``,password:``},onSubmit:e=>{console.log(`Form submitted:`,e),alert(JSON.stringify(e,null,2))}},render:e=>(0,v.jsx)(a,{...e,children:(0,v.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`1rem`,width:`400px`},children:[(0,v.jsx)(s,{name:`username`,label:`Username`,placeholder:`Enter username`,required:`Username is required`,minLength:{value:3,message:`Username must be at least 3 characters`}}),(0,v.jsx)(s,{name:`email`,label:`Email`,type:`email`,placeholder:`Enter email`,required:!0,email:`Please enter a valid email`}),(0,v.jsx)(s,{name:`password`,label:`Password`,type:`password`,placeholder:`Enter password`,required:!0,minLength:8}),(0,v.jsx)(r,{type:`submit`,children:`Submit`})]})})},x={args:{defaultValues:{email:``,age:``,website:``},onSubmit:e=>{console.log(`Form submitted:`,e),alert(JSON.stringify(e,null,2))}},render:e=>(0,v.jsx)(a,{...e,children:(0,v.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`1rem`,width:`400px`},children:[(0,v.jsx)(s,{name:`email`,label:`Email`,type:`email`,required:!0,email:!0,helperText:`We'll never share your email`}),(0,v.jsx)(s,{name:`age`,label:`Age`,type:`number`,required:!0,minValue:{value:18,message:`You must be at least 18 years old`},maxValue:{value:120,message:`Please enter a valid age`}}),(0,v.jsx)(s,{name:`website`,label:`Website`,url:`Please enter a valid URL`,helperText:`Optional`}),(0,v.jsx)(r,{type:`submit`,children:`Submit`})]})})},S={args:{defaultValues:{firstName:``,lastName:``,email:``,country:``,bio:``,gender:``,newsletter:!1,terms:!1},config:{size:`md`,colon:!1},onSubmit:e=>{console.log(`Form submitted:`,e),alert(JSON.stringify(e,null,2))}},render:e=>(0,v.jsx)(a,{...e,children:(0,v.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`1rem`,width:`500px`},children:[(0,v.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`1rem`},children:[(0,v.jsx)(s,{name:`firstName`,label:`First Name`,required:!0}),(0,v.jsx)(s,{name:`lastName`,label:`Last Name`,required:!0})]}),(0,v.jsx)(s,{name:`email`,label:`Email`,type:`email`,required:!0,email:!0}),(0,v.jsx)(d,{name:`country`,label:`Country`,required:!0,placeholder:`Select a country`,options:[{label:`United States`,value:`us`},{label:`Canada`,value:`ca`},{label:`United Kingdom`,value:`uk`},{label:`Australia`,value:`au`},{label:`Germany`,value:`de`}]}),(0,v.jsx)(l,{name:`bio`,label:`Bio`,placeholder:`Tell us about yourself...`,showCount:!0,maxCount:200,maxLength:200}),(0,v.jsx)(h,{name:`gender`,label:`Gender`,required:!0,options:[{label:`Male`,value:`male`},{label:`Female`,value:`female`},{label:`Other`,value:`other`}],direction:`horizontal`}),(0,v.jsx)(_,{name:`newsletter`,label:`Subscribe to newsletter`}),(0,v.jsx)(p,{name:`terms`,label:`I agree to the terms and conditions`,required:`You must accept the terms`}),(0,v.jsxs)(`div`,{style:{display:`flex`,gap:`1rem`,marginTop:`1rem`},children:[(0,v.jsx)(r,{type:`submit`,children:`Submit`}),(0,v.jsx)(r,{type:`reset`,variant:`outline`,children:`Reset`})]})]})})},C={args:{defaultValues:{name:``,email:``},config:{size:`sm`},onSubmit:e=>alert(JSON.stringify(e,null,2))},render:e=>(0,v.jsx)(a,{...e,children:(0,v.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`0.75rem`,width:`300px`},children:[(0,v.jsx)(s,{name:`name`,label:`Name`,required:!0}),(0,v.jsx)(s,{name:`email`,label:`Email`,type:`email`,required:!0}),(0,v.jsx)(r,{type:`submit`,size:`sm`,children:`Submit`})]})})},w={args:{defaultValues:{name:``,email:``},config:{size:`lg`},onSubmit:e=>alert(JSON.stringify(e,null,2))},render:e=>(0,v.jsx)(a,{...e,children:(0,v.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`1.25rem`,width:`500px`},children:[(0,v.jsx)(s,{name:`name`,label:`Name`,required:!0}),(0,v.jsx)(s,{name:`email`,label:`Email`,type:`email`,required:!0}),(0,v.jsx)(r,{type:`submit`,size:`lg`,children:`Submit`})]})})},T=[`BasicForm`,`WithValidation`,`CompleteForm`,`SmallSize`,`LargeSize`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValues: {
      username: '',
      email: '',
      password: ''
    },
    onSubmit: data => {
      console.log('Form submitted:', data);
      alert(JSON.stringify(data, null, 2));
    }
  },
  render: args => <Form {...args}>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '400px'
    }}>
        <TextBox name="username" label="Username" placeholder="Enter username" required="Username is required" minLength={{
        value: 3,
        message: "Username must be at least 3 characters"
      }} />
        <TextBox name="email" label="Email" type="email" placeholder="Enter email" required email="Please enter a valid email" />
        <TextBox name="password" label="Password" type="password" placeholder="Enter password" required minLength={8} />
        <Button type="submit">Submit</Button>
      </div>
    </Form>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValues: {
      email: '',
      age: '',
      website: ''
    },
    onSubmit: data => {
      console.log('Form submitted:', data);
      alert(JSON.stringify(data, null, 2));
    }
  },
  render: args => <Form {...args}>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '400px'
    }}>
        <TextBox name="email" label="Email" type="email" required email helperText="We'll never share your email" />
        <TextBox name="age" label="Age" type="number" required minValue={{
        value: 18,
        message: "You must be at least 18 years old"
      }} maxValue={{
        value: 120,
        message: "Please enter a valid age"
      }} />
        <TextBox name="website" label="Website" url="Please enter a valid URL" helperText="Optional" />
        <Button type="submit">Submit</Button>
      </div>
    </Form>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      bio: '',
      gender: '',
      newsletter: false,
      terms: false
    },
    config: {
      size: 'md',
      colon: false
    },
    onSubmit: data => {
      console.log('Form submitted:', data);
      alert(JSON.stringify(data, null, 2));
    }
  },
  render: args => <Form {...args}>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '500px'
    }}>
        <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem'
      }}>
          <TextBox name="firstName" label="First Name" required />
          <TextBox name="lastName" label="Last Name" required />
        </div>
        
        <TextBox name="email" label="Email" type="email" required email />
        
        <Select name="country" label="Country" required placeholder="Select a country" options={[{
        label: 'United States',
        value: 'us'
      }, {
        label: 'Canada',
        value: 'ca'
      }, {
        label: 'United Kingdom',
        value: 'uk'
      }, {
        label: 'Australia',
        value: 'au'
      }, {
        label: 'Germany',
        value: 'de'
      }]} />
        
        <TextArea name="bio" label="Bio" placeholder="Tell us about yourself..." showCount maxCount={200} maxLength={200} />
        
        <RadioGroup name="gender" label="Gender" required options={[{
        label: 'Male',
        value: 'male'
      }, {
        label: 'Female',
        value: 'female'
      }, {
        label: 'Other',
        value: 'other'
      }]} direction="horizontal" />
        
        <FormSwitch name="newsletter" label="Subscribe to newsletter" />
        
        <Checkbox name="terms" label="I agree to the terms and conditions" required="You must accept the terms" />
        
        <div style={{
        display: 'flex',
        gap: '1rem',
        marginTop: '1rem'
      }}>
          <Button type="submit">Submit</Button>
          <Button type="reset" variant="outline">Reset</Button>
        </div>
      </div>
    </Form>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValues: {
      name: '',
      email: ''
    },
    config: {
      size: 'sm'
    },
    onSubmit: data => alert(JSON.stringify(data, null, 2))
  },
  render: args => <Form {...args}>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      width: '300px'
    }}>
        <TextBox name="name" label="Name" required />
        <TextBox name="email" label="Email" type="email" required />
        <Button type="submit" size="sm">Submit</Button>
      </div>
    </Form>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValues: {
      name: '',
      email: ''
    },
    config: {
      size: 'lg'
    },
    onSubmit: data => alert(JSON.stringify(data, null, 2))
  },
  render: args => <Form {...args}>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      width: '500px'
    }}>
        <TextBox name="name" label="Name" required />
        <TextBox name="email" label="Email" type="email" required />
        <Button type="submit" size="lg">Submit</Button>
      </div>
    </Form>
}`,...w.parameters?.docs?.source}}}})))()}E();export{b as BasicForm,S as CompleteForm,w as LargeSize,C as SmallSize,x as WithValidation,T as __namedExportsOrder,y as default};