
let openmodal = document.querySelector(".open_modal");
let modal = document.querySelector(".modal");
let close = document.querySelector(".close")

openmodal.addEventListener("click", openModal);
function openModal() {
  modal.classList.toggle("block");
}

close.addEventListener("click", closeModal);
function closeModal() {
  modal.classList.toggle("block");
}

console.log("-----------Demain c'est loin, notre futur c'est la seconde d'après - Youssoupha-----------------");
