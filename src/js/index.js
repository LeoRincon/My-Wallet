const btnDarkMode = document.getElementById("mode-dark");
const bodyDarkMode = document.querySelector("body");
const containerModal = document.querySelector(".container-modal");
const modal = document.querySelector(".modal");
const btnSignUp = document.getElementById("signup");
const btnCloseModal = document.getElementById("modal-close");
const mountLogin = document.querySelector(".home-login");
const modalRevenue = document.querySelector(".container-modal__revenue");
const btnModalRevenue = document.getElementById("open_modal_revenue");
const btnCloseModalRevenue = document.querySelector(
  ".btn__close-mdal--revenue"
);

console.log(btnCloseModalRevenue);

const activeModeDark = () => {
  btnDarkMode.classList.toggle("active__dark-odel");
  bodyDarkMode.classList.toggle("body__dark-model");
};

const activeModal = () => {
  containerModal.classList.toggle("active");
  modal.classList.toggle("modal-active");
};

const activeModalRevenue = () => {
  modalRevenue.classList.toggle("revenue-active");
  // console.log("click");
};

btnDarkMode.addEventListener("click", activeModeDark);
btnSignUp.addEventListener("click", activeModal);
btnCloseModal.addEventListener("click", activeModal);
btnModalRevenue.addEventListener("click", activeModalRevenue);
btnCloseModalRevenue.addEventListener("click", activeModalRevenue);

const clean = () => {
  if (true) {
    mountLogin.innerHTML = "";
  }
};

clean();
