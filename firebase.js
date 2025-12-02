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
  //   groupedData[monthKey].push({
  //     data: formattedDate,
  //     coins: `+${item.value}`,
  //     time: item.time
  //   });
  // });

  const coinsText = item.value >= 0 ? `+${item.value}` : `-${Math.abs(item.value)}`;

    groupedData[monthKey].push({
      data: formattedDate,
      coins: coinsText,
      value: item.value,
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

      const isNegative = entry.value < 0;
      const bgClass = isNegative ? 'bg-red-100  ' : 'bg-green-100';
      const textClass = isNegative ? 'text-[#f56c6c]' : 'text-green-700';

      row.innerHTML = `
        <span class="text-gray-700">${entry.data}</span>
        <span class="flex gap-0.5 justify-center items-center ${bgClass} ${textClass} px-2 py-1 rounded-lg text-sm">
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

    const actionText = item.value >= 0 
    ? `Siz coin oldingiz: ${item.value}` 
    : `Coin sarfladingiz: -${Math.abs(item.value)}`;

    const div = document.createElement("div");
    div.className = "notification-item";
    div.innerHTML = `
      <img width="35px" height="35px" src="./imgs/Coin.svg" alt="">
      <div class="notification-content">
        <h4>${actionText}</h4>
        <p>${formattedDate} ${formattedTime}</p>
      </div>
    `;
    notificationsContainer.appendChild(div);
  });

  entries.forEach(item => {
    // Только новые по времени и ещё не виденные
    if (!lastSeenTimes.has(item.time) && item.time > lastSeenTime) {
      lastSeenTimes.add(item.time);
      // Добавляем в очередь ТОЛЬКО положительные начисления
      if (Number(item.value) > 0) {
        modalQueue.push(item);
      }
      lastSeenTime = item.time;
      localStorage.setItem("lastSeenTime", lastSeenTime);
    }
  });

  // Показать следующую (если есть) — теперь будут только положительные элементы
  showNextModal();

  renderTableFromFirebase(Object.values(data));
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


// const ProfilePrnt = document.querySelector('.User-name-prnt');
// const profileModalContent = document.querySelector('.profile.modal.content');
// const userImg = document.querySelector('.user-img');

// ProfilePrnt.querySelectorAll('.profile').forEach(slot => {
//   const clone = userImg.cloneNode(true);
//   slot.appendChild(clone);
// });

// profileModalContent.querySelectorAll('.profile-img').forEach(slot => {
//   const clone = userImg.cloneNode(true);
//   slot.appendChild(clone);
// });

function applyAvatar() {
  const userImg = document.querySelector('.user-img');
  if (!userImg) return;

  const slots = [
    ...document.querySelectorAll('.User-name-prnt .profile'),
    ...document.querySelectorAll('.profile.modal.content .profile-img'),
    ...document.querySelectorAll('.post-chat-mdl-body .img-slot2')
  ];

  slots.forEach(slot => {
    if (!slot.querySelector('img.user-img')) {
      const clone = userImg.cloneNode(true);
      slot.appendChild(clone);
      clone.style.display = 'block';
    }
  });
}

// Пытаемся сразу
applyAvatar();

// Если динамика, наблюдаем за DOM
const observer = new MutationObserver(applyAvatar);
observer.observe(document.body, { childList: true, subtree: true });

import { runTransaction, push, set } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

const noEnoughCoinsModal = document.querySelector('.no-enough-coins');
const closeShopCoinMdlBtn = document.querySelectorAll('.close-shop-coin-mdl-btn');
const elButtonPrimary = document.querySelectorAll('.el-button--primary');
const SuccessModal = document.querySelector('.success-modal');
const confirmModal = document.getElementById("confirmBuyModal");
const noQuantityModal = document.querySelector(".no-quantity-modal");


overlay.addEventListener('click', () => {
  noEnoughCoinsModal.classList.remove('active');
  SuccessModal.classList.remove('active');
  confirmModal.classList.remove('active');
  noQuantityModal.classList.remove('active');
});

closeShopCoinMdlBtn.forEach(closemdl => {
closemdl.addEventListener('click', () => {
  noEnoughCoinsModal.classList.remove('active');
  SuccessModal.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
  noQuantityModal.classList.remove('active');
})
});

elButtonPrimary.forEach(elpr => {
  elpr.addEventListener('click', () => {
  noEnoughCoinsModal.classList.remove('active');
  SuccessModal.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
  noQuantityModal.classList.remove('active');
})
});

// Атомарная функция — списание/добавление коинов
async function updateCoins(amount) {
  const coinsRef = ref(db, "coinsSum");
  const listRef = ref(db, "coinsList");

  try {
    // runTransaction гарантирует атомарность (нет гонок при параллельных вызовах)
    const result = await runTransaction(coinsRef, current => {
      if (current === null) current = 0;
      const updated = current + amount;
      if (updated < 0) {
        // возвращаем undefined чтобы отменить транзакцию
        return; 
      }
      return updated;
    }, { applyLocally: true });

    if (!result.committed) {
      // транзакция не применена (например, недостаточно коинов)
      noEnoughCoinsModal.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      return null;
    }

    // Успешно обновлено — пушим запись в историю
    await push(listRef, {
      value: amount,
      time: Date.now()
    });

    return result.snapshot.val(); // новое значение
  } catch (err) {
    console.error("updateCoins error:", err);
    throw err;
  }
}

async function updateProductQuantity(productId, newQty) {
  const productRef = ref(db, `SpaceShop-products/${productId}/quantity`);
  await set(productRef, newQty);
}

// Назначаем обработчики кнопкам товара (выполняется сразу и при динамическом добавлении можно повторно запускать)
function initBuyButtons(root = document) {
  root.querySelectorAll('#button-one').forEach(btn => {
    if (btn.dataset.inited) return;
    btn.dataset.inited = "1";

    btn.addEventListener('click', async () => {
      const price = Number(btn.dataset.price || 0);
      const imgUrl = btn.dataset.img;
      const ProductName = btn.dataset.itemname;
      const productId = btn.dataset.id;
      if (!price) return;

      let qty = Number(btn.dataset.quantity);
      const qElement = btn.closest(".product-card").querySelector(".qval");

    // ❗ Проверка количества товара
    if (qty <= 0) {
      noQuantityModal.classList.add("active");
      document.body.style.overflow = 'hidden';
      overlay.classList.add("active");
      btn.disabled = false;
      return;
  }

    btn.disabled = true;

      const confirmModal = document.getElementById("confirmBuyModal");
      const confirmProductImg = document.getElementById("confirmProductImg");
const confirmInput = document.getElementById("confirmInput");
const confirmError = document.getElementById("confirmError");
const confirmOk = document.getElementById("confirmOk");
const confirmCancel = document.getElementById('confirm-cancel');
const productName = document.querySelector('.product-name');
const productPrice = document.querySelector('.product-price');

let pendingPrice = null; // сюда временно сохраняем цену товара
const CONFIRM_CODE = 840647463; // 🔥 Ты можешь изменить на любое число

// открыть модал подтверждения
function openConfirmModal(price) {
  pendingPrice = price;
  confirmError.classList.remove('active');

  confirmProductImg.src = imgUrl;
  productName.innerHTML = ProductName;
  productPrice.innerHTML = price;

  confirmModal.classList.add('active');
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

// закрыть модал
function closeConfirmModal() {
  confirmModal.classList.remove('active');
  overlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

// кнопка отмены
confirmCancel.onclick = closeConfirmModal;

confirmInput.addEventListener('input', () => {
  if (confirmInput.value.trim() !== '') {
    confirmOk.style.opacity = '1';
    confirmOk.style.cursor = 'pointer' // чтобы можно нажимать
  } else {
    confirmOk.style.opacity = '0.3';
    confirmOk.style.cursor = 'not-allowed'; // блокируем кнопку
  }
});

        openConfirmModal(price, imgUrl, ProductName);

        async function addPurchaseToHistory(productId, ProductName, price, imgUrl) {
    const historyRef = ref(db, "SpacePurchaseHistory");
    await push(historyRef, {
        imgUrl: imgUrl,
        productId: productId,
        productName: ProductName,
        price: price,
        time: Date.now(),
        status: "pending"
    });
}


// кнопка подтверждения
confirmOk.onclick = async () => {
  const val = confirmInput.value.trim();

  if (!val) {
    confirmError.classList.remove('active');
    return;
  }

  if (val != CONFIRM_CODE) {
      confirmError.classList.add('active');
    setTimeout(() => {
      confirmError.classList.remove('active');
    }, 3000);
    return;
  }

  closeConfirmModal(); // закрываем подтверждение

  // Теперь списываем коины
  const newTotal = await updateCoins(-pendingPrice);

  if (newTotal !== null) {
    SuccessModal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    confirmInput.value = "";
    toggleIcon.classList.remove('fa-eye-slash');
    toggleIcon.classList.add('fa-eye');
    confirmInput.type = 'password';

      qty -= 1;
btn.dataset.quantity = qty;
qElement.textContent = qty;

localStorage.setItem(`qty_${productId}`, qty);

await updateProductQuantity(productId, qty);
await addPurchaseToHistory(productId, ProductName, pendingPrice, imgUrl);
  }
};



      try {
        // const newTotal = await updateCoins(-price);
        // if (newTotal === null) {
        //   noEnoughCoinsModal.classList.add('active');
        //   overlay.classList.add('active');
        //   document.body.style.overflow = 'hidden';
        //   btn.disabled = false;
        //   return;
        // }


        // Успех: обнови UI (например общий счёт)
        // document.querySelectorAll('#coinsSumDisplay').forEach(el => el.textContent = newTotal);
        // SuccessModal.classList.add('active');
        // overlay.classList.add('active');
        // document.body.style.overflow = 'hidden';
      } catch (err) {
        alert("Xatolik yuz berdi. Qayta urinib ko'ring.");
      } finally {
        btn.disabled = false;
      }
    });
  });
}

// async function loadQuantities() {
//   const snapshot = await get(ref(db, "SpaceShop-products"));
//   if (snapshot.exists()) {
//     const SpaceShopproducts = snapshot.val();



//     for (const productId in SpaceShopproducts) {
//       const btn = document.querySelector(`[data-id="${productId}"]`);
//       if (!btn) continue;

//       const qElement = btn.closest('.product-card').querySelector('.qval');

//       // 1) Берём с Firebase
//       let qty = SpaceShopproducts[productId].quantity;

//       // 2) Если есть в localStorage — используем его
//       const savedQty = localStorage.getItem(`qty_${productId}`);
//       if (savedQty !== null) qty = Number(savedQty);

//       // 3) обновляем интерфейс
//       btn.dataset.quantity = qty;
//       qElement.textContent = qty;
//     }
//   }
// }

function watchProductsRealtime() {
  const productsRef = ref(db, "SpaceShop-products");
  onValue(productsRef, (snap) => {
    const SpaceShopproducts = snap.val() || {};

    for (const productId in SpaceShopproducts) {
      const btn = document.querySelector(`[data-id="${productId}"]`);
      if (!btn) continue;

      const card = btn.closest(".product-card");
      if (!card) continue;

      const qElement = card.querySelector(".qval");
      const spinner = card.querySelector(".qty-spinner");

      let qty = Number(SpaceShopproducts[productId].quantity || 0);

      // никаких localStorage — Firebase главное!
      spinner?.classList.add("hidden");
      btn.classList.add('visibility');
      if (qElement) qElement.textContent = qty;
      btn.dataset.quantity = qty;
    }

  }, (err) => {
    console.error("watchProductsRealtime error:", err);
  });
}

watchProductsRealtime();


// Инициализация для уже существующих карточек
initBuyButtons();
// loadQuantities();


