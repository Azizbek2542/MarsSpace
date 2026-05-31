document.addEventListener('DOMContentLoaded', () => {
  const closeLimitBtn = document.querySelector('.lmt-hdr__headerbtn');
  const limitModal = document.querySelector('.limit-modal');
  const lmtoverlay = document.querySelector('.limit-overlay');
  const openprembtn = document.querySelector('.lmt-footer .el-button');
  const marsianaBtnTypingButton = document.querySelector('.marsiana-btn-typing button');

  if (closeLimitBtn && limitModal && lmtoverlay) {
    closeLimitBtn.addEventListener('click', () => {
      limitModal.classList.add('active');
      lmtoverlay.classList.add('active');
      document.body.style.overflowY = 'auto';
    });
    lmtoverlay.addEventListener('click', () => {
      limitModal.classList.add('active');
      lmtoverlay.classList.add('active');
      PremiumModal.classList.remove('active');
      MarsianaModal.classList.remove('active');   
      document.body.style.overflowY = 'auto';   
    });
    openprembtn.addEventListener('click', () => {
        PremiumModal.classList.add('active');
    });
    marsianaBtnTypingButton.addEventListener('click', () => {
        MarsianaModal.classList.add('active');
    });
  } else {
    if (!closeLimitBtn) console.warn('typing.js: .lmt-hdr__headerbtn not found');
    if (!limitModal) console.warn('typing.js: .limit-modal not found');
    if (!lmtoverlay) console.warn('typing.js: .limit-overlay not found');
  }
});


