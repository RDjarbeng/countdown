import { registerSW } from 'virtual:pwa-register'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"



    //add service worker update functionality
//service worker update and offline functionality
const updateSW = registerSW({
    onNeedRefresh() {
        console.log('Update sw, now available, devEnv');
      Toastify({
        text: `
        <h4>A newer version of this page is available!</h4>
               <br>
               <a class='do-sw-update'>Click this banner to update and reload</a>
               `,
        escapeMarkup: false,
        offset: {
          x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          y: -150 // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        // selector: 'testToast',
        className:'updateToastify',
        close: true,
        gravity: "bottom",
        duration: -1,
        onClick() {
          console.log('Clicking on update to refresh the new service worker');
          updateSW(true);
        }
      }).showToast();

    },
    onOfflineReady() {
        console.log('App is offline now');
    },
  })
