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
const mountDashboard = document.getElementById("container__dashboard");
const formSignUp = document.getElementById("form_signup");
const formLogin = document.getElementById("form_login");

// let users = [];

// console.log(formLogin);

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
// btnModalRevenue.addEventListener("click", activeModalRevenue);
// btnCloseModalRevenue.addEventListener("click", activeModalRevenue);

const cleanLogin = () => {
  if (true) {
    mountLogin.innerHTML = "";
  }
};

const cleanDasboard = () => {
  // paint = false;
  if (mountLogin.innerHTML !== "") {
    mountDashboard.innerHTML = "";
  } else {
    console.log("vacio");
  }
};
cleanDasboard();

const getLocalStorages = () => {
  if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
    // users.push(users);
    return users;
  }
};
getLocalStorages();

const resetForm = () => {
  document.getElementById("form_signup").reset();
};

formSignUp.addEventListener("submit", (e) => {
  e.preventDefault();
  let users = [];
  const register = {
    email: e.target[0].value,
    password: e.target[1].value,
    pais: e.target[2].value,
  };
  // console.log(register);
  users.push(register);
  localStorage.setItem("users", JSON.stringify(users));
  resetForm();
  return users;
});

const validationUser = (login) => {
  // debugger;
  if (users[0].email === login.email && users[0].password === login.password) {
    // debugger;
    cleanLogin();
    // cleanDasboard();
  } else {
    console.log("datos invalidos");
  }
};

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const login = {
    email: e.target[0].value,
    password: e.target[1].value,
  };
  validationUser(login);
});

// console.log(users[0].email);
