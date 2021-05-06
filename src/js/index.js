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

// console.log(formRevenue);

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

// const getLocalStorages = () => {
//   if (localStorage.getItem("users")) {
//     users = JSON.parse(localStorage.getItem("users"));
//     // users.push(users);
//     return users;
//   }
//   if (localStorage.getItem("revenues")) {
//     revenues = JSON.parse(localStorage.getItem("revenues"));
//     // paintRevenue(revenue);
//     return revenue;
//   }
// };
// getLocalStorages();
document.addEventListener("DOMContentLoaded", (e) => {
  if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
  }
  if (localStorage.getItem("revenues")) {
    revenues = JSON.parse(localStorage.getItem("revenues"));
    paintRevenue(revenues);
  }
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
  // debugger;
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
  // let users = [];
  const revenue = {
    tipo: e.target[0].value,
    category: e.target[1].value,
    description: e.target[2].value,
    valor: e.target[3].value,
  };
  // console.log(revenue);
  revenues.push(revenue);
  localStorage.setItem("revenues", JSON.stringify(revenues));
  paintRevenue(revenue);
  resetFormRevenue();
  // getLocalStorages();
  // return revenue;
});

const paintRevenue = (revenues) => {
  const containerRevenue = document.querySelector(".container-revenue");
  const nodeRevenue = document.createElement("div");
  nodeRevenue.classList.add("item-revenue");
  nodeRevenue.innerHTML = revenues
    .map((revenue) => {
      return `
    <div class="card-revenue">
      <h3>Tipo: <span>${revenue.tipo}</h3>
      <h3>Categoria: <span>${revenue.category}</h3>
      <h3>Descripción: <span>${revenue.description}</h3>
      <h3>Valor: <span>${revenue.valor}</h3>
    </div>
  `;
    })
    .join("");

  containerRevenue.appendChild(nodeRevenue);
};
