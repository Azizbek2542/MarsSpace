// import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
// import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

// // Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyCvPqWuVmL3x7lGfkUV-ma1UHmz7rx__Rs",
//   authDomain: "marsspace-48b62.firebaseapp.com",
//   databaseURL: "https://marsspace-48b62-default-rtdb.firebaseio.com",
//   projectId: "marsspace-48b62",
//   storageBucket: "marsspace-48b62.firebasestorage.app",
//   messagingSenderId: "983536140625",
//   appId: "1:983536140625:web:084c07906ea2d9bfced370",
//   measurementId: "G-VDHG39ZRR1"
// };

// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);

// const modal = document.querySelector(".default-notification-of-coin");
// const divSums = document.querySelectorAll("#coinsSumDisplay");
// const divValue = document.getElementById("coinsValueDisplay");
// const overlay = document.querySelector('.overlay');
// const notificationsContainer = document.getElementById("notificationsContainer");

// const ding = new Howl({
//   src: ["./coin.mp3"],
//   volume: 1.0,
//   html5: true
// });

// document.addEventListener("click", () => {
//   if (Howler.ctx.state === "suspended") Howler.ctx.resume();
// }, { once: true });

// let lastSeenTime = Number(localStorage.getItem("lastSeenTime") || 0);

// onValue(ref(db, "coinsSum"), (snap) => {
//   const total = +(snap.val() ?? 0);
  
//   divSums.forEach(divSum => {
//     divSum.textContent = total;
//   });
// });

// const monthNames = document.querySelectorAll('#month-name');
// const coinLists = document.querySelectorAll('.coin-list');
// const monthNamePrnt = document.querySelector('.month-name-prnt');

// let months = [];
// let currentMonthIndex = 0;
// let groupedData = {};

// // 🔹 Обновим renderTableFromFirebase, чтобы сохранить данные
// function renderTableFromFirebase(data) {
//   groupedData = {};

//   data.forEach(item => {
//     const dateObj = new Date(item.time);
//     const formattedDate = dateObj.toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric"
//     }).replace(/ /g, "-");

//     const [day, month, year] = formattedDate.split("-");
//     const monthKey = `${month} ${year}`;

//     if (!groupedData[monthKey]) groupedData[monthKey] = [];
//     groupedData[monthKey].push({
//       data: formattedDate,
//       coins: `+${item.value}`,
//       time: item.time
//     });
//   });

//   months = Object.keys(groupedData).sort((a, b) => {
//     const [monthA, yearA] = a.split(" ");
//     const [monthB, yearB] = b.split(" ");
//     return new Date(`${monthB} 1, ${yearB}`) - new Date(`${monthA} 1, ${yearA}`);
//   });

//   currentMonthIndex = 0; // начинаем с последнего месяца
//   renderMonth(currentMonthIndex);
// }

// // 🔸 Отрисовать конкретный месяц
// function renderMonth(index) {
//   if (!months.length) return;

//   const monthKey = months[index];
//   const entries = groupedData[monthKey]?.sort((a, b) => b.time - a.time) || [];

//   monthNames.forEach(el => el.innerText = monthKey);
//   monthNamePrnt.style.display = 'flex';


//   coinLists.forEach(table => {
//     table.innerHTML = "";

//     if (entries.length === 0) {
//       table.innerHTML = "<p style='text-align:center;color:gray;'>Нет данных за этот месяц</p>";
//       return;
//     }

//     entries.forEach(entry => {
//       const row = document.createElement("div");
//       row.className = "flex justify-between items-center p-2 gap-3 border-b border-gray-200";
//       row.innerHTML = `
//         <span class="text-gray-700">${entry.data}</span>
//         <span class="flex gap-0.5 justify-center items-center bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm">
//           ${entry.coins} <img width="12" height="12" src="./imgs/Coin.svg" alt="">
//         </span>
//       `;
//       table.appendChild(row);
//     });
//   });
// }

// // 🔘 Кнопки переключения
// window.prevMonth = function() {
//   if (currentMonthIndex < months.length - 1) {
//     currentMonthIndex++;
//     renderMonth(currentMonthIndex);
//   }
// };

// window.nextMonth = function() {
//   if (currentMonthIndex > 0) {
//     currentMonthIndex--;
//     renderMonth(currentMonthIndex);
//   }
// };



