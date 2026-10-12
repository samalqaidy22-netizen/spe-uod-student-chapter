import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const form = document.getElementById("eventForm");
const eventList = document.getElementById("eventList");

let editingId = null;

async function loadEvents() {

    eventList.innerHTML = "";

    const snapshot = await getDocs(collection(db, "events"));

    snapshot.forEach((document) => {

        const event = document.data();

        eventList.innerHTML += `
        <tr>
            <td>${event.title}</td>
            <td>${event.date}</td>
            <td>
            
                <button class="action-btn editBtn"
                    data-id="${document.id}"
                    data-title="${event.title}"
                    data-date="${event.date}"
                    data-image="${event.image}"
                    data-description="${event.description}">
                    Edit
                </button>

                <button class="action-btn delete deleteBtn"
                    data-id="${document.id}">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });

}

loadEvents();

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const date = document.getElementById("date").value.trim();
    const image = document.getElementById("image").value.trim();
    const description = document.getElementById("description").value.trim();

    if (editingId) {

        await updateDoc(doc(db, "events", editingId), {
            title,
            date,
            image,
            description
        });

        editingId = null;

        form.querySelector("button").textContent = "Add Event";

    } else {

        await addDoc(collection(db, "events"), {
            title,
            date,
            image,
            description
        });

        alert("✅ Event added successfully!");
    }

    form.reset();

    loadEvents();

});

document.addEventListener("click", async (e) => {

    if (e.target.classList.contains("deleteBtn")) {

        if (!confirm("Delete this event?")) return;

        await deleteDoc(doc(db, "events", e.target.dataset.id));

        loadEvents();
alert("✅ Event deleted successfully!");
    }

    if (e.target.classList.contains("editBtn")) {

        editingId = e.target.dataset.id;

        document.getElementById("title").value = e.target.dataset.title;
        document.getElementById("date").value = e.target.dataset.date;
        document.getElementById("image").value = e.target.dataset.image;
        document.getElementById("description").value = e.target.dataset.description;

        form.querySelector("button").textContent = "Update Event";

    }

});