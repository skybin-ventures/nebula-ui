import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{f as n}from"./iframe-Cq38_uAt.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./Button-vVz-IwGO.js";import{a as o,c as s,i as c,l,n as u,o as d,r as f,s as p,t as m}from"./select-D9bNMiLu.js";var h,g,_,v,y,b,x,S;function C(){return(C=t((()=>{h=e(n(),1),i(),l(),g=r(),_={title:`Inputs/Select`,parameters:{layout:`centered`}},v={render:()=>{let[e,t]=h.useState(``);return(0,g.jsx)(`div`,{className:`w-56`,children:(0,g.jsxs)(m,{value:e,onValueChange:t,children:[(0,g.jsx)(p,{children:(0,g.jsx)(s,{placeholder:`Select a fruit`})}),(0,g.jsxs)(u,{children:[(0,g.jsx)(c,{value:`apple`,children:`Apple`}),(0,g.jsx)(c,{value:`banana`,children:`Banana`}),(0,g.jsx)(c,{value:`cherry`,children:`Cherry`})]})]})})}},y={render:()=>{let[e,t]=h.useState(``);return(0,g.jsx)(`div`,{className:`w-56`,children:(0,g.jsxs)(m,{value:e,onValueChange:t,children:[(0,g.jsx)(p,{children:(0,g.jsx)(s,{placeholder:`Select a member`})}),(0,g.jsxs)(u,{children:[(0,g.jsxs)(f,{children:[(0,g.jsx)(o,{children:`Admins`}),(0,g.jsx)(c,{value:`ada`,children:`Ada`}),(0,g.jsx)(c,{value:`linus`,children:`Linus`})]}),(0,g.jsx)(d,{}),(0,g.jsxs)(f,{children:[(0,g.jsx)(o,{children:`Contributors`}),(0,g.jsx)(c,{value:`grace`,children:`Grace`}),(0,g.jsx)(c,{value:`margaret`,children:`Margaret`}),(0,g.jsx)(c,{value:`dennis`,disabled:!0,children:`Dennis (retired)`})]})]})]})})}},b={render:()=>(0,g.jsx)(`div`,{className:`w-56`,children:(0,g.jsx)(m,{disabled:!0,children:(0,g.jsx)(p,{children:(0,g.jsx)(s,{placeholder:`Select a fruit`})})})})},x={render:()=>{let[e,t]=h.useState(`us`);return(0,g.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,g.jsxs)(m,{value:e,onValueChange:t,children:[(0,g.jsx)(p,{className:`w-40`,children:(0,g.jsx)(s,{})}),(0,g.jsxs)(u,{children:[(0,g.jsx)(c,{value:`us`,children:`United States`}),(0,g.jsx)(c,{value:`ca`,children:`Canada`}),(0,g.jsx)(c,{value:`uk`,children:`United Kingdom`}),(0,g.jsx)(c,{value:`de`,children:`Germany`})]})]}),(0,g.jsx)(a,{variant:`ghost`,children:`Reset`})]})}},S=[`Default`,`Grouped`,`Disabled`,`Inline`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = React.useState("");
    return <div className="w-56">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
          </SelectContent>
        </Select>
      </div>;
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = React.useState("");
    return <div className="w-56">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger>
            <SelectValue placeholder="Select a member" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Admins</SelectLabel>
              <SelectItem value="ada">Ada</SelectItem>
              <SelectItem value="linus">Linus</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Contributors</SelectLabel>
              <SelectItem value="grace">Grace</SelectItem>
              <SelectItem value="margaret">Margaret</SelectItem>
              <SelectItem value="dennis" disabled>
                Dennis (retired)
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>;
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-56">
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
      </Select>
    </div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = React.useState("us");
    return <div className="flex items-center gap-2">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="de">Germany</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost">Reset</Button>
      </div>;
  }
}`,...x.parameters?.docs?.source}}}})))()}C();export{v as Default,b as Disabled,y as Grouped,x as Inline,S as __namedExportsOrder,_ as default};