const firebaseConfig = {
  apiKey: "AIzaSyBSzX_LDMLJyesF24FoQQqmFJ4orqwc7OY",
  authDomain: "my-wallet-d9fb4.firebaseapp.com",
  databaseURL: "https://my-wallet-d9fb4-default-rtdb.firebaseio.com",
  projectId: "my-wallet-d9fb4",
  storageBucket: "my-wallet-d9fb4.appspot.com",
  messagingSenderId: "70844433970",
  appId: "1:70844433970:web:658700439da74e7ea55e2b",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const btnDarkMode = document.getElementById("mode-dark");
const bodyDarkMode = document.querySelector("body");
const btnModalChart = document.querySelector(".icon-chart");
const btnCloseModalChart = document.querySelector(
  ".btn-close__modal-statistic"
);
const btnCloseModal = document.getElementById("modal-close");
const btnSignUp = document.getElementById("signup");
const btnModalRevenue = document.getElementById("open_modal_revenue");
const btnCloseModalRevenue = document.querySelector(
  ".btn__close-mdal--revenue"
);
const btnLogout = document.getElementById("logout");

const containerModal = document.querySelector(".container-modal");
const modal = document.querySelector(".modal");
const modalRevenue = document.querySelector(".container-modal__revenue");
const containerModalChart = document.querySelector(".container-statistic");

const mountLogin = document.querySelector(".home-login");

const formSignUp = document.getElementById("form_signup");
const formLogin = document.getElementById("form_login");
const formRevenue = document.getElementById("form_revenue");

const wrapLogin = document.getElementById("wrap__home-login");
const wrapDashboard = document.getElementById("wrap_dashboard");

let users = [];
let revenues = [];
let revenueTipo;
let totalIncome = 0;
let totalExpenses = 0;
let chart;

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

const toggleModalChart = () => {
  containerModalChart.classList.toggle("container-statistic--active");
};

btnDarkMode.addEventListener("click", activeModeDark);
btnSignUp.addEventListener("click", activeModal);
btnCloseModal.addEventListener("click", activeModal);
btnModalRevenue.addEventListener("click", activeModalRevenue);
btnCloseModalRevenue.addEventListener("click", activeModalRevenue);
btnModalChart.addEventListener("click", toggleModalChart);
btnCloseModalChart.addEventListener("click", toggleModalChart);

document.addEventListener("DOMContentLoaded", (e) => {
  if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
  }
  if (localStorage.getItem("revenues")) {
    revenues = JSON.parse(localStorage.getItem("revenues"));
    revenues.map((revenue) => (revenue.fecha = new Date(revenue.fecha)));
    paintRevenue(revenues);
    filterDate(revenues);
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
  firebase
    .auth()
    .createUserWithEmailAndPassword(register.email, register.password)
    .then((success) => {
      const user = firebase.auth().currentUser;
      let uid;
      if (user != null) {
        uid = user.uid;
      }
      let firebaseRef = firebase.database().ref();
      firebaseRef.child(uid).set(register);
      swal(
        "Your Account Created",
        "Your account was created successfully, you can log in now."
      ).then((value) => {
        setTimeout(function () {
          wrapLogin.classList.toggle("wrap__home-login");
          wrapDashboard.classList.toggle("wrap__dashboard");
        }, 1000);
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      swal({
        type: "error",
        title: "Error",
        text: "Error",
      });
    });
});

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const login = {
    email: e.target[0].value,
    password: e.target[1].value,
  };
  firebase
    .auth()
    .signInWithEmailAndPassword(login.email, login.password)
    .then((success) => {
      swal({
        type: "successfull",
        title: "Succesfully signed in",
      }).then((value) => {
        wrapLogin.classList.toggle("wrap__home-login");
        wrapDashboard.classList.toggle("wrap__dashboard");
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      swal({
        type: "error",
        title: "Error",
        text: "Error",
      });
    });

  if (localStorage.getItem("revenues")) {
    revenues = JSON.parse(localStorage.getItem("revenues"));
    filterRevenue(revenues);
  }
});

const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
      swal({
        type: "successfull",
        title: "Signed Out",
      }).then((value) => {
        wrapLogin.classList.toggle("wrap__home-login");
        wrapDashboard.classList.toggle("wrap__dashboard");
      });
    })
    .catch(function (error) {
      // An error happened.
      let errorMessage = error.message;
      swal({
        type: "error",
        title: "Error",
        text: "Error",
      });
    });
};

btnLogout.addEventListener("click", signOut);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    //   User is signed in.
    let user = firebase.auth().currentUser;
    let uid;
    if (user != null) {
      uid = user.uid;
      console.log("entro");
    }
    let firebaseRefKey = firebase.database().ref().child(uid);
    firebaseRefKey.on("value", (dataSnapShot) => {
      document.getElementById("name_user").innerHTML =
        dataSnapShot.val().username;
    });
  } else {
    //   No user is signed in.
    console.log("salio");
  }
});

