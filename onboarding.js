const main = document.querySelector(".main");
main.innerHTML = await fetch("/onboarding.html");