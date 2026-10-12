import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const form = document.getElementById("announcementForm");
const announcementList = document.getElementById("announcementList");

let editingId = null;

async function loadAnnouncements() {

    announcementList.innerHTML = "";

    const snapshot = await getDocs(collection(db, "announcements"));

    snapshot.forEach((document) => {

        const announcement = document.data();

        announcementList.innerHTML += `
        <tr>
            <td>${announcement.title}</td>
            <td>${announcement.date}</td>
            <td>

               <td>

<button class="editAnnouncementBtn"
data-id="${document.id}"
data-title="${announcement.title}"
data-date="${announcement.date}"
data-description="${announcement.description}">
Edit
</button>

<button class="deleteAnnouncementBtn"
data-id="${document.id}">
Delete
</button>

</td>

            </td>
        </tr>
        `;
    });

}

loadAnnouncements();

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const date = document.getElementById("date").value.trim();
    const description = document.getElementById("description").value.trim();

    if (editingId) {

        await updateDoc(doc(db, "announcements", editingId), {
            title,
            date,
            description
        });

        editingId = null;

        form.querySelector("button").textContent = "Add Announcement";

    } else {

        await addDoc(collection(db, "announcements"), {
            title,
            date,
            description
        });

        alert("✅ Announcement added successfully!");

    }

    form.reset();

    loadAnnouncements();

});

document.addEventListener("click", async (e) => {

    if (e.target.classList.contains("deleteBtn")) {

        if (!confirm("Delete this announcement?")) return;

        await deleteDoc(doc(db, "announcements", e.target.dataset.id));

        alert("✅ Announcement deleted successfully!");

        loadAnnouncements();

    }

    if (e.target.classList.contains("editBtn")) {

        editingId = e.target.dataset.id;

        document.getElementById("title").value = e.target.dataset.title;
        document.getElementById("date").value = e.target.dataset.date;
        document.getElementById("description").value = e.target.dataset.description;

        form.querySelector("button").textContent = "Update Announcement";

    }

});

document.addEventListener("click", async (e) => {

    if (e.target.classList.contains("deleteAnnouncementBtn")) {

        if (!confirm("Delete this announcement?")) return;

        await deleteDoc(doc(db, "announcements", e.target.dataset.id));

        loadAnnouncements();

    }

});

document.addEventListener("click", async (e) => {

    if (e.target.classList.contains("editAnnouncementBtn")) {

        const id = e.target.dataset.id;

        const title = prompt("Title:", e.target.dataset.title);
        if (title === null) return;

        const date = prompt("Date:", e.target.dataset.date);
        if (date === null) return;

        const description = prompt("Description:", e.target.dataset.description);
        if (description === null) return;

        await updateDoc(doc(db, "announcements", id), {
            title,
            date,
            description
        });

        loadAnnouncements();

    }

});