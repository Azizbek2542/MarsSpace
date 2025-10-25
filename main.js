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
  levelWrapperModal.classList.remove('active');
  closeMapModal.style.display = 'none';
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

const Mapcontainers = document.querySelectorAll('.map-container:nth-child(3)');

Mapcontainers.forEach((Mapcontainer) => {
  let isDown = false;
  let startX, startY;
  let scrollLeft, scrollTop;

  // 🖱️ Для мыши
  Mapcontainer.addEventListener('mousedown', (e) => {
    isDown = true;
    Mapcontainer.classList.add('active');
    startX = e.pageX - Mapcontainer.offsetLeft;
    startY = e.pageY - Mapcontainer.offsetTop;
    scrollLeft = Mapcontainer.scrollLeft;
    scrollTop = Mapcontainer.scrollTop;
  });

  Mapcontainer.addEventListener('mouseleave', () => {
    isDown = false;
    Mapcontainer.classList.remove('active');
  });

  Mapcontainer.addEventListener('mouseup', () => {
    isDown = false;
    Mapcontainer.classList.remove('active');
  });

  Mapcontainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - Mapcontainer.offsetLeft;
    const y = e.pageY - Mapcontainer.offsetTop;
    const walkX = (x - startX) * 1.5; 
    const walkY = (y - startY) * 1.5; 
    Mapcontainer.scrollLeft = scrollLeft - walkX;
    Mapcontainer.scrollTop = scrollTop - walkY;
  });

  // 📱 Для сенсорных экранов
  Mapcontainer.addEventListener('touchstart', (e) => {
    isDown = true;
    Mapcontainer.classList.add('active');
    const touch = e.touches[0];
    startX = touch.pageX - Mapcontainer.offsetLeft;
    startY = touch.pageY - Mapcontainer.offsetTop;
    scrollLeft = Mapcontainer.scrollLeft;
    scrollTop = Mapcontainer.scrollTop;
    document.body.style.overflow = 'hidden';
  });

  Mapcontainer.addEventListener('touchend', () => {
    isDown = false;
    Mapcontainer.classList.remove('active');
    document.body.style.overflow = '';
  });

  Mapcontainer.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const touch = e.touches[0];
    const x = touch.pageX - Mapcontainer.offsetLeft;
    const y = touch.pageY - Mapcontainer.offsetTop;
    const walkX = (x - startX) * 1.5;
    const walkY = (y - startY) * 1.5;
    Mapcontainer.scrollLeft = scrollLeft - walkX;
    Mapcontainer.scrollTop = scrollTop - walkY;
  });
});

 if (window.matchMedia("(min-width: 768px)").matches) {
const Mapcontainers2 = document.querySelectorAll('.map-container:nth-child(1)');

Mapcontainers2.forEach((Mapcontainer2) => {
  let isDown = false;
  let startX, startY;
  let scrollLeft, scrollTop;

  // 🖱️ Для мыши
  Mapcontainer2.addEventListener('mousedown', (e) => {
    isDown = true;
    Mapcontainer2.classList.add('active');
    startX = e.pageX - Mapcontainer2.offsetLeft;
    startY = e.pageY - Mapcontainer2.offsetTop;
    scrollLeft = Mapcontainer2.scrollLeft;
    scrollTop = Mapcontainer2.scrollTop;
  });

  Mapcontainer2.addEventListener('mouseleave', () => {
    isDown = false;
    Mapcontainer2.classList.remove('active');
  });

  Mapcontainer2.addEventListener('mouseup', () => {
    isDown = false;
    Mapcontainer2.classList.remove('active');
  });

  Mapcontainer2.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - Mapcontainer2.offsetLeft;
    const y = e.pageY - Mapcontainer2.offsetTop;
    const walkX = (x - startX) * 1.5; 
    const walkY = (y - startY) * 1.5; 
    Mapcontainer2.scrollLeft = scrollLeft - walkX;
    Mapcontainer2.scrollTop = scrollTop - walkY;
  });

  // 📱 Для сенсорных экранов
  Mapcontainer2.addEventListener('touchstart', (e) => {
    isDown = true;
    Mapcontainer2.classList.add('active');
    const touch = e.touches[0];
    startX = touch.pageX - Mapcontainer2.offsetLeft;
    startY = touch.pageY - Mapcontainer2.offsetTop;
    scrollLeft = Mapcontainer2.scrollLeft;
    scrollTop = Mapcontainer2.scrollTop;
  });

  Mapcontainer2.addEventListener('touchend', () => {
    isDown = false;
    Mapcontainer2.classList.remove('active');
  });

  Mapcontainer2.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const touch = e.touches[0];
    const x = touch.pageX - Mapcontainer2.offsetLeft;
    const y = touch.pageY - Mapcontainer2.offsetTop;
    const walkX = (x - startX) * 1.5;
    const walkY = (y - startY) * 1.5;
    Mapcontainer2.scrollLeft = scrollLeft - walkX;
    Mapcontainer2.scrollTop = scrollTop - walkY;
  });
})
}else {
  const mapContainer = document.querySelector('.map-container:nth-child(1)');
  if (mapContainer) {
    mapContainer.style.overflow = 'auto';
  }
}

const levelNodes = document.querySelectorAll('.level-node');
const levelSpans = document.querySelectorAll('.level-id-span');

levelNodes.forEach((node, index) => {
  node.addEventListener('click', () => {
    levelNodes.forEach((n) => n.classList.remove('active'));
    levelSpans.forEach((s) => s.classList.remove('active'));

    node.classList.add('active');
    levelSpans[index].classList.add('active');
  });
});

const levelWrapperModal = document.querySelector('.level-wrapper-modal');
const levelMiniMapButton = document.querySelector('.level-mini-map__button');
const closeMapModal = document.querySelector('.lvl-modal-close');

levelMiniMapButton.addEventListener('click', () => {
  levelMiniMapButton.classList.add('active');
  overlay.classList.add('active');
  levelWrapperModal.classList.add('active');
  closeMapModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
});

closeMapModal.addEventListener('click', () => {
  overlay.classList.remove('active');
  levelWrapperModal.classList.remove('active');
  closeMapModal.style.display = 'none';
  document.body.style.overflow = '';
});


const doubleOverlay = document.querySelector('.double-overlay');
const nextLvlModal = document.querySelector('.next-level-modal');
const nextLevelButton = document.querySelector('.next-level-button');
const nextLevelModalOpener = document.querySelector('.next-level-modal-opener');
const getNextLvlModal = document.querySelector('.get-next-lvl-modal');
const closeGetNextLvlModalButton = document.querySelector('.close-get-next-lvl-modal-button'); 
const closeGetNextLvlModalButton2 = document.querySelector('.close-get-next-lvl-modal-btn'); 

nextLevelModalOpener.addEventListener('click', () => {
  doubleOverlay.classList.add('active');
  nextLvlModal.classList.add('active');
});

doubleOverlay.addEventListener('click', () => {
  nextLvlModal.classList.remove('active');
  doubleOverlay.classList.remove('active');
});

nextLevelButton.addEventListener('click', () => {
  getNextLvlModal.classList.add('active');
});

closeGetNextLvlModalButton.addEventListener('click', () => {
  window.location.href = './main-page.html';
});

closeGetNextLvlModalButton2.addEventListener('click', () => {
  window.location.href = './main-page.html';
});


const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },

  speed: 800,
});

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

