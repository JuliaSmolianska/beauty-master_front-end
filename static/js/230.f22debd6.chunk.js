"use strict";(self.webpackChunkreact_homework_template=self.webpackChunkreact_homework_template||[]).push([[230],{4321:function(e,s,n){var t=n(9329),a=n(2677),r=(n(7632),n(184));s.Z=function(){return(0,r.jsx)(a.Z,{className:"d-flex justify-content-center my-auto",children:(0,r.jsx)(t.Ll,{height:"80",width:"80",color:"#465881",ariaLabel:"bars-loading",wrapperStyle:{},wrapperClass:"",visible:!0})})}},8230:function(e,s,n){n.r(s),n.d(s,{default:function(){return j}});var t=n(5861),a=n(9439),r=n(4687),c=n.n(r),l=n(2791),o=n(1243),i=n(5218),u=n(8820),m=n(184),f=function(e){var s=e.client,n=(0,l.useState)(!1),t=(0,a.Z)(n,2),r=t[0],c=t[1],o=function(e){return e.toString().padStart(2,"0")};return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("h5",{onClick:function(){return c(!r)},className:"text-capitalize text-decoration-underline",children:[(0,m.jsx)(u.yci,{className:"me-2"}),s.name]}),r&&(0,m.jsx)("ul",{className:"ps-1 pe-1 list-unstyled",children:s.clients.map((function(e,s){return(0,m.jsxs)("li",{className:"",children:[(0,m.jsxs)("p",{className:"mb-0",children:[(0,m.jsx)(u.rYR,{className:"me-2"}),(0,m.jsxs)("span",{className:"fw-bolder",children:[o(e.date),".",o(e.month),".",e.year,"\u0440."," "]}),e.serviceType.join(", ")]}),e.phone&&(0,m.jsxs)("p",{className:"mb-0",children:[(0,m.jsx)("span",{className:"fw-bolder",children:"\u0442\u0435\u043b. "}),e.phone]}),e.notes&&(0,m.jsxs)("p",{className:"mb-0",children:[(0,m.jsx)("span",{className:"fw-bolder",children:"\u0414\u043e\u0434. \u0456\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0456\u044f: "}),e.notes]}),(0,m.jsx)("hr",{})]},s)}))})]})},p=(n(7632),n(2677)),d="ClientsPage_box__0FtZs",x=n(4321),h=function(){var e=(0,l.useState)([]),s=(0,a.Z)(e,2),n=s[0],r=s[1],u=(0,l.useState)(""),h=(0,a.Z)(u,2),j=h[0],N=h[1],v=(0,l.useState)(!0),b=(0,a.Z)(v,2),Z=b[0],w=b[1];(0,l.useEffect)((function(){var e=function(){var e=(0,t.Z)(c().mark((function e(){var s,n;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.Z.get("https://beauty-master-back-end.onrender.com/clients/all-clients");case 3:s=e.sent,n=s.data.sort((function(e,s){return e.name.localeCompare(s.name)})),r(n),w(!1),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),i.ZP.error("\u0421\u0442\u0430\u043b\u0430\u0441\u044f \u043f\u043e\u043c\u0438\u043b\u043a\u0430"),w(!1);case 13:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();e()}),[]);var y=n.filter((function(e){return e.name.toLowerCase().includes(j.toLowerCase())}));return(0,m.jsx)(p.Z,{className:"d-flex justify-content-center justify-content-lg-end",children:(0,m.jsxs)(p.Z,{xs:12,sm:8,md:6,xl:5,className:d,children:[(0,m.jsx)("h3",{className:"text-center fst-italic",children:"\u041c\u043e\u0457 \u043a\u043b\u0456\u0454\u043d\u0442\u0438"}),Z?(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(x.Z,{}),(0,m.jsx)(p.Z,{className:"text-center mt-2 mb-3",children:"\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0454\u0442\u044c\u0441\u044f..."})]}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("input",{type:"text",className:"form-control mb-3 mx-auto w-75",placeholder:"\u041f\u043e\u0448\u0443\u043a \u0437\u0430 \u0456\u043c\u0435\u043d\u0435\u043c",value:j,onChange:function(e){N(e.target.value)}}),0===n.length&&(0,m.jsx)("p",{className:"text-center",children:"\u0423 \u0412\u0430\u0441 \u043f\u043e\u043a\u0438 \u0449\u043e \u043d\u0435 \u043c\u0430\u0454 \u043a\u043b\u0456\u0454\u043d\u0442\u0456\u0432"}),(0,m.jsx)("ul",{className:"ps-1 pe-1 pb-3 list-unstyled",children:y.map((function(e,s){return(0,m.jsx)("li",{className:"ps-3",children:(0,m.jsx)(f,{client:e})},s)}))})]}),(0,m.jsx)(i.x7,{})]})})};function j(){return(0,m.jsx)(h,{})}},2677:function(e,s,n){var t=n(9439),a=n(1413),r=n(5987),c=n(1694),l=n.n(c),o=n(2791),i=n(162),u=n(184),m=["as","bsPrefix","className"],f=["className"];var p=o.forwardRef((function(e,s){var n=function(e){var s=e.as,n=e.bsPrefix,t=e.className,c=(0,r.Z)(e,m);n=(0,i.vE)(n,"col");var o=(0,i.pi)(),u=(0,i.zG)(),f=[],p=[];return o.forEach((function(e){var s,t,a,r=c[e];delete c[e],"object"===typeof r&&null!=r?(s=r.span,t=r.offset,a=r.order):s=r;var l=e!==u?"-".concat(e):"";s&&f.push(!0===s?"".concat(n).concat(l):"".concat(n).concat(l,"-").concat(s)),null!=a&&p.push("order".concat(l,"-").concat(a)),null!=t&&p.push("offset".concat(l,"-").concat(t))})),[(0,a.Z)((0,a.Z)({},c),{},{className:l().apply(void 0,[t].concat(f,p))}),{as:s,bsPrefix:n,spans:f}]}(e),c=(0,t.Z)(n,2),o=c[0],p=o.className,d=(0,r.Z)(o,f),x=c[1],h=x.as,j=void 0===h?"div":h,N=x.bsPrefix,v=x.spans;return(0,u.jsx)(j,(0,a.Z)((0,a.Z)({},d),{},{ref:s,className:l()(p,!v.length&&N)}))}));p.displayName="Col",s.Z=p}}]);
//# sourceMappingURL=230.f22debd6.chunk.js.map