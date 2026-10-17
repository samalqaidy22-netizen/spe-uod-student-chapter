import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const container = document.getElementById("announcementList");

async function loadAnnouncements() {

    if (!container) return;

    container.innerHTML = "";

    const snapshot = await getDocs(collection(db, "announcements"));

    snapshot.forEach((document) => {

        const announcement = document.data();

        container.innerHTML += `
        <div class="card">
            <h3>${announcement.title}</h3>
            <small>${announcement.date}</small>
            <p>${announcement.description}</p>
        </div>
        `;

    });

}

loadAnnouncements();
