(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{396:function(t,e,r){var content=r(397);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(16).default)("7132a15d",content,!0,{sourceMap:!1})},397:function(t,e,r){(e=r(15)(!1)).push([t.i,".theme--light.v-divider{border-color:rgba(0,0,0,.12)}.theme--dark.v-divider{border-color:hsla(0,0%,100%,.12)}.v-divider{display:block;flex:1 1 0px;max-width:100%;height:0;max-height:0;border:solid;border-width:thin 0 0;transition:inherit}.v-divider--inset:not(.v-divider--vertical){max-width:calc(100% - 72px)}.v-application--is-ltr .v-divider--inset:not(.v-divider--vertical){margin-left:72px}.v-application--is-rtl .v-divider--inset:not(.v-divider--vertical){margin-right:72px}.v-divider--vertical{align-self:stretch;border:solid;border-width:0 thin 0 0;display:inline-flex;height:inherit;min-height:100%;max-height:100%;max-width:0;width:0;vertical-align:text-bottom}.v-divider--vertical.v-divider--inset{margin-top:8px;min-height:0;max-height:calc(100% - 16px)}",""]),t.exports=e},400:function(t,e,r){"use strict";r(12),r(10),r(7),r(6),r(11);var n=r(2),o=(r(396),r(28));function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=o.a.extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(t){var e;return this.$attrs.role&&"separator"!==this.$attrs.role||(e=this.vertical?"vertical":"horizontal"),t("hr",{class:v({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:v({role:"separator","aria-orientation":e},this.$attrs),on:this.$listeners})}})},455:function(t,e,r){"use strict";r.r(e);r(31),r(32),r(50),r(22),r(216);var n=r(85),o=r.n(n),l={data:function(){return{baseUrl:"https://utda.github.io/genji",headers:[{text:"頁数",value:"page"}],rows:[],comp_url:null,pageMap:{},infoMap:{},jo:"",vol:-1,config:{taisei:{label:"校異源氏物語",check:"校異源氏物語"},zenshu:{label:"新編日本古典文学全集",check:"新編日本古典文学全集"}},curationUri:"",errs:{}}},watch:{$route:function(){this.vol=-1,this.id=this.$route.params.id,this.search()}},created:function(){var t=this;o.a.get(this.baseUrl+"/data/info.json").then((function(e){for(var map={},r=1,n=e.data.selections,i=0;i<n.length;i++)for(var o=n[i].members,l=0;l<o.length;l++){var v=o[l];map[r]=v.label,r+=1}t.infoMap=map})),this.search()},methods:{search:function(){var t=this,e=this.$route.params.id,r=this.$route.params.vol,n=this.baseUrl+"/data/vol/"+("0000000000"+r).slice(-2)+"/curation.json";this.curationUri=n,this.rows=[];var l={};o.a.get(n).then((function(r){var o=Number(n.split("/vol/")[1].split("/")[0]);t.vol=o;var v=r.data;t.jo=v.label;for(var c=v.selections,d={},i=0;i<c.length;i++)for(var h=c[i],m=h.members,_=0;_<m.length;_++){var f=m[_],label=f.label;if("脱文・錯簡"===label){var w=h.within.label;l[w]||(l[w]=[]);for(var map={},y=f.metadata,x=0;x<y.length;x++){var j=y[x];map[j.label]=j.value}var O=f["@id"],k=O.split("#xywh="),$=k[0],C=k[1].split(","),P=Number(C[1])-150,U=Number(C[3])+150;O=$+"#xywh="+C[0]+","+P+","+C[2]+","+U,l[w].push({page:map.Page,description:map.Text,type:map.Type,url:t.baseUrl+"/mirador/?params="+encodeURIComponent(JSON.stringify([{manifest:h.within["@id"],canvas:O}]))+"&annotationState=on"})}if("zenshu"===e){if(!label.includes(t.config[e].check))continue}else if(!label.includes(t.config[e].check))continue;var N=Number(label.split(" ")[1].split(".")[1]);d[N]||(d[N]={windows:[]});var S=f["@id"],M=S.split("#xywh="),canvas=M[0],V=M[1].split(","),D=Number(V[1])-150,I=Number(V[3])+150;S=canvas+"#xywh="+V[0]+","+D+","+V[2]+","+I,d[N].windows.push({manifestId:h.within["@id"],canvas:f["@id"],label:h.within.label,url:t.baseUrl+"/mirador/?params="+encodeURIComponent(JSON.stringify([{manifest:h.within["@id"],canvas:S}]))+"&annotationState=on"})}for(var J in d){for(var T=[],z=d[J],B=0;B<z.windows.length;B++){var E=z.windows[B];T.push({manifest:E.manifestId,canvas:E.canvas})}d[J].comp_url=t.baseUrl+"/mirador/?params="+encodeURIComponent(JSON.stringify(T))+"&annotationState=on&sidePanel=false"}t.pageMap=d,t.errs=l}))}}},v=r(46),c=r(74),d=r.n(c),h=r(456),m=r(164),_=r(387),f=r(386),w=r(400),y=r(406),x=r(359),component=Object(v.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"mb-5"},[r("div",{staticClass:"container"},[r("v-card",{attrs:{flat:""}},[r("v-card-title",[r("h2",{staticClass:"mb-5"},[t._v("\n          "+t._s(t.$t("browse_by_page"))+" 『"+t._s(t.$t(t.config[this.$route.params.id].label))+"』"),-1!=t.vol?[t._v("（"+t._s(t.vol)+" "+t._s(t.jo)+"）")]:t._e()],2),t._v(" "),r("v-spacer"),t._v(" "),-1!=t.vol?[t.vol-1>0?r("v-btn",{staticClass:"ma-2",attrs:{color:"primary",to:t.localePath({name:"search-id-vol",params:{id:t.$route.params.id,vol:t.vol-1}})}},[t._v("\n            "+t._s(t.vol-1)+" "+t._s(t.infoMap[t.vol-1])+" へ\n          ")]):t._e(),t._v(" "),t.vol+1<=54?r("v-btn",{staticClass:"ma-2",attrs:{color:"primary",to:t.localePath({name:"search-id-vol",params:{id:t.$route.params.id,vol:t.vol+1}})}},[t._v("\n            "+t._s(t.vol+1)+" "+t._s(t.infoMap[t.vol+1])+" へ\n          ")]):t._e()]:t._e()],2),t._v(" "),Object.keys(t.errs).length>0?r("v-alert",{staticClass:"my-5",attrs:{type:"warning",text:""}},[t._v("\n        脱文・錯簡あり："+t._s(Object.keys(t.errs).join(", "))+"\n      ")]):t._e(),t._v(" "),r("v-simple-table",[r("thead",[r("tr",[r("th",[t._v(t._s(t.$t("pageNum")))]),t._v(" "),r("th",[t._v(t._s(t.$t("画像をみる")))]),t._v(" "),r("th",[t._v(t._s(t.$t("並べて比較")))])])]),t._v(" "),r("tbody",t._l(t.pageMap,(function(e,n){return r("tr",{key:n},[r("td",[t._v(t._s(n))]),t._v(" "),r("td",t._l(e.windows,(function(e,n){return r("v-btn",{key:n,staticClass:"ma-2",attrs:{small:"",href:e.url,target:"_blank",link:""}},[t._v("\n                "+t._s(e.label)+"\n              ")])})),1),t._v(" "),r("td",[e.comp_url?r("a",{attrs:{href:e.comp_url,target:"_blank"}},[r("img",{staticClass:"m-2",attrs:{src:"https://iiif.dl.itc.u-tokyo.ac.jp/images/mirador.png"}})]):t._e()])])})),0)]),t._v(" "),Object.keys(t.errs).length>0?[r("h3",{staticClass:"mt-10 mb-5 error--text"},[t._v("脱文・錯簡")]),t._v(" "),r("v-simple-table",[r("thead",[r("tr",[r("th"),t._v(" "),r("th",[t._v(t._s(t.$t("imageNum")))]),t._v(" "),r("th",{attrs:{width:"40%"}},[t._v(t._s(t.$t("explanation")))]),t._v(" "),r("th",[t._v(t._s(t.$t("type")))]),t._v(" "),r("th",[t._v(t._s(t.$t("画像をみる")))])])]),t._v(" "),r("tbody",[t._l(t.errs,(function(e,n){return t._l(e,(function(e,o){return r("tr",{key:n+"-"+o},[r("td",[t._v(t._s(n))]),t._v(" "),r("td",[t._v(t._s(e.page))]),t._v(" "),r("td",[r("div",{staticClass:"py-2",domProps:{innerHTML:t._s(e.description)}})]),t._v(" "),r("td",[t._v(t._s(e.type))]),t._v(" "),r("td",[r("a",{attrs:{href:e.url,target:"_blank"}},[r("img",{staticClass:"m-2",attrs:{src:"https://iiif.dl.itc.u-tokyo.ac.jp/images/mirador.png"}})])])])}))}))],2)])]:t._e(),t._v(" "),r("v-divider",{staticClass:"my-5"}),t._v(" "),r("v-card-title",[r("v-spacer"),t._v(" "),r("v-btn",{staticClass:"ma-2",attrs:{target:"_blank",small:"",href:"http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?curation="+t.curationUri+"&mode=annotation"}},[t._v("\n          "+t._s(t.$t("Curation Viewerでみる"))+"\n          "),r("i",{staticClass:"mdi mdi-open-in-new"})])],1)],2)],1)])}),[],!1,null,null,null);e.default=component.exports;d()(component,{VAlert:h.a,VBtn:m.a,VCard:_.a,VCardTitle:f.c,VDivider:w.a,VSimpleTable:y.a,VSpacer:x.a})}}]);