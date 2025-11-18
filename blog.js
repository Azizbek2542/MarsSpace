const PostModal = document.querySelector('.post-modal');
const ClosePostModalBtn = document.querySelector('.close-post-mdl-btn');
const PostModalOpener = document.querySelector('.firstBlogInput');
const elButton = document.querySelector('.el-button');
const Postoverlay = document.querySelector('.post-overlay');
const doubleoverlay2 = document.querySelector('.post-double-overlay');


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
  if (doubleoverlay2) doubleoverlay2.classList.add('active');
});

if (doubleoverlay2) {
  doubleoverlay2.addEventListener('click', () => {
    PremiumModal.classList.remove('active');
    doubleoverlay2.classList.remove('active');
  });
}

