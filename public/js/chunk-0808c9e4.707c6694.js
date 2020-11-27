(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0808c9e4"],{"4bd4":function(t,e,i){"use strict";i("4de4"),i("7db0"),i("4160"),i("caad"),i("07ac"),i("2532"),i("159b");var r=i("5530"),n=i("58df"),a=i("7e2b"),s=i("3206");e["a"]=Object(n["a"])(a["a"],Object(s["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,i=function(t){return t.$watch("hasError",(function(i){e.$set(e.errorBag,t._uid,i)}),{immediate:!0})},r={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?r.shouldValidate=t.$watch("shouldValidate",(function(n){n&&(e.errorBag.hasOwnProperty(t._uid)||(r.valid=i(t)))})):r.valid=i(t),r},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var i=this.watchers.find((function(t){return t._uid===e._uid}));i&&(i.valid(),i.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object(r["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},"99d9":function(t,e,i){"use strict";i.d(e,"a",(function(){return a})),i.d(e,"b",(function(){return u}));var r=i("b0af"),n=i("80d2"),a=Object(n["g"])("v-card__actions"),s=Object(n["g"])("v-card__subtitle"),o=Object(n["g"])("v-card__text"),u=Object(n["g"])("v-card__title");r["a"]},a55b:function(t,e,i){"use strict";i.r(e);var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",[i("v-card",{staticClass:"col-6 mx-auto"},[i("v-card-title",[t._v("Login to Slacker")]),i("v-form",{ref:"loginForm",attrs:{"lazy-validation":!1},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[i("v-text-field",{attrs:{label:"Username","prepend-icon":"mdi-account",rules:[t.rules.required]},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),i("v-text-field",{attrs:{label:"Password","prepend-icon":"mdi-lock","append-icon":t.showPassword?"mdi-eye":"mdi-eye-off",type:t.showPassword?"text":"password",rules:[t.rules.required,t.rules.minLen]},on:{"click:append":function(e){t.showPassword=!t.showPassword}},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),i("v-card-actions",[i("v-btn",{staticClass:"white--text",attrs:{color:"blue"},on:{click:t.onLoginSubmit}},[t._v("Login")]),i("small",{staticClass:"ml-3"},[t._v(" Need an account? "),i("a",{on:{click:function(e){return t.$router.push("/register")}}},[t._v("Register")])])],1)],1)],1)},n=[],a=i("5530"),s=i("2f62"),o={data:function(){return{valid:!1,username:"",password:"",showPassword:!1,rules:{minLen:function(t){return t.length>=8||"Should be at least 8 characters"},required:function(t){return!!t||"This field is required"}}}},methods:Object(a["a"])(Object(a["a"])({},Object(s["b"])(["login"])),{},{onLoginSubmit:function(){var t=this;if(this.$refs.loginForm.validate(),this.valid){var e={username:this.username,password:this.password};this.login(e).then((function(e){e.data.success&&t.$router.push("/home")}))}}})},u=o,c=i("2877"),d=i("6544"),l=i.n(d),h=i("8336"),f=i("b0af"),v=i("99d9"),p=i("a523"),m=i("4bd4"),b=i("8654"),w=Object(c["a"])(u,r,n,!1,null,null,null);e["default"]=w.exports;l()(w,{VBtn:h["a"],VCard:f["a"],VCardActions:v["a"],VCardTitle:v["b"],VContainer:p["a"],VForm:m["a"],VTextField:b["a"]})}}]);
//# sourceMappingURL=chunk-0808c9e4.707c6694.js.map