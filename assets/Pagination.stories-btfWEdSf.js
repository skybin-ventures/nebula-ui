import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{f as n}from"./iframe-D9grtZeD.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./cn-B3YN0wfp.js";import{n as o,r as s}from"./button-C8low2ef.js";import{n as c,t as l}from"./chevron-left-DuBFQZgS.js";import{n as u,t as d}from"./chevron-right-Dv0AJ5Z3.js";import{n as f,t as p}from"./ellipsis-DKJVMTIm.js";var m,h,g,_,v,y,b,x,S;function C(){return(C=t((()=>{m=e(n(),1),c(),u(),f(),i(),s(),h=r(),g=({className:e,...t})=>(0,h.jsx)(`nav`,{role:`navigation`,"aria-label":`pagination`,className:a(`mx-auto flex w-full justify-center`,e),...t}),g.displayName=`Pagination`,_=m.forwardRef(({className:e,...t},n)=>(0,h.jsx)(`ul`,{ref:n,className:a(`flex flex-row items-center gap-1`,e),...t})),_.displayName=`PaginationContent`,v=m.forwardRef(({className:e,...t},n)=>(0,h.jsx)(`li`,{ref:n,className:a(``,e),...t})),v.displayName=`PaginationItem`,y=({className:e,isActive:t,size:n=`icon`,...r})=>(0,h.jsx)(`a`,{"aria-current":t?`page`:void 0,className:a(o({variant:t?`outline`:`ghost`,size:n}),e),...r}),y.displayName=`PaginationLink`,b=({className:e,size:t=`default`,...n})=>(0,h.jsxs)(y,{"aria-label":`Go to previous page`,className:a(`gap-1 pl-2.5`,e),size:t,...n,children:[(0,h.jsx)(l,{className:`h-4 w-4`}),(0,h.jsx)(`span`,{children:`Previous`})]}),b.displayName=`PaginationPrevious`,x=({className:e,size:t=`default`,...n})=>(0,h.jsxs)(y,{"aria-label":`Go to next page`,className:a(`gap-1 pr-2.5`,e),size:t,...n,children:[(0,h.jsx)(`span`,{children:`Next`}),(0,h.jsx)(d,{className:`h-4 w-4`})]}),x.displayName=`PaginationNext`,S=({className:e,...t})=>(0,h.jsxs)(`span`,{"aria-hidden":!0,className:a(`flex h-9 w-9 items-center justify-center`,e),...t,children:[(0,h.jsx)(p,{className:`h-4 w-4`}),(0,h.jsx)(`span`,{className:`sr-only`,children:`More pages`})]}),S.displayName=`PaginationEllipsis`,g.__docgenInfo={description:``,methods:[],displayName:`Pagination`},_.__docgenInfo={description:``,methods:[],displayName:`PaginationContent`},v.__docgenInfo={description:``,methods:[],displayName:`PaginationItem`},y.__docgenInfo={description:``,methods:[],displayName:`PaginationLink`,props:{isActive:{required:!1,tsType:{name:`boolean`},description:``},size:{defaultValue:{value:`"icon"`,computed:!1},required:!1}}},x.__docgenInfo={description:``,methods:[],displayName:`PaginationNext`,props:{size:{defaultValue:{value:`"default"`,computed:!1},required:!1}}},b.__docgenInfo={description:``,methods:[],displayName:`PaginationPrevious`,props:{size:{defaultValue:{value:`"default"`,computed:!1},required:!1}}},S.__docgenInfo={description:``,methods:[],displayName:`PaginationEllipsis`}})))()}var w,T,E,D;function O(){return(O=t((()=>{C(),w=r(),T={title:`Layout/Pagination`,parameters:{layout:`centered`}},E={render:()=>(0,w.jsx)(g,{children:(0,w.jsxs)(_,{children:[(0,w.jsx)(v,{children:(0,w.jsx)(b,{})}),(0,w.jsx)(v,{children:(0,w.jsx)(y,{children:`1`})}),(0,w.jsx)(v,{children:(0,w.jsx)(y,{isActive:!0,children:`2`})}),(0,w.jsx)(v,{children:(0,w.jsx)(S,{})}),(0,w.jsx)(v,{children:(0,w.jsx)(x,{})})]})})},D=[`Default`],E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
}`,...E.parameters?.docs?.source}}}})))()}O();export{E as Default,D as __namedExportsOrder,T as default};