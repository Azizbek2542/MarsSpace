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
    overlay.addEventListener('click', () => {
      document.body.style.overflowY = 'auto';
    });
    closePremium.addEventListener('click', () => {
      document.body.style.overflowY = 'auto';   
      limitModal.classList.add('active');
      lmtoverlay.classList.add('active');
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

