import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

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
const auth = getAuth(app);

let currentUserId = null;
onAuthStateChanged(auth, (user) => {
  currentUserId = user?.uid || null;
  if (currentUserId) {
    loadSeenCoinTimesFromFirebase();
  }
});

const modal = document.querySelector(".default-notification-of-coin");
const divSums = document.querySelectorAll("#coinsSumDisplay");
const divValue = document.getElementById("coinsValueDisplay");
const overlay = document.querySelector('.overlay');
const dfCoinBtnModalOverlay = document.querySelector('.dfCoinBtnModalOverlay');
const notificationsContainer = document.getElementById("notificationsContainer");
const subscribeBtn = document.querySelector('.subscribe-btn');
const SpacePremiumBtn = document.querySelector('.SpacePremium-btn');
const PremiumFeaturesOpener = document.querySelector('.premium-features-opener');
const StudentHeroWrapper = document.querySelector('.student-hero-wrapper');
const premiumInfoModal = document.querySelector('.premium-info-modal');
const ratingWarning = document.querySelector('.rating-warning');
const typingRatingSpinner = document.querySelector('.typing-rating-spinner');

const ding = new Howl({
  src: ["./coin.mp3"],
  volume: 1.0,
  html5: true
});

// --- Spinner контейнер для проверки премиума ---
let premiumCheckSpinner = null;

function createPremiumCheckSpinner() {
  const spinnerContainer = document.createElement('div');
  spinnerContainer.className = 'premium-check-spinner-container';
  spinnerContainer.innerHTML = '<img src="./imgs/Spinner.svg" alt="Loading..." class="premium-check-spinner" />';
  return spinnerContainer;
}

function showPremiumCheckSpinner() {
  if (!subscribeBtn || !SpacePremiumBtn) return;
  
  // Скрыть оба баттона
  subscribeBtn.style.display = 'none';
  SpacePremiumBtn.style.display = 'none';
  
  // Скрыть elButtonLarge во время загрузки
  const elButtonLarge = document.querySelector('.el-button--large');
  if (elButtonLarge) elButtonLarge.classList.remove('visibility');

  if (PremiumFeaturesOpener) PremiumFeaturesOpener.classList.remove('visibility');

  if (ToHeroPageBtn) ToHeroPageBtn.classList.remove('visibility');

  if (typingRatingSpinner) typingRatingSpinner.classList.remove('hidden');
  if (ratingWarning) ratingWarning.style.display = 'none';
  
  // Создать и показать спиннер рядом с баттонами
  if (!premiumCheckSpinner) {
    premiumCheckSpinner = createPremiumCheckSpinner();
    subscribeBtn.parentNode.insertBefore(premiumCheckSpinner, subscribeBtn);
  }
  premiumCheckSpinner.style.display = 'flex';
}

function hidePremiumCheckSpinner() {
  if (premiumCheckSpinner) {
    premiumCheckSpinner.style.display = 'none';
  }
  
  // Показать elButtonLarge после загрузки
  const elButtonLarge = document.querySelector('.el-button--large');
  if (elButtonLarge) elButtonLarge.classList.add('visibility');

  if (PremiumFeaturesOpener) PremiumFeaturesOpener.classList.add('visibility');

  if (ToHeroPageBtn) ToHeroPageBtn.classList.add('visibility');

  if (typingRatingSpinner) typingRatingSpinner.classList.add('hidden');
}

document.addEventListener("click", () => {
  if (Howler.ctx.state === "suspended") Howler.ctx.resume();
}, { once: true });

const storedSeenCoinTimes = localStorage.getItem("seenCoinTimes");
const seenCoinTimes = storedSeenCoinTimes ? new Set(JSON.parse(storedSeenCoinTimes)) : new Set();
let isFirstCoinVisit = storedSeenCoinTimes === null;
let seenLoaded = !!storedSeenCoinTimes; // true if we already have local data
let pendingCoinsData = null;

function saveSeenCoinTimes() {
  localStorage.setItem("seenCoinTimes", JSON.stringify(Array.from(seenCoinTimes)));
  
  if (currentUserId) {
    set(ref(db, `users/${currentUserId}/seenCoinNotifications`), Array.from(seenCoinTimes))
      .catch(err => console.error("Error saving seen coins to Firebase:", err));
  }
}

function loadSeenCoinTimesFromFirebase() {
  if (!currentUserId) return;

  const userSeenRef = ref(db, `users/${currentUserId}/seenCoinNotifications`);
  // Real-time sync: merge remote seen times into local set
  onValue(userSeenRef, (snapshot) => {
    const data = snapshot.val();
    if (data && Array.isArray(data)) {
      data.forEach(t => seenCoinTimes.add(Number(t)));
      localStorage.setItem("seenCoinTimes", JSON.stringify(Array.from(seenCoinTimes)));
    }
    seenLoaded = true;
    if (pendingCoinsData) {
      processCoinsListData(pendingCoinsData);
      pendingCoinsData = null;
    }
  });
}

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

