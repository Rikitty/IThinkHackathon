(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[544],{6265:function(e,t,s){Promise.resolve().then(s.bind(s,4039))},4039:function(e,t,s){"use strict";s.r(t);var r=s(7573),a=s(7653),n=s(4466),i=s(7774),l=s(6829),c=s(2938),d=s(2006),o=s(2756);t.default=()=>{let e=(0,n.TL)(),{id:t,token:s,userDetails:u,userEvents:h,userLikedEvents:f,status:m,error:x}=(0,n.CG)(e=>e.user);if((0,a.useEffect)(()=>{t&&s&&(e((0,i.r3)()),e((0,i.cu)()),e((0,i.WD)()))},[e,t,s]),"loading"===m)return(0,r.jsx)("div",{children:"Loading..."});if("failed"===m)return(0,r.jsxs)("div",{children:["Error: ",x]});let v=e=>{alert("Chip clicked: ".concat(e))},g=async t=>{if(window.confirm("Are you sure you want to delete this event?"))try{let r=await fetch("http://localhost:3001/events/".concat(t),{method:"DELETE",headers:{Authorization:"Bearer ".concat(s)}}),a=await r.text();console.log("Response status:",r.status),console.log("Response data:",a),r.ok?(e((0,i.cu)()),alert("Event deleted successfully.")):alert("Failed to delete the event. Status: ".concat(r.status,", Message: ").concat(a))}catch(e){console.error("Error deleting event:",e),alert("An error occurred. Please try again.")}};return(0,r.jsxs)("div",{className:"text-lg m-2",children:[(0,r.jsx)("h1",{className:"font-bold",children:"Profile"}),(0,r.jsx)("div",{className:"flex justify-center mt-4",children:["JavaScript","TypeScript","React","Next.js"].map((e,t)=>(0,r.jsx)(l.Z,{label:e,onClick:()=>v(e)},t))}),(0,r.jsx)(d.Z,{className:"my-4"}),(0,r.jsxs)("div",{className:"flex justify-center mt-4",children:[(0,r.jsx)("div",{className:"flex w-1/3 items-center justify-center",children:(0,r.jsxs)(c.qE,{className:"h-32 w-32",children:[(0,r.jsx)(c.F$,{src:"https://github.com/shadcn.png",alt:"@shadcn"}),(0,r.jsx)(c.Q5,{children:"CN"})]})}),(0,r.jsxs)("div",{className:"flex-1 w-2/3",children:[(0,r.jsxs)("p",{children:["Email: ",null==u?void 0:u.email]}),(0,r.jsxs)("p",{children:["Username: ",null==u?void 0:u.userName]}),(0,r.jsxs)("p",{children:["Community Name: ",null==u?void 0:u.communityName]}),(0,r.jsx)("div",{children:(0,r.jsx)(o.Xws,{className:"text-2xl text-yellow-500 mt-4"})})]})]}),(0,r.jsx)(d.Z,{className:"my-4"}),(0,r.jsx)("h2",{className:"font-bold mt-4 flex justify-end",children:(0,r.jsx)("a",{href:"/dashboard",children:"See all"})}),(0,r.jsx)("div",{className:"mt-4 grid grid-cols-1 md:grid-cols-2 gap-6",children:h.map(e=>(0,r.jsxs)("div",{className:"relative bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300",children:[(0,r.jsx)("img",{src:e.imageUrl||"path/to/default/image.jpg",alt:e.title||"Event image",className:"w-full h-40 object-cover"}),(0,r.jsxs)("div",{className:"p-4",children:[(0,r.jsx)("h3",{className:"text-lg font-bold text-gray-900",children:e.title}),(0,r.jsxs)("p",{className:"text-sm text-gray-600 mb-2",children:[(0,r.jsx)("span",{className:"block text-gray-500",children:e.location}),(0,r.jsxs)("span",{className:"block text-gray-500",children:[new Date(e.startDate).toLocaleDateString()," -"," ",new Date(e.endDate).toLocaleDateString()]})]}),(0,r.jsx)("p",{className:"text-sm text-gray-700 mb-4 line-clamp-2",children:e.description}),(0,r.jsxs)("div",{className:"flex justify-between items-center",children:[(0,r.jsx)("a",{href:"/dashboard/event/".concat(e.id,"/edit"),className:"text-blue-500 font-semibold hover:underline",children:"Edit"}),(0,r.jsx)("button",{onClick:()=>g(e.id),className:"text-red-500 font-semibold hover:underline",children:"Delete"})]})]})]},e.id))}),(0,r.jsx)(d.Z,{className:"my-10"}),(0,r.jsx)("h2",{className:"font-bold mt-4 text-2xl text-yellow-500",children:"Favorites"}),(0,r.jsx)("div",{className:"mt-4",children:f.map(e=>(0,r.jsxs)("div",{className:"mb-4 bg-gray-800 rounded-lg overflow-hidden flex",children:[(0,r.jsx)("img",{src:e.imageUrl||"path/to/default/image.jpg",alt:e.title,className:"w-1/2 h-64 object-cover"}),(0,r.jsxs)("div",{className:"w-1/2 p-4 bg-white text-gray-900 border-2 border-yellow-500 ",children:[(0,r.jsx)("p",{className:"text-lg font-bold text-yellow-500 ",children:"Event Favorites"}),(0,r.jsx)("p",{className:"text-sm text-gray-600",children:e.location}),(0,r.jsx)("h3",{className:"mt-4 text-xl font-semibold",children:e.title}),(0,r.jsxs)("p",{className:"mt-2 text-sm text-gray-600",children:["Username: ",null==u?void 0:u.userName]}),(0,r.jsxs)("div",{className:"flex justify-between mt-8",children:[(0,r.jsx)("p",{className:"text-gray-600",children:"Signed"}),(0,r.jsx)("p",{className:"text-gray-600",children:"Signed"})]})]})]},e.id))})]})}},6829:function(e,t,s){"use strict";var r=s(7573);s(7653);var a=s(7835),n=s.n(a),i=s(3005);t.Z=e=>{let{label:t,onClick:s}=e;return(0,r.jsx)(i.z,{className:n().chip,onClick:s,children:(0,r.jsx)("span",{className:n().chipText,children:t})})}},2938:function(e,t,s){"use strict";s.d(t,{F$:function(){return c},Q5:function(){return d},qE:function(){return l}});var r=s(7573),a=s(7653),n=s(2209),i=s(3495);let l=a.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)(n.fC,{ref:t,className:(0,i.cn)("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",s),...a})});l.displayName=n.fC.displayName;let c=a.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)(n.Ee,{ref:t,className:(0,i.cn)("aspect-square h-full w-full",s),...a})});c.displayName=n.Ee.displayName;let d=a.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)(n.NY,{ref:t,className:(0,i.cn)("flex h-full w-full items-center justify-center rounded-full bg-muted",s),...a})});d.displayName=n.NY.displayName},3005:function(e,t,s){"use strict";s.d(t,{d:function(){return c},z:function(){return d}});var r=s(7573),a=s(7653),n=s(2721),i=s(47),l=s(3495);let c=(0,i.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),d=a.forwardRef((e,t)=>{let{className:s,variant:a,size:i,asChild:d=!1,...o}=e,u=d?n.g7:"button";return(0,r.jsx)(u,{className:(0,l.cn)(c({variant:a,size:i,className:s})),ref:t,...o})});d.displayName="Button"},2006:function(e,t,s){"use strict";s.d(t,{Z:function(){return l}});var r=s(7573),a=s(7653),n=s(9733),i=s(3495);let l=a.forwardRef((e,t)=>{let{className:s,orientation:a="horizontal",decorative:l=!0,...c}=e;return(0,r.jsx)(n.f,{ref:t,decorative:l,orientation:a,className:(0,i.cn)("shrink-0 bg-border","horizontal"===a?"h-[1px] w-full":"h-full w-[1px]",s),...c})});l.displayName=n.f.displayName},7774:function(e,t,s){"use strict";s.d(t,{WD:function(){return n},cu:function(){return a},r3:function(){return i},x4:function(){return c}});var r=s(7075);let a=(0,r.hg)("user/fetchUserEvents",async(e,t)=>{let{getState:s,rejectWithValue:r}=t,{user:a}=s();if(!a.id||!a.token)return r("User not authenticated");try{let e=await fetch("http://localhost:3001/api/users/".concat(a.id,"/events"),{headers:{Authorization:"Bearer ".concat(a.token)}});if(!e.ok)throw Error("Failed to fetch user events");return await e.json()}catch(e){return r("Failed to fetch user events")}}),n=(0,r.hg)("user/fetchUserLikedEvents",async(e,t)=>{let{getState:s,rejectWithValue:r}=t,{user:a}=s();if(!a.id||!a.token)return r("User not authenticated");try{let e=await fetch("http://localhost:3001/api/users/".concat(a.id,"/liked-events"),{headers:{Authorization:"Bearer ".concat(a.token)}});if(!e.ok)throw Error("Failed to fetch user liked events");return await e.json()}catch(e){return r("Failed to fetch user liked events")}}),i=(0,r.hg)("user/fetchUserDetails",async(e,t)=>{let{getState:s,rejectWithValue:r}=t,{user:a}=s();if(!a.id||!a.token)return r("User not authenticated");try{let e=await fetch("http://localhost:3001/api/users/".concat(a.id),{headers:{Authorization:"Bearer ".concat(a.token)}});if(!e.ok)throw Error("Failed to fetch user details");return await e.json()}catch(e){return r("Failed to fetch user details")}}),l=(0,r.oM)({name:"user",initialState:{id:null,token:null,isAuthenticated:!1,userDetails:null,userEvents:[],userLikedEvents:[],status:"idle",error:null},reducers:{login:(e,t)=>{e.id=t.payload.id,e.token=t.payload.token,e.isAuthenticated=!0},logout:e=>{e.id=null,e.token=null,e.isAuthenticated=!1,e.userEvents=[],e.userLikedEvents=[]}},extraReducers:e=>{e.addCase(a.pending,e=>{e.status="loading"}).addCase(a.fulfilled,(e,t)=>{e.status="succeeded",e.userEvents=t.payload}).addCase(a.rejected,(e,t)=>{e.status="failed",e.error=t.error.message||"Failed to fetch user events"}).addCase(n.pending,e=>{e.status="loading"}).addCase(n.fulfilled,(e,t)=>{e.status="succeeded",e.userLikedEvents=t.payload}).addCase(n.rejected,(e,t)=>{e.status="failed",e.error=t.error.message||"Failed to fetch user liked events"}).addCase(i.pending,e=>{e.status="loading"}).addCase(i.fulfilled,(e,t)=>{e.status="succeeded",e.userDetails=t.payload}).addCase(i.rejected,(e,t)=>{e.status="failed",e.error=t.error.message||"Failed to fetch user details"})}}),{login:c,logout:d}=l.actions;t.ZP=l.reducer},4466:function(e,t,s){"use strict";s.d(t,{CG:function(){return n},TL:function(){return a}});var r=s(7384);let a=r.I0.withTypes(),n=r.v9.withTypes();r.oR.withTypes()},3495:function(e,t,s){"use strict";s.d(t,{cn:function(){return n}});var r=s(7908),a=s(6290);function n(){for(var e=arguments.length,t=Array(e),s=0;s<e;s++)t[s]=arguments[s];return(0,a.m6)((0,r.W)(t))}},7835:function(e){e.exports={chip:"Chip_chip__UYstH",chipText:"Chip_chipText__PYig1"}}},function(e){e.O(0,[131,461,322,115,75,192,293,286,744],function(){return e(e.s=6265)}),_N_E=e.O()}]);