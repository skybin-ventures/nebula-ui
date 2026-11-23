import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{f as n}from"./iframe-D9grtZeD.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./DataGrid-DbS2AgIJ.js";var o,s,c,l,u,d,f,p,m,h,g,_,v,y;function b(){return(b=t((()=>{o=e(n(),1),i(),s=r(),c=[{accessorKey:`id`,header:`ID`},{accessorKey:`name`,header:`Name`},{accessorKey:`role`,header:`Role`}],l=Array.from({length:23},(e,t)=>({id:String(t+1),name:`Person ${t+1}`,role:t%2==0?`Admin`:`Member`})),u={title:`Components/DataGrid`,component:a,args:{columns:c,pageSize:5}},d={args:{data:l}},f={args:{data:l,enableRowSelection:!1,getRowId:e=>e.id}},p={render:e=>{let[t,n]=o.useState(0);return(0,s.jsx)(a,{...e,data:l,pageIndex:t,onPageIndexChange:n})}},m={args:{data:l,enableRowSelection:!1,enableSorting:!1,enableColumnVisibility:!1}},h={args:{data:l,loading:!0}},g={args:{data:[],emptyMessage:`No people found.`}},_={render:e=>(0,s.jsx)(a,{...e,loadPage:async()=>{throw new _(`Failed to fetch`)}})},v={render:e=>(0,s.jsx)(a,{...e,loadPage:async({pageIndex:e,pageSize:t})=>{await new Promise(e=>setTimeout(e,600));let n=e*t;return{rows:Array.from({length:t},(e,t)=>{let r=n+t+1;return r>47?null:{id:String(r),name:`Remote person ${r}`,role:r%2==0?`Admin`:`Member`}}).filter(e=>e!==null),rowCount:47}}})},y=[`Default`,`WithoutRowSelection`,`Controlled`,`Disabled`,`Loading`,`Empty`,`Error`,`AjaxPagination`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    data: clientRows
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    data: clientRows,
    enableRowSelection: false,
    getRowId: row => (row as Person).id
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [pageIndex, setPageIndex] = React.useState(0);
    return <DataGrid {...args} data={clientRows} pageIndex={pageIndex} onPageIndexChange={setPageIndex} />;
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    data: clientRows,
    enableRowSelection: false,
    enableSorting: false,
    enableColumnVisibility: false
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    data: clientRows,
    loading: true
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    data: [],
    emptyMessage: "No people found."
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: args => <DataGrid {...args} loadPage={async () => {
    throw new Error("Failed to fetch");
  }} />
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: args => <DataGrid {...args} loadPage={async ({
    pageIndex,
    pageSize
  }) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const start = pageIndex * pageSize;
    const rows = Array.from({
      length: pageSize
    }, (_, index) => {
      const id = start + index + 1;
      if (id > 47) {
        return null;
      }
      return {
        id: String(id),
        name: \`Remote person \${id}\`,
        role: id % 2 === 0 ? "Admin" : "Member"
      };
    }).filter((row): row is Person => row !== null);
    return {
      rows,
      rowCount: 47
    };
  }} />
}`,...v.parameters?.docs?.source}}}})))()}b();export{v as AjaxPagination,p as Controlled,d as Default,m as Disabled,g as Empty,_ as Error,h as Loading,f as WithoutRowSelection,y as __namedExportsOrder,u as default};