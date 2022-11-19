const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');
const firebase = require("firebase/app");

const firebaseConfig = {
    apiKey: "AIzaSyAXq3ggPHZZRBy3zwBVHuERWgY6AxJ7Dsk",
    authDomain: "opapa-2b394.firebaseapp.com",
    projectId: "opapa-2b394",
    storageBucket: "opapa-2b394.appspot.com",
    messagingSenderId: "216635089260",
    appId: "1:216635089260:web:6c6e963a4916b5299b5349"
};

app = firebase.initializeApp(firebaseConfig)

exports.signup = (req,res,next)=>{
    let hashedPassword;
    
    const email = req.body.email;
    const emailR = req.body.emailR;
    const password = req.body.password;
    const passwordR = req.body.passwordR;
    console.log(req.body)
    // email checking
    if(email!=emailR){
        res.json(`Emails don't match`)
        return;
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        res.json(`Not a valid email address`);
        return;
    }

    // password checking
    if(password!=passwordR){
        res.json(`Passwords don't match`);
        return;
    }
    if(password.length<8){
        res.json(`Password length must be greater than 7`);
        return;
    }
    
    // firebase authentication
    const localAuth = getAuth(app);
    (function createUser(){
        createUserWithEmailAndPassword(localAuth, email, password)
    .then((userCredential) => {
        if(userCredential.user){
            console.log(userCredential.user.uid)
            res.json({UID: userCredential.user.uid});
        }
    })
    .catch((error) => {
        console.log(error.code)
        if(error.code=='auth/invalid-email'){
            res.json(`Not a valid email address`)
            return;
        }
        if(error.code=='auth/email-already-in-use'){
            res.json(`Email is already in use`);
            return;
        }
    });
        
})()
}

exports.login = (req,res,next)=>{
        const email = req.body.email;
        const password = req.body.password;

        if(email==''){
            res.json(`Email can't be empty`);
            return;
        }
        if(password==''){
            res.json(`Password can't be empty`);
            return;
        }
        if(password.length<6){
            res.json(`Password is too short. Minimum 6 characters`);
            return;
        }
        const localAuth = getAuth(app);
        (function loginUser(){
            signInWithEmailAndPassword(localAuth, email, password)
           .then((userCredential) => {
            res.json({UID: userCredential.user.uid});
           })
           .catch((error) => {
            console.log(error.code)
            if(error.code=='auth/user-not-found'){
                res.json(`User not found`);
                return;
            } else if(error.code=='auth/wrong-password'){
                res.json('Wrong password');
                return;
            } else if(error.code=='auth/network-request-failed'){
                res.json('Network request failed. Please try again later');
                return;
            } else{
                res.json('Unrecognized error message. Check the email format');
                return;
            }
           });
       })()
};