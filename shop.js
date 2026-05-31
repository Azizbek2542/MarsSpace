const tabButtons = document.querySelectorAll('.shop-tab-btn');
const heroBtn = document.querySelector('.shop-tab-btn.hero_shop');
const spaceBtn = document.querySelector('.shop-tab-btn.space_shop');

// Helper: переключает видимость карточек и состояние кнопок
function setActiveTab(isHero) {
   const SpaceProducts = document.querySelectorAll('.space-product');
   const HeroProducts = document.querySelectorAll('.hero-product');

   // Показываем/скрываем элементы (если их нет — просто пропускаем)
      if (SpaceProducts && SpaceProducts.length) {
         SpaceProducts.forEach((prod) => {
            if (isHero) prod.classList.add('shop-hidden'); else prod.classList.remove('shop-hidden');
         });
      }

      if (HeroProducts && HeroProducts.length) {
         HeroProducts.forEach((heroprod) => {
            if (isHero) heroprod.classList.remove('shop-hidden'); else heroprod.classList.add('shop-hidden');
         });
      }

   // Обновляем визуальное состояние кнопок: активная — красная
   tabButtons.forEach((b) => {
      b.classList.remove('active');
      b.style.background = '';
      b.style.color = '';
   });

   if (isHero) {
      if (heroBtn) {
         heroBtn.classList.add('active');
         heroBtn.style.background = '#fc6736';
         heroBtn.style.color = '#fff';
      }
   } else {
      if (spaceBtn) {
         spaceBtn.classList.add('active');
         spaceBtn.style.background = '#fc6736';
         spaceBtn.style.color = '#fff';
      }
   }

   // Сохраняем выбор в localStorage
   localStorage.setItem('shopActiveTab', isHero ? 'hero' : 'space');
}

// Навешиваем обработчики на кнопки
tabButtons.forEach((btn) => {
   btn.addEventListener('click', () => {
      if (btn.classList.contains('hero_shop')) {
         setActiveTab(true);
      } else if (btn.classList.contains('space_shop')) {
         setActiveTab(false);
      }
   });
});

// Инициализация: восстанавливаем последнюю открытую вкладку из localStorage
const savedTab = localStorage.getItem('shopActiveTab');
const isHero = savedTab === 'hero'; // если ничего не сохранено, будет false (space)
setActiveTab(isHero);