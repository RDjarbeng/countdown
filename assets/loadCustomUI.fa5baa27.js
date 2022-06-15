const f=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}};f();const m=e=>e.currentTarget.parentElement.remove(),g=e=>{console.warn("Top level window error",e),d()},d=e=>{let i=`
    <section class="error-notification">
    <style>
        .error-notification {
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            background: transparent;
            z-index: 99;
            position: absolute;
            padding-top: 10vmin;
        }

        .error-message {
            width: 80vmin;
            padding: 2vmin;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 2vmin;
            background: #f8d7da;
            color: #842029;
            position: relative;
        }

        .error-close {
            position: absolute;
            right: 3%;
            padding: 1.2vmin 2.2vmin;
        }
        @media screen and (max-width: 427px) {
            .error-message{
                width: 90vmin;
               padding: 3.3vmin;
            }
        }
    </style>
    <div class="error-message">
        <span>${e||"Oops an error occurred \u{1F927}\u{1F610}"}</span>
        <div class="error-close" >
            <i class="fas fa-times"></i>
        </div>
    </div>
</section>
`;if(c){let a=document.querySelectorAll(".error-notification")[0];a&&a.remove(),document.body.insertAdjacentHTML("afterbegin",i)}else document.body.insertAdjacentHTML("afterbegin",i),c=!0;document.querySelector(".error-message").addEventListener("click",m)};let c=!1;window.onerror=g;function u(e,t){e?e.innerHTML=t:console.warn("Element passed to setInnerHTML for not null is null/undefined")}const S=e=>e<10?"0"+e:e;function B(){let e=document.getElementById("sendWhatsappButton");e&&e.addEventListener("click",p)}function p(){let e=document.getElementById("countDay").innerText;window.open(`whatsapp://send?text= Day ${e||"rcountdown"}/365`)}function H(e){clearTimeout(e)}const x=e=>{e?e.style.display=="block"?y(e):h(e):(console.log("Element passed to toggleElementDisplayBlockOnScreen is null"),d("Unable to display item"))},y=e=>e?e.style.display="none":null,h=e=>e?e.style.display="block":null,A=(e,t)=>{e.removeEventListener("click",t),e.addEventListener("click",t),e||console.warn("Null element passed to addlistenersWithoutDuplicates")};let s=document.body,l=document.getElementById("themeToggle");function v(e){let t=e;document.getElementsByClassName("mode-info")[0]?(document.getElementsByClassName("mode-info")[0].remove(),s.insertAdjacentHTML("afterbegin",`<span class="mode-info">${t}</span>`)):s.insertAdjacentHTML("afterbegin",`<span class="mode-info">${t}</span>`)}function L(){u(l,'<i class="fas fa-moon fa-fw"></i>'),s.classList.contains("dark")?s.classList.replace("dark","light"):s.classList.add("light"),localStorage.setItem("userMode","light"),console.log("saving: ",localStorage.getItem("userMode"))}function b(){u(l,'<i class="fas fa-sun fa-fw"></i>'),s.classList.contains("light")?s.classList.replace("light","dark"):s.classList.add("dark"),localStorage.setItem("userMode","dark"),console.log("saving: ",localStorage.getItem("userMode"))}function k(){s.classList.contains("light")?b():L()}function M(){let e;s.classList.contains("light")?e="Light mode set":e="Dark mode set",v(e)}function E(){let e=localStorage.getItem("theme");["",null,void 0].includes(e)||document.body.setAttribute("data-theme",e),["light","dark"].includes(...document.body.classList)||document.body.classList.add("light")}function w(){let e=localStorage.getItem("primaryColor");["",null,void 0].includes(e)||document.querySelectorAll("[content='#7b68ee']").forEach(t=>t.setAttribute("content",e))}function T(){let e=localStorage.getItem("userBg");["",null,void 0].includes(e)||(document.body.style.backgroundImage=`url(${e})`)}function I(){let e=localStorage.getItem("userMode");if(!["",null,void 0].includes(e)){let t=e=="dark"?"light":"dark";const i=a=>{a=="dark"?l.innerHTML='<i class="fas fa-sun fa-fw"></i>':l.innerHTML='<i class="fas fa-moon fa-fw"></i>'};document.body.classList.contains(e)?i(e):document.body.classList.contains(t)?(document.body.classList.replace(t,e),i(e)):(document.body.classList.add(e),i(e))}}l.addEventListener("click",k);l.addEventListener("click",M);E();w();T();I();export{A as a,S as b,H as c,B as d,d as e,v as n,y as r,u as s,x as t};
