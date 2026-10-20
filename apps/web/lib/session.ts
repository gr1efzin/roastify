import { cookies } from 'next/headers';
import crypto from 'crypto';

const ALG = 'aes-256-gcm';
const KEY_LEN = 32;

function getKey(): Buffer {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET not set');
  // Derive exactly 32 bytes from whatever length secret they provide
  return crypto.createHash('sha256').update(secret).digest();
}

export function encryptToken(token: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALG, getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(token, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  // Pack: iv(12) + tag(16) + encrypted — all hex
  return [iv.toString('hex'), tag.toString('hex'), encrypted.toString('hex')].join('.');
}

export function decryptToken(packed: string): string {
  const [ivHex, tagHex, encHex] = packed.split('.');
  if (!ivHex || !tagHex || !encHex) throw new Error('Invalid session');
  const decipher = crypto.createDecipheriv(ALG, getKey(), Buffer.from(ivHex, 'hex'));
  decipher.setAuthTag(Buffer.from(tagHex, 'hex'));
  return decipher.update(Buffer.from(encHex, 'hex')).toString('utf8') + decipher.final('utf8');
}

export async function getSessionToken(): Promise<string | null> {
  const store = await cookies();
  const raw = store.get('spotify_session')?.value;
  if (!raw) return null;
  try {
    return decryptToken(raw);
  } catch {
    return null;
  }
}

export async function isAlreadyRoasted(): Promise<boolean> {
  const store = await cookies();
  return store.has('roast_used');
}