function processCoinsListData(data) {
  if (!data) {
    notificationsContainer.innerHTML = "<p style='text-align:center;color:gray;'>Hali hech qanday bildirishnomalar yo'q</p>";
    renderTableFromFirebase([]);
    return;
  }

  const entriesDesc = Object.values(data).sort((a, b) => b.time - a.time);
  notificationsContainer.innerHTML = "";

  entriesDesc.forEach(item => {
    const date = new Date(item.time);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const actionText = item.value >= 0 
      ? `Siz coin oldingiz: ${item.value}` 
      : `Coin sarfladingiz: ${Math.abs(item.value)}`;

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

  const entriesAsc = [...entriesDesc].sort((a, b) => a.time - b.time);

  // If we are using Firebase-backed seen list and it's not yet loaded, defer processing
  if (currentUserId && !seenLoaded) {
    pendingCoinsData = data;
    return;
  }

  if (isFirstCoinVisit) {
    entriesAsc.forEach(item => {
      if (Number(item.value) > 0) {
        seenCoinTimes.add(Number(item.time));
      }
    });
    if (seenCoinTimes.size > 0) {
      saveSeenCoinTimes();
    }
    isFirstCoinVisit = false;
  } else {
    entriesAsc.forEach(item => {
      if (Number(item.value) > 0 && !seenCoinTimes.has(Number(item.time))) {
        seenCoinTimes.add(Number(item.time));
        modalQueue.push(item);
      }
    });

    if (modalQueue.length > 0) {
      saveSeenCoinTimes();
    }
  }

  showNextModal();
  renderTableFromFirebase(Object.values(data));
}

onValue(ref(db, "coinsList"), (snapshot) => {
  const data = snapshot.val();
  processCoinsListData(data);
});

// === 🟢 Очередь модалок при новых коинах ===
const dfCoinBtnModal = document.querySelector('.default-notification-of-coin');
const ClosedfCoinBtn = document.querySelector('.close-df-coin-btn');
const ClosedfCoinBtn2 = document.querySelector('.close-df-coin-btn-2');
const coinsValueDisplay = document.getElementById('coinsValueDisplay');

let modalQueue = [];
let modalOpen = false;

function showNextModal() {
  if (modalOpen || modalQueue.length === 0) return;

  const nextItem = modalQueue.shift();
  coinsValueDisplay.textContent = nextItem.value;

  dfCoinBtnModal.style.display = 'flex';
  dfCoinBtnModalOverlay.classList.add('active'); 
  document.body.style.overflow = 'hidden';

  const Confcontainer = document.getElementById('confettiBox');
  Confcontainer.style.display = 'block';
  ding.play();
  shootConfetti();

  modalOpen = true;
}

function closeModal() {
  dfCoinBtnModal.style.display = 'none';
  dfCoinBtnModalOverlay.classList.remove('active'); 
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
dfCoinBtnModalOverlay.addEventListener('click', (e) => {
  if (e.target === dfCoinBtnModalOverlay) closeModal();
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

import { runTransaction, push, get, update } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

const noEnoughCoinsModal = document.querySelector('.no-enough-coins');
const closeShopCoinMdlBtn = document.querySelectorAll('.close-shop-coin-mdl-btn');
const elButtonPrimary = document.querySelectorAll('.el-button--primary');
const SuccessModal = document.querySelector('.success-modal');
const confirmModal = document.getElementById("confirmBuyModal");
const noQuantityModal = document.querySelector(".no-quantity-modal");


// === Конфети эффект ===
const colors = ['#f472b6', '#facc15', '#38bdf8', '#4ade80', '#a78bfa', '#fb7185'];

function shootConfetti() {
  const container = document.getElementById('confettiBox');
  if (!container) return; // если контейнера нет, пропускаем
  container.style.display = 'block'; // показываем контейнер!

  
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    // случайное направление выстрела
    const angle = Math.random() * Math.PI;
    const distance = Math.random() * 200 + 100;
    const x = Math.cos(angle) * distance + 'px';
    const y = Math.sin(angle) * distance + 'px';
    confetti.style.setProperty('--x', x);
    confetti.style.setProperty('--y', y);
    confetti.style.left = '50%';
    confetti.style.top = '50%';
    confetti.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
    container.appendChild(confetti);
    // удаляем через 2 секунды
    setTimeout(() => confetti.remove(), 2000);
  }
}

// === Конфети эффект ===
const colors2 = ['#f472b6', '#facc15', '#38bdf8', '#4ade80', '#a78bfa', '#fb7185'];

function shootConfetti2() {
  const container2 = document.getElementById('confettiBox2');
  if (!container2) return; // если контейнера нет, пропускаем
  container2.style.display = 'block'; // показываем контейнер!

  
  for (let i = 0; i < 200; i++) {
    const confetti2 = document.createElement('div');
    confetti2.className = 'confetti2';
    confetti2.style.background = colors2[Math.floor(Math.random() * colors2.length)];
    // случайное направление выстрела
    const angle2 = Math.random() * Math.PI;
    const distance2 = Math.random() * 300 + 250;
    const x = Math.cos(angle2) * distance2 + 'px';
    const y = Math.sin(angle2) * distance2 + 'px';
    confetti2.style.setProperty('--x', x);
    confetti2.style.setProperty('--y', y);
    confetti2.style.left = '50%';
    confetti2.style.top = '10%';
    confetti2.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
    container2.appendChild(confetti2);
    // удаляем через 2 секунды
    setTimeout(() => confetti2.remove(), 2000);
  }
}


overlay.addEventListener('click', () => {
  if(noEnoughCoinsModal) noEnoughCoinsModal.classList.remove('active');
  if(SuccessModal) SuccessModal.classList.remove('active');
  if(confirmModal) confirmModal.classList.remove('active');
  if(noEnoughCoinsModal) noQuantityModal.classList.remove('active');
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
  if(noEnoughCoinsModal) noEnoughCoinsModal.classList.remove('active');
  if(SuccessModal) SuccessModal.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
  if(noEnoughCoinsModal) noQuantityModal.classList.remove('active');
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
      // noEnoughCoinsModal.classList.add('active');
      // overlay.classList.add('active');
      // document.body.style.overflow = 'hidden';
      // const productId = btn.dataset.id;
      // const btn = document.querySelector(`.whilePrem[data-id="${productId}"]`);
      // btn.querySelector('.bought-text')?.classList.add('hidden');
      // return null;
      // транзакция не применена (например, недостаточно коинов)
      if (noEnoughCoinsModal) noEnoughCoinsModal.classList.add('active');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      // Не манипулируем DOM для конкретных кнопок здесь — это поведение должен обрабатывать вызывающий код.
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

  if (newTotal === null) {
    // Транзакция не прошла (недостаточно коинов) — updateCoins уже показывает модал.
    // Восстанавливаем состояние кнопки и выходим.
    btn.disabled = false;
    return;
  }

  // Транзакция успешна — сохраняем покупку в БД и обновляем UI

  try {
  await set(ref(db, `premium/${studentId}/whilePremBought/${productId}`), true);
  markWhilePremAsBought(productId);
  console.log("ItemBought SAVED");
} catch (e) {
  console.error("SAVE ERROR:", e);
}

    SuccessModal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    confirmInput.value = "";
    toggleIcon.classList.remove('fa-eye-slash');
    toggleIcon.classList.add('fa-eye');
    confirmInput.type = 'password';
    shootConfetti();
    ding.play();

      qty -= 1;
btn.dataset.quantity = qty;
qElement.textContent = qty;

localStorage.setItem(`qty_${productId}`, qty);

await updateProductQuantity(productId, qty);
await addPurchaseToHistory(productId, ProductName, pendingPrice, imgUrl);
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
      const heroProductButtonOne = document.querySelectorAll('.hero-product #button-one');
      heroProductButtonOne.forEach(herobtn => {
        herobtn.classList.add('visibility');
      });
      if (qElement) qElement.textContent = qty;
      btn.dataset.quantity = qty;
    }

  }, (err) => {
    console.error("watchProductsRealtime error:", err);
  });
}

watchProductsRealtime();


initBuyButtons();


const monthNameEl = document.getElementById("monthName");
const daysEl = document.getElementById("calendarDays");
let currentDate = new Date();
const studentId = "student1"; // только один ученик

// --- Функция обновления цвета и подписи ---
function updateDayStatus(el, status) {
  let existingLabel = el.querySelector(".status-label");
  if (existingLabel) existingLabel.remove();

  const label = document.createElement("li");
  label.classList.add("status-label");

  if (status === "present") {
      label.textContent = "Bor edi";
      label.style.color = "rgb(0, 188, 211)";
  } else if (status === "absent") {
      label.textContent = "Yo'q edi";
      label.style.color = "#ea1e61";
  }

  el.appendChild(label);
}

// --- Рендер календаря ученика ---
async function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthRef = ref(db, `attendance/${studentId}`);
const snapshot = await get(monthRef);
const attendance = snapshot.exists() ? snapshot.val() : {};

  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);

  const firstDayIndex = (start.getDay() + 6) % 7; // Monday = 0
  const daysInMonth = end.getDate();
  const totalCells = 35;

  monthNameEl.textContent = currentDate.toLocaleString("en-US", { month: "long", year: "numeric" });

  daysEl.innerHTML = "";

  // attendance/student1/2025-12



  for (let i = 0; i < totalCells; i++) {
    const el = document.createElement("div");
    let dayDate;

    // определяем dayDate
    if (i < firstDayIndex) {
        const day = new Date(year, month, 0).getDate() - firstDayIndex + i + 1;
        dayDate = new Date(year, month - 1, day);
        el.classList.add("other-month");
    } else if (i >= firstDayIndex + daysInMonth) {
        const day = i - firstDayIndex - daysInMonth + 1;
        dayDate = new Date(year, month + 1, day);
        el.classList.add("other-month");
    } else {
        const day = i - firstDayIndex + 1;
        dayDate = new Date(year, month, day);
    }

    // теперь dayDate определена, можно проверять
    if (dayDate.getDay() === 0) {
        el.classList.add("sunday"); // для CSS
    }

    const strDate = `${dayDate.getFullYear()}-${String(dayDate.getMonth()+1).padStart(2,'0')}-${String(dayDate.getDate()).padStart(2,'0')}`;
    el.dataset.date = strDate;
    el.textContent = dayDate.getDate();

    const status = attendance[strDate];
    if (status) updateDayStatus(el, status);


    daysEl.appendChild(el);
}

}

