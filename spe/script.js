/* ABOUT TOGGLE */

document.querySelectorAll('.about-btn').forEach(btn=>{

btn.addEventListener('click',()=>{

const card = btn.parentElement;

card.classList.toggle('active');

});

});