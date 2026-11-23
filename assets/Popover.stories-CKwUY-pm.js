import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Button-mFzRuj6K.js";import{i,n as a,r as o,t as s}from"./popover-B2mpI-ZF.js";var c,l,u,d,f;function p(){return(p=e((()=>{n(),i(),c=t(),l={title:`Overlay/Popover`,parameters:{layout:`centered`}},u={render:()=>(0,c.jsxs)(s,{children:[(0,c.jsx)(o,{asChild:!0,children:(0,c.jsx)(r,{variant:`outline`,children:`Open popover`})}),(0,c.jsx)(a,{children:(0,c.jsx)(`p`,{className:`text-sm`,children:`Popover content with padding and a shadow.`})})]})},d={render:()=>(0,c.jsx)(`div`,{className:`flex w-full gap-3`,children:[[`Start`,`start`],[`Center`,`center`],[`End`,`end`]].map(([e,t])=>(0,c.jsxs)(s,{children:[(0,c.jsx)(o,{asChild:!0,children:(0,c.jsx)(r,{variant:`outline`,children:e})}),(0,c.jsx)(a,{align:t,className:`w-56`,children:(0,c.jsxs)(`p`,{className:`text-sm font-medium`,children:[`Aligned to `,t]})})]},t))})},f=[`Default`,`Aligned`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <Popover>\r
      <PopoverTrigger asChild>\r
        <Button variant="outline">Open popover</Button>\r
      </PopoverTrigger>\r
      <PopoverContent>\r
        <p className="text-sm">Popover content with padding and a shadow.</p>\r
      </PopoverContent>\r
    </Popover>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-full gap-3">\r
      {([["Start", "start"], ["Center", "center"], ["End", "end"]] as const).map(([label, align]) => <Popover key={align}>\r
          <PopoverTrigger asChild>\r
            <Button variant="outline">{label}</Button>\r
          </PopoverTrigger>\r
          <PopoverContent align={align} className="w-56">\r
            <p className="text-sm font-medium">Aligned to {align}</p>\r
          </PopoverContent>\r
        </Popover>)}\r
    </div>
}`,...d.parameters?.docs?.source}}}})))()}p();export{d as Aligned,u as Default,f as __namedExportsOrder,l as default};