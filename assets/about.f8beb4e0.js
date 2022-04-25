document.querySelector("#app").innerHTML=`
  <h1>Hello Vite it's still me again!</h1>
  <a href="index.html">Go to Home from about page</a>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;const e={num:1};setInterval(()=>{document.querySelector("#app").innerHTML=`
  <h1>Hello Vite it's still me again!</h1>
  <a href="index.html">Go to Home from about page</a>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
  <div>${e.num++}</div>
`},1e3);
