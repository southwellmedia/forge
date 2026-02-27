import { Resend } from "resend";

let _resend: Resend | null = null;

export function getResendClient(): Resend | null {
  if (_resend) return _resend;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  _resend = new Resend(apiKey);
  return _resend;
}
