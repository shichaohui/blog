import{_ as h,f as v,u as k,g as L,h as $,r as e,o as n,c,d as r,w as m,b as l,F as V,i as z,n as B,t as g,j as K,k as N}from"./app.5e319a5d.js";import{C as R,P as S,a as T,c as j}from"./Pagation.583dd957.js";const w=v({components:{Common:R,PostList:S,Pagation:T},setup(){const{classificationPosts:s,classificationSummary:u}=k(),f=L();return{classificationList:$(()=>{let a=[];const t=s.value.currentClassificationKey;if(t){const{items:o=[]}=u.value[t];a=Object.values(o)}return a}),classificationPosts:s,handlePagation:a=>{const{currentClassificationKey:t,currentClassificationValue:o}=s.value;f.push(`/${t}/${o}/${a}/`)},convertToPinyin:j}}}),D={class:"categories-container"},F={class:"category-list"},E={class:"text"},O={class:"num"};function b(s,u,f,p,P,a){const t=e("RouterLink"),o=e("PostList"),d=e("Pagation"),C=e("Common");return n(),c("div",D,[r(C,null,{default:m(()=>[l("ul",F,[(n(!0),c(V,null,z(s.classificationList,({label:i,length:_},y)=>(n(),c("li",{key:y,class:B(["category-item",{active:s.classificationPosts.currentClassificationValue===s.convertToPinyin(i)}])},[r(t,{class:"category-link",to:`/${s.classificationPosts.currentClassificationKey}/${s.convertToPinyin(i)}/1/`},{default:m(()=>[l("span",E,g(i),1),l("span",O,g(_),1)]),_:2},1032,["to"])],2))),128))]),r(o,{data:s.classificationPosts.pages,total:s.classificationPosts.total,"page-size":s.classificationPosts.pageSize,"current-page":s.classificationPosts.currentPage},null,8,["data","total","page-size","current-page"]),s.classificationPosts.total>10?(n(),K(d,{key:0,currentPage:s.classificationPosts.currentPage,total:s.classificationPosts.total,onChange:s.handlePagation},null,8,["currentPage","total","onChange"])):N("",!0)]),_:1})])}var G=h(w,[["render",b],["__file","Categories.vue"]]);export{G as default};