// --- Навигация ---
document.getElementById("prevMonth").onclick = async () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  await renderCalendar();
};

document.getElementById("nextMonth").onclick = async () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  await renderCalendar();
};

// Первый рендер
renderCalendar();

const attendanceOpener = document.querySelector('.attendance');
const attendanceModal = document.querySelector('.calendar');

attendanceOpener.addEventListener('click', () => {
  attendanceModal.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
});

overlay.addEventListener('click', () => {
  attendanceModal.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
});



// Функция для получения текущих коинов
async function getCoins() {
  try {
    const snapshot = await get(ref(db, "coinsSum"));
    if (snapshot.exists()) {
      return Number(snapshot.val());
    } else {
      return 0;
    }
  } catch (err) {
    console.error(err);
    return 0;
  }
}

const elButtonPrimaryForPremium = document.querySelector('.el-button--primary-premium');
const PremiumNoEnoughCoinsModal = document.querySelector('.Premium-no-enough-coins-modal');
const doubleoverlay = document.querySelector('.double-overlay');

elButtonPrimaryForPremium.addEventListener('click', () => {
  PremiumNoEnoughCoinsModal.classList.remove('active');
  doubleoverlay.classList.remove('active');
});

doubleoverlay.addEventListener('click', () => {
  PremiumNoEnoughCoinsModal.classList.remove('active');
  doubleoverlay.classList.remove('active');
});