formRevenue.addEventListener("submit", (e) => {
  e.preventDefault();
  const revenue = {
    tipo: e.target[0].value,
    category: e.target[1].value,
    description: e.target[2].value,
    valor: e.target[3].value,
    fecha: new Date(e.target[4].value),
  };
  revenues.push(revenue);

  localStorage.setItem("revenues", JSON.stringify(revenues));
  paintRevenue(revenues);
  filterRevenue(revenues);
  resetFormRevenue();
  filterDate(revenues);
});

const paintRevenue = (revenues) => {
  const containerRevenue = document.querySelector(".item-revenue");
  let nodeRevenue = revenues
    .map((revenue) => {
      return `
    <div class="card-revenue">
      <i class="far fa-trash-alt btn-delete__revenue"></i>
      <h3>Tipo: <span class="card-revenue--tipo ${fn(revenue.tipo)}">${
        revenue.tipo
      }</span></h3>
      <h3>Categoria: <span class="card-revenue--category">${
        revenue.category
      }</span></h3>
      <h3>Descripci??n: <span class="card-revenue--description">${
        revenue.description
      }</span></h3>
      <h3>Valor: <span class="card-revenue--value">${revenue.valor}</span></h3>
    </div>
  `;
    })
    .join("");

  containerRevenue.innerHTML = nodeRevenue;
};

const number = (number) => parseInt(number);

const fn = (tipo) => (tipo === "Ingreso" ? "Ingreso" : "Gasto");

const filterDate = (revenues) => {
  const lastWeek = new Date();
  const today = new Date();

  lastWeek.setDate(lastWeek.getDate() - 7);

  const revenueWeek = revenues.filter(
    (revenue) => revenue.fecha >= lastWeek && revenue.fecha <= today
  );

  const lastMonth = new Date();
  lastMonth.setDate(lastMonth.getDate() - 30);

  const revenueMonth = revenues.filter(
    (revenue) => revenue.fecha >= lastMonth && revenue.fecha <= today
  );

  const filter = document.querySelector(".modal__statistic");

  filter.addEventListener("change", (e) => {
    if (e.target.value === "Semanal") {
      filterRevenue(revenueWeek);
    } else {
      filterRevenue(revenueMonth);
    }
  });
};

const filterRevenue = (arr) => {
  totalIncome = 0;
  totalExpenses = 0;
  const filteredIngresos = arr
    .filter((revenue) => revenue.tipo === "Ingreso")
    .map((revenue) => revenue.valor);

  const filteredGastos = arr
    .filter((revenue) => revenue.tipo === "Gasto")
    .map((revenue) => revenue.valor);

  const sumIncomes = (arrayOfIncomes) => {
    arrayOfIncomes.map((income) => {
      const parsedIncome = parseInt(income);
      totalIncome = parsedIncome + totalIncome;
    });
  };

  const sumExpenses = (arrayOfExpenses) => {
    arrayOfExpenses.map((expense) => {
      const parsedExpense = parseInt(expense);
      totalExpenses = parsedExpense + totalExpenses;
    });
  };

  sumIncomes(filteredIngresos);
  sumExpenses(filteredGastos);

  // ******************* Code Chart ******************************

  if (chart !== undefined) {
    chart.destroy();
  }

  let canvas = document.getElementById("chart").getContext("2d");

  const data = {
    labels: ["Gastos", "Ingresos"],
    datasets: [
      {
        label: "My First Dataset",
        data: [totalExpenses, totalIncome],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };
  const config = {
    type: "doughnut",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
        },
      },
    },
  };

  chart = new Chart(canvas, config);

  // *****Balance Revenues

  const accountBalance = document.querySelector(".card-balance__balance");

  let balance = totalIncome - totalExpenses;

  accountBalance.textContent = `${balance}`;
};

// **************************** Search Revenues ******************************************

const searchRevenues = document.querySelector(".search__revunues");

const search = (revenues, filter) => {
  const filtrado = revenues.filter((revenue) => {
    const { tipo, category } = revenue;
    return `${tipo} ${category}`.toUpperCase().includes(filter.toUpperCase());
  });
  cardRevenue.innerHTML = "";
  paintRevenue(filtrado);
};

searchRevenues.addEventListener("keyup", (e) => {
  e.preventDefault();
  const filter = searchRevenues.value;
  if (e.key === "Enter") {
    if (searchRevenues.value === "") {
      cardRevenue.innerHTML = "";
      paintRevenue(revenues);
    } else {
      search(revenues, filter);
    }
  }
});

// **************************** Delete Revenues ******************************************

const cardRevenue = document.querySelector(".item-revenue");

cardRevenue.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete__revenue")) {
    e.target.parentElement.remove();
  }
});
