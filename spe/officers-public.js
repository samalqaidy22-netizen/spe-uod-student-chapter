import { db } from "./admin/firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

async function loadOfficers() {

    const container = document.getElementById("officersContainer");

    if (!container) return;

    container.innerHTML = "";

    const snapshot = await getDocs(collection(db, "officers"));

    snapshot.forEach((doc) => {

        const officer = doc.data();

        container.innerHTML += `
            <div class="member">
                <img src="${officer.photoURL || 'spe.jpg.png'}" alt="${officer.name}">
                <h3>${officer.name}</h3>
                <span class="role">${officer.position}</span>
            </div>
        `;
    });

}

loadOfficers();