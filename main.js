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


function waitForNavbar() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const coursesCont = document.querySelector('.main-page-main-cont');
    coursesCont.style.paddingTop = navbar.offsetHeight + 'px';
  } else {
    // пробуем снова через 100мс
    setTimeout(waitForNavbar, 100);
  }
}

document.addEventListener('DOMContentLoaded', waitForNavbar);

function Sidebarcolor() {
  const observer = new MutationObserver(() => {
    const sidebarLink = document.querySelector('.sidebar-link.MainPage');
    if (sidebarLink) {
      sidebarLink.style.background = '#fc6736';
      sidebarLink.style.color = '#fff';
      observer.disconnect(); // прекращаем слежку
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

Sidebarcolor();

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
