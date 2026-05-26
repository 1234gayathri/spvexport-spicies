export const WHATSAPP_NUMBER = "+919840177629";
export const WHATSAPP_NUMBER_DIGITS = "919840177629";
export const WHATSAPP_DISPLAY = "+91 98401 77629";
export const CONTACT_EMAIL = "exim@spvexports.com";

export function createWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER_DIGITS}?text=${encodeURIComponent(
    message,
  )}`;
}