document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'q') {
    window.location.href = 'main-page.html'; 
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'enter') {
    const limitModal = document.querySelector('.limit-modal');
    const lmtoverlay = document.querySelector('.limit-overlay');
    limitModal.style.display = 'block';
    lmtoverlay.style.display = 'block';
  }
});


  const streakModal = document.querySelector('.streak-modal');
  const streakContent = document.querySelector('.streak-content');
  const streakArrow = document.querySelector('.streak-content__arrow');
  const CoinArrow = document.querySelector('.Coin__arrow');
  const amountCardCoin = document.querySelector('.amount-card.coin');
  const amountCardFlash = document.querySelectorAll('.amount-card.flash');
  const CoinModal = document.querySelector('.CoinModal');
  const PremiumModal = document.querySelector('.Premium-modal');
  const closePremium = document.querySelector('.close-prem-btn');
  const subscribeBtn = document.querySelector('.subscribe-btn');
  const overlay = document.querySelector('.overlay');
  const featuresContainer = document.querySelector('.features-container');
  const notificationsModal = document.querySelector('.notifications-modal');
  const notificationBell = document.querySelector('.notification-bell');
  const NotificationsArrow = document.querySelector('.Notifications__arrow');
  const profileModal = document.querySelector('.profile-modal');
  const profileArrow = document.querySelector('.profile__arrow');
  const profile = document.querySelector('.profile.modal.content');
  const MediaStreakModal = document.querySelector('.profile-modal .streak-modal');
  const MediastreakContent = document.querySelector('.profile-modal .streak-content');
  const MediaStreakArrow = document.querySelector('.profile-modal .streak-content__arrow');
  const MediaAmountCardCoin = document.querySelector('.profile-modal .amount-card.coin');
  const MediaCoinModal = document.querySelector('.profile-modal .CoinModal');
  const MediaCoinArrow = document.querySelector('.profile-modal .Coin__arrow');
  const SelectLang = document.querySelector('.select-language');
  const LangModal = document.querySelector('.language-selection-container-modal');
  const closeLangModal = document.querySelector('.close-lang-slc-btn');
  const main = document.querySelector('main');
  const navbar = document.querySelector('.navbar');
  const StudentHeroWrapper = document.querySelector('.student-hero-wrapper');
  const closeMarsianaBtn = document.querySelector('.close-marsiana-btn');
  const MarsianaModal = document.querySelector('.marsiana-chat-modal');
  const marsianaCircleBtn = document.querySelector('.marsiana-circle-btn');
  const MediaCoinsModalOverlay =document.querySelector('.CoinModals-overlay');
  const SpacePremiumBtn = document.querySelector('.SpacePremium-btn');
  const premiumInfoModal = document.querySelector('.premium-info-modal');
  const premiumInfoArrow = document.querySelector('.premium-info-modal__arrow');
  const PremiumFeaturesOpener = document.querySelector('.premium-features-opener');
  const TypingPremOpener = document.querySelector('.typing-prem-opener');


  TypingPremOpener.addEventListener('click', () => {
  PremiumModal.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  });

  marsianaCircleBtn.addEventListener('click', () => {
    MarsianaModal.classList.add('active');
  });

  closeMarsianaBtn.addEventListener('click', () => {
    MarsianaModal.classList.remove('active');
  });

  // window.addEventListener("DOMContentLoaded", () => {

  //   if (navbar && main) {
  //     const navHeight = navbar.offsetHeight;
  //     main.style.paddingTop = navHeight + "px";
  //   }
  // });

  function formatLocalDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function domReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  domReady(() => {
    if (navbar && main) {
      const navHeight = navbar.offsetHeight;
      main.style.paddingTop = navHeight + "px";
    }

    updateStreakUI();
  });

  function computeStreak() {
    const today = new Date();
    const todayKey = formatLocalDateKey(today);
    const lastKey = localStorage.getItem('lastStreakDate');
    let streak = Number(localStorage.getItem('streakCount') || 0);

    if (lastKey === todayKey) {
      return streak;
    }

    if (lastKey) {
      const [year, month, day] = lastKey.split('-').map(Number);
      const lastDate = new Date(year, month - 1, day);
      const diffDays = Math.round((new Date(today.getFullYear(), today.getMonth(), today.getDate()) - lastDate) / (1000 * 60 * 60 * 24));

      // если был разрыв хотя бы на один день — сбросаем streak на 1
      if (diffDays === 1) {
        streak += 1;
      } else {
        streak = 1;
      }
    } else {
      streak = 1;
    }

    localStorage.setItem('streakCount', String(streak));
    localStorage.setItem('lastStreakDate', todayKey);
    return streak;
  }

  function updateStreakUI() {
    const streak = computeStreak();
    const displayCount = Math.min(streak, 365);

    document.querySelectorAll('.streak-modal span').forEach((badge) => {
      badge.textContent = String(displayCount);
    });

    document.querySelectorAll('.streak-content-prnt').forEach((container) => {
      const cards = Array.from(container.querySelectorAll('.streak-content-card'));
      if (!cards.length) return;

      const jsDay = new Date().getDay();
      const todayIndex = jsDay === 0 ? 6 : jsDay - 1;
      const activeCount = Math.min(streak, cards.length);
      const activeIndexes = new Set();

      for (let i = 0; i < activeCount; i += 1) {
        activeIndexes.add((todayIndex - i + cards.length) % cards.length);
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


  function positionStreakContent() {
    if (!streakModal || !streakContent || !streakArrow || !MediaStreakModal || !MediastreakContent ||!MediaStreakArrow) return;

    const mediaModalRect = MediaStreakModal.getBoundingClientRect();
    const modalRect = streakModal.getBoundingClientRect();
    const contentWidth = streakContent.offsetWidth;
    const MediacontentWidth = MediastreakContent.offsetWidth;
    const MediacontentHeight = MediastreakContent.offsetHeight;


    streakContent.style.top = modalRect.bottom + 10 + "px";

    streakContent.style.left =
    modalRect.left + streakModal.offsetWidth / 2 - contentWidth / 2 + "px";

  if (window.matchMedia("(max-width: 444px)").matches) {
    MediastreakContent.style.left =
    MediaStreakModal.style.left = '0px'
   }

    streakArrow.style.left =
    streakContent.offsetWidth / 2 - streakArrow.offsetWidth / 2 + "px";

    MediaStreakArrow.style.left =
    MediastreakContent.offsetWidth / 2 - MediaStreakArrow.offsetWidth / 2 + "px";

    if (window.innerHeight > 850) {
    // обычное положение
    MediastreakContent.style.position = "absolute";
    MediastreakContent.style.top = mediaModalRect.bottom - 62.5 + "px";
    MediastreakContent.style.left = "-103px";
  } else {
    // центрируем на маленьких экранах
    MediastreakContent.style.position = "fixed";
    MediastreakContent.style.top =
      (window.innerHeight - MediacontentHeight) / 2 + "px";
    MediastreakContent.style.left =
      (window.innerWidth - MediacontentWidth) / 2 + "px";
    MediaStreakModal.addEventListener('click', () => {
      MediaCoinsModalOverlay.classList.add('active');
    });
  }
  }

  function positionAmountContent() {
    if (!amountCardCoin || !CoinModal|| !CoinArrow || !MediaAmountCardCoin || !MediaCoinModal || !MediaCoinArrow) return;

    const modalRect = amountCardCoin.getBoundingClientRect();
    const contentWidth = CoinModal.offsetWidth;
    const mediaModalRect = MediaAmountCardCoin.getBoundingClientRect();
    const MediacontentWidth = MediaCoinModal.offsetWidth;
    const MediacontentHeight = MediaCoinModal.offsetHeight;
    const contentHeight = CoinModal.offsetHeight;
    const windowHeight = window.innerHeight;
    const spaceBelow = windowHeight - modalRect.bottom;
    const spaceAbove = modalRect.top;

    if (spaceBelow > contentHeight + 20) {
    CoinModal.style.top = modalRect.bottom + 10 + "px";
  } 
  // Если не хватает — показываем сверху
  else if (spaceAbove > contentHeight + 20) {
    CoinModal.style.top = modalRect.top - contentHeight - 10 + "px";
  } 
  // Если вообще не помещается — “впихиваем” внутри окна
  else {
    const safeTop = Math.max(10, (windowHeight - contentHeight) / 2);
    CoinModal.style.top = safeTop + "px";
  }

    MediaCoinModal.style.top = mediaModalRect.bottom + -60 + "px";

    CoinModal.style.left =
      modalRect.left + amountCardCoin.offsetWidth / 2 - contentWidth / 2 + "px";

      MediaCoinModal.style.left =
      MediaAmountCardCoin.style.left = '0px'
  if (window.matchMedia("(min-width: 840px)").matches) {
    MediaCoinModal.style.display = 'none';
  }else {
    MediaCoinModal.style.display = 'flex';
  }

  if (window.innerHeight >= 850) {
    MediaCoinModal.style.top = mediaModalRect.bottom - 60 + "px";
    MediaCoinModal.style.left = "0px";
  } else {
    // если экран меньше 768px по высоте — центрируем по экрану
    MediaCoinModal.style.top =
      (window.innerHeight - MediacontentHeight) / 2 + "px";
    MediaCoinModal.style.left =
      (window.innerWidth - MediacontentWidth) / 2 + "px";
    MediaCoinModal.style.position = "fixed"; // чтобы центрирование было относительно окна
    MediaAmountCardCoin.addEventListener('click', () => {
      MediaCoinsModalOverlay.classList.add('active');
    });
    MediaCoinsModalOverlay.addEventListener('click', () => {
      MediaCoinsModalOverlay.classList.remove('active');
    });
  }

    CoinArrow.style.left =
      CoinModal.offsetWidth / 2 - CoinArrow.offsetWidth / 2 + "px";

      MediaCoinArrow.style.left =
      MediaCoinModal.offsetWidth / 2 - MediaCoinArrow.offsetWidth / 2 + "px";
  }

  function positionNotifications() {
  if (! notificationBell || !notificationsModal || !NotificationsArrow) return;

  if (window.matchMedia("(max-width: 840px)").matches) {

  const modalRect = notificationBell.getBoundingClientRect();
  const contentWidth = notificationsModal.offsetWidth;
  const arrowWidth = NotificationsArrow.offsetWidth;

  notificationsModal.style.top = modalRect.bottom + 15 + "px";
  notificationsModal.style.left =
    modalRect.left + notificationBell.offsetWidth - contentWidth + "px";

  NotificationsArrow.style.left =
    contentWidth - notificationBell.offsetWidth / 2 - arrowWidth / 2 + "px";
  }else {
    if (!notificationBell || !notificationsModal || !NotificationsArrow) return;

    const modalRect = notificationBell.getBoundingClientRect();
    const contentWidth = notificationsModal.offsetWidth;

    notificationsModal.style.top = modalRect.bottom + 20 + "px";

    notificationsModal.style.left =
      modalRect.left + notificationBell.offsetWidth / 2 - contentWidth / 2 + "px";

    NotificationsArrow.style.left =
      notificationsModal.offsetWidth / 2 - NotificationsArrow.offsetWidth / 2 + "px";
  }
  };

  function positionProfile() {
  if (!profileModal || !profile || !profileArrow) return;

  const modalRect = profile.getBoundingClientRect();
  const contentWidth = profileModal.offsetWidth;
  const arrowWidth = profileArrow.offsetWidth;

  profileModal.style.top = modalRect.bottom + 10 + "px";
  profileModal.style.left =
    modalRect.left + profile.offsetWidth - contentWidth + "px";

  profileArrow.style.left =
    contentWidth - profile.offsetWidth / 2 - arrowWidth / 2 + "px";
}

function positionPremiumInfoModal() {
  if (!premiumInfoModal || !SpacePremiumBtn || !premiumInfoArrow) return;

  const btnRect = SpacePremiumBtn.getBoundingClientRect();
  const modalWidth = premiumInfoModal.offsetWidth;
  const arrowWidth = premiumInfoArrow.offsetWidth;
  const btnWidth = btnRect.width;

  const screenHeight = window.innerHeight;
  const screenWidth = window.innerWidth;

  // 📱 Маленький экран (ниже 530px) - центр только по горизонтали
  if (screenWidth < 550) {
    const centerX = (screenWidth - modalWidth) / 2;

    premiumInfoModal.style.removeProperty('inset');
    premiumInfoModal.style.position = "fixed";
    premiumInfoModal.style.top = btnRect.bottom + 10 + "px";
    premiumInfoModal.style.left = centerX + "px";
    premiumInfoModal.style.right = "auto";
    premiumInfoModal.style.bottom = "auto";

    // Стрелка указывает на центр кнопки
    const btnCenterX = btnRect.left + btnWidth / 2;
    premiumInfoArrow.style.left =
      (btnCenterX - centerX) - arrowWidth / 2 + "px";

    return;
  }

  // 🖥 Обычный режим (на больших экранах)
  premiumInfoModal.style.removeProperty('inset');
  premiumInfoModal.style.position = "fixed";
  premiumInfoModal.style.top = btnRect.bottom + 10 + "px";
  premiumInfoModal.style.left = btnRect.left + btnWidth - modalWidth + "px";
  premiumInfoModal.style.right = "auto";
  premiumInfoModal.style.bottom = "auto";

  premiumInfoArrow.style.left =
    modalWidth - btnWidth / 2 - arrowWidth / 2 + "px";
}

SpacePremiumBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    CoinModal.classList.remove('active');
    streakContent.classList.remove('active');
    notificationsModal.classList.remove('active');
    profileModal.classList.remove('active');
    MediastreakContent.classList.remove('active');
    MediaCoinModal.classList.remove('active');
    premiumInfoModal.classList.toggle('active');
    if (premiumInfoModal.classList.contains('active')) {
      positionPremiumInfoModal();
    }
  });


  notificationBell.addEventListener('click', (e) => {
    e.stopPropagation();
    CoinModal.classList.remove('active');
    streakContent.classList.remove('active');
    profileModal.classList.remove('active');
    MediastreakContent.classList.remove('active');
    MediaCoinModal.classList.remove('active');
    premiumInfoModal.classList.remove('active');
    notificationsModal.classList.toggle('active');
    if (notificationsModal.classList.contains('active')) {
      positionNotifications();
    }
  });

  profile.addEventListener('click', (e) => {
    e.stopPropagation();
    CoinModal.classList.remove('active');
    streakContent.classList.remove('active');
    notificationsModal.classList.remove('active');
    premiumInfoModal.classList.remove('active');
    profileModal.classList.toggle('active');
    if (profileModal.classList.contains('active')) {
      positionProfile();
    }
  });

  streakModal.addEventListener('click', (e) => {
    e.stopPropagation();
    CoinModal.classList.remove('active');
    notificationsModal.classList.remove('active');
    profileModal.classList.remove('active');
    premiumInfoModal.classList.remove('active');
    streakContent.classList.toggle('active');
    if (streakContent.classList.contains('active')) {
      positionStreakContent();
    }
  });

  MediaStreakModal.addEventListener('click', (e) => {
    e.stopPropagation();
    CoinModal.classList.remove('active');
    notificationsModal.classList.remove('active');
    MediaCoinModal.classList.remove('active');
    premiumInfoModal.classList.remove('active');
    MediastreakContent.classList.toggle('active');
    if (MediastreakContent.classList.contains('active')) {
      positionStreakContent();
    }
  });

  window.addEventListener('click', (e) => {
    if (
      streakContent.classList.contains('active') &&
      !streakContent.contains(e.target) &&
      !streakModal.contains(e.target)
    ) {
      streakContent.classList.remove('active');
    }
  });

  window.addEventListener('click', (e) => {
    if (
      MediastreakContent.classList.contains('active') &&
      !MediastreakContent.contains(e.target) &&
      !MediaStreakModal.contains(e.target)
    ) {
      MediastreakContent.classList.remove('active');
    }
  });

  window.addEventListener('click', (e) => {
  if (
    profileModal.classList.contains('active') &&
    !profileModal.contains(e.target) &&
    !profile.contains(e.target) &&
    (!LangModal || !LangModal.contains(e.target)) &&
    (!overlay || !overlay.contains(e.target))
  ) {
    profileModal.classList.remove('active');
  }
});

window.addEventListener('click', (e) => {
  if (
    premiumInfoModal.classList.contains('active') &&
    !premiumInfoModal.contains(e.target) &&
    !SpacePremiumBtn.contains(e.target)
  ) {
    premiumInfoModal.classList.remove('active');
  }
});



  amountCardCoin.addEventListener('click', (e) => {
    e.stopPropagation();
    streakContent.classList.remove('active');
    notificationsModal.classList.remove('active');  
    profileModal.classList.remove('active');
    premiumInfoModal.classList.remove('active');
    CoinModal.classList.toggle('active');
    if (CoinModal.classList.contains('active')) {
      positionAmountContent();
    }
  });

  MediaAmountCardCoin.addEventListener('click', (e) => {
    e.stopPropagation();
    streakContent.classList.remove('active');
    notificationsModal.classList.remove('active');  
    MediastreakContent.classList.remove('active');
    premiumInfoModal.classList.remove('active');
    MediaCoinModal.classList.toggle('active');
    if (MediaCoinModal.classList.contains('active')) {
      positionAmountContent();
    }
  });

  window.addEventListener('click', (e) => {
    if (
      CoinModal.classList.contains('active') &&
      !CoinModal.contains(e.target) &&
      !amountCardCoin.contains(e.target)
    ) {
      CoinModal.classList.remove('active');
    }
  });

  window.addEventListener('click', (e) => {
    if (
      MediaCoinModal.classList.contains('active') &&
      !MediaCoinModal.contains(e.target) &&
      !MediaAmountCardCoin.contains(e.target)
    ) {
      MediaCoinModal.classList.remove('active');
    }
  });

  window.addEventListener('click', (e) => {
    if (
      notificationsModal.classList.contains('active') &&
      !notificationsModal.contains(e.target) &&
      !notificationBell.contains(e.target)
    ) {
      notificationsModal.classList.remove('active');
    }
  });

  window.addEventListener('resize', positionStreakContent);
  window.addEventListener('load', positionStreakContent);
  window.addEventListener('resize', positionAmountContent);
  window.addEventListener('load', positionAmountContent);
  window.addEventListener('resize', positionNotifications);
  window.addEventListener('load', positionNotifications);
  window.addEventListener('resize', positionProfile);
  window.addEventListener('load', positionProfile);
  window.addEventListener('resize', positionPremiumInfoModal);
  window.addEventListener('load', positionPremiumInfoModal);

  amountCardFlash.forEach((flash) => {
  flash.addEventListener('click', () => {
    window.location.href = './xp-rating-page.html';
  });
});

PremiumFeaturesOpener.addEventListener('click', () => {
  PremiumModal.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
});

subscribeBtn.addEventListener('click', () => {
  PremiumModal.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
});

SelectLang.addEventListener('click', () => {
  LangModal.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
});

closePremium.addEventListener('click', () => {
  PremiumModal.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
});

closeLangModal.addEventListener('click', () => {
  LangModal.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
});

overlay.addEventListener('click', () => {
  PremiumModal.classList.remove('active');
  overlay.classList.remove('active');
  LangModal.classList.remove('active');
  document.body.style.overflow = '';
});

featuresContainer.addEventListener('scroll', function() {
  if (featuresContainer.scrollTop > 10) {
    featuresContainer.classList.add('scrolled');
  } else {
    featuresContainer.classList.remove('scrolled');
  }
});


const wrapper = document.querySelector('.sparkle-wrapper');

function createSparkle() {
  const sparkle = document.createElement('span');
  sparkle.classList.add('sparkle');

  sparkle.style.top = Math.random() * 100 + '%';
  sparkle.style.left = Math.random() * 100 + '%';
  
  const size = 8 + Math.random() * 20;
  sparkle.style.width = size + 'px';
  sparkle.style.height = size + 'px';
  sparkle.style.animationDuration = 2 + Math.random() * 3 + 's';
  sparkle.style.animationDelay = Math.random() * 3 + 's';
  
  wrapper.appendChild(sparkle);
  
  setTimeout(() => sparkle.remove(), 7000);
}

setInterval(createSparkle, 100);


const dfCoinBtnModal = document.querySelector('.default-notification-of-coin');
const dfCoinBtnModalOverlay = document.querySelector('.dfCoinBtnModalOverlay');
const ClosedfCoinBtn = document.querySelector('.close-df-coin-btn');
const ClosedfCoinBtn2 = document.querySelector('.close-df-coin-btn-2');


ClosedfCoinBtn.addEventListener('click', () => {
  dfCoinBtnModal.style.display = 'none';
  dfCoinBtnModalOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
});

ClosedfCoinBtn2.addEventListener('click', () => {
  dfCoinBtnModal.style.display = 'none';
  dfCoinBtnModalOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
});

if (getComputedStyle(dfCoinBtnModal).display === 'flex') {
  dfCoinBtnModalOverlay.classList.add('active');
}

const container = document.getElementById('confettiBox');
const colors = ['#f472b6', '#facc15', '#38bdf8', '#4ade80', '#a78bfa', '#fb7185'];
function shootConfetti() {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    // случайное направление выстрела
    const angle = Math.random() * 1 * Math.PI;
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
// выстрел при загрузке
shootConfetti();


import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, get, runTransaction, push, set } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

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

const studentId = "student1"; // только один ученик

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


// // --- Утилитарные функции для премиума ---
async function savePremiumToDB(studentId, untilTimestamp) {
  try {
    await set(ref(db, `premium/${studentId}`), {
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
    await set(ref(db, `premium/${studentId}`), {
      isPremium: false,
      premiumUntil: 0
    });
    console.log("Premium removed in DB for", studentId);
  } catch (err) {
    console.error("Failed to remove premium from DB:", err);
  }
}

const handleEnterPremium = (event) => {
  if (event.key.toLowerCase() === 'enter') {
    window.open('https://monkeytype.com/', '_blank');
  }
};

const handleEnterLimit = (event) => {
  if (event.key.toLowerCase() === 'enter') {
    const limitModal = document.querySelector('.limit-modal');
    const lmtoverlay = document.querySelector('.limit-overlay');
    limitModal.style.display = 'block';
    lmtoverlay.style.display = 'block';
  }
};

// --- UI включение/выключение (адаптируй селекторы под свой DOM) ---
function enablePremiumUI() {
  const premiumFooter = document.querySelector('.premium-footer');
  const SendPostBtn = document.getElementById('sendPostBtn');
  const elButtonLarge = document.querySelector('.el-button--large');
  const TopTenRankRating = document.querySelector('.top-ten-rank-rating');
  const topTenRatingSpinner = document.querySelector('.topTenRatingSpinner');

  if (premiumFooter) premiumFooter.style.display = 'none';
  topTenRatingSpinner.style.display = 'none';
  TopTenRankRating.style.display = 'block'; 

  // Удаляем обработчик лимита и добавляем премиум
  document.removeEventListener('keydown', handleEnterLimit);
  document.addEventListener('keydown', handleEnterPremium);

  if (SendPostBtn) SendPostBtn.style.display = 'block';
  if (elButtonLarge) elButtonLarge.style.display = 'none';

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

  if (subscribeBtn) {
    subscribeBtn.className = 'flex items-center justify-center gap-2 px-4 py-3 text-black text-[20px] font-sans font-[600] el-tooltip__trigger el-tooltip__trigger cursor-pointer';
    subscribeBtn.innerHTML = '<i class="text-goldIcon fa-solid fa-crown" style="color: rgb(255 215 0);"></i> Premium';
  }
}

function disablePremiumUI() {
  const premiumFooter = document.querySelector('.premium-footer');
  const SendPostBtn = document.getElementById('sendPostBtn');
  const elButtonLarge = document.querySelector('.el-button--large');
  const badges = document.querySelectorAll('.premium-badge');
  const TopTenRankRating = document.querySelector('.top-ten-rank-rating');
  const topTenRatingSpinner = document.querySelector('.topTenRatingSpinner');

  if (premiumFooter) premiumFooter.style.display = 'block';
  TopTenRankRating.style.display = 'none';
  topTenRatingSpinner.style.display = 'block';
  
  // Удаляем обработчик премиума и добавляем лимит
  document.removeEventListener('keydown', handleEnterPremium);
  document.addEventListener('keydown', handleEnterLimit);

  if (SendPostBtn) SendPostBtn.style.display = 'none';
  if (elButtonLarge) elButtonLarge.style.display = 'block';

  if (subscribeBtn) {
    subscribeBtn.className = 'subscribe-btn';
    subscribeBtn.innerHTML = 'Obuna bo\'ling <span class="shine"></span>';
  }

  badges.forEach(b => b.remove());
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
async function checkPremiumStatusOnLoad(studentId) {
  try {
    const snap = await get(ref(db, `premium/${studentId}`));
    const data = snap.exists() ? snap.val() : null;
    if (!data || !data.isPremium) {
      // нет премиума
      disablePremiumUI();
      return;
    }

    const until = Number(data.premiumUntil) || 0;
    if (until > Date.now()) {
      // премиум действителен
      enablePremiumUI();
      schedulePremiumExpiry(studentId, until);
    } else {
      // премиум просрочен
      disablePremiumUI();
      // синхронизируем БД
      await removePremiumFromDB(studentId);
    }
  } catch (err) {
    console.error("Error checking premium status:", err);
  }
}


// --- Функция управления модалкой лимита ---
async function checkPremiumAndLimitModal() {
  const limitModal = document.querySelector('.limit-modal');
  const lmtoverlay = document.querySelector('.limit-overlay');
  const closeLimitBtn = document.querySelector('.lmt-hdr__headerbtn');
  closeLimitBtn.addEventListener('click', () => {
      limitModal.style.display = 'none';
      lmtoverlay.style.display = 'none';
    });
    lmtoverlay.addEventListener('click', () => {
      limitModal.style.display = 'none';
      lmtoverlay.style.display = 'none'; 
    });

  try {
    const snap = await get(ref(db, `premium/${studentId}`));
    const data = snap.exists() ? snap.val() : null;
    const now = Date.now();

    if (data && data.isPremium && data.premiumUntil > now) {
      // премиум активен — скрываем модалку
      if (limitModal) limitModal.classList.remove('active');
      if (lmtoverlay) lmtoverlay.classList.remove('active');

      // планируем показать после окончания премиума
      const msLeft = data.premiumUntil - now;
      setTimeout(() => {
        if (limitModal) limitModal.classList.add('active');
        if (lmtoverlay) lmtoverlay.classList.add('active');
      }, msLeft);
    } else {
      // премиум истёк или нет — показываем модалку
      if (limitModal) limitModal.classList.add('active');
      if (lmtoverlay) lmtoverlay.classList.add('active');

      // если в БД ещё остался премиум — убираем его
      if (data && data.isPremium) {
        await removePremiumFromDB(studentId);
      }
    }
  } catch (err) {
    console.error("Error checking premium for limit modal:", err);
    if (limitModal) limitModal.classList.add('active');
    if (lmtoverlay) lmtoverlay.classList.add('active');
  }
}

const GetPremiumBtn = document.querySelector('.get-premium-btn');

// --- Кнопка покупки премиума ---
GetPremiumBtn.addEventListener('click', async () => {
  const price = 299;
  const totalCoins = await getCoins();

  const premiumFooter = document.querySelector('.premium-footer');
  const SendPostBtn = document.getElementById('sendPostBtn');
  const elButtonLarge = document.querySelector('.el-button--large');
  const premiumRewardModal = document.querySelector('.premium-reward-modal');
  const closePremiumRewardBtn = document.querySelectorAll('.close-premium-reward-btn');
  const doubleoverlay2 = document.querySelector('.post-double-overlay');
  const PostModal = document.querySelector('.post-modal');
  const Postoverlay = document.querySelector('.post-overlay');
  const TopTenRankRating = document.querySelector('.top-ten-rank-rating');
  const topTenRatingSpinner = document.querySelector('.topTenRatingSpinner');

  if (totalCoins < price) {
    return;
  }

  // // сохраняем премиум в БД (например 10 секунд для теста)
  const durationMs = 40000; // позже ставь 30*24*60*60*1000
  const untilTimestamp = Date.now() + durationMs;

  const saved = await savePremiumToDB(studentId, untilTimestamp);
  if (!saved) {
    alert("Ошибка при сохранении премиума. Попробуйте ещё раз.");
    return;
  }

  // включаем UI премиума
  enablePremiumUI();
  schedulePremiumExpiry(studentId, untilTimestamp);

  // скрываем лимитную модалку сразу после покупки
  const limitModal = document.querySelector('.limit-modal');
  const lmtoverlay = document.querySelector('.limit-overlay');
  if (limitModal) limitModal.classList.remove('active');
  if (lmtoverlay) lmtoverlay.classList.remove('active');

  // показываем лимитку после окончания премиума автоматически
  setTimeout(() => {
    if (limitModal) limitModal.classList.add('active');
    if (lmtoverlay) lmtoverlay.classList.add('active');
  }, durationMs);

  // остальной UI
  TopTenRankRating.style.display = 'block';
  topTenRatingSpinner.style.display = 'none';
  premiumFooter.style.display = 'none';
  if(SendPostBtn) SendPostBtn.style.display = 'block';
  if(elButtonLarge) elButtonLarge.style.display = 'none';
  document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'enter') {
    window.open('https://monkeytype.com/', '_blank');
    }
  });

  // UI reward modal и закрытие других оверлеев
  premiumRewardModal.classList.add('active');
  closePremiumRewardBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      premiumRewardModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });

  const PremiumModal = document.querySelector('.Premium-modal');
  if (PremiumModal) PremiumModal.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  if (doubleoverlay) doubleoverlay.classList.remove('active');
   if(doubleoverlay2) doubleoverlay2.classList.remove('active');
  if(PostModal) PostModal.classList.remove('active');
  if(Postoverlay) Postoverlay.classList.remove('active');
  document.body.style.overflow = 'hidden';
});

// --- Проверка при загрузке страницы ---
checkPremiumStatusOnLoad(studentId); // твой существующий код для UI премиума
checkPremiumAndLimitModal();         // новый вызов для лимитной модалки