// // === Твой код с кнопкой ===
// async function activatePremium() {
//   const GetPremiumBtn = document.querySelector('.get-premium-btn');
//   const premiumFooter = document.querySelector('.premium-footer');
//   const nameElements = document.querySelectorAll('#Student-real-name');
//   const SendPostBtn = document.getElementById('sendPostBtn');
//   const elButtonLarge = document.querySelector('.el-button--large');
//   const premiumRewardModal = document.querySelector('.premium-reward-modal');
//   const closePremiumRewardBtn = document.querySelectorAll('.close-premium-reward-btn');

//   GetPremiumBtn.addEventListener('click', async () => {
//     const price = 299;

//     // Получаем текущие коины
//     const totalCoins = await getCoins();

//     if (totalCoins < price) {
//       PremiumNoEnoughCoinsModal.classList.add('active');
//       doubleoverlay.classList.add('active');
//       return;
//     }

//     // Списываем коины
//     const newTotal = await updateCoins(-price);


//     premiumFooter.style.display = 'none';
//     SendPostBtn.style.display = 'block';
//     elButtonLarge.style.display = 'none';
//     setTimeout(() => {
//   const nameElements = document.querySelectorAll('#Student-real-name');
  
//   nameElements.forEach(el => {
//   el.classList.add("flex", "items-center", "gap-1");

//       const badge = document.createElement("img");
//       badge.src = "https://space.marsit.uz/img/Blue_tick.487ece89.svg";
//       badge.className = "w-4 h-4";
//       badge.alt = "Premium";
//       badge.title = "Premium foydalanuvchi";
//       el.appendChild(badge);
//   });
// }, 300);


//     premiumRewardModal.classList.add('active');
//     PremiumModal.classList.remove('active');
//     overlay.classList.remove('active');
//     document.body.style.overflow = 'hidden';
//     closePremiumRewardBtn.forEach(closebtn => {
//       closebtn.addEventListener('click', () => {
//         premiumRewardModal.classList.remove('active');
//         document.body.style.overflow = 'auto';
//       });
//     });
//   });
// }

// activatePremium();

