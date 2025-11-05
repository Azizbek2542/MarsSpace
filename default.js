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
  doubleoverlay.classList.remove('active');
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

