const btnDarkMode = document.getElementById("mode-dark");
const bodyDarkMode = document.querySelector("body");
const containerModal = document.querySelector(".container-modal");
const modal = document.querySelector(".modal");
const btnSignUp = document.getElementById("signup");
const btnCloseModal = document.getElementById("modal-close");

const activeModeDark = () => {
  btnDarkMode.classList.toggle("active__dark-odel");
  bodyDarkMode.classList.toggle("body__dark-model");
};

const activeModal = () => {
  containerModal.classList.toggle("active");
  modal.classList.toggle("modal-active");
};

btnDarkMode.addEventListener("click", activeModeDark);
btnSignUp.addEventListener("click", activeModal);
btnCloseModal.addEventListener("click", activeModal);
