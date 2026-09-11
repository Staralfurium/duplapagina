const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const header = document.querySelector('.site-header');
const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('show'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();

const cookieBanner = document.querySelector('#cookie-banner');
const sustainabilityPopup = document.querySelector('#sustainability-popup');
const cookieAccept = document.querySelector('.cookie-accept');
const cookieReject = document.querySelector('.cookie-reject');
const popupClose = document.querySelector('.popup-close');
const popupDismiss = document.querySelector('.popup-dismiss');
const popupAction = document.querySelector('.popup-action');
const preferenceKey = 'dp_cookie_preferences';
const popupSeenKey = 'dp_sustainability_popup_seen';
const popupPreferenceLifetime = 30 * 24 * 60 * 60 * 1000;
const storage = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch {} },
};
const showSustainabilityPopup = () => {
  if (!sustainabilityPopup || sustainabilityPopup.dataset.shown === 'true') return;
  const consent = storage.get(preferenceKey);
  const popupSeenAt = Number(storage.get(popupSeenKey));
  if (consent === 'accepted' && popupSeenAt && Date.now() - popupSeenAt < popupPreferenceLifetime) return;
  sustainabilityPopup.dataset.shown = 'true';
  window.setTimeout(() => { sustainabilityPopup.hidden = false; }, 700);
};
const closeSustainabilityPopup = () => {
  if (!sustainabilityPopup) return;
  sustainabilityPopup.hidden = true;
  if (storage.get(preferenceKey) === 'accepted') storage.set(popupSeenKey, String(Date.now()));
};
if (cookieBanner) {
  if (storage.get(preferenceKey) === 'accepted') showSustainabilityPopup();
  else cookieBanner.hidden = false;
}
cookieAccept?.addEventListener('click', () => {
  storage.set(preferenceKey, 'accepted');
  cookieBanner.hidden = true;
  showSustainabilityPopup();
});
cookieReject?.addEventListener('click', () => {
  cookieBanner.hidden = true;
  showSustainabilityPopup();
});
popupClose?.addEventListener('click', closeSustainabilityPopup);
popupDismiss?.addEventListener('click', closeSustainabilityPopup);
popupAction?.addEventListener('click', closeSustainabilityPopup);
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeSustainabilityPopup(); });
