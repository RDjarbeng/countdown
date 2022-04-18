        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
        import { getFirestore, collection, onSnapshot, enableIndexedDbPersistence, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries

        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey: "AIzaSyC6GbUIyP21jxR2gPhUGtvsGQpgyZiCy6E",
            authDomain: "rcountdown-5f0c3.firebaseapp.com",
            projectId: "rcountdown-5f0c3",
            storageBucket: "rcountdown-5f0c3.appspot.com",
            messagingSenderId: "324699011204",
            appId: "1:324699011204:web:e462fd8b5e02a29d4fead1",
            measurementId: "G-Y83G4YMZBK"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        // const analytics = getAnalytics(app);
        const db = getFirestore(app);
        let firebaseCollection = 'countdown'
        window.db = db;
        window.collection = collection;
        window.firebaseCollection = firebaseCollection;
        window.addDoc = addDoc;
        window.doc = doc;
        window.deleteDoc =deleteDoc;
        let arrayOfCountdowns = [];
        window.arrayOfCountdowns= arrayOfCountdowns;

        enableIndexedDbPersistence(db)
            .catch((err) => {
                if (err.code == 'failed-precondition') {
                    errorHandler('Please close all other tabs of this application');
                    // Multiple tabs open, persistence can only be enabled
                    // in one tab at a a time.
                } else if (err.code == 'unimplemented') {
                    // The current browser does not support features required to enable persistence
                    errorHandler('Your browser does not support some features')
                }
            });
            function sortByModifiedTime(){
                arrayOfCountdowns.sort((element1, element2)=> new Date(element2.dateModified).getTime()- new Date(element1.dateModified).getTime() )
            }
        /**
         * Display countdown functions
         * */
        async function displayCountdowns() {
            // console.log(arrayOfCountdowns);
            if (arrayOfCountdowns && arrayOfCountdowns.length) {
                // arrayOfCountdowns.sort()
                let listItems = populateList(arrayOfCountdowns);
                setInnerHtmlForNotNull(countdownList, listItems)
                setInnerHtmlForNotNull(countdownTextDisplay, '')
                // updateClockAndText(arrayOfCountdowns[arrayOfCountdowns.length-1].date, arrayOfCountdowns[arrayOfCountdowns.length-1].text)


            } else {
                setInnerHtmlForNotNull(countdownList, 'Found no countdowns to display');
                setInnerHtmlForNotNull(countdownTextDisplay, '')
            }
        }

        function populateList(arrayOfCountdowns) {
            sortByModifiedTime();
            console.log(arrayOfCountdowns, 'array of' );
            let listItems = '';
            arrayOfCountdowns.forEach((countdown, index) => {
                let date = new Date(countdown.date);
                listItems += `
    <div class="countdown-list-item" data-index="${index}" data-id="${countdown.id}">
        <div class="countdown-list-text"> ${countdown.text} </div>
        <div class="countdown-list-options" ><i class="fas fa-chevron-circle-down fa-lg"></i>
        <div class="menu" data-index="${index}" data-id="${countdown.id}" style="display:none">
        <div class="menu-opts edit">
            <i class="fas fa-edit"></i>&nbsp;Edit
        </div>
        <div class="menu-opts del">
            <i class="fas fa-trash-alt"></i> &nbsp;Delete
        </div>
        <div class="menu-opts main">
            <i class="fas fa-clock"></i> &nbsp;Set as main
        </div>
        
    </div></div>
        <div class="countdown-list-date"> 
            Due: ${date.getDate() + ' ' + date.toLocaleString('default', { month: 'long' }) + ', ' + date.getFullYear()}
        </div>    
    </div>`
            });
            return listItems;
        }
        function doOnSnapshot(snapshot) {
            // console.log(snapshot.docChanges());
            snapshot.docChanges().forEach(change => {
                // document change.type added
                if (change.type === 'added') {
                    // console.log('addition', change, change.doc.id, change.doc.data());
                    arrayOfCountdowns.push(addIdToCountdownObject(change, change.doc.id));


                } else if (change.type === 'modified') {
                    console.log('modification', change, change.doc.id, change.doc.data());
                    // document change.type modified
                } else if (change.type === 'removed') {
                    // document change.type removed
                    console.log('removal', change, change.doc.id, change.doc.data());
                    removeCountdownByID(change.doc.id);
                } else {
                    console.log("Unknown firebase change.type", change);
                }
            });
            displayCountdowns()
        }
        function addIdToCountdownObject(change, id) {
            return { id: change.doc.id, ...change.doc.data() }
        }

        function removeCountdownByID(id){
            arrayOfCountdowns= arrayOfCountdowns.filter((countdown) => countdown.id != id);
        }


        const unsub = onSnapshot(collection(db, firebaseCollection), doOnSnapshot)
        window.displayCountdowns = displayCountdowns;
        // console.log(unsub);