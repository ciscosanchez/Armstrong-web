import 'server-only';

/**
 * Lead abuse detection — disposable email domains + suspicious signal scoring.
 * Score < BLOCK_THRESHOLD → silently accept but skip email sends.
 * Score < SUSPICIOUS_THRESHOLD → flag in DB for manual review.
 */

// Top disposable / temporary email providers (maintained manually — expand as needed)
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  'guerrillamail.net',
  'guerrillamail.org',
  'guerrillamail.biz',
  'guerrillamail.de',
  'guerrillamail.info',
  'sharklasers.com',
  'spam4.me',
  'yopmail.com',
  'yopmail.fr',
  'cool.fr.nf',
  'jetable.fr.nf',
  'nospam.ze.tc',
  'nomail.xl.cx',
  'mega.zik.dj',
  'speed.1s.fr',
  'courriel.fr.nf',
  'moncourrier.fr.nf',
  'monemail.fr.nf',
  'monmail.fr.nf',
  'trashmail.at',
  'trashmail.com',
  'trashmail.io',
  'trashmail.me',
  'trashmail.net',
  'tempmail.com',
  'temp-mail.org',
  'throwam.com',
  'throwam.net',
  'fakeinbox.com',
  'maildrop.cc',
  'dispostable.com',
  'mailnull.com',
  'spamgourmet.com',
  'spamgourmet.net',
  'spamgourmet.org',
  'getairmail.com',
  'filzmail.com',
  'spamfree24.org',
  'discard.email',
  'getnada.com',
  'mohmal.com',
  '10minutemail.com',
  '10minutemail.net',
  'tempinbox.com',
  'tempr.email',
  'crazymailing.com',
  'emailondeck.com',
  'mailexpire.com',
  'mailme.lv',
  'throwam.org',
]);

// Disposable-looking TLDs (rare in legitimate business email)
const SUSPICIOUS_TLDS = new Set([
  '.xyz',
  '.top',
  '.click',
  '.loan',
  '.work',
  '.party',
  '.gq',
  '.cf',
  '.ml',
  '.ga',
  '.tk',
]);

export interface AbuseSignals {
  /** Is the email from a known disposable provider? */
  disposableEmail: boolean;
  /** Does the email use a suspicious TLD? */
  suspiciousTld: boolean;
  /** Phone looks like a placeholder (all same digits, 000-000-0000, etc.) */
  fakePhone: boolean;
  /** Name looks like a bot entry (all same chars, single char, nonsense) */
  fakeName: boolean;
  /** Email and name are suspiciously similar (e.g. same string) */
  nameEmailMismatch: boolean;
}

export interface AbuseResult {
  signals: AbuseSignals;
  /** 0–100 confidence this is a real lead. <40 = likely spam, 40–69 = suspicious */
  legitimacyScore: number;
  /** Skip email sending — not worth spamming internal inbox */
  skipEmail: boolean;
  /** Mark as suspicious in DB for manual review */
  flagForReview: boolean;
}

const FAKE_PHONE_RE = /^(\d)\1{9,}$|^0{10}$|^1234567890$|^\(000\)/;
const REPEATED_CHAR_NAME_RE = /^(.)\1{4,}$/i;
const NONSENSE_NAME_RE = /^[a-z]{1,2}$/i;

export function detectLeadAbuse(input: {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}): AbuseResult {
  const emailLower = input.email.toLowerCase().trim();
  const domain = emailLower.split('@')[1] ?? '';
  const tld = `.${domain.split('.').pop() ?? ''}`;

  const signals: AbuseSignals = {
    disposableEmail: DISPOSABLE_DOMAINS.has(domain),
    suspiciousTld: SUSPICIOUS_TLDS.has(tld),
    fakePhone: input.phone ? FAKE_PHONE_RE.test(input.phone.replace(/\D/g, '')) : false,
    fakeName:
      REPEATED_CHAR_NAME_RE.test(input.firstName) ||
      NONSENSE_NAME_RE.test(input.firstName) ||
      REPEATED_CHAR_NAME_RE.test(input.lastName) ||
      NONSENSE_NAME_RE.test(input.lastName),
    nameEmailMismatch:
      emailLower.includes(input.firstName.toLowerCase()) &&
      emailLower.includes(input.lastName.toLowerCase()) &&
      (emailLower.split('@')[0]?.length ?? 999) < 5,
  };

  let score = 100;
  if (signals.disposableEmail) score -= 60;
  if (signals.suspiciousTld) score -= 20;
  if (signals.fakePhone) score -= 25;
  if (signals.fakeName) score -= 30;
  if (signals.nameEmailMismatch) score -= 10;

  const legitimacyScore = Math.max(0, score);

  return {
    signals,
    legitimacyScore,
    skipEmail: legitimacyScore < 50,
    flagForReview: legitimacyScore < 70,
  };
}
