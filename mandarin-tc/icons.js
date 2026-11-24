const ICON_PATHS = {
  back:'<path d="M15 3 6 12l9 9"/>',
  headset:'<path d="M4 13v-1a8 8 0 0 1 16 0v1M4 13c-2 0-3 1.5-3 3s1 3 3 3h2v-6H4Zm16 0c2 0 3 1.5 3 3s-1 3-3 3h-2v-6h2ZM19 19a5 5 0 0 1-5 4h-2"/><circle cx="11" cy="23" r="1" fill="currentColor" stroke="none"/>',
  task:'<rect x="4" y="3" width="16" height="18" rx="3" fill="currentColor" stroke="none"/><path d="M8 8h8M8 12h6M8 16h4" stroke="#fff"/>',
  report:'<rect x="4" y="3" width="16" height="18" rx="3" fill="currentColor" stroke="none"/><path d="m7 15 3-3 2 2 5-5m-3 0h3v3M8 18h8" stroke="#fff"/>',
  quiz:'<rect x="4" y="3" width="16" height="18" rx="3" fill="currentColor" stroke="none"/><path d="m8 15 7-7 2 2-7 7-3 1 1-3Zm5-5 2 2M8 19h8" stroke="#fff"/>',
  calendar:'<rect x="4" y="5" width="16" height="16" rx="3" fill="currentColor" stroke="none"/><path d="M8 3v4m8-4v4M7 11h10M8 15h8M8 18h5" stroke="#fff"/>',
  paper:'<path d="M6 3.5h9l3 3v14H6z"/><path d="M15 3.5v3h3M9 10h6M9 13h5M9 16h4"/><path d="m15 17 3-3 1.5 1.5-3 3-2 .5z"/>',
  speaker:'<path d="M3 9h4l5-4v14l-5-4H3z" fill="currentColor" stroke="none"/><path d="M15 9a5 5 0 0 1 0 6m2-9a9 9 0 0 1 0 12"/>',
  translate:'<path d="M3 6h11M8 3v3m3 1c-1 5-3 8-7 10m1-8c2 3 4 5 7 7M13 20l4-11 4 11m-6.6-4h5.2"/>',
  eyeOff:'<path d="M3 3l18 18M10 5.3A11 11 0 0 1 12 5c5 0 8.5 4 10 7-.5 1.2-1.5 2.5-2.7 3.6M6.1 7.1C4.2 8.4 2.9 10.3 2 12c1.5 3 5 7 10 7 1.3 0 2.5-.3 3.6-.8M10 10a3 3 0 0 0 4 4"/>',
  eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  pinyin:'<circle cx="12" cy="12" r="9"/><text x="12" y="16" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor" stroke="none">拼</text>',
  mic:'<rect x="9" y="2" width="6" height="13" rx="3" fill="currentColor" stroke="none"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4M8 22h8"/>',
  heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  heartFill:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" fill="currentColor" stroke="none"/>',
  star:'<path d="m12 2 3.1 6.5 7.1 1-5.1 5 1.2 7-6.3-3.3-6.3 3.3 1.2-7-5.1-5 7.1-1L12 2Z"/>',
  starFill:'<path d="m12 2 3.1 6.5 7.1 1-5.1 5 1.2 7-6.3-3.3-6.3 3.3 1.2-7-5.1-5 7.1-1L12 2Z" fill="currentColor"/>',
  orders:'<rect x="4" y="4" width="16" height="17" rx="2"/><path d="M8 2v4m8-4v4M8 10h8m-8 4h8m-8 4h5"/>',
  course:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18m-14 4h10m-10 4h7"/>',
  management:'<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="10" r="2"/><path d="M8 17c0-2 1.5-3 4-3s4 1 4 3"/>',
  language:'<path d="M3 6h12M8 3v3m3 1c-1 5-4 8-7 10m1-8c2 3 4 5 7 7M14 21l4-10 4 10m-6.3-3h4.6"/>'
};
function icon(name,size=24){return `<svg class="ui-icon icon-${name}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[name]||''}</svg>`}
