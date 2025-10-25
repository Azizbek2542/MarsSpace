document.addEventListener('DOMContentLoaded', () => {
  const coursesCont = document.querySelector('.courses-cont');

  if (navbar && coursesCont) {
    const navHeight = navbar.offsetHeight;
    coursesCont.style.paddingTop = navHeight + 'px';
  } else {
    if (!navbar) console.warn('courses.js: navbar element not found (tried .navbar)');
    if (!coursesCont) console.warn('courses.js: .courses-cont element not found');
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

  marsianaCircleBtn.addEventListener('click', () => {
    MarsianaModal.classList.add('active');
  });

  closeMarsianaBtn.addEventListener('click', () => {
    MarsianaModal.classList.remove('active');
  });

  window.addEventListener("DOMContentLoaded", () => {

    if (navbar && main) {
      const navHeight = navbar.offsetHeight;
      main.style.paddingTop = navHeight + "px";
    }
  });


  function positionStreakContent() {
    if (!streakModal || !streakContent || !streakArrow || !MediaStreakModal || !MediastreakContent ||!MediaStreakArrow) return;

    const mediaModalRect = MediaStreakModal.getBoundingClientRect();
    const modalRect = streakModal.getBoundingClientRect();
    const contentWidth = streakContent.offsetWidth;
    const MediacontentWidth = MediastreakContent.offsetWidth;

    streakContent.style.top = modalRect.bottom + 10 + "px";
    MediastreakContent.style.top = mediaModalRect.bottom + -62.5 + "px";

    streakContent.style.left =
    modalRect.left + streakModal.offsetWidth / 2 - contentWidth / 2 + "px";

    MediastreakContent.style.left =
    MediaStreakModal.style.left = '-103px'

  if (window.matchMedia("(max-width: 444px)").matches) {
    MediastreakContent.style.left =
    MediaStreakModal.style.left = '0px'
   }

    streakArrow.style.left =
    streakContent.offsetWidth / 2 - streakArrow.offsetWidth / 2 + "px";

    MediaStreakArrow.style.left =
    MediastreakContent.offsetWidth / 2 - MediaStreakArrow.offsetWidth / 2 + "px";
  }

  function positionAmountContent() {
    if (!amountCardCoin || !CoinModal|| !CoinArrow || !MediaAmountCardCoin || !MediaCoinModal || !MediaCoinArrow) return;

    const modalRect = amountCardCoin.getBoundingClientRect();
    const contentWidth = CoinModal.offsetWidth;
    const mediaModalRect = MediaAmountCardCoin.getBoundingClientRect();
    const MediacontentWidth = MediaCoinModal.offsetWidth;

    CoinModal.style.top = modalRect.bottom + 10 + "px";
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


  notificationBell.addEventListener('click', (e) => {
    e.stopPropagation();
    CoinModal.classList.remove('active');
    streakContent.classList.remove('active');
    profileModal.classList.remove('active');
    MediastreakContent.classList.remove('active');
    MediaCoinModal.classList.remove('active');
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



  amountCardCoin.addEventListener('click', (e) => {
    e.stopPropagation();
    streakContent.classList.remove('active');
    notificationsModal.classList.remove('active');  
    profileModal.classList.remove('active');
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

  amountCardFlash.forEach((flash) => {
  flash.addEventListener('click', () => {
    window.location.href = './xp-rating-page.html';
  });
});

const data = {
  "September 2025": [
    {data: "03-September-2025", coins: "+1"},
    {data: "04-September-2025", coins: "+1"},
    {data: "05-September-2025", coins: "+1"},
    {data: "08-September-2025", coins: "+1"},
    {data: "08-September-2025", coins: "+2"},
    {data: "10-September-2025", coins: "+2"},
    {data: "12-September-2025", coins: "+1"},
    {data: "15-September-2025", coins: "+1"},
    {data: "24-September-2025", coins: "+1"},
    {data: "29-September-2025", coins: "+1"}
  ],
  "August 2025": [
    {data: "02-August-2025", coins: "+2"},
    {data: "05-August-2025", coins: "+1"},
    {data: "09-August-2025", coins: "+1"},
    {data: "12-August-2025", coins: "+2"},
    {data: "14-August-2025", coins: "+1"},
    {data: "19-August-2025", coins: "+1"},
    {data: "21-August-2025", coins: "+1"},
    {data: "26-August-2025", coins: "+1"},
    {data: "28-August-2025", coins: "+40"},
    {data: "28-August-2025", coins: "+1"}
  ]
};

let months = Object.keys(data);
let currentMonthIndex = 0;

const monthNames = document.querySelectorAll('#month-name');
const coinLists = document.querySelectorAll('.coin-list');

function renderTable() {
  const monthName = months[currentMonthIndex];

  monthNames.forEach(el => {
    el.innerText = monthName;
  });

  coinLists.forEach(table => {
    table.innerHTML = "";

    data[monthName].forEach(item => {
      const row = document.createElement("div");
      row.className = "flex justify-between items-center p-2 gap-3 border-b border-gray-200";
      row.innerHTML = `
        <span class="text-gray-700">${item.data}</span>
        <span class="flex gap-0.5 justify-center items-center bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm">
          ${item.coins} <img width="12" height="12" src="./imgs/Coin.svg" alt="">
        </span>
      `;
      table.appendChild(row);
    });
  });
}

function prevMonth(){
  if(currentMonthIndex < months.length - 1) {
    currentMonthIndex++;
    renderTable();
  }
}

function nextMonth(){
  if(currentMonthIndex > 0) {
    currentMonthIndex--;
    renderTable();
  }
}

renderTable();



subscribeBtn.addEventListener('click', () => {
  PremiumModal.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
});

StudentHeroWrapper.addEventListener('click', () => {
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
  dfCoinBtnModal.style.display = 'none';
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
const ClosedfCoinBtn = document.querySelector('.close-df-coin-btn');
const ClosedfCoinBtn2 = document.querySelector('.close-df-coin-btn-2');


ClosedfCoinBtn.addEventListener('click', () => {
  dfCoinBtnModal.style.display = 'none';
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
});

ClosedfCoinBtn2.addEventListener('click', () => {
  dfCoinBtnModal.style.display = 'none';
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
});

if (getComputedStyle(dfCoinBtnModal).display === 'flex') {
  overlay.classList.add('active');
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

