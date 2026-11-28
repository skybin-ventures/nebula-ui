import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{a as n,c as r,i,n as a,o,r as s,s as c,t as l}from"./table-DsN7Vdpd.js";var u,d,f,p,m;function h(){return(h=e((()=>{r(),u=t(),d={title:`Layout/Table`},f=[{name:`Neon`,email:`neon@nebula.dev`,role:`Admin`},{name:`Pulsar`,email:`pulsar@nebula.dev`,role:`Editor`},{name:`Comet`,email:`comet@nebula.dev`,role:`Viewer`}],p={render:()=>(0,u.jsx)(`div`,{className:`w-full`,children:(0,u.jsxs)(l,{children:[(0,u.jsx)(s,{children:`A list of team members and their roles.`}),(0,u.jsx)(o,{children:(0,u.jsxs)(c,{children:[(0,u.jsx)(n,{children:`Name`}),(0,u.jsx)(n,{children:`Email`}),(0,u.jsx)(n,{className:`text-right`,children:`Role`})]})}),(0,u.jsx)(a,{children:f.map(e=>(0,u.jsxs)(c,{children:[(0,u.jsx)(i,{className:`font-medium`,children:e.name}),(0,u.jsx)(i,{children:e.email}),(0,u.jsx)(i,{className:`text-right`,children:e.role})]},e.email))})]})})},m=[`Default`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full">
      <Table>
        <TableCaption>
          A list of team members and their roles.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(row => <TableRow key={row.email}>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell className="text-right">{row.role}</TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
    </div>
}`,...p.parameters?.docs?.source}}}})))()}h();export{p as Default,m as __namedExportsOrder,d as default};