if (window.location.pathname.endsWith('shop-page.html')) {

const btn = document.querySelector('.whilePrem');
const productId = btn.dataset.id;
}

function markWhilePremAsBought(productId) {
  if (!productId) return;
  document.querySelectorAll('.whileNoPrem').forEach(WhileNotPremiumBtn => {
        WhileNotPremiumBtn.style.display = 'none';  
      });
      const btn = document.querySelector(`.whilePrem[data-id="${productId}"]`);
      if (!btn) return;
        btn.querySelector('.buy-text')?.classList.add('hidden');
        btn.querySelector('.bought-text')?.classList.remove('hidden');
        btn.addEventListener('mouseenter', () => {
            btn.style.textDecoration = 'none';
          });
          btn.addEventListener('mouseleave', () => {
            btn.style.textDecoration = '';
          });
        btn.disabled = true;
    }


// --- Утилитарные функции для премиума ---
async function savePremiumToDB(studentId, untilTimestamp) {
  try {
    await update(ref(db, `premium/${studentId}`), {
      isPremium: true,
      premiumUntil: untilTimestamp
    });
    console.log("Saved premiumUntil:", untilTimestamp);
    return true;
  } catch (err) {
    console.error("Failed to save premium to DB:", err);
    return false;
  }
}

async function removePremiumFromDB(studentId) {
  try {
    await update(ref(db, `premium/${studentId}`), {
      isPremium: false,
      premiumUntil: 0
    });
    console.log("Premium removed in DB for", studentId);
  } catch (err) {
    console.error("Failed to remove premium from DB:", err);
  }
}

const ToHeroPageBtn = document.querySelector('.to-hero-page');

function handleStudentHeroClick() {
  // закроем модалки и вернём скролл
  if (typeof PremiumModal !== 'undefined') PremiumModal.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
  // переход
  window.location.href = './hero.html';
}

// --- UI включение/выключение (адаптируй селекторы под свой DOM) ---
function enablePremiumUI() {
  const premiumFooter = document.querySelector('.premium-footer');
  const SendPostBtn = document.getElementById('sendPostBtn');
  const elButtonLarge = document.querySelector('.el-button--large');

  if (premiumFooter) premiumFooter.style.display = 'none';
  if (SendPostBtn) SendPostBtn.style.display = 'block';
  if (elButtonLarge) elButtonLarge.style.display = 'none';

  const heroProductButtonOne = document.querySelectorAll('.hero-product #button-one');
  const WhilePremiumBtn = document.querySelectorAll('.whilePrem');
  const WhileNotPremiumBtn = document.querySelectorAll('.whileNoPrem');

  WhileNotPremiumBtn.forEach(whilenoprembtn => {
    whilenoprembtn.style.display = 'none';
  });

  WhilePremiumBtn.forEach(whileprembtn => {
    whileprembtn.style.display = 'block';
  });

  // Показать SpacePremiumBtn, скрыть subscribeBtn
  if (subscribeBtn) subscribeBtn.style.display = 'none';
  if (SpacePremiumBtn) SpacePremiumBtn.style.display = 'block';

  heroProductButtonOne.forEach(btn => {
    btn.addEventListener('click', () => {
      PremiumModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    })
  });


  StudentHeroWrapper?.addEventListener('click', handleStudentHeroClick);
  ToHeroPageBtn?.addEventListener('click', handleStudentHeroClick);
  

    setTimeout(() => {
  const nameElements = document.querySelectorAll('#Student-real-name'); 
  nameElements.forEach(el => {
    el.classList.add("flex", "items-center", "gap-1");
    if (!el.querySelector('.premium-badge')) {
      const badge = document.createElement("img");
      badge.src = "https://space.marsit.uz/img/Blue_tick.487ece89.svg";
      badge.className = "premium-badge w-4 h-4 ml-1";
      badge.alt = "Premium";
      badge.title = "Premium foydalanuvchi";
      el.appendChild(badge);
    }
  })
}, 1000);
}

async function disablePremiumUI() {
  const premiumFooter = document.querySelector('.premium-footer');
  const SendPostBtn = document.getElementById('sendPostBtn');
  const elButtonLarge = document.querySelector('.el-button--large');
  const badges = document.querySelectorAll('.premium-badge');

  if (premiumFooter) premiumFooter.style.display = 'block';
  if (SendPostBtn) SendPostBtn.style.display = 'none';
  if (elButtonLarge) elButtonLarge.style.display = 'block';
  const heroProductButtonOne = document.querySelectorAll('.hero-product #button-one');

  StudentHeroWrapper?.removeEventListener('click', handleStudentHeroClick);
  ToHeroPageBtn?.removeEventListener('click', handleStudentHeroClick);


  // const WhilePremiumBtn = document.querySelectorAll('.whilePrem');

  // WhilePremiumBtn.forEach(whileprembtn => {
  //   whileprembtn.style.display = 'block';
  // });

  heroProductButtonOne.forEach(btn => {
    btn.addEventListener('click', () => {
      PremiumModal.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    })
    btn.removeAttribute('data-itemname');
    btn.removeAttribute('data-price');
    btn.removeAttribute('data-id');
    btn.removeAttribute('data-img');
    btn.removeAttribute('data-quantity');
  });
  

  badges.forEach(b => b.remove());

  // Показать subscribeBtn, скрыть SpacePremiumBtn
  if (subscribeBtn) subscribeBtn.style.display = 'block';
  if (SpacePremiumBtn) SpacePremiumBtn.style.display = 'none';

  premiumInfoModal.classList.remove('active');

  const snap = await get(ref(db, `premium/${studentId}/whilePremBought`));
  const bought = snap.exists() && snap.val() === true;
}

