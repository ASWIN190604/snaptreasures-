export const WHATSAPP_PHONE = '918807283652';
export const WHATSAPP_DISPLAY = '+91 8807283652';
export const WHATSAPP_DIRECT_LINK = 'https://wa.me/message/QCNRYFZ2VRM6B1';

/**
 * Generate a prefilled WhatsApp link
 * @param {string} text - Message text to prefill
 * @returns {string} wa.me URL
 */
export const createWhatsAppUrl = (text = '') => {
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
};

/**
 * Generate prefilled WhatsApp message for a product
 */
export const createProductOrderWhatsAppUrl = ({ productName, price, size, quantity = 1, customizationText = '' }) => {
  let message = `Hi Snap Treasures! 🌸 I'd like to order:\n\n✨ *Product:* ${productName}\n💰 *Price:* ₹${price}\n📏 *Size/Variant:* ${size || 'Standard'}\n🔢 *Quantity:* ${quantity}`;
  if (customizationText) {
    message += `\n✍️ *Custom Text:* "${customizationText}"`;
  }
  message += `\n\nPlease let me know how to send my photos!`;
  return createWhatsAppUrl(message);
};

/**
 * Generate WhatsApp URL for bulk enquiries
 */
export const createBulkOrderWhatsAppUrl = ({ name, org, eventType, category, quantity }) => {
  const message = `Hello Snap Treasures! 🎁 I want to inquire about a *Bulk Order*:\n\n👤 *Name:* ${name}\n🏢 *Organization/Event:* ${org || 'Personal'}\n🎉 *Occasion:* ${eventType}\n📦 *Category:* ${category}\n🔢 *Quantity:* ${quantity} pcs\n\nPlease share catalog pricing and delivery timeline!`;
  return createWhatsAppUrl(message);
};
