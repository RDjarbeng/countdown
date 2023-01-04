export const showNotification = (body) => {
    const notif = new Notification('rCountdown', {
        body: body,
        icon: '/img/icons/favicon.png'
    });
    console.log(notif);
    notif.onclick = (e) => {
        console.log(e);
        // window.location.href= '/html/countdown-list.html'
    };

    notif.onclose = (e) => {
        console.log('User dismissed notification');
        //should stop sound if playing
        // window.location.href= '/html/countdown-list.html'
    };
};


export const requestNotificationPermission=(body)=>{
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
}