import{e as g,n as u}from"./loadCustomUI.fa5baa27.js";const t=e=>document.querySelectorAll(e),l=e=>window.location.href=e,y=t(".nav")[0],p=t(".sidebar")[0],n=t(".sidebar-list-items"),k=t(".pick-color-ico");y.addEventListener("click",()=>{p.classList.contains("sidebar-hide")&&p.classList.replace("sidebar-hide","sidebar-show")});n[0].addEventListener("click",()=>l("/index.html"));n[1].addEventListener("click",()=>l("/html/countdown-list.html"));n[2].addEventListener("click",E);n[3].addEventListener("click",v);n[4].addEventListener("click",()=>l("/html/today.html"));n[5].addEventListener("click",()=>l("/html/about.html"));function L(e){let r=getComputedStyle(document.body).getPropertyValue("--color-banner");document.body.dataset.theme=e.currentTarget.dataset.settheme,localStorage.setItem("theme",`${e.currentTarget.dataset.settheme}`);function s(){let c=getComputedStyle(document.body).getPropertyValue("--color-banner");t(`[content="${r}"]`).forEach(i=>i.setAttribute("content",c)),localStorage.setItem("primaryColor",c)}s()}function v(){t(".pick-color")[0].classList.toggle("show-color")}k.forEach(e=>{e.addEventListener("click",function(r){L(r)})});y.addEventListener("click",e=>{t(".container")[0].addEventListener("click",b)});const b=e=>{p.classList.add("sidebar-hide"),e.currentTarget.removeEventListener("click",b)};function E(){t("[href='css/form.css']")[0]||document.head.insertAdjacentHTML("beforeend",'<link rel="stylesheet" href="/css/form.css">'),(()=>{document.body.insertAdjacentHTML("afterbegin",`<aside class="pop-up-container loader-container">
            <style>
            .loader{
                background-color: #ffffff;
                color: grey;
                padding: 0 1rem;
                border-radius: 0.4rem;
                font-size: 1.3em;
                box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.21);
            }
            .loader span:nth-child(n+2){
                font-size: 1.5em;
                animation-duration:2.5s;
                animation-iteration-count:infinite;    
            }
            .loader span:nth-child(2){animation-name:l1;}
            .loader span:nth-child(3){animation-name:l2;}
            .loader span:nth-child(4){animation-name:l3;}
            @keyframes l1{
                from{opacity:0;}
                15%{opacity:0;}
                25%{opacity:1;}
            }
            @keyframes l2{
                from{opacity:0;}
                40%{opacity:0;}
                50%{opacity:1;}
            }
            @keyframes l3{
                from{opacity:0;}
                65%{opacity:0;}
                75%{opacity:1;}
            }
            </style>
                <section class="loader" style="color: ${getComputedStyle(t("body")[0]).getPropertyValue("--color-banner")}">
                    <span>Loading</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </section>
            </aside>`)})(),(async()=>{let c=await(await fetch("/html/form-upload.html")).text();document.getElementsByClassName("loader-container")[0].remove(),document.body.insertAdjacentHTML("afterbegin",c),document.body.style.position="fixed";const i=document.querySelector("input[type='file']"),d=()=>{document.getElementsByClassName("pop-up-container")[0].remove(),document.body.style.position=""},f=a=>{let o=new FileReader;w(a)?o.readAsDataURL(a):u("Picture is too big"),o.onload=function(){let m=o.result;localStorage.setItem("userBg",`${m}`),document.body.style.backgroundImage=`url(${m})`,u("Background is set"),d()},o.onerror=function(){g("Unable to set background"),console.log(o.error)}};i.onchange=()=>{f(i.files[0])},document.getElementsByClassName("close-form")[0].addEventListener("click",d),t(".reset")[0].addEventListener("click",()=>{localStorage.removeItem("userBg"),document.body.style.backgroundImage="",u("Default background restored"),d()}),t(".bg-presets-preview:not(.upload-preview) img").forEach(a=>{a.addEventListener("click",()=>{(async()=>{let h=await(await fetch(a.src)).blob();f(h)})()})})})().catch(s=>{g("Unable to set custom background"),console.log(s)})}const w=e=>(console.log((e.size/1048576).toFixed(2)+"MB"),e.size/1048576<3);
