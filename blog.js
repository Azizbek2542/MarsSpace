const PostModal = document.querySelector('.post-modal');
const ClosePostModalBtn = document.querySelector('.close-post-mdl-btn');
const PostModalOpener = document.querySelector('.PostModalOpener');
const elButton = document.querySelector('.el-button');
const doubleoverlay = document.querySelector('.post-double-overlay');
const Postoverlay = document.querySelector('.post-overlay');


PostModalOpener.addEventListener('click', () => {
  PostModal.classList.add('active');
  Postoverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
});

ClosePostModalBtn.addEventListener('click', () => {
  PostModal.classList.remove('active');
  Postoverlay.classList.remove('active');
  document.body.style.overflow = '';
});

Postoverlay.addEventListener('click', () => {
  PostModal.classList.remove('active');
  Postoverlay.classList.remove('active');
  document.body.style.overflow = '';
});


elButton.addEventListener('click', () => {
  PremiumModal.classList.add('active');
  PremiumModal.style.zIndex = '100002';
  doubleoverlay.classList.add('active');
});

doubleoverlay.addEventListener('click', () => {
  PremiumModal.classList.remove('active');
  doubleoverlay.classList.remove('active');
});

