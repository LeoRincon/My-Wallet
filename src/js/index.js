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
const formSignUp = document.getElementById("form_signup");
const formLogin = document.getElementById("form_login");
const formRevenue = document.getElementById("form_revenue");

const wrapLogin = document.getElementById("wrap__home-login");
const wrapDashboard = document.getElementById("wrap_dashboard");

let users = [];
let revenues = [];
let revenueTipo;

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
};

btnDarkMode.addEventListener("click", activeModeDark);
btnSignUp.addEventListener("click", activeModal);
btnCloseModal.addEventListener("click", activeModal);
btnModalRevenue.addEventListener("click", activeModalRevenue);
btnCloseModalRevenue.addEventListener("click", activeModalRevenue);

document.addEventListener("DOMContentLoaded", (e) => {
  if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
  }
  if (localStorage.getItem("revenues")) {
    revenues = JSON.parse(localStorage.getItem("revenues"));
    paintRevenue(revenues);
  }

  // revenueTipo = document.querySelectorAll(".card-revenue--tipo");
  // console.log(revenueTipo);
  // fn();
});

const resetForm = () => {
  document.getElementById("form_signup").reset();
};
const resetFormRevenue = () => {
  document.getElementById("form_revenue").reset();
};

formSignUp.addEventListener("submit", (e) => {
  e.preventDefault();
  const register = {
    email: e.target[0].value,
    username: e.target[1].value,
    password: e.target[2].value,
  };
  users.push(register);
  localStorage.setItem("users", JSON.stringify(users));
  resetForm();
});

const validationUser = (login) => {
  if (
    users.some(
      (users) =>
        users.email === login.email && users.password === login.password
    )
  ) {
    wrapLogin.classList.toggle("wrap__home-login");
    wrapDashboard.classList.toggle("wrap__dashboard");
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

formRevenue.addEventListener("submit", (e) => {
  e.preventDefault();
  const revenue = {
    tipo: e.target[0].value,
    category: e.target[1].value,
    description: e.target[2].value,
    valor: e.target[3].value,
    fecha: e.target[4].value,
  };
  revenues.push(revenue);
  console.log(revenue);

  localStorage.setItem("revenues", JSON.stringify(revenues));
  paintRevenue(revenues);
  resetFormRevenue();
});

const paintRevenue = (revenues) => {
  const containerRevenue = document.querySelector(".item-revenue");
  // let nodeRevenue = document.createElement("div");
  // nodeRevenue.classList.add("item-revenue");
  let nodeRevenue = revenues
    .map((revenue) => {
      return `
    <div class="card-revenue">
      <h3>Tipo: <span class="card-revenue--tipo ${fn(revenue.tipo)}">${
        revenue.tipo
      }</span></h3>
      <h3>Categoria: <span class="card-revenue--category">${
        revenue.category
      }</span></h3>
      <h3>Descripción: <span class="card-revenue--description">${
        revenue.description
      }</span></h3>
      <h3>Valor: <span class="card-revenue--value">${revenue.valor}</span></h3>
    </div>
  `;
    })
    .join("");

  containerRevenue.innerHTML = nodeRevenue;
};

const fn = (tipo) => (tipo === "Ingreso" ? "Ingreso" : "Gasto");

// setTimeout(() => {
//   const revenueTipo = document.querySelector(".card-revenue--tipo");
//   console.log(revenueTipo);
// }, 5000);