// onValue(ref(db, "coinsList"), (snapshot) => {
//     const data = snapshot.val();
//     if (!data) {
//       notificationsContainer.innerHTML = "<p style='text-align:center;color:gray;'>Hali hech qanday bildirishnomalar yo'q</p>";
//       return;
//     }

//     // Сортируем по времени
//     const entries = Object.values(data).sort((a, b) => b.time - a.time);

//     // Очищаем контейнер
//     notificationsContainer.innerHTML = "";

//     entries.forEach(item => {
//       const date = new Date(item.time);
//       const formattedDate = date.toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric"
//       });
//       const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//       const div = document.createElement("div");
//       div.className = "notification-item";
//       div.innerHTML = `
//         <img width="35px" height="35px" src="./imgs/Coin.svg" alt="">
//         <div class="notification-content">
//           <h4>Siz coin oldingiz: ${item.value}</h4>
//           <p>${formattedDate} ${formattedTime}</p>
//         </div>
//       `;
//       notificationsContainer.appendChild(div);
//     });
//   });

// // 🟢 Загружаем все начисления
// onValue(ref(db, "coinsList"), (snap) => {
//   const dataFB = snap.val();
//   if (!dataFB) return;

//   const entries = Object.values(dataFB).sort((a, b) => a.time - b.time);
//   let newCoins = 0;

//   for (const item of entries) {
//     if (item.time > lastSeenTime) {
//       newCoins += item.value;
//       lastSeenTime = item.time;
//     }
//   }

//   if (newCoins > 0) {
//     modal.style.display = 'flex';
//     const Confcontainer = document.getElementById('confettiBox');
//     Confcontainer.style.display = 'block';
//     overlay.classList.add('active');
//     document.body.style.overflow = 'hidden';
//     ding.play();
//     shootConfetti();
//     localStorage.setItem("lastSeenTime", lastSeenTime);
//   }

//   const lastItem = entries.at(-1);
//   if (lastItem) divValue.textContent = +lastItem.value;

//   // 🔸 Отрисовываем всю историю коинов
//   renderTableFromFirebase(entries);
// });


import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCvPqWuVmL3x7lGfkUV-ma1UHmz7rx__Rs",
  authDomain: "marsspace-48b62.firebaseapp.com",
  databaseURL: "https://marsspace-48b62-default-rtdb.firebaseio.com",
  projectId: "marsspace-48b62",
  storageBucket: "marsspace-48b62.firebasestorage.app",
  messagingSenderId: "983536140625",
  appId: "1:983536140625:web:084c07906ea2d9bfced370",
  measurementId: "G-VDHG39ZRR1"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const modal = document.querySelector(".default-notification-of-coin");
const divSums = document.querySelectorAll("#coinsSumDisplay");
const divValue = document.getElementById("coinsValueDisplay");
const overlay = document.querySelector('.overlay');
const notificationsContainer = document.getElementById("notificationsContainer");

const ding = new Howl({
  src: ["./coin.mp3"],
  volume: 1.0,
  html5: true
});

document.addEventListener("click", () => {
  if (Howler.ctx.state === "suspended") Howler.ctx.resume();
}, { once: true });

let lastSeenTime = Number(localStorage.getItem("lastSeenTime") || 0);

onValue(ref(db, "coinsSum"), (snap) => {
  const total = +(snap.val() ?? 0);
  divSums.forEach(divSum => {
    divSum.textContent = total;
  });
});

// === История коинов ===
const monthNames = document.querySelectorAll('#month-name');
const coinLists = document.querySelectorAll('.coin-list');
const monthNamePrnt = document.querySelector('.month-name-prnt');

let months = [];
let currentMonthIndex = 0;
let groupedData = {};

function renderTableFromFirebase(data) {
  groupedData = {};

  data.forEach(item => {
    const dateObj = new Date(item.time);
    const formattedDate = dateObj.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).replace(/ /g, "-");

    const [day, month, year] = formattedDate.split("-");
    const monthKey = `${month} ${year}`;

    if (!groupedData[monthKey]) groupedData[monthKey] = [];
    groupedData[monthKey].push({
      data: formattedDate,
      coins: `+${item.value}`,
      time: item.time
    });
  });

  months = Object.keys(groupedData).sort((a, b) => {
    const [monthA, yearA] = a.split(" ");
    const [monthB, yearB] = b.split(" ");
    return new Date(`${monthB} 1, ${yearB}`) - new Date(`${monthA} 1, ${yearA}`);
  });

  currentMonthIndex = 0;
  renderMonth(currentMonthIndex);
}

