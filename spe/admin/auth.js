import { auth } from "./firebase.js";

import {
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    const error = document.getElementById("error");

    error.innerHTML = "";

    if(email==="" || password===""){

        error.innerHTML="Please enter your email and password.";

        return;

    }

    try{

        await signInWithEmailAndPassword(auth,email,password);

        window.location.href="dashboard.html";

    }

    catch(e){

        error.innerHTML="Invalid email or password.";

    }

});