// --- Таймер (чтобы один таймер везде) ---
let premiumExpireTimeout = null;
function schedulePremiumExpiry(studentId, untilTimestamp) {
  // Очистим существующий таймер  
  if (premiumExpireTimeout) {
    clearTimeout(premiumExpireTimeout);
    premiumExpireTimeout = null;
  }
  const msLeft = untilTimestamp - Date.now();
  if (msLeft <= 0) {
    // Уже истёк — сразу отключаем и обновляем БД
    disablePremiumUI();
    removePremiumFromDB(studentId);
    return;
  }

  // Планируем отключение
  premiumExpireTimeout = setTimeout(async () => {
    disablePremiumUI();
    await removePremiumFromDB(studentId);
    premiumExpireTimeout = null;
    console.log("Premium expired and removed for", studentId);
  }, msLeft);

  console.log("Scheduled premium expiry in ms:", msLeft);
}

// --- Проверка при загрузке страницы ---
// async function checkPremiumStatusOnLoad(studentId) {
//   try {
//     await restoreWhilePremUI();
//     const snap = await get(ref(db, `premium/${studentId}`));
//     const data = snap.exists() ? snap.val() : null;
//     if (!data || !data.isPremium) {
//       // нет премиума
//       disablePremiumUI();
//       return;
//     }

//     const until = Number(data.premiumUntil) || 0;
//     if (until > Date.now()) {
//       // премиум действителен
//       enablePremiumUI();
//       schedulePremiumExpiry(studentId, until);
//     } else {
//       // премиум просрочен
//       disablePremiumUI();
//       // синхронизируем БД
//       await removePremiumFromDB(studentId);
//     }
//   } catch (err) {
//     console.error("Error checking premium status:", err);
//   }
// }

async function checkPremiumStatusOnLoad(studentId) {
  try {
    // Показать спиннер во время проверки
    showPremiumCheckSpinner();
    
    // Восстанавливаем купленные кнопки
    const snapBought = await get(ref(db, `premium/${studentId}/whilePremBought`));
    if (snapBought.exists()) {
      const boughtProducts = snapBought.val(); // объект вида { "BG (Night)": true, "BG (Day)": true }
      Object.keys(boughtProducts).forEach(productId => {
        if (boughtProducts[productId] === true) {
          markWhilePremAsBought(productId); // показываем Sotib olindi только для этого товара
        }
      });
    }

    // Проверяем премиум
    const snap = await get(ref(db, `premium/${studentId}`));
    const data = snap.exists() ? snap.val() : null;

    if (!data || !data.isPremium) {
      // Премиум нет — отключаем только функционал
      await disablePremiumUI();
      return;
    }

    const until = Number(data.premiumUntil) || 0;
    if (until > Date.now()) {
      enablePremiumUI();
      schedulePremiumExpiry(studentId, until);
    } else {
      // Премиум просрочен — отключаем функционал, но оставляем купленные кнопки
      await disablePremiumUI();
      await removePremiumFromDB(studentId);
    }
  } catch (err) {
    console.error("Error checking premium status:", err);
  } finally {
    // Скрыть спиннер и показать правильный баттон
    hidePremiumCheckSpinner();
  }
}




const GetPremiumBtn = document.querySelector('.get-premium-btn');

