(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[335],{3503:function(e,t,n){"use strict";var r=n(4067),s=n.n(r),c=n(7294),a=n(5893),u=function(e){var t=e.errMsg;return(0,a.jsx)(a.Fragment,{children:t.length>0&&(0,a.jsx)("ul",{className:s().errorContainer,children:t.map((function(e){return(0,a.jsxs)("li",{children:["* ",e,"."]},e)}))})})};t.Z=(0,c.memo)(u)},8460:function(e,t,n){"use strict";var r=n(4942),s=n(7208),c=n.n(s),a=n(7294),u=n(5893);function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var l=function(e){var t,n=e.name,s=e.required,o=e.inputValue,l=e.submitCount,f=e.setInputValue;(0,a.useEffect)((function(){f((function(e){return i(i({},e),{},(0,r.Z)({},n,""))}))}),[]);return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)("div",{className:"".concat(c().inputContainer," ").concat(c().textArea," "),children:[(0,u.jsx)("textarea",{value:o[n]||"",name:o[n],id:n,onChange:function(e){return t=e.target.value,void f((function(e){return i(i({},e),{},(0,r.Z)({},n,t))}));var t},className:"flex-center ".concat(c().filled," ").concat(s&&l>0&&!(null!==(t=o[n])&&void 0!==t&&t.length)&&c().failure)}),(0,u.jsxs)("label",{htmlFor:n,children:[n," ",!s&&"(optional)"]})]})})};t.Z=(0,a.memo)(l)},1208:function(e,t,n){"use strict";var r=n(5934),s=n.n(r),c=n(9920),a=n(2770),u=n(7294),o=n(5893);t.Z=function(e){var t=e.children,n=e.state,r=e.setState,i=e.no_scroll,l=e.customMessage,f=e.pseudoStateDuration,d=(0,c.useSpring)({x:"success"==n||"failure"==n?"0%":"-100%",opacity:"success"==n||"failure"==n?"1":"0",from:{x:"-100%"}}),m=(0,c.useTransition)("loading"==n,{enter:{opacity:"1",transform:"scale(1)"},leave:{opacity:"1",transform:"scale(1)"},from:{opacity:"1",transform:"scale(0.9)"}}),p=(0,u.useRef)(n);return(0,u.useEffect)((function(){["loading","success","failure"].includes(n)||(p.current=n)}),[n]),(0,u.useEffect)((function(){"success"!=n&&"failure"!=n||setTimeout((function(){r(p.current)}),f||1e3)}),[n]),(0,u.useEffect)((function(){var e=document.getElementById("__next");e.scroll(0,0),"loading"==n&&i?e.style.overflow="hidden":"success"!=n&&"failure"!=n&&i&&(e.style.overflow="")}),[n]),(0,o.jsxs)("div",{className:"".concat(s().controller),children:[m((function(e,t){return t&&(0,o.jsx)(c.animated.div,{className:"".concat(s().states),style:e,children:(0,o.jsx)("div",{children:(0,o.jsx)(a.Z,{width:"80px",background:"var(--accent-color-1)"})})})})),(0,o.jsx)(c.animated.div,{className:"".concat(s().states),style:d,children:(0,o.jsx)("div",{children:(0,o.jsx)("p",{className:"".concat(s()[n]," ").concat(s().message),children:l&&l[n]})})}),(0,o.jsx)("div",{children:t})]})}},9865:function(e,t,n){"use strict";n.r(t);var r=n(5861),s=n(7757),c=n.n(s),a=n(1208),u=n(5035),o=n(8977),i=n(8460),l=n(7294),f=n(3503),d=n(1163),m=n(9669),p=n.n(m),v=n(5893);t.default=function(){var e=(0,d.useRouter)().query.focus;(0,l.useEffect)((function(){s({focus:(null===e||void 0===e?void 0:e.toString())||"",message:"",contact:""})}),[e]);var t=(0,l.useState)({focus:"",contact:"",message:""}),n=t[0],s=t[1],m=(0,l.useState)("idle"),g=m[0],h=m[1],x=(0,l.useState)([]),j=x[0],y=x[1],b=(0,l.useState)(0),_=b[0],w=b[1],O=function(){var e=(0,r.Z)(c().mark((function e(){var t;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(y([]),w((function(e){return e+1})),t=[],(0,u.uE)(n,{},t),!(t.length>0)){e.next=6;break}return e.abrupt("return",y(t));case 6:return h("loading"),e.next=9,p().post("/api/contact_message",{contact:n.contact,focus:n.focus,msg:n.message}).catch((function(e){return e.response}));case 9:200===e.sent.status?(h("success"),w(0)):h("failure");case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,l.useEffect)((function(){document.getElementById("__next").scroll(0,0)}),[g]),(0,v.jsx)("div",{className:"big-container",children:(0,v.jsx)(a.Z,{state:g,setState:h,pseudoStateDuration:1500,customMessage:{success:"Message received",failure:"Something went wrong."},children:(0,v.jsxs)("div",{style:{maxWidth:"500px",margin:"auto"},children:[(0,v.jsx)("h3",{style:{textAlign:"center",textDecoration:"underline",margin:"var(--larger-margin) 0"},children:"Live a message. We will get back to you very soon."}),(0,v.jsxs)("div",{style:{padding:"var(--padding)"},children:[(0,v.jsx)(o.Z,{name:"contact",required:!0,inputValue:n,proposition:void 0,setInputValue:s}),(0,v.jsx)(o.Z,{name:"focus",required:!0,proposition:void 0,inputValue:n,submitCount:_,setInputValue:s,defaultValue:n.focus}),(0,v.jsx)(i.Z,{name:"message",required:!0,inputValue:n,submitCount:_,setInputValue:s}),(0,v.jsx)("button",{className:"button",onClick:O,children:"Submit FeedBack"})]}),(0,v.jsx)(f.Z,{errMsg:j})]})})})}},603:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/contact",function(){return n(9865)}])},4067:function(e){e.exports={errorContainer:"style_errorContainer__1yas7"}}},function(e){e.O(0,[774,888,179],(function(){return t=603,e(e.s=t);var t}));var t=e.O();_N_E=t}]);