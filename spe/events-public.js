import { db } from "./admin/firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

async function loadEvents() {

    const container = document.getElementById("eventsContainer");

    if (!container) return;

    container.innerHTML = "";

    const snapshot = await getDocs(collection(db, "events"));

    snapshot.forEach((doc) => {

        const event = doc.data();

        container.innerHTML += `
        <div class="news-card">

            <span class="news-type">EVENT</span>

            <img src="${event.image}" alt="${event.title}">

            <div class="news-content">

                <span class="news-date">${event.date}</span>

                <h3>${event.title}</h3>

                <p>${event.description}</p>

            </div>

        </div>
        `;

    });

}

loadEvents();