function renderMonth(index) {
  if (!months.length) return;

  const monthKey = months[index];
  const entries = groupedData[monthKey]?.sort((a, b) => b.time - a.time) || [];

  monthNames.forEach(el => el.innerText = monthKey);
  monthNamePrnt.style.display = 'flex';

  coinLists.forEach(table => {
    table.innerHTML = "";

    if (entries.length === 0) {
      table.innerHTML = "<p style='text-align:center;color:gray;'>Нет данных за этот месяц</p>";
      return;
    }

    entries.forEach(entry => {
      const row = document.createElement("div");
      row.className = "flex justify-between items-center p-2 gap-3 border-b border-gray-200";
      row.innerHTML = `
        <span class="text-gray-700">${entry.data}</span>
        <span class="flex gap-0.5 justify-center items-center bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm">
          ${entry.coins} <img width="12" height="12" src="./imgs/Coin.svg" alt="">
        </span>
      `;
      table.appendChild(row);
    });
  });
}

window.prevMonth = function() {
  if (currentMonthIndex < months.length - 1) {
    currentMonthIndex++;
    renderMonth(currentMonthIndex);
  }
};

window.nextMonth = function() {
  if (currentMonthIndex > 0) {
    currentMonthIndex--;
    renderMonth(currentMonthIndex);
  }
};

// === История уведомлений ===
onValue(ref(db, "coinsList"), (snapshot) => {
  const data = snapshot.val();
  if (!data) {
    notificationsContainer.innerHTML = "<p style='text-align:center;color:gray;'>Hali hech qanday bildirishnomalar yo'q</p>";
    return;
  }

  const entries = Object.values(data).sort((a, b) => b.time - a.time);
  notificationsContainer.innerHTML = "";

  entries.forEach(item => {
    const date = new Date(item.time);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const div = document.createElement("div");
    div.className = "notification-item";
    div.innerHTML = `
      <img width="35px" height="35px" src="./imgs/Coin.svg" alt="">
      <div class="notification-content">
        <h4>Siz coin oldingiz: ${item.value}</h4>
        <p>${formattedDate} ${formattedTime}</p>
      </div>
    `;
    notificationsContainer.appendChild(div);
  });
});

// === 🟢 Очередь модалок при новых коинах ===
const dfCoinBtnModal = document.querySelector('.default-notification-of-coin');
const ClosedfCoinBtn = document.querySelector('.close-df-coin-btn');
const ClosedfCoinBtn2 = document.querySelector('.close-df-coin-btn-2');
const coinsValueDisplay = document.getElementById('coinsValueDisplay');

let modalQueue = [];
let modalOpen = false;
let lastSeenTimes = new Set();

function showNextModal() {
  if (modalOpen || modalQueue.length === 0) return;

  const nextItem = modalQueue.shift();
  coinsValueDisplay.textContent = nextItem.value;

  dfCoinBtnModal.style.display = 'flex';
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  const Confcontainer = document.getElementById('confettiBox');
  Confcontainer.style.display = 'block';
  ding.play();
  shootConfetti();

  modalOpen = true;
}

function closeModal() {
  dfCoinBtnModal.style.display = 'none';
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';

  const Confcontainer = document.getElementById('confettiBox');
  Confcontainer.style.display = 'none';

  modalOpen = false;

  if (modalQueue.length > 0) {
    setTimeout(showNextModal, 300);
  }
}

ClosedfCoinBtn.addEventListener('click', closeModal);
ClosedfCoinBtn2.addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});

// 🟢 Firebase слушатель новых коинов
onValue(ref(db, "coinsList"), (snapshot) => {
  const data = snapshot.val();
  if (!data) return;

  const entries = Object.values(data).sort((a, b) => a.time - b.time);

  entries.forEach(item => {
    if (!lastSeenTimes.has(item.time) && item.time > lastSeenTime) {
      lastSeenTimes.add(item.time);
      modalQueue.push(item);
      lastSeenTime = item.time;
      localStorage.setItem("lastSeenTime", lastSeenTime);
    }
  });

  showNextModal();
  renderTableFromFirebase(Object.values(data));
});
