import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{f as n}from"./iframe-D9grtZeD.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./cn-B3YN0wfp.js";import{i as o,t as s}from"./dist-CsysWwvN.js";import{n as c,t as l}from"./chevron-right-Dv0AJ5Z3.js";import{n as u,t as d}from"./ellipsis-DKJVMTIm.js";var f,p,m,h,g,_,v,y,b;function x(){return(x=t((()=>{f=e(n(),1),o(),c(),u(),i(),p=r(),m=f.forwardRef(({...e},t)=>(0,p.jsx)(`nav`,{ref:t,"aria-label":`breadcrumb`,...e})),m.displayName=`Breadcrumb`,h=f.forwardRef(({className:e,...t},n)=>(0,p.jsx)(`ol`,{ref:n,className:a(`flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5`,e),...t})),h.displayName=`BreadcrumbList`,g=f.forwardRef(({className:e,...t},n)=>(0,p.jsx)(`li`,{ref:n,className:a(`inline-flex items-center gap-1.5`,e),...t})),g.displayName=`BreadcrumbItem`,_=f.forwardRef(({asChild:e,className:t,...n},r)=>(0,p.jsx)(e?s:`a`,{ref:r,className:a(`transition-colors hover:text-foreground`,t),...n})),_.displayName=`BreadcrumbLink`,v=f.forwardRef(({className:e,...t},n)=>(0,p.jsx)(`span`,{ref:n,role:`link`,"aria-disabled":`true`,"aria-current":`page`,className:a(`font-normal text-foreground`,e),...t})),v.displayName=`BreadcrumbPage`,y=({children:e,className:t,...n})=>(0,p.jsx)(`li`,{role:`presentation`,"aria-hidden":`true`,className:a(`[&>svg]:w-3.5 [&>svg]:h-3.5`,t),...n,children:e??(0,p.jsx)(l,{})}),y.displayName=`BreadcrumbSeparator`,b=({className:e,...t})=>(0,p.jsxs)(`span`,{role:`presentation`,"aria-hidden":`true`,className:a(`flex h-9 w-9 items-center justify-center`,e),...t,children:[(0,p.jsx)(d,{className:`h-4 w-4`}),(0,p.jsx)(`span`,{className:`sr-only`,children:`More`})]}),b.displayName=`BreadcrumbElipssis`,m.__docgenInfo={description:``,methods:[],displayName:`Breadcrumb`,props:{separator:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``}}},h.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbList`},g.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbItem`},_.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbLink`,props:{asChild:{required:!1,tsType:{name:`boolean`},description:``}}},v.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbPage`},y.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbSeparator`},b.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbElipssis`}})))()}var S,C,w,T,E;function D(){return(D=t((()=>{x(),S=r(),C={title:`Navigation/Breadcrumb`,parameters:{layout:`centered`}},w={render:()=>(0,S.jsx)(m,{children:(0,S.jsxs)(h,{children:[(0,S.jsx)(g,{children:(0,S.jsx)(_,{href:`#`,children:`Admin`})}),(0,S.jsx)(y,{}),(0,S.jsx)(g,{children:(0,S.jsx)(_,{href:`#`,children:`Users`})}),(0,S.jsx)(y,{}),(0,S.jsx)(g,{children:(0,S.jsx)(v,{children:`Profile`})})]})})},T={render:()=>(0,S.jsx)(m,{children:(0,S.jsxs)(h,{children:[(0,S.jsx)(g,{children:(0,S.jsx)(_,{href:`#`,children:`Admin`})}),(0,S.jsx)(y,{}),(0,S.jsx)(g,{children:(0,S.jsx)(b,{})}),(0,S.jsx)(y,{}),(0,S.jsx)(g,{children:(0,S.jsx)(v,{children:`Settings`})})]})})},E=[`Default`,`WithEllipsis`],w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Admin</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Users</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Profile</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Admin</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Settings</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
}`,...T.parameters?.docs?.source}}}})))()}D();export{w as Default,T as WithEllipsis,E as __namedExportsOrder,C as default};