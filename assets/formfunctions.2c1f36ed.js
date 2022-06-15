import{s as l,b as u,e as m,a as h,r as $,n as W,c as F,t as Z}from"./loadCustomUI.fa5baa27.js";import{C as I,A as K}from"./clock.199a9db6.js";async function Bt(t,e,o){await B(t,e,o||animatedCountDuration),k(t,e)}function k(t,e){return setInterval(()=>{Q(t,e)},500)}function Q(t,{dayNumber:e,hourNumber:o,minNumber:n,secNumber:s}){X(t,e,o,n,s)}async function B(t,e,o=50,n=0){y(e.dayNumber,n,t.days,o),y(e.hourNumber,n,t.hours,o),y(e.minNumber,n,t.minutes,o),y(e.secNumber,n,t.seconds,o)}function X(t,e,o,n,s){t.countDown();let i=t.days,a=t.hours,d=t.minutes,g=t.seconds;i=u(i),a=u(a),d=u(d),g=u(g),l(e,`${i}`),l(o,`${a}`),l(n,`${d}`),l(s,`${g}`)}function y(t,e,o,n){let s=null;const i=a=>{s||(s=a);const d=Math.min((a-s)/n,1);l(t,u(Math.floor(d*(o-e)+e))),d<1&&window.requestAnimationFrame(i)};window.requestAnimationFrame(i)}const f={clockDayElement:"day-num",clockHourElement:"hour-num",clockMinuteElement:"min-num",clockSecondElement:"sec-num",countdownTextDisplay:"countdown-text",countdownList:"countdown-list"};function V(t,e,o){if(o=o.trim(),t!==null){let n=t.findIndex(s=>s.dateModified==o);n>-1?(t[n].text=e.text,t[n].date=e.date,t[n].dateModified=e.dateModified,t[n].repeat=e.repeat,console.log(t[n]),p(t)):(console.log("Unable to find Item to update in displayCountdown array of Countdowns, HandleUpdate",n),console.log("item",e),console.log("countdowns",t),m("Unable to update Item"))}}function q(t){let e="";return ot(t),t.forEach((o,n)=>{e+=nt(t,o,n)}),e}function tt(t){t.forEach(e=>{new I(new Date(e.date)).getDistance()>0&&H(!0)})}function et(t){let e=t.getDistance(),o="",n='<span style="color:#03bf42;"><i class="fas fa-hourglass-start"></i> active</span>';return e>0?o=U(t):(o="Due: "+t.endDate.getDate()+" "+t.endDate.toLocaleString("default",{month:"long"})+", "+t.endDate.getFullYear(),n='<span style="color:crimson;"><i class="fas fa-hourglass-end"></i> elapsed</span>'),{countdownStatus:o,countdownStatusTI:n}}function U(t){let e="";return t.days>0?e=t.days+" days, "+(t.hours>0?t.hours+" hours":t.minutes+" minutes"):t.hours>0?e=t.hours+" hours, "+(t.minutes>0?t.minutes+" minutes":t.seconds+" seconds"):t.minutes>0?e=t.minutes+" minutes, "+t.seconds+" seconds":t.seconds>=0&&(e=t.seconds+" seconds "),` ${e} more`}function ot(t){localStorage.getItem("sort")=="due"?t.sort((o,n)=>new Date(n.date).getTime()-new Date(o.date).getTime()):t.sort((o,n)=>new Date(o.dateModified).getTime()-new Date(n.dateModified).getTime())}function nt(t,e,o){let n=!1,s=!1;e.hasOwnProperty("repeat")&&e.repeat&&(_(t,e.date,o),n=!0);let i=new I(new Date(e.date)),{countdownStatus:a,countdownStatusTI:d}=et(i);return i.getDistance()<0&&(s=!0),`
    <div class="countdown-list-item" data-index="${o}" data-id="${e.dateModified}">
        <div class="countdown-list-text"> ${e.text} </div>
        <div class="countdown-list-options"><i class="fas fa-chevron-circle-down fa-lg"></i>
            <div class="menu" data-index="${o}" data-id="${e.dateModified}" style="display:none">
                <div class="menu-opts edit">
                    <i class="fas fa-edit"></i>&nbsp;Edit
                </div>
                <div class="menu-opts del">
                    <i class="fas fa-trash-alt"></i> &nbsp;Delete
                </div>
                <div class="menu-opts main">
                    <i class="fas fa-clock"></i> &nbsp;Set as main
                </div>       
            </div>
        </div>
        <div class="countdown-list-date"> 
            <div data-date="${e.date}" 
                data-id="${e.dateModified}" 
                data-repeat="${n}" 
                class="${s?"":"countdown-counting"}" > 
                ${a}
            </div>
            <div class="status-text">${d}</div>
        </div>    
    </div>`}function _(t,e,o){new Date(e)-new Date<0&&(t[o].date=new K(new Date(e)).endDate.toISOString(),p(t),console.log("Updating values of old cds",t[o]))}const H=t=>R=t,E=()=>R;function D(){let t=localStorage.getItem("countdown");return t?JSON.parse(t):(console.warn("Unable to fetch your saved countdowns in fetch array()"),console.log("Error in fetch Array of Countdowns, null fetched"),null)}const O=()=>{const t=document.querySelector(".sort-options");t&&t.style.display=="block"&&(t.style.display="none")};function S(t){(t==null||!(t.target.className=="countdown-list-options"||t.target.tagName=="I"||t.target.className.search("sort-title")>-1))&&(document.querySelectorAll(".menu").forEach(e=>$(e)),document.querySelectorAll(".fa-chevron-circle-up").forEach(e=>at(e)),O())}const st=()=>{if([null,"",void 0].includes(document.querySelector(".clock-row").style.display)){const t=document.querySelector(".clock-row");t&&(t.style.display="flex",t.style.animationPlayState="running")}};function it(t){t=t.querySelector(".fa-chevron-circle-down"),t&&t.classList.replace("fa-chevron-circle-down","fa-chevron-circle-up")}function at(t){t&&t.classList.replace("fa-chevron-circle-up","fa-chevron-circle-down")}const dt=t=>t.className=="countdown-list-text"||t.className=="countdown-list-date",lt=t=>t.className=="countdown-list-options"||t.tagName=="I",w=(t,e)=>t.className.search(e)>-1,rt=t=>{localStorage.setItem("mainClock",JSON.stringify(t));let e=new Date(t.date);W(`Homepage clock set to ${e.getDate()} ${e.toLocaleString("default",{month:"long"})} ${e.getFullYear()}`)},ct=t=>{t.querySelector(".menu")&&(t.querySelector(".menu").style.display=="block"?S():(S(),t.querySelector(".menu").style.display="block",it(t)))};function ut(t,e,o=!0){let n=new I(new Date(t));l(v,e),F(L),o&&B(n,{dayNumber:T,hourNumber:C,minNumber:M,secNumber:A},400),L=k(n,{dayNumber:T,hourNumber:C,minNumber:M,secNumber:A})}function mt(){if(!document.querySelector(".list-settings")){const t=document.querySelector(".list-container");let e=`
        <section class="list-settings">
            <div class="sort">
                <div class="sort-options">
                    <div class="sort-opt modified">Date modified</div>
                    <div class="sort-opt due">Due date</div>
                </div>
                <div class="sort-title"><i class="fas fas fa-sort-amount-up"></i> Sort By </div>
            </div>
        </section>`;t.insertAdjacentHTML("afterbegin",e)}}const ft=()=>{const t=document.querySelector(".sort-options");Z(t)},pt=()=>{const t=document.querySelector(".sort-options"),e=document.querySelector(".sort-title");if(!(e&&t)){console.log("Var sort title and sortOpts is null","sort title",e,"sort opts",t),m("Something's wrong in sort UI");return}h(e,ft),h(t,yt)};async function x(){let t=await D();if(t&&t.length){let e=await q(t);l(b,e),l(v,""),tt(t),gt()}else l(b,"Found no countdowns to display"),l(v,"")}const gt=async()=>{mt(),await pt()},yt=t=>{t.target.className.search("due")>-1?localStorage.setItem("sort","due"):t.target.className.search("modified")>-1&&localStorage.setItem("sort","modified"),O(),x()},wt=(t,e)=>t.findIndex(o=>o.dateModified==e);function vt(){F(),l(v,""),N&&$(N)}function It(){ht(),document.querySelector(".container").addEventListener("click",S)}function ht(){const t=document.querySelector(".countdown-list");h(t,St)}const St=t=>{const e=t.target;if(dt(e)){console.log(e,"parent",e.parentElement);let o=wt(r,e.parentElement.getAttribute("data-id"));console.log(o),st(),ut(r[o].date,r[o].text)}else if(lt(e))ct(e.parentElement);else if(w(e,"menu-opts")){let o=e.parentElement.getAttribute("data-id");if(w(e,"main")){const n=r.find(s=>s.dateModified==o);rt(n)}else if(w(e,"del"))r=r.filter((n,s)=>n.dateModified!=o),p(r),l(b,q(r));else if(w(e,"edit")){let n=r.find((s,i)=>s.dateModified==o);try{if(n){console.log("Edit clicked",n);let s=!1;n.hasOwnProperty("repeat")&&(s=n.repeat),$t(n.text,/\d+-\d+-\d+T\d+:\d+/.exec(n.date),o,s),bt()}else console.log("something went wrong with the editing could not find id of item"),m("Unable to edit countdown"),console.log(n)}catch(s){console.log(s,"Error in form display"),m("Error in form display")}}}};function bt(){const t=document.getElementById(c.form_submitButton);t.addEventListener("click",e=>{e.preventDefault(),t.disabled=!0;const o=document.getElementById(c.form_modifiedTime).value;V(r,Dt(),o),x(),z(),vt()})}function Dt(){let t=G();return t.dateModified=new Date().toISOString(),t}function P(){x().then(()=>{if(E()){let t=setInterval(()=>E()?xt():clearInterval(t),1e3)}}).catch(t=>{console.log(t),m("Unable to display your countdowns")})}async function xt(){let t=document.querySelectorAll(".countdown-counting");const e=new I;t.length?await t.forEach((o,n,s)=>{if(e.setEndDate(new Date(o.getAttribute("data-date"))),e.countDown(),e.getDistance()>0)l(o,U(e));else if(o.getAttribute("data-repeat")=="true"){console.log("updating repeat",o);let i=r.findIndex(d=>d.dateModified==o.getAttribute("data-id")),a=o.getAttribute("data-date");i&&a&&(_(r,a,i),P())}else console.log("elapsing",r.find(i=>i.dateModified==o.getAttribute("data-id"))),o.classList.remove("countdown-counting"),l(o,"Elapsed")}):H(!1)}function qt(){try{Et()}catch(t){console.log(t,"err in updating countdown initialisation"),m("Unable to fetch & update your countdowns")}}async function Et(){await P(),It()}const T=document.getElementById(f.clockDayElement),C=document.getElementById(f.clockHourElement),M=document.getElementById(f.clockMinuteElement),A=document.getElementById(f.clockSecondElement),v=document.getElementById(f.countdownTextDisplay),b=document.getElementById(f.countdownList),N=document.querySelector(".clock-row");let L,R=!1,r=D();const c={form_TextInput:"countdownText",form_dateInput:"dateInput",form_repeatCheckBox:"repeat-cb",form_modifiedTime:"modifiedTime",form_submitButton:"countdown-submit"};function Ut(){J(j()),Tt()}function j(t){let e,o,n,s,i=!1;t&&(i=!0,e=t.text,o=t.dateTime,n=t.modifiedTime,s=t.repeat);let a=Y();return`<section class="pop-up-container">
    <form id='customDateForm' class="pop-up-form">
        <div class="form-header">Set Countdown</div>
        <div class="form-sections">
            <label for="">Title &nbsp;</label>
            <input type="text" 
            value= "${e||""}" 
            placeholder="countdown #${a}" 
            id="${c.form_TextInput}"
            >
        </div>
        <div class="form-sections">
            <label for="">Date & Time &nbsp;</label>
            <input type="datetime-local" 
            value= "${o||""}" 
            id ="${c.form_dateInput}" 
            min="" required
            >
        </div>
        <div class="form-sections form-repeat">
            <label for="repeat-cb">
                <input type="checkbox"
                 id="${c.form_repeatCheckBox}" 
                 ${s?"checked":""}
                 > 
                 Repeat every year 
            </label>
        </div>
        <div class="form-sections">
            <label for=""></label>
            <input type="hidden" 
            value ="${n||""}" 
            id="${c.form_modifiedTime}"
            >
            <input 
            type="submit" 
            id ="${c.form_submitButton}" 
            value="${i?"Update":"Submit"}" 
            formmethod="dialog"
            >
        </div>    
        <div class="close-form"><button>Close</button></div>
    </form>
    </section>`}function J(t){document.body.insertAdjacentHTML("afterbegin",t),document.body.style.position="fixed",document.getElementsByClassName("close-form")[0].onclick=e=>{z()}}function Y(){let t=localStorage.getItem("countNumber");return t?t=Number(t):t=1,t}function z(){document.getElementsByClassName("pop-up-container")[0].remove(),document.body.style.position=""}function Tt(){const t=document.getElementById(c.form_dateInput),e=new Date;let o=e.getDate(),n=e.getMonth()+1,s=e.getFullYear(),i=u(e.getHours()),a=u(e.getMinutes());o=u(o),n=u(n);let d=s+"-"+n+"-"+o+"T"+i+":"+a;t.setAttribute("min",d),t.value=d}function Ct(t){let e=D();e!==null?(e.push(t),p(e)):p([t])}function p(t){localStorage.setItem("countdown",JSON.stringify(t))}function Mt(t){let e=Lt(t.value);return e||(e=t.placeholder,At()),e}async function At(){let t=Y();await localStorage.setItem("countNumber",++t)}function G(){let{userTextField:t,dateInput:e,repeatCheck:o}=Nt(),n=e.value,s=Mt(t);n=new Date(n).toISOString();let i={text:s,date:n,dateModified:new Date};return o&&(i.repeat=o.checked),i}function _t(){Ct(G())}function Nt(){return{userTextField:document.getElementById(c.form_TextInput),dateInput:document.getElementById(c.form_dateInput),repeatCheck:document.getElementById(c.form_repeatCheckBox)}}function Lt(t){const e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"},o=/[&<>"'/]/ig;return t.replace(o,n=>e[n])}function $t(t,e,o,n){t&&e&&o?J(j({text:t,dateTime:e,modifiedTime:o,repeat:n})):(m("Error in form edit."),console.log("Null values in display form pop up"))}export{c as F,z as c,qt as l,Ut as p,_t as s,Bt as w};
