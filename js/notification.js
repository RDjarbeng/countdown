import { errorHandler } from "./error.js";

export const showNotification = (body) => {
    if(Notification.permission ==='granted'){
    try {
        const notif = new Notification('rCountdown', {
            body: body,
            icon: '/img/icons/favicon.png'
        });
        if(notif){
        notif.onclick = (e) => {
            console.log(e);
            // window.location.href= '/html/countdown-list.html'
        };
    
        notif.onclose = (e) => {
            console.log('User dismissed notification');
            //should stop sound if playing
            // window.location.href= '/html/countdown-list.html'
        };
    }else{
        errorHandler('Could not send device notification')
    }
    } catch (error) {
        console.log('Error displaying device notification'+error);
        console.log(error);
    }
    
}else{
    console.log('Notification not allowed by user, notific...js')
}
};


export const requestNotificationPermission=(body)=>{
    try {
        
        if(Notification.permission !=='denied'){
            console.log('requesting permission');
            Notification.requestPermission().then((permission)=>{
                //3 permissions: default, granted, denied
                console.log('Notification Permission>', Notification.permission);
                if(permission ==='granted'){
                    console.log('User granted notification access');
                    // showNotification('Notification Permission granted');
                }
            })
        }
        if(Notification.permission==='granted'){
            showNotification('Thank you for visiting');
        }
    } catch (error) {
        console.log('Error occured requesting notification permission',error );
        errorHandler('Error in notification request from user')
    }
    }