GetPremiumBtn.addEventListener('click', async () => {
  const price = 299;
  const totalCoins = await getCoins();

  if (totalCoins < price) {
    // show "not enough" модал
    PremiumNoEnoughCoinsModal.classList.add('active');
    if (doubleoverlay) doubleoverlay.classList.add('active');
    return;
  }

  const newTotal = await updateCoins(-price);

  // --- Сохраняем премиум в БД (10 секунд) ---
  const durationMs = 200000; // 10 сек (позже поставишь 30*24*60*60*1000)
  const untilTimestamp = Date.now() + durationMs;

  const saved = await savePremiumToDB(studentId, untilTimestamp);
  if (!saved) {
    alert("Ошибка при сохранении премиума. Попробуйте ещё раз.");
    return;
  }

  // включаем UI и планируем отключение
  enablePremiumUI();
  schedulePremiumExpiry(studentId, untilTimestamp);

  const premiumFooter = document.querySelector('.premium-footer');
  const SendPostBtn = document.getElementById('sendPostBtn');
  const elButtonLarge = document.querySelector('.el-button--large');
  const premiumRewardModal = document.querySelector('.premium-reward-modal');
  const closePremiumRewardBtn = document.querySelectorAll('.close-premium-reward-btn');
  const doubleoverlay2 = document.querySelector('.post-double-overlay');
  const PostModal = document.querySelector('.post-modal');
  const Postoverlay = document.querySelector('.post-overlay');
  const PremiumModal = document.querySelector('.Premium-modal');

  // остальной UI
  premiumFooter.style.display = 'none';
  if(SendPostBtn) SendPostBtn.style.display = 'block';
  if(elButtonLarge) elButtonLarge.style.display = 'none';
  ding.play();
  shootConfetti2();


  // показываем reward modal и т.д.
  premiumRewardModal.classList.add('active');
  closePremiumRewardBtn.forEach(closebtn => {
    closebtn.addEventListener('click', () => {
      premiumRewardModal.classList.remove('active');
      location.reload();
      document.body.style.overflow = 'auto';
    });
  });
  PremiumModal.classList.remove('active');
  overlay.classList.remove('active');
  if(doubleoverlay2) doubleoverlay2.classList.remove('active');
  if(PostModal) PostModal.classList.remove('active');
  if(Postoverlay) Postoverlay.classList.remove('active');
  document.body.style.overflow = 'hidden';
});

checkPremiumStatusOnLoad(studentId);



async function restoreWhilePremUI() {
  const snap = await get(ref(db, `premium/${studentId}/whilePremBought`));

  if (!snap.exists()) return; 
  if (snap.val() !== true) return;

}

document.addEventListener('DOMContentLoaded', restoreWhilePremUI);

// === Функции для работы со Streak в Firebase ===

async function getStreakFromDB(studentId) {
  try {
    const snap = await get(ref(db, `streak/${studentId}`));
    if (!snap.exists()) {
      return { streakCount: 0, lastStreakDate: null };
    }
    const data = snap.val();
    return {
      streakCount: Number(data.streakCount || 0),
      lastStreakDate: data.lastStreakDate || null
    };
  } catch (err) {
    console.error("Error getting streak from DB:", err);
    return { streakCount: 0, lastStreakDate: null };
  }
}

async function saveStreakToDB(studentId, streakCount, lastStreakDate) {
  try {
    await update(ref(db, `streak/${studentId}`), {
      streakCount: streakCount,
      lastStreakDate: lastStreakDate,
      updatedAt: Date.now()
    });
    console.log("Streak saved to DB:", { streakCount, lastStreakDate });
    return true;
  } catch (err) {
    console.error("Error saving streak to DB:", err);
    return false;
  }
}

