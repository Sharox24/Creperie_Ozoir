// Lightweight device fingerprinting using non-invasive signals
// Note: Browsers do not expose MAC addresses. We combine several hints
// (UA, platform, language(s), screen, timezone) and optionally IP, then
// hash them to a stable fingerprint.

async function sha256Hex(input) {
  try {
    const enc = new TextEncoder();
    const data = enc.encode(input);
    const digest = await crypto.subtle.digest('SHA-256', data);
    const bytes = Array.from(new Uint8Array(digest));
    return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    // Fallback: simple DJB2 hash
    let hash = 5381;
    for (let i = 0; i < input.length; i++) hash = ((hash << 5) + hash) + input.charCodeAt(i);
    return (hash >>> 0).toString(16);
  }
}

export async function getVisitorSignature(ip = '') {
  try {
    const nav = typeof navigator !== 'undefined' ? navigator : {};
    const scr = typeof screen !== 'undefined' ? screen : {};
    const tz = (() => {
      try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch { return ''; }
    })();

    const parts = [
      'v1', // version marker to allow future changes
      nav.userAgent || '',
      nav.platform || '',
      (nav.languages || []).join(',') || nav.language || '',
      String(nav.hardwareConcurrency || ''),
      String(nav.deviceMemory || ''),
      String(scr.width || ''),
      String(scr.height || ''),
      String(scr.colorDepth || ''),
      tz,
      ip || '',
    ];
    const raw = parts.join('|');
    return await sha256Hex(raw);
  } catch {
    return '';
  }
}
