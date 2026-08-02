// Minimal hand-drawn line icons. No emoji, no external icon font/CDN.
const ICON_PATHS = {
  sprout: '<path d="M12 21V10"/><path d="M12 10C12 6 8.5 3.5 4 3.5C4 7.5 6.8 10 12 10Z"/><path d="M12 10C12 7 14.8 5 18.5 5C18.5 8.3 16 10.3 12 10.3Z"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7.5a4 4 0 0 1 8 0V11"/><circle cx="12" cy="15.5" r="1.4"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><ellipse cx="12" cy="12" rx="3.6" ry="8.5"/><path d="M3.7 12h16.6"/>',
  users: '<circle cx="9" cy="8.3" r="3"/><path d="M3.2 20c0-3.5 2.6-6 5.8-6s5.8 2.5 5.8 6"/><circle cx="17.3" cy="9.3" r="2.3"/><path d="M15.2 20c.2-2.7 1.6-4.6 3.7-5.2"/>',
  fileText: '<path d="M7 3h6.5L18 7.5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M13.5 3v4.5H18"/><path d="M9 13h6"/><path d="M9 16.5h6"/>',
  rotate: '<path d="M4 12a8 8 0 1 1 2.6 5.9"/><path d="M4 17v-5h5"/>',
  menu: '<path d="M4 6.5h16"/><path d="M4 12h16"/><path d="M4 17.5h16"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M15.2 8.8 13 13l-4.2 2.2L11 11z"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.6 2.6L16.2 9"/>',

  // Mood check-in faces
  faceHappy: '<circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r="0.9" fill="currentColor" stroke="none"/><circle cx="15" cy="10" r="0.9" fill="currentColor" stroke="none"/><path d="M7.8 14.2c1.1 1.4 2.6 2.1 4.2 2.1s3.1-.7 4.2-2.1"/>',
  faceCalm: '<circle cx="12" cy="12" r="9"/><path d="M7.4 10.2c.7-.6 1.7-.6 2.4 0"/><path d="M14.2 10.2c.7-.6 1.7-.6 2.4 0"/><path d="M8.7 14.8c1 .8 2.1 1.2 3.3 1.2s2.3-.4 3.3-1.2"/>',
  faceNeutral: '<circle cx="12" cy="12" r="9"/><circle cx="9" cy="10.3" r="0.9" fill="currentColor" stroke="none"/><circle cx="15" cy="10.3" r="0.9" fill="currentColor" stroke="none"/><path d="M8.5 15h7"/>',
  faceSad: '<circle cx="12" cy="12" r="9"/><circle cx="9" cy="10.3" r="0.9" fill="currentColor" stroke="none"/><circle cx="15" cy="10.3" r="0.9" fill="currentColor" stroke="none"/><path d="M7.8 16.3c1.1-1.4 2.6-2.1 4.2-2.1s3.1.7 4.2 2.1"/>',
  faceTired: '<circle cx="12" cy="12" r="9"/><path d="M7.3 10.2h3"/><path d="M13.7 10.2h3"/><path d="M8.8 15.2c1-.5 2.1-.7 3.2-.7s2.2.2 3.2.7"/>',
  faceAnxious: '<circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r="1.2"/><circle cx="15" cy="10" r="1.2"/><path d="M8.3 15.3l1.1-.9 1.1.9 1.1-.9 1.1.9 1.1-.9 1.1.9"/>',
  faceAnnoyed: '<circle cx="12" cy="12" r="9"/><path d="M7 9.2l2.6 1.1"/><path d="M17 9.2l-2.6 1.1"/><circle cx="9.3" cy="11.3" r="0.85" fill="currentColor" stroke="none"/><circle cx="14.7" cy="11.3" r="0.85" fill="currentColor" stroke="none"/><path d="M8.7 15.8h6.6"/>',
  faceSleepy: '<circle cx="12" cy="12" r="9"/><path d="M7.3 10.4c.6.5 1.7.5 2.3 0"/><path d="M14.4 10.4c.6.5 1.7.5 2.3 0"/><circle cx="12" cy="15.1" r="1" fill="currentColor" stroke="none"/><path d="M16.3 7.3h2.4M16.3 8.6h1.6"/>',
};

function icon(name, size) {
  const s = size || 20;
  const body = ICON_PATHS[name] || '';
  return `<svg class="icon" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}
