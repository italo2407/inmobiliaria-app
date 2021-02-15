import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBHyzvKy32Rd8QCHzFeCwXFMBtdemAhEEI",
    authDomain: "home-bb70b.firebaseapp.com",
    databaseURL: "https://home-bb70b.firebaseio.com",
    projectId: "home-bb70b",
    storageBucket: "home-bb70b.appspot.com",
    messagingSenderId: "405021186309",
    appId: "1:405021186309:web:0a806b1da07c15d6e47f6c",
    measurementId: "G-NC59GGF8ZP"
}
class Firebase {

    constructor(){
        app.initializeApp(config);
        this.db = app.firestore();
        this.auth = app.auth();
    }

    estaIniciado() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve);
        })
    }
}

export default Firebase;