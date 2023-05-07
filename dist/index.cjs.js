"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react");function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var r,a,s,o=t(e);function n(e){return new Error(`"${e}" is not registered`)}exports.FormRefreshType=void 0,(r=exports.FormRefreshType||(exports.FormRefreshType={})).blur="blur",r.instant="instant",exports.FormShouldValidateType=void 0,(a=exports.FormShouldValidateType||(exports.FormShouldValidateType={})).YES="YES",a.AFTER_FIRST_SUBMIT_ATTEMPT="AFTER_FIRST_SUBMIT_ATTEMPT",a.NO="NO",exports.FormRefreshType.instant,exports.ActionType=void 0,(s=exports.ActionType||(exports.ActionType={})).INIT="INIT",s.NEW_VALUE="NEW_VALUE",s.BLURRED="BLURRED",s.ASYNC_VALIDATION="ASYNC_VALIDATION",s.SUBMIT_STARTED="SUBMIT_STARTED",s.SUBMIT_ERROR="SUBMIT_ERROR",s.SUBMIT_SUCCEED="SUBMIT_SUCCEED",s.NEW_VALUE_DEBOUNCED="NEW_VALUE_DEBOUNCED",s.BLURRED_DEBOUNCED="BLURRED_DEBOUNCED";class i{time;__select_time;constructor(e=800){this.time=e,this.__select_time=0}cb(e){this.reset(),this.__select_time=setTimeout((()=>{e&&e()}),this.time)}reset(){clearTimeout(this.__select_time)}}function u(e,t){function r(t){t.error?e.formState.formStatus="ERROR":"ERROR"!==e.formState.formStatus?e.formState.formStatus="NOT-CLEAN":e.formState.formStatus=Object.values(e.inputStates).reduce(((e,t)=>e&&!!t.error),!1)?"ERROR":"NOT-CLEAN"}switch(t.type){case exports.ActionType.INIT:e.formState.formStatus="CLEAN";break;case exports.ActionType.BLURRED_DEBOUNCED:case exports.ActionType.NEW_VALUE_DEBOUNCED:{const a=t.payload,s=a.error,o=a.validateRequired,i=e.inputStates[a.name];if(!i)throw n(a.name);if(i.value=i._refreshValue,s&&!Array.isArray(s))throw new Error("error must be array");i.error=s,i.validateRequired=o??i.validateRequired,r(i);break}case exports.ActionType.NEW_VALUE:{const a=t.payload,s=a.value,o=a.error,i=a.validateRequired,u=e.inputStates[a.name];if(!u)throw n(a.name);if(u._refreshValue=s,e.formState.refreshType===exports.FormRefreshType.instant&&(e.formState.debounceNumber&&0!==e.formState.debounceNumber||(u.value=s)),o&&!Array.isArray(o))throw new Error("error must be array");u.error=o,u.validateRequired=i??u.validateRequired,r(u);break}case exports.ActionType.BLURRED:{if(e.formState.refreshType!==exports.FormRefreshType.blur)break;const a=t.payload,s=a.error,o=a.validateRequired,i=e.inputStates[a.name];if(!i)throw n(a.name);if(i.value=i._refreshValue,s&&!Array.isArray(s))throw new Error("error must be array");i.error=s,i.validateRequired=o??i.validateRequired,r(i);break}case exports.ActionType.SUBMIT_STARTED:{const r=t.payload;e.formState.loading=!0,e.formState.confirmActive=r.confirmActive,e.formState.submitAttemptNumber++;break}case exports.ActionType.SUBMIT_SUCCEED:e.formState.confirmActive=!1,e.formState.loading=!1,Object.values(e.inputStates).forEach((e=>{e.validateRequired=!1})),e.formState.formStatus="SUCCESS";break;case exports.ActionType.SUBMIT_ERROR:{const r=t.payload;e.formState.confirmActive=!1,e.formState.loading=!1,Object.values(e.inputStates).forEach((e=>{e.validateRequired=!1})),e.formState.formStatus="ERROR";const a=r.error;if(a)if(Array.isArray(a))a.forEach((t=>{if(t instanceof Error||!t.name)e.formState.error=t;else{const r=e.inputStates[t.name];r&&(r.error=Array.isArray(t)?t:[t])}}));else if(console.error(a),a instanceof Error||!a.name)e.formState.error=a;else{const t=e.inputStates[a.name];t&&(t.error=[a])}else console.warn("Wrong usage, error must be filled if success is false");break}case exports.ActionType.ASYNC_VALIDATION:{const r=t.payload,a=e.inputStates[r.name];if(!a)throw n(r.name);r.forSubmit&&(e.formState.loading=r.value),a.validateLoading=r.value;break}default:throw new Error("Unexpected Action Type")}return e}class l{state;reducer;listeners=[];instantListeners=[];debounce;__inputValidationFunctions__={};__lastEvent__={actionProps:{type:exports.ActionType.INIT,payload:void 0},index:0};constructor(e,t){this.state=e,this.reducer=t,this.debounce=e.formState.debounceNumber&&e.formState.debounceNumber>0?new i(e.formState.debounceNumber):void 0}subscribe(e){return this.listeners.push(e),()=>{this.listeners.splice(this.listeners.indexOf(e),1)}}subscribeInstant(e){return this.instantListeners.push(e),()=>{this.listeners.splice(this.instantListeners.indexOf(e),1)}}dispatch(e){this.__lastEvent__={actionProps:{type:e.type,payload:e.payload},index:this.__lastEvent__.index+1},(e.type===exports.ActionType.NEW_VALUE&&this.state.formState.refreshType===exports.FormRefreshType.instant||e.type===exports.ActionType.BLURRED&&this.state.formState.refreshType===exports.FormRefreshType.blur)&&this.state.formState.debounceNumber&&this.state.formState.debounceNumber>0?(console.log("debounce",e,this.state.formState.refreshType),this.debounce?.cb((()=>{e.type===exports.ActionType.BLURRED?this.dispatch({type:exports.ActionType.NEW_VALUE_DEBOUNCED,payload:e.payload}):this.dispatch({type:exports.ActionType.BLURRED_DEBOUNCED,payload:e.payload})}))):(this.state=this.reducer(this.state,e),this.instantBroadcast(),this.broadcast())}getValidationData(){return Object.entries(this.state.inputStates).filter((([,e])=>e.validateRequired)).reduce(((e,[t,r])=>(e[t]=r.value,e)),{})}createInput(e,t){if(this.state.inputStates[e])return this.state.inputStates[e];this.state.inputStates[e]={name:e,value:t.defaultValue,validateLoading:!1,_refreshValue:t.defaultValue,validateRequired:!0,error:void 0}}broadcast(){this.listeners.forEach((e=>e(this.state)))}instantBroadcast(){this.instantListeners.forEach((e=>e(this.state)))}getRawData(){return Object.entries(this.state.inputStates).reduce(((e,[t,r])=>(e[t]=r.value,e)),{})}getShouldValidateAgain(){return Object.values(this.state.inputStates).reduce(((e,t)=>e||t.validateRequired),!1)}addValidation(e,t){this.__inputValidationFunctions__[e]=t||void 0}}const c=/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,d=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,p=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;function f(e){return!!e}function h(e,t){if(!e)return!0;let r=Number(e);return!isNaN(r)&&r>t}function m(e,t){return!e||"string"==typeof e&&e.length>t}function y(e,t){if(!e)return!0;let r=Number(e);return!isNaN(r)&&r<t}function S(e,t){return!e||"string"==typeof e&&e.length<t}function E(e){return!e||"string"==typeof e&&!!e.toLowerCase().match(d)}function v(e){return!e||"string"==typeof e&&!!e.match(c)}function T(e,t){return!t||e===t}function _(e){return!e||"string"==typeof e&&!!e.match(p)}function b(e,t){return!e||"string"==typeof e&&t.test(e)}var A;!function(e){e.required="required",e.min="min",e.minLength="minLength",e.max="max",e.maxLength="maxLength",e.email="email",e.phone="phone",e.repeatPassword="repeatPassword",e.url="url",e.regex="regex"}(A||(A={}));class g{store;validateName;validations={};settings={validateAll:!1};constructor(e,t){this.store=e,this.validateName=t}required(){return this.register(A.required,f)}min(e){return this.register(A.min,h,e)}minLength(e){return this.register(A.minLength,m,e)}max(e){return this.register(A.max,y,e)}maxLength(e){return this.register(A.maxLength,S,e)}email(){return this.register(A.email,E)}phone(){return this.register(A.phone,v)}repeatPassword(e){const t=this.store.getRawData();return this.register(A.repeatPassword,T,t?t[e]:void 0)}url(){return this.register(A.url,_)}regex(e){return this.register(A.regex,b,e)}validate(e,t,r){return this.register("custom_"+this.validateName,t,Number(r))}async(e,t,r){return this.registerAsync(e,t,r)}set(e){return this.settings={...this.settings,validateAll:e.validateAll},this}register(e,t,r){return this.validations[e]={fn:t,payload:r,async:!1},this}registerAsync(e,t,r){return this.validations[e]={fn:t,payload:r,async:!0},this}}function R(e){switch(console.log("error",e),e.type){case A.required:return"This Field is required.";case A.min:return"Minimum required number is "+e.payload;case A.minLength:return"Minimum "+e.payload+" "+(1===e.payload?"character":"characters")+" are allowed";case A.max:return"Maximum required number is "+e.payload;case A.maxLength:return"Maximum "+e.payload+" "+(1===e.payload?"character":"characters")+" are allowed";case A.email:return"Please enter a valid email address.";case A.phone:return"Please enter a valid phone number.";case A.repeatPassword:return(e&&e.name?e.name:"Password ")+" is not matched.";case A.url:return"Please enter a valid url."}return e.payload?.message||"Invalid field"}class x{confirm=null;store;constructor({refreshType:e=exports.FormRefreshType.blur,shouldValidate:t=exports.FormShouldValidateType.AFTER_FIRST_SUBMIT_ATTEMPT,debounceNumber:r}){this.store=new l({formState:{formStatus:"CLEAN",confirmActive:!1,error:null,loading:!1,debounceNumber:r,refreshType:e,shouldValidate:t,submitAttemptNumber:0},inputStates:{}},u),this.onSubmit=this.onSubmit.bind(this)}getDataWithoutValidation(){const e=this.store.getRawData();return{isValid:void 0,validateErrors:void 0,shouldValidateAgain:this.store.getShouldValidateAgain(),loading:this.store.state.formState.loading,data:e}}async getDataWithValidation(e,{validateLoading:t}){const r=this.store.getRawData(),a={isValid:void 0,validateErrors:void 0,shouldValidateAgain:this.store.getShouldValidateAgain(),loading:this.store.state.formState.loading,data:r};if(e){const e=await this.validate(r,{validateLoading:t});a.isValid=!(e&&e.length),a.validateErrors=e}return a}async onSubmit(e){const t=this.store.state,r=t.formState;Object.values(t.inputStates).forEach((e=>{e.value=e._refreshValue})),r.loading&&console.warn("Double click detect"),r.confirmActive&&console.warn("Form submitted when confirm active"),this.store.dispatch({type:exports.ActionType.SUBMIT_STARTED,payload:{confirmActive:!0}});const a=await this.getDataWithValidation(!0,{validateLoading:!0});if(a.isValid)try{const t=e=>{this.confirm=(t,r)=>{if(t){const t=e(r);this.onSubmitResult(t)}else this.store.dispatch({type:exports.ActionType.SUBMIT_ERROR,payload:{payload:{error:r}}})}},s=e&&e(a,{confirm:t});if(r.confirmActive)return;this.onSubmitResult(s)}catch(e){this.store.dispatch({type:exports.ActionType.SUBMIT_ERROR,payload:{payload:{error:e}}})}else{const e=[];if(a.validateErrors){for(let t=0;t<a.validateErrors.length;t++){const r=a.validateErrors[t];e.push({value:r.value,name:r.name,payload:r.payload,type:r.type})}this.store.dispatch({type:exports.ActionType.SUBMIT_ERROR,payload:{error:e}})}}}shouldValidate(e){const t=this.store.state.formState.shouldValidate;let r=!1;if("function"==typeof t)r=t(this);else{const a=t;(a===exports.FormShouldValidateType.YES||a===exports.FormShouldValidateType.AFTER_FIRST_SUBMIT_ATTEMPT&&e.submitAttemptNumber>0)&&(r=!0)}return r}createInput(e,t){return this.store.createInput(e,t),t.validation?this.store.__inputValidationFunctions__[e]=t.validation:this.store.__inputValidationFunctions__[e]=void 0,{onChange:t=>{this.setValue(e,t).then()},onBlur:async()=>{console.log("this.store.state.formState.refreshType",this.store.state.formState.refreshType),this.store.state.formState.refreshType===exports.FormRefreshType.blur&&setTimeout((async()=>{let t;const r=this.store.state.inputStates[e],a=r?._refreshValue;r?.validateRequired&&(t=await this.validateInput(e,a)),this.store.dispatch({type:exports.ActionType.BLURRED,payload:{name:e,error:t,validateRequired:void 0===t}})}),50)},addValidation:t=>{this.store.addValidation(e,t)}}}deleteInput(e){this.checkNameExist(e),delete this.store.state.inputStates[e]}async setValue(e,t){this.checkNameExist(e);let r=null,a=!1;this.store.state.formState.refreshType===exports.FormRefreshType.instant&&(r=await this.validateInput(e,t),a=!0),this.store.dispatch({type:exports.ActionType.NEW_VALUE,payload:{value:t,name:e,error:r,validateRequired:!a}})}async validateInput(e,t){this.checkNameExist(e);const r=this.store.state.formState,a=this.store.__inputValidationFunctions__[e];if(!a)return null;if(!this.shouldValidate(r))return;const s=a(new g(this.store,"validator_"+e));if(!s)return null;let o=[];const n=Object.keys(s.validations);for(let r=0;r<n.length;r++){if(o.length&&!s.settings.validateAll)return o;const a=n[r],i=s.validations[a],u=i.fn(t,i.payload);if(u||o.push([{name:e,type:a,value:t,payload:i.payload}]),u&&u.then){this.store.dispatch({type:exports.ActionType.ASYNC_VALIDATION,payload:{name:e,value:!0,forSubmit:!1}});const r=await u;this.store.dispatch({type:exports.ActionType.ASYNC_VALIDATION,payload:{name:e,value:!1,forSubmit:!1}}),r||o.push({name:e,type:a,value:t,payload:i.payload})}}return o}async validate(e,{validateLoading:t}){const r=[],a=Object.keys(e);for(let s=0;s<a.length;s++){const o=a[s],n=this.store.__inputValidationFunctions__[o];if(!n)continue;const i=n(new g(this.store,"validator_"+o));if(!i)continue;const u=Object.keys(i.validations);for(let a=0;a<u.length;a++){const s=u[a],n=i.validations[s],l=e[o],c=n.fn(l,n.payload);if(c||r.push({name:o,type:s,value:l,payload:n.payload}),c&&c.then){t&&this.store.dispatch({type:exports.ActionType.ASYNC_VALIDATION,payload:{name:o,value:!0,forSubmit:!0}});const e=await c;t&&this.store.dispatch({type:exports.ActionType.ASYNC_VALIDATION,payload:{name:o,value:!1,forSubmit:!0}}),e||r.push({name:o,type:s,value:l,payload:n.payload})}}}return r}checkNameExist(e){if(!this.store.state.inputStates[e])throw n(e)}onSubmitResult(e){if(e&&void 0!==e.then){e.then((()=>{this.store.dispatch({type:exports.ActionType.SUBMIT_SUCCEED})})).catch((e=>{this.store.dispatch({type:exports.ActionType.SUBMIT_ERROR,payload:{error:e}})}))}else this.store.dispatch({type:exports.ActionType.SUBMIT_SUCCEED})}}function N(t,r,a={}){const s=t.createInput(r,{defaultValue:a.defaultValue,validation:a.validation});return e.useInsertionEffect((()=>()=>t.deleteInput(r)),[t,r]),s}function V(t){const[r,a]=e.useState((()=>t.store.state.formState?.error));return e.useEffect((()=>{a(t.store.state.formState?.error)}),[t]),e.useEffect((()=>t.store.subscribe((()=>{const e=t.store.state.formState;a(e?.error)}))),[t]),r}function I(t,r){const[a,s]=e.useState((()=>t.store.state.inputStates[r]?.error)),[o,n]=e.useState((()=>t.store.state.inputStates[r]?.validateLoading));return e.useEffect((()=>{const e=t.store.state.inputStates[r];s(e?.error),n(e?.validateLoading)}),[t,r]),e.useEffect((()=>t.store.subscribe((()=>{const e=t.store.state.inputStates[r];s(e?.error),n(e?.validateLoading)}))),[t,r]),{error:a&&a[0],loading:o}}const L=e.createContext(null);function D(t){const r=e.useMemo((()=>new x({refreshType:t?.refreshType,shouldValidate:t?.shouldValidate,debounceNumber:t?.debounceNumber})),[t?.refreshType,t?.shouldValidate]);return o.default.createElement(L.Provider,{value:{formBase:r}},t.children)}function B(){const t=e.useContext(L);if(!t)throw new Error(`You cannot use ${"useContextFormBase"} outside of Form Component`);return t.formBase}const U=o.default.memo((e=>{const t=B(),{...r}=e;return o.default.createElement("form",{...r,onSubmit:r=>{r.preventDefault(),t.onSubmit(((t,r)=>{if(e.onSubmit)return e.onSubmit(t,r)})).then()}})})),C=o.default.memo((e=>{const{formBaseOptions:t,...r}=e;return o.default.createElement(D,{...t},o.default.createElement(U,{...r},e.children))}));function w(t,r,a={}){const s=N(t,r,a);s.ref=e.useRef();const o=I(t,"name");return e.useEffect((()=>{if(!r)return;return t.store.subscribeInstant((e=>{s.ref.current&&(s.ref.current.value=e.inputStates[r]?._refreshValue||"")}))}),[t,s.ref,r]),{...s,...o}}const O=o.default.memo((t=>{const{name:r,validation:a,defaultValue:s,inputRef:n,...i}=t,u=B(),l=e.useId(),{onChange:c,onBlur:d,ref:p}=w(u,r||l,{validation:a,defaultValue:s}),f=i;return o.default.createElement("input",{...f,ref:e=>{p.current=e,n&&(n.current=e)},onChange:e=>{const t=e.target.value;c(t),i.onChange&&i.onChange(e)},onBlur:e=>{d(),i.onBlur&&i.onBlur(e)}})})),F=o.default.memo((t=>{const{name:r,validation:a,defaultValue:s,inputRef:n,...i}=t,u=B(),l=e.useId(),{onChange:c,onBlur:d,ref:p}=w(u,r||l),f=i;return o.default.createElement("textarea",{...f,ref:e=>{p.current=e,n&&(console.log("el",e),n.current=e)},onChange:e=>{const t=e.target.value;c(t),i.onChange&&i.onChange(e)},onBlur:e=>{d(),i.onBlur&&i.onBlur(e)}})})),M=o.default.memo((({errorMessage:e="Something went wrong"})=>{const t=V(B());return t?o.default.createElement("p",null,"string"==typeof t?t:t.message||e):null})),q=o.default.memo((({name:e,customErrorText:t})=>{const r=B(),{error:a,loading:s}=I(r,e);return t||(t=e=>R(e)),o.default.createElement("p",null,s?o.default.createElement("span",null,"Loading"):a?t(a):null)}));exports.Form=C,exports.FormBase=x,exports.FormError=M,exports.Input=O,exports.InputError=q,exports.Textarea=F,exports.Validator=g,exports.getErrorDefaultText=R,exports.useConfirm=function(t){const[r,a]=e.useState((()=>t.store.state.formState.confirmActive)),s=e.useCallback((e=>{t.confirm&&t.confirm(!0,e)}),[t]),o=e.useCallback((()=>{t.confirm&&t.confirm(!1)}),[t]);return e.useEffect((()=>t.store.subscribe((e=>{a(t.store.state.formState.confirmActive)}))),[t]),{active:r,resolve:s,reject:o}},exports.useContextFormBase=B,exports.useCreateDomInput=w,exports.useCreateInput=N,exports.useErrorForGlobal=V,exports.useErrorForInput=I,exports.useEventChange=function(t){const[r,a]=e.useState((()=>[{...t.store.__lastEvent__}]));return e.useEffect((()=>t.store.subscribe((()=>{const e=t.store.__lastEvent__;a((t=>[...t,{...e}]))}))),[t]),[r,a]},exports.useInstantWatch=function(t,r){const[a,s]=e.useState((()=>r?t.store.state.inputStates[r]?._refreshValue:void 0));return e.useEffect((()=>{r&&s(t.store.state.inputStates[r]?._refreshValue)}),[t,r]),e.useEffect((()=>{if(!r)return;return t.store.subscribeInstant((e=>{s(e.inputStates[r]?._refreshValue)}))}),[t,r]),a},exports.useLoading=function(t){const[r,a]=e.useState((()=>t.store.state.formState?.loading));return e.useEffect((()=>{a(t.store.state.formState?.loading)}),[t]),e.useEffect((()=>t.store.subscribe((e=>{a(e.formState.loading)}))),[t]),r},exports.useResponseDataWatch=function(t){const[r,a]=e.useState((()=>t.getDataWithoutValidation())),s=e.useRef(0);return e.useEffect((()=>{const e=t.store;return e.subscribe((async()=>{const r=e.state.formState;if("NOT-CLEAN"!==r.formStatus)return;const o=r.submitAttemptNumber,n=await t.getDataWithValidation(s.current!==o,{validateLoading:!1});s.current!==o&&(s.current=o),a(n)}))}),[t]),r},exports.useStoreStateWatch=function(t,r){const[a,s]=e.useState((()=>t.store.state));return e.useEffect((()=>{const e=e=>{s({...e})};return"instant"===r?t.store.subscribeInstant(e):t.store.subscribe(e)}),[r,t]),a},exports.useWatch=function(t,r){const[a,s]=e.useState((()=>r?t.store.state.inputStates[r]?.value:void 0));return e.useEffect((()=>{r&&s(t.store.state.inputStates[r]?.value)}),[t,r]),e.useEffect((()=>{if(!r)return;return t.store.subscribe((e=>{s(e.inputStates[r]?.value)}))}),[t,r]),a};
//# sourceMappingURL=index.cjs.js.map
