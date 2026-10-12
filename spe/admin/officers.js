import { db } from "./firebase.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const form = document.getElementById("officerForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const position = document.getElementById("position").value.trim();
    const photo = document.getElementById("photo").files[0];

    let photoURL = "";

    try {

        // Upload image to ImgBB
        if (photo) {

            const formData = new FormData();
            formData.append("image", photo);

            const upload = await fetch(
                "https://api.imgbb.com/1/upload?key=0ae53f2c09442ffc12135ae8839d24f5",
                {
                    method: "POST",
                    body: formData
                }
            );

            const result = await upload.json();

            if (!result.success) {
                throw new Error("Image upload failed");
            }

            photoURL = result.data.url;
        }

        // Save officer to Firestore
      const docRef = await addDoc(collection(db, "officers"), {
    name,
    position,
    photoURL,
    createdAt: new Date()
});

console.log("Document ID:", docRef.id);

alert("Officer added successfully!");
        

        form.reset();

    } catch (error) {

        console.error(error);
        alert("Failed to add officer.");

    }

});