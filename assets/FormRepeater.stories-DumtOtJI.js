import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{f as t}from"./iframe-DeOB6YXf.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./cn-BksUxDMQ.js";import{n as a,t as o}from"./Button-mFzRuj6K.js";import{n as s,t as c}from"./createLucideIcon-D7TXdU_K.js";import{n as l,t as u}from"./useControllableState-XhQ54qg8.js";var d,f;function p(){return(p=e((()=>{s(),d={name:`plus`,size:24,node:[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`M12 5v14`,key:`s699le`}]]},d.node,f=c(d)})))()}var m,h;function g(){return(g=e((()=>{s(),m={name:`trash`,size:24,node:[[`path`,{d:`M10 11v6`,key:`nco0om`}],[`path`,{d:`M14 11v6`,key:`outv1u`}],[`path`,{d:`M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6`,key:`miytrc`}],[`path`,{d:`M3 6h18`,key:`d0wm0j`}],[`path`,{d:`M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2`,key:`e791ji`}]],aliases:[`trash-2`]},m.node,h=c(m)})))()}function _({value:e,defaultValue:t=[],onChange:n,createItem:r,renderItem:a,min:s=0,max:c,disabled:u=!1,loading:d=!1,className:p,addLabel:m=`Add item`,emptyText:g=`No items yet`}){let[_,y]=l(e,t,n),b=u||d,x=!b&&(c===void 0||_.length<c),S=!b&&_.length>s;return(0,v.jsxs)(`div`,{className:i(`space-y-3`,p),children:[_.length===0?(0,v.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:d?`Loading…`:g}):(0,v.jsx)(`ul`,{className:`space-y-3`,children:_.map((e,t)=>(0,v.jsxs)(`li`,{className:`rounded-md border p-3`,children:[a(e,t,{disabled:b,remove:()=>{S&&y(t=>t.filter(t=>t.id!==e.id))}}),(0,v.jsx)(`div`,{className:`mt-2 flex justify-end`,children:(0,v.jsxs)(o,{type:`button`,variant:`ghost`,size:`sm`,disabled:!S,"aria-label":`Remove item`,onClick:()=>y(t=>t.filter(t=>t.id!==e.id)),children:[(0,v.jsx)(h,{className:`mr-2 h-4 w-4`}),`Remove`]})})]},e.id))}),(0,v.jsxs)(o,{type:`button`,variant:`outline`,disabled:!x,loading:d,onClick:()=>y(e=>[...e,r()]),children:[(0,v.jsx)(f,{className:`mr-2 h-4 w-4`}),m]})]})}var v;function y(){return(y=e((()=>{p(),g(),r(),a(),u(),v=n(),_.displayName=`Repeater`,_.__docgenInfo={description:``,methods:[],displayName:`Repeater`,props:{value:{required:!1,tsType:{name:`Array`,elements:[{name:`TItem`}],raw:`TItem[]`},description:``},defaultValue:{required:!1,tsType:{name:`Array`,elements:[{name:`TItem`}],raw:`TItem[]`},description:``,defaultValue:{value:`[]`,computed:!1}},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(items: TItem[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`TItem`}],raw:`TItem[]`},name:`items`}],return:{name:`void`}}},description:``},createItem:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => TItem`,signature:{arguments:[],return:{name:`TItem`}}},description:``},renderItem:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(item: TItem, index: number, helpers: { remove: () => void; disabled: boolean }) => ReactNode`,signature:{arguments:[{type:{name:`TItem`},name:`item`},{type:{name:`number`},name:`index`},{type:{name:`signature`,type:`object`,raw:`{ remove: () => void; disabled: boolean }`,signature:{properties:[{key:`remove`,value:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}},required:!0}},{key:`disabled`,value:{name:`boolean`,required:!0}}]}},name:`helpers`}],return:{name:`ReactNode`}}},description:``},min:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`0`,computed:!1}},max:{required:!1,tsType:{name:`number`},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},loading:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``},addLabel:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"Add item"`,computed:!1}},emptyText:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"No items yet"`,computed:!1}}}}})))()}var b,x,S,C,w,T,E,D,O,k,A,j;function M(){return(M=e((()=>{b=t(),y(),x=n(),S={title:`Components/FormRepeater`,component:_},C=e=>(0,x.jsx)(`p`,{children:e.title??e.id}),w=()=>({id:crypto.randomUUID(),title:`New item`}),T={args:{createItem:w,renderItem:C}},E={render:function(){let[e,t]=(0,b.useState)([{id:`1`,title:`First`}]);return(0,x.jsx)(_,{value:e,onChange:t,createItem:w,renderItem:C})}},D={args:{disabled:!0,defaultValue:[{id:`1`,title:`Locked`}],createItem:w,renderItem:C}},O={args:{loading:!0,createItem:w,renderItem:C}},k={args:{defaultValue:[],createItem:w,renderItem:C}},A={args:{createItem:w,renderItem:C,emptyText:`Could not load items`}},j=[`Default`,`Controlled`,`Disabled`,`Loading`,`Empty`,`Error`],T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    createItem,
    renderItem
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [value, setValue] = useState<Item[]>([{
      id: "1",
      title: "First"
    }]);
    return <Repeater value={value} onChange={setValue} createItem={createItem} renderItem={renderItem} />;
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    defaultValue: [{
      id: "1",
      title: "Locked"
    }],
    createItem,
    renderItem
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true,
    createItem,
    renderItem
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: [],
    createItem,
    renderItem
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    createItem,
    renderItem,
    emptyText: "Could not load items"
  }
}`,...A.parameters?.docs?.source}}}})))()}M();export{E as Controlled,T as Default,D as Disabled,k as Empty,A as Error,O as Loading,j as __namedExportsOrder,S as default};