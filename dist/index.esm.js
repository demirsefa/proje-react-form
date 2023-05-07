import t,{useState as e,useCallback as r,useEffect as a,useInsertionEffect as s,useRef as i,createContext as n,useMemo as o,useContext as u,useId as l}from"react";var c,d,h;function m(t){return new Error(`"${t}" is not registered`)}!function(t){t.blur="blur",t.instant="instant"}(c||(c={})),function(t){t.YES="YES",t.AFTER_FIRST_SUBMIT_ATTEMPT="AFTER_FIRST_SUBMIT_ATTEMPT",t.NO="NO"}(d||(d={})),c.instant,function(t){t.INIT="INIT",t.NEW_VALUE="NEW_VALUE",t.BLURRED="BLURRED",t.ASYNC_VALIDATION="ASYNC_VALIDATION",t.SUBMIT_STARTED="SUBMIT_STARTED",t.SUBMIT_ERROR="SUBMIT_ERROR",t.SUBMIT_SUCCEED="SUBMIT_SUCCEED",t.NEW_VALUE_DEBOUNCED="NEW_VALUE_DEBOUNCED",t.BLURRED_DEBOUNCED="BLURRED_DEBOUNCED"}(h||(h={}));class f{time;__select_time;constructor(t=800){this.time=t,this.__select_time=0}cb(t){this.reset(),this.__select_time=setTimeout((()=>{t&&t()}),this.time)}reset(){clearTimeout(this.__select_time)}}function p(t,e){function r(e){e.error?t.formState.formStatus="ERROR":"ERROR"!==t.formState.formStatus?t.formState.formStatus="NOT-CLEAN":t.formState.formStatus=Object.values(t.inputStates).reduce(((t,e)=>t&&!!e.error),!1)?"ERROR":"NOT-CLEAN"}switch(e.type){case h.INIT:t.formState.formStatus="CLEAN";break;case h.BLURRED_DEBOUNCED:case h.NEW_VALUE_DEBOUNCED:{const a=e.payload,s=a.error,i=a.validateRequired,n=t.inputStates[a.name];if(!n)throw m(a.name);if(n.value=n._refreshValue,s&&!Array.isArray(s))throw new Error("error must be array");n.error=s,n.validateRequired=i??n.validateRequired,r(n);break}case h.NEW_VALUE:{const a=e.payload,s=a.value,i=a.error,n=a.validateRequired,o=t.inputStates[a.name];if(!o)throw m(a.name);if(o._refreshValue=s,t.formState.refreshType===c.instant&&(t.formState.debounceNumber&&0!==t.formState.debounceNumber||(o.value=s)),i&&!Array.isArray(i))throw new Error("error must be array");o.error=i,o.validateRequired=n??o.validateRequired,r(o);break}case h.BLURRED:{if(t.formState.refreshType!==c.blur)break;const a=e.payload,s=a.error,i=a.validateRequired,n=t.inputStates[a.name];if(!n)throw m(a.name);if(n.value=n._refreshValue,s&&!Array.isArray(s))throw new Error("error must be array");n.error=s,n.validateRequired=i??n.validateRequired,r(n);break}case h.SUBMIT_STARTED:{const r=e.payload;t.formState.loading=!0,t.formState.confirmActive=r.confirmActive,t.formState.submitAttemptNumber++;break}case h.SUBMIT_SUCCEED:t.formState.confirmActive=!1,t.formState.loading=!1,Object.values(t.inputStates).forEach((t=>{t.validateRequired=!1})),t.formState.formStatus="SUCCESS";break;case h.SUBMIT_ERROR:{const r=e.payload;t.formState.confirmActive=!1,t.formState.loading=!1,Object.values(t.inputStates).forEach((t=>{t.validateRequired=!1})),t.formState.formStatus="ERROR";const a=r.error;if(a)if(Array.isArray(a))a.forEach((e=>{if(e instanceof Error||!e.name)t.formState.error=e;else{const r=t.inputStates[e.name];r&&(r.error=Array.isArray(e)?e:[e])}}));else if(console.error(a),a instanceof Error||!a.name)t.formState.error=a;else{const e=t.inputStates[a.name];e&&(e.error=[a])}else console.warn("Wrong usage, error must be filled if success is false");break}case h.ASYNC_VALIDATION:{const r=e.payload,a=t.inputStates[r.name];if(!a)throw m(r.name);r.forSubmit&&(t.formState.loading=r.value),a.validateLoading=r.value;break}default:throw new Error("Unexpected Action Type")}return t}class S{state;reducer;listeners=[];instantListeners=[];debounce;__inputValidationFunctions__={};__lastEvent__={actionProps:{type:h.INIT,payload:void 0},index:0};constructor(t,e){this.state=t,this.reducer=e,this.debounce=t.formState.debounceNumber&&t.formState.debounceNumber>0?new f(t.formState.debounceNumber):void 0}subscribe(t){return this.listeners.push(t),()=>{this.listeners.splice(this.listeners.indexOf(t),1)}}subscribeInstant(t){return this.instantListeners.push(t),()=>{this.listeners.splice(this.instantListeners.indexOf(t),1)}}dispatch(t){this.__lastEvent__={actionProps:{type:t.type,payload:t.payload},index:this.__lastEvent__.index+1},(t.type===h.NEW_VALUE&&this.state.formState.refreshType===c.instant||t.type===h.BLURRED&&this.state.formState.refreshType===c.blur)&&this.state.formState.debounceNumber&&this.state.formState.debounceNumber>0?(console.log("debounce",t,this.state.formState.refreshType),this.debounce?.cb((()=>{t.type===h.BLURRED?this.dispatch({type:h.NEW_VALUE_DEBOUNCED,payload:t.payload}):this.dispatch({type:h.BLURRED_DEBOUNCED,payload:t.payload})}))):(this.state=this.reducer(this.state,t),this.instantBroadcast(),this.broadcast())}getValidationData(){return Object.entries(this.state.inputStates).filter((([,t])=>t.validateRequired)).reduce(((t,[e,r])=>(t[e]=r.value,t)),{})}createInput(t,e){if(this.state.inputStates[t])return this.state.inputStates[t];this.state.inputStates[t]={name:t,value:e.defaultValue,validateLoading:!1,_refreshValue:e.defaultValue,validateRequired:!0,error:void 0}}broadcast(){this.listeners.forEach((t=>t(this.state)))}instantBroadcast(){this.instantListeners.forEach((t=>t(this.state)))}getRawData(){return Object.entries(this.state.inputStates).reduce(((t,[e,r])=>(t[e]=r.value,t)),{})}getShouldValidateAgain(){return Object.values(this.state.inputStates).reduce(((t,e)=>t||e.validateRequired),!1)}addValidation(t,e){this.__inputValidationFunctions__[t]=e||void 0}}const v=/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,y=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,E=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;function _(t){return!!t}function b(t,e){if(!t)return!0;let r=Number(t);return!isNaN(r)&&r>e}function g(t,e){return!t||"string"==typeof t&&t.length>e}function R(t,e){if(!t)return!0;let r=Number(t);return!isNaN(r)&&r<e}function A(t,e){return!t||"string"==typeof t&&t.length<e}function T(t){return!t||"string"==typeof t&&!!t.toLowerCase().match(y)}function N(t){return!t||"string"==typeof t&&!!t.match(v)}function V(t,e){return!e||t===e}function I(t){return!t||"string"==typeof t&&!!t.match(E)}function L(t,e){return!t||"string"==typeof t&&e.test(t)}var D;!function(t){t.required="required",t.min="min",t.minLength="minLength",t.max="max",t.maxLength="maxLength",t.email="email",t.phone="phone",t.repeatPassword="repeatPassword",t.url="url",t.regex="regex"}(D||(D={}));class U{store;validateName;validations={};settings={validateAll:!1};constructor(t,e){this.store=t,this.validateName=e}required(){return this.register(D.required,_)}min(t){return this.register(D.min,b,t)}minLength(t){return this.register(D.minLength,g,t)}max(t){return this.register(D.max,R,t)}maxLength(t){return this.register(D.maxLength,A,t)}email(){return this.register(D.email,T)}phone(){return this.register(D.phone,N)}repeatPassword(t){const e=this.store.getRawData();return this.register(D.repeatPassword,V,e?e[t]:void 0)}url(){return this.register(D.url,I)}regex(t){return this.register(D.regex,L,t)}validate(t,e,r){return this.register("custom_"+this.validateName,e,Number(r))}async(t,e,r){return this.registerAsync(t,e,r)}set(t){return this.settings={...this.settings,validateAll:t.validateAll},this}register(t,e,r){return this.validations[t]={fn:e,payload:r,async:!1},this}registerAsync(t,e,r){return this.validations[t]={fn:e,payload:r,async:!0},this}}function B(t){switch(console.log("error",t),t.type){case D.required:return"This Field is required.";case D.min:return"Minimum required number is "+t.payload;case D.minLength:return"Minimum "+t.payload+" "+(1===t.payload?"character":"characters")+" are allowed";case D.max:return"Maximum required number is "+t.payload;case D.maxLength:return"Maximum "+t.payload+" "+(1===t.payload?"character":"characters")+" are allowed";case D.email:return"Please enter a valid email address.";case D.phone:return"Please enter a valid phone number.";case D.repeatPassword:return(t&&t.name?t.name:"Password ")+" is not matched.";case D.url:return"Please enter a valid url."}return t.payload?.message||"Invalid field"}class w{confirm=null;store;constructor({refreshType:t=c.blur,shouldValidate:e=d.AFTER_FIRST_SUBMIT_ATTEMPT,debounceNumber:r}){this.store=new S({formState:{formStatus:"CLEAN",confirmActive:!1,error:null,loading:!1,debounceNumber:r,refreshType:t,shouldValidate:e,submitAttemptNumber:0},inputStates:{}},p),this.onSubmit=this.onSubmit.bind(this)}getDataWithoutValidation(){const t=this.store.getRawData();return{isValid:void 0,validateErrors:void 0,shouldValidateAgain:this.store.getShouldValidateAgain(),loading:this.store.state.formState.loading,data:t}}async getDataWithValidation(t,{validateLoading:e}){const r=this.store.getRawData(),a={isValid:void 0,validateErrors:void 0,shouldValidateAgain:this.store.getShouldValidateAgain(),loading:this.store.state.formState.loading,data:r};if(t){const t=await this.validate(r,{validateLoading:e});a.isValid=!(t&&t.length),a.validateErrors=t}return a}async onSubmit(t){const e=this.store.state,r=e.formState;Object.values(e.inputStates).forEach((t=>{t.value=t._refreshValue})),r.loading&&console.warn("Double click detect"),r.confirmActive&&console.warn("Form submitted when confirm active"),this.store.dispatch({type:h.SUBMIT_STARTED,payload:{confirmActive:!0}});const a=await this.getDataWithValidation(!0,{validateLoading:!0});if(a.isValid)try{const e=t=>{this.confirm=(e,r)=>{if(e){const e=t(r);this.onSubmitResult(e)}else this.store.dispatch({type:h.SUBMIT_ERROR,payload:{payload:{error:r}}})}},s=t&&t(a,{confirm:e});if(r.confirmActive)return;this.onSubmitResult(s)}catch(t){this.store.dispatch({type:h.SUBMIT_ERROR,payload:{payload:{error:t}}})}else{const t=[];if(a.validateErrors){for(let e=0;e<a.validateErrors.length;e++){const r=a.validateErrors[e];t.push({value:r.value,name:r.name,payload:r.payload,type:r.type})}this.store.dispatch({type:h.SUBMIT_ERROR,payload:{error:t}})}}}shouldValidate(t){const e=this.store.state.formState.shouldValidate;let r=!1;if("function"==typeof e)r=e(this);else{const a=e;(a===d.YES||a===d.AFTER_FIRST_SUBMIT_ATTEMPT&&t.submitAttemptNumber>0)&&(r=!0)}return r}createInput(t,e){return this.store.createInput(t,e),e.validation?this.store.__inputValidationFunctions__[t]=e.validation:this.store.__inputValidationFunctions__[t]=void 0,{onChange:e=>{this.setValue(t,e).then()},onBlur:async()=>{console.log("this.store.state.formState.refreshType",this.store.state.formState.refreshType),this.store.state.formState.refreshType===c.blur&&setTimeout((async()=>{let e;const r=this.store.state.inputStates[t],a=r?._refreshValue;r?.validateRequired&&(e=await this.validateInput(t,a)),this.store.dispatch({type:h.BLURRED,payload:{name:t,error:e,validateRequired:void 0===e}})}),50)},addValidation:e=>{this.store.addValidation(t,e)}}}deleteInput(t){this.checkNameExist(t),delete this.store.state.inputStates[t]}async setValue(t,e){this.checkNameExist(t);let r=null,a=!1;this.store.state.formState.refreshType===c.instant&&(r=await this.validateInput(t,e),a=!0),this.store.dispatch({type:h.NEW_VALUE,payload:{value:e,name:t,error:r,validateRequired:!a}})}async validateInput(t,e){this.checkNameExist(t);const r=this.store.state.formState,a=this.store.__inputValidationFunctions__[t];if(!a)return null;if(!this.shouldValidate(r))return;const s=a(new U(this.store,"validator_"+t));if(!s)return null;let i=[];const n=Object.keys(s.validations);for(let r=0;r<n.length;r++){if(i.length&&!s.settings.validateAll)return i;const a=n[r],o=s.validations[a],u=o.fn(e,o.payload);if(u||i.push([{name:t,type:a,value:e,payload:o.payload}]),u&&u.then){this.store.dispatch({type:h.ASYNC_VALIDATION,payload:{name:t,value:!0,forSubmit:!1}});const r=await u;this.store.dispatch({type:h.ASYNC_VALIDATION,payload:{name:t,value:!1,forSubmit:!1}}),r||i.push({name:t,type:a,value:e,payload:o.payload})}}return i}async validate(t,{validateLoading:e}){const r=[],a=Object.keys(t);for(let s=0;s<a.length;s++){const i=a[s],n=this.store.__inputValidationFunctions__[i];if(!n)continue;const o=n(new U(this.store,"validator_"+i));if(!o)continue;const u=Object.keys(o.validations);for(let a=0;a<u.length;a++){const s=u[a],n=o.validations[s],l=t[i],c=n.fn(l,n.payload);if(c||r.push({name:i,type:s,value:l,payload:n.payload}),c&&c.then){e&&this.store.dispatch({type:h.ASYNC_VALIDATION,payload:{name:i,value:!0,forSubmit:!0}});const t=await c;e&&this.store.dispatch({type:h.ASYNC_VALIDATION,payload:{name:i,value:!1,forSubmit:!0}}),t||r.push({name:i,type:s,value:l,payload:n.payload})}}}return r}checkNameExist(t){if(!this.store.state.inputStates[t])throw m(t)}onSubmitResult(t){if(t&&void 0!==t.then){t.then((()=>{this.store.dispatch({type:h.SUBMIT_SUCCEED})})).catch((t=>{this.store.dispatch({type:h.SUBMIT_ERROR,payload:{error:t}})}))}else this.store.dispatch({type:h.SUBMIT_SUCCEED})}}function C(t){const[s,i]=e((()=>t.store.state.formState.confirmActive)),n=r((e=>{t.confirm&&t.confirm(!0,e)}),[t]),o=r((()=>{t.confirm&&t.confirm(!1)}),[t]);return a((()=>t.store.subscribe((e=>{i(t.store.state.formState.confirmActive)}))),[t]),{active:s,resolve:n,reject:o}}function O(t,e,r={}){const a=t.createInput(e,{defaultValue:r.defaultValue,validation:r.validation});return s((()=>()=>t.deleteInput(e)),[t,e]),a}function x(t){const[r,s]=e((()=>t.store.state.formState?.error));return a((()=>{s(t.store.state.formState?.error)}),[t]),a((()=>t.store.subscribe((()=>{const e=t.store.state.formState;s(e?.error)}))),[t]),r}function M(t,r){const[s,i]=e((()=>t.store.state.inputStates[r]?.error)),[n,o]=e((()=>t.store.state.inputStates[r]?.validateLoading));return a((()=>{const e=t.store.state.inputStates[r];i(e?.error),o(e?.validateLoading)}),[t,r]),a((()=>t.store.subscribe((()=>{const e=t.store.state.inputStates[r];i(e?.error),o(e?.validateLoading)}))),[t,r]),{error:s&&s[0],loading:n}}function q(t){const[r,s]=e((()=>[{...t.store.__lastEvent__}]));return a((()=>t.store.subscribe((()=>{const e=t.store.__lastEvent__;s((t=>[...t,{...e}]))}))),[t]),[r,s]}function F(t){const[r,s]=e((()=>t.store.state.formState?.loading));return a((()=>{s(t.store.state.formState?.loading)}),[t]),a((()=>t.store.subscribe((t=>{s(t.formState.loading)}))),[t]),r}function k(t){const[r,s]=e((()=>t.getDataWithoutValidation())),n=i(0);return a((()=>{const e=t.store;return e.subscribe((async()=>{const r=e.state.formState;if("NOT-CLEAN"!==r.formStatus)return;const a=r.submitAttemptNumber,i=await t.getDataWithValidation(n.current!==a,{validateLoading:!1});n.current!==a&&(n.current=a),s(i)}))}),[t]),r}function P(t,r){const[s,i]=e((()=>t.store.state));return a((()=>{const e=t=>{i({...t})};return"instant"===r?t.store.subscribeInstant(e):t.store.subscribe(e)}),[r,t]),s}function W(t,r){const[s,i]=e((()=>r?t.store.state.inputStates[r]?.value:void 0));return a((()=>{r&&i(t.store.state.inputStates[r]?.value)}),[t,r]),a((()=>{if(!r)return;return t.store.subscribe((t=>{i(t.inputStates[r]?.value)}))}),[t,r]),s}function j(t,r){const[s,i]=e((()=>r?t.store.state.inputStates[r]?._refreshValue:void 0));return a((()=>{r&&i(t.store.state.inputStates[r]?._refreshValue)}),[t,r]),a((()=>{if(!r)return;return t.store.subscribeInstant((t=>{i(t.inputStates[r]?._refreshValue)}))}),[t,r]),s}const Y=n(null);function z(e){const r=o((()=>new w({refreshType:e?.refreshType,shouldValidate:e?.shouldValidate,debounceNumber:e?.debounceNumber})),[e?.refreshType,e?.shouldValidate]);return t.createElement(Y.Provider,{value:{formBase:r}},e.children)}function Z(){const t=u(Y);if(!t)throw new Error(`You cannot use ${"useContextFormBase"} outside of Form Component`);return t.formBase}const $=t.memo((e=>{const r=Z(),{...a}=e;return t.createElement("form",{...a,onSubmit:t=>{t.preventDefault(),r.onSubmit(((t,r)=>{if(e.onSubmit)return e.onSubmit(t,r)})).then()}})})),G=t.memo((e=>{const{formBaseOptions:r,...a}=e;return t.createElement(z,{...r},t.createElement($,{...a},e.children))}));function H(t,e,r={}){const s=O(t,e,r);s.ref=i();const n=M(t,"name");return a((()=>{if(!e)return;return t.store.subscribeInstant((t=>{s.ref.current&&(s.ref.current.value=t.inputStates[e]?._refreshValue||"")}))}),[t,s.ref,e]),{...s,...n}}const J=t.memo((e=>{const{name:r,validation:a,defaultValue:s,inputRef:i,...n}=e,o=Z(),u=l(),{onChange:c,onBlur:d,ref:h}=H(o,r||u,{validation:a,defaultValue:s}),m=n;return t.createElement("input",{...m,ref:t=>{h.current=t,i&&(i.current=t)},onChange:t=>{const e=t.target.value;c(e),n.onChange&&n.onChange(t)},onBlur:t=>{d(),n.onBlur&&n.onBlur(t)}})})),K=t.memo((e=>{const{name:r,validation:a,defaultValue:s,inputRef:i,...n}=e,o=Z(),u=l(),{onChange:c,onBlur:d,ref:h}=H(o,r||u),m=n;return t.createElement("textarea",{...m,ref:t=>{h.current=t,i&&(console.log("el",t),i.current=t)},onChange:t=>{const e=t.target.value;c(e),n.onChange&&n.onChange(t)},onBlur:t=>{d(),n.onBlur&&n.onBlur(t)}})})),Q=t.memo((({errorMessage:e="Something went wrong"})=>{const r=x(Z());return r?t.createElement("p",null,"string"==typeof r?r:r.message||e):null})),X=t.memo((({name:e,customErrorText:r})=>{const a=Z(),{error:s,loading:i}=M(a,e);return r||(r=t=>B(t)),t.createElement("p",null,i?t.createElement("span",null,"Loading"):s?r(s):null)}));export{h as ActionType,G as Form,w as FormBase,Q as FormError,c as FormRefreshType,d as FormShouldValidateType,J as Input,X as InputError,K as Textarea,U as Validator,B as getErrorDefaultText,C as useConfirm,Z as useContextFormBase,H as useCreateDomInput,O as useCreateInput,x as useErrorForGlobal,M as useErrorForInput,q as useEventChange,j as useInstantWatch,F as useLoading,k as useResponseDataWatch,P as useStoreStateWatch,W as useWatch};
//# sourceMappingURL=index.esm.js.map
