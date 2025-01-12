(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[39],{1258:(e,r,t)=>{Promise.resolve().then(t.bind(t,1594))},1594:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>o});var s=t(5155),a=t(2115),n=t(4085),d=t(5007);let i=(0,t(7401).A)("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);function o(e){let{error:r,reset:t}=e;return(0,a.useEffect)(()=>{fetch("/api/log/error",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:r.message,stack:r.stack,digest:r.digest})}).catch(console.error)},[r]),(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center p-4",children:(0,s.jsxs)(d.Zp,{className:"w-full max-w-md",children:[(0,s.jsx)(d.aR,{children:(0,s.jsxs)(d.ZB,{className:"flex items-center gap-2 text-destructive",children:[(0,s.jsx)(i,{className:"h-5 w-5"}),"Something went wrong!"]})}),(0,s.jsxs)(d.Wu,{children:[(0,s.jsx)("p",{className:"text-sm text-muted-foreground",children:r.message||"An unexpected error occurred."}),r.digest&&(0,s.jsxs)("p",{className:"mt-2 text-xs text-muted-foreground",children:["Error ID: ",r.digest]})]}),(0,s.jsx)(d.wL,{children:(0,s.jsx)(n.$,{onClick:t,variant:"outline",children:"Try again"})})]})})}},4085:(e,r,t)=>{"use strict";t.d(r,{$:()=>c});var s=t(5155),a=t(2115),n=t(2317),d=t(1027),i=t(9602);let o=(0,d.F)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),c=a.forwardRef((e,r)=>{let{className:t,variant:a,size:d,asChild:c=!1,...l}=e,u=c?n.DX:"button";return(0,s.jsx)(u,{className:(0,i.cn)(o({variant:a,size:d,className:t})),ref:r,...l})});c.displayName="Button"},5007:(e,r,t)=>{"use strict";t.d(r,{Wu:()=>c,ZB:()=>o,Zp:()=>d,aR:()=>i,wL:()=>l});var s=t(5155),a=t(2115),n=t(9602);let d=a.forwardRef((e,r)=>{let{className:t,...a}=e;return(0,s.jsx)("div",{ref:r,className:(0,n.cn)("rounded-xl border bg-card text-card-foreground shadow",t),...a})});d.displayName="Card";let i=a.forwardRef((e,r)=>{let{className:t,...a}=e;return(0,s.jsx)("div",{ref:r,className:(0,n.cn)("flex flex-col space-y-1.5 p-6",t),...a})});i.displayName="CardHeader";let o=a.forwardRef((e,r)=>{let{className:t,...a}=e;return(0,s.jsx)("div",{ref:r,className:(0,n.cn)("font-semibold leading-none tracking-tight",t),...a})});o.displayName="CardTitle",a.forwardRef((e,r)=>{let{className:t,...a}=e;return(0,s.jsx)("div",{ref:r,className:(0,n.cn)("text-sm text-muted-foreground",t),...a})}).displayName="CardDescription";let c=a.forwardRef((e,r)=>{let{className:t,...a}=e;return(0,s.jsx)("div",{ref:r,className:(0,n.cn)("p-6 pt-0",t),...a})});c.displayName="CardContent";let l=a.forwardRef((e,r)=>{let{className:t,...a}=e;return(0,s.jsx)("div",{ref:r,className:(0,n.cn)("flex items-center p-6 pt-0",t),...a})});l.displayName="CardFooter"},9602:(e,r,t)=>{"use strict";t.d(r,{cn:()=>n});var s=t(3463),a=t(9795);function n(){for(var e=arguments.length,r=Array(e),t=0;t<e;t++)r[t]=arguments[t];return(0,a.QP)((0,s.$)(r))}}},e=>{var r=r=>e(e.s=r);e.O(0,[501,441,517,358],()=>r(1258)),_N_E=e.O()}]);