// Экспортируем функции в window для использования в других скриптах
window.getStreakFromDB = getStreakFromDB;
window.saveStreakToDB = saveStreakToDB;
// Логика расчёта и локального сохранения стрика
function formatLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function computeStreak(studentId = 'student1') {
  const today = new Date();
  const todayKey = formatLocalDateKey(today);

  const dbData = localStorage.getItem('streakData') ? JSON.parse(localStorage.getItem('streakData')) : { streakCount: 0, lastStreakDate: null };
  const lastKey = dbData.lastStreakDate;
  let streak = dbData.streakCount || 0;

  if (lastKey === todayKey) {
    return streak;
  }

  if (lastKey) {
    const [year, month, day] = lastKey.split('-').map(Number);
    const lastDate = new Date(year, month - 1, day);
    const diffDays = Math.round((new Date(today.getFullYear(), today.getMonth(), today.getDate()) - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak += 1;
    } else {
      streak = 1;
    }
  } else {
    streak = 1;
  }

  localStorage.setItem('streakData', JSON.stringify({ streakCount: streak, lastStreakDate: todayKey }));

  if (typeof window.saveStreakToDB === 'function') {
    window.saveStreakToDB(studentId, streak, todayKey).catch(e => console.error('Streak save error:', e));
  }
  return streak;
}

window.computeStreak = computeStreak;

// Инициализация синхронизации: сравниваем remote и local и приводим к актуальному
async function initStreakSync(studentId = 'student1') {
  try {
    if (typeof window.getStreakFromDB !== 'function' || typeof window.saveStreakToDB !== 'function') return;

    const local = localStorage.getItem('streakData') ? JSON.parse(localStorage.getItem('streakData')) : null;
    const remote = await window.getStreakFromDB(studentId);

    if (!local && remote && remote.lastStreakDate) {
      localStorage.setItem('streakData', JSON.stringify({ streakCount: remote.streakCount || 0, lastStreakDate: remote.lastStreakDate }));
      window.dispatchEvent(new Event('streak-synced'));
      return;
    }

    if (local && remote && remote.lastStreakDate) {
      const localDate = new Date(local.lastStreakDate);
      const remoteDate = new Date(remote.lastStreakDate);

      if (remoteDate > localDate || (remoteDate.getTime() === localDate.getTime() && remote.streakCount !== local.streakCount)) {
        localStorage.setItem('streakData', JSON.stringify({ streakCount: remote.streakCount || 0, lastStreakDate: remote.lastStreakDate }));
        window.dispatchEvent(new Event('streak-synced'));
        if (typeof window.updateStreakUI === 'function') window.updateStreakUI();
      } else if (localDate > remoteDate) {
        await window.saveStreakToDB(studentId, local.streakCount || 0, local.lastStreakDate || null);
        window.dispatchEvent(new Event('streak-synced'));
        if (typeof window.updateStreakUI === 'function') window.updateStreakUI();
      }
    } else if (local && (!remote || !remote.lastStreakDate)) {
      await window.saveStreakToDB(studentId, local.streakCount || 0, local.lastStreakDate || null);
      window.dispatchEvent(new Event('streak-synced'));
    }
  } catch (err) {
    console.error('Error syncing streak with Firebase (init):', err);
  }
}

function listenToStreakChanges(studentId = 'student1') {
  const streakRef = ref(db, `streak/${studentId}`);
  onValue(streakRef, (snapshot) => {
    if (!snapshot.exists()) return;

    const data = snapshot.val();
    const remoteCount = Number(data.streakCount || 0);
    const remoteDate = data.lastStreakDate || null;
    const local = localStorage.getItem('streakData') ? JSON.parse(localStorage.getItem('streakData')) : null;

    const shouldUpdateLocal = !local || local.lastStreakDate !== remoteDate || local.streakCount !== remoteCount;
    if (shouldUpdateLocal) {
      localStorage.setItem('streakData', JSON.stringify({ streakCount: remoteCount, lastStreakDate: remoteDate }));
      window.dispatchEvent(new Event('streak-synced'));
      if (typeof window.updateStreakUI === 'function') window.updateStreakUI();
    }
  }, (err) => {
    console.error('Realtime streak listener error:', err);
  });
}

// UI: обновление отображения стрика и DOM-ready handler
function domReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}

function updateStreakUI() {
  const streak = (typeof window.computeStreak === 'function')
    ? window.computeStreak()
    : (function() { const local = localStorage.getItem('streakData') ? JSON.parse(localStorage.getItem('streakData')) : { streakCount: 0 }; return local.streakCount || 0; })();
  const displayCount = Math.min(streak, 365);

  document.querySelectorAll('.streak-modal span').forEach((badge) => {
    badge.textContent = String(displayCount);
  });

  document.querySelectorAll('.streak-content-prnt').forEach((container) => {
    const cards = Array.from(container.querySelectorAll('.streak-content-card'));
    if (!cards.length) return;

    const jsDay = new Date().getDay();
    const todayIndex = jsDay === 0 ? 6 : jsDay - 1;
    const activeCount = Math.min(streak, todayIndex + 1);
    const activeIndexes = new Set();

    for (let i = 0; i < activeCount; i += 1) {
      const index = todayIndex - i;
      if (index < 0) break;
      activeIndexes.add(index);
    }

    cards.forEach((card, index) => {
      const label = card.querySelector('span')?.textContent || '';
      card.innerHTML = '';

      if (activeIndexes.has(index)) {
        const img = document.createElement('img');
        img.width = 48;
        img.height = 48;
        img.src = './imgs/strike.svg';
        img.alt = 'streak';
        card.appendChild(img);
      } else {
        const dot = document.createElement('div');
        dot.className = 'w-6 h-6 rounded-full md:w-12 md:h-12';
        dot.style.backgroundColor = '#EEEEEE';
        card.appendChild(dot);
      }

      const text = document.createElement('span');
      text.textContent = label;
      card.appendChild(text);
    });
  });
}

window.updateStreakUI = updateStreakUI;

// установить отступ для main и обновить UI когда DOM готов
domReady(() => {
  const navbar = document.querySelector('.navbar');
  const main = document.querySelector('main');
  if (navbar && main) {
    const navHeight = navbar.offsetHeight;
    main.style.paddingTop = navHeight + "px";
  }
  updateStreakUI();
});

// Запускаем синхронизацию при загрузке скрипта
initStreakSync();
listenToStreakChanges('student1');
// Сигнализируем, что Firebase-утилиты готовы
window.dispatchEvent(new Event('firebase-ready'));
