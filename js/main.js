
let designs = document.querySelectorAll(".design");
let close = document.querySelector(".close");

for(design of designs) {
  design.addEventListener("click", openModal);
  function openModal() {
    modal = this.children[3];
    modal.classList.toggle("block");
  }
}

console.log("-----------Demain c'est loin, notre futur c'est la seconde d'après - Youssoupha-----------------");
