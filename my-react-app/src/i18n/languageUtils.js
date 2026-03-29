const URDU_TRANSLATIONS = {
  Home: 'ہوم',
  About: 'ہمارے بارے میں',
  Products: 'مصنوعات',
  Fruits: 'پھل',
  Vegetables: 'سبزیاں',
  Services: 'خدمات',
  Contact: 'رابطہ',
  Sitemap: 'سائٹ میپ',
  Phone: 'فون',
  Email: 'ای میل',
  Address: 'پتہ',
  PTCL: 'پی ٹی سی ایل',
  'Get Started': 'شروع کریں',
  'Get Quote': 'قیمت معلوم کریں',
  'Get a Quote': 'قیمت معلوم کریں',
  'Contact Us': 'ہم سے رابطہ کریں',
  'Get in Touch': 'رابطہ کریں',
  'Make an Inquiry': 'درخواست بھیجیں',
  'Search Products': 'مصنوعات تلاش کریں',
  'All Products': 'تمام مصنوعات',
  'View Full Catalog →': 'مکمل کیٹلاگ دیکھیں →',
  'View Full Catalog': 'مکمل کیٹلاگ دیکھیں',
  'No products found': 'کوئی مصنوعات نہیں ملیں',
  'Ready to get started?': 'کیا آپ شروع کرنے کے لیے تیار ہیں؟',
  'Quick Inquiry (WhatsApp)': 'فوری رابطہ (واٹس ایپ)',
  'Back to top': 'اوپر جائیں',
  '↑ Top': '↑ اوپر',
  'Toggle navigation menu': 'نیویگیشن مینو کھولیں',
  'Toggle navigation': 'نیویگیشن ٹوگل کریں',
  'years of excellence': 'سالہ عمدگی',
  'All rights reserved.': 'تمام حقوق محفوظ ہیں۔',
  'Rana Brothers': 'رانا برادرز',
  'Products Catalog': 'مصنوعات کی کیٹلاگ',
  'Our Services': 'ہماری خدمات',
  'Contact & Get Quote': 'رابطہ اور قیمت معلوم کریں',
  'About Rana Brothers': 'رانا برادرز کے بارے میں',
  'Who We Are': 'ہم کون ہیں',
  'Our Vision': 'ہمارا وژن',
  'What We Handle': 'ہم کیا سنبھالتے ہیں',
  'Featured Products': 'نمایاں مصنوعات',
  Testimonials: 'آراء',
  'Our Location': 'ہمارا مقام',
  'Ready to work with Rana Brothers?': 'کیا آپ رانا برادرز کے ساتھ کام کرنے کے لیے تیار ہیں؟',
  WhatsApp: 'واٹس ایپ',
  Clear: 'صاف کریں',
  'Send a Message': 'پیغام بھیجیں',
  'Inquiry Form': 'انکوائری فارم',
  Name: 'نام',
  Product: 'مصنوعات',
  Subject: 'موضوع',
  Message: 'پیغام',
  'Submit Inquiry →': 'انکوائری بھیجیں →',
  'Send Another Inquiry': 'ایک اور انکوائری بھیجیں',
  'Message Submitted!': 'پیغام کامیابی سے بھیج دیا گیا!',
  'Direct Contact': 'براہ راست رابطہ',
  'WhatsApp Us': 'واٹس ایپ کریں',
  'Quick inquiries via WhatsApp': 'واٹس ایپ پر فوری رابطہ',
  'Start a chat →': 'چیٹ شروع کریں →',
  Category: 'زمرہ',
  varieties: 'اقسام',
  'View Fruits →': 'پھل دیکھیں →',
  'View Vegetables →': 'سبزیاں دیکھیں →',
  Variety: 'قسم',
  Grade: 'گریڈ',
  Packaging: 'پیکنگ',
  Availability: 'دستیابی',
  'Your browser does not support the video tag.': 'آپ کا براؤزر ویڈیو ٹیگ کو سپورٹ نہیں کرتا۔',
}

const PHRASE_REPLACEMENTS = [
  [/Get Quote/gi, 'قیمت معلوم کریں'],
  [/Contact Us/gi, 'ہم سے رابطہ کریں'],
  [/Get Started/gi, 'شروع کریں'],
  [/Search by product name/gi, 'مصنوعات کے نام سے تلاش کریں'],
  [/Search products by name/gi, 'مصنوعات کے نام سے تلاش کریں'],
  [/Search Products/gi, 'مصنوعات تلاش کریں'],
  [/Submit Inquiry/gi, 'انکوائری بھیجیں'],
  [/Quick Inquiry/gi, 'فوری رابطہ'],
  [/Back to top/gi, 'اوپر جائیں'],
  [/All rights reserved\./gi, 'تمام حقوق محفوظ ہیں۔'],
  [/Home/gi, 'ہوم'],
  [/About/gi, 'ہمارے بارے میں'],
  [/Products/gi, 'مصنوعات'],
  [/Services/gi, 'خدمات'],
  [/Contact/gi, 'رابطہ'],
  [/Fruits/gi, 'پھل'],
  [/Vegetables/gi, 'سبزیاں'],
]

function translateText(text, language) {
  if (language !== 'ur' || typeof text !== 'string') return text

  const trimmed = text.trim()
  if (!trimmed) return text

  if (Object.prototype.hasOwnProperty.call(URDU_TRANSLATIONS, trimmed)) {
    return text.replace(trimmed, URDU_TRANSLATIONS[trimmed])
  }

  let next = trimmed
  for (const [pattern, replacement] of PHRASE_REPLACEMENTS) {
    next = next.replace(pattern, replacement)
  }

  return text.replace(trimmed, next)
}

function applyTranslationToTextNode(node, language) {
  if (!node || node.nodeType !== Node.TEXT_NODE) return

  const parentTag = node.parentElement?.tagName
  if (parentTag === 'SCRIPT' || parentTag === 'STYLE') return

  if (typeof node.__i18nOriginalText !== 'string') {
    node.__i18nOriginalText = node.nodeValue
  }

  const source = node.__i18nOriginalText
  node.nodeValue = language === 'ur' ? translateText(source, 'ur') : source
}

function applyTranslationToElementAttributes(element, language) {
  const attrKeys = ['placeholder', 'aria-label', 'title']

  for (const key of attrKeys) {
    const current = element.getAttribute(key)
    if (!current) continue

    const sourceKey = `i18nOriginal${key.replace(/(^|-)([a-z])/g, (_, dash, ch) => ch.toUpperCase())}`
    if (!element.dataset[sourceKey]) {
      element.dataset[sourceKey] = current
    }

    const source = element.dataset[sourceKey]
    element.setAttribute(key, language === 'ur' ? translateText(source, 'ur') : source)
  }
}

function applyLanguageToDocument(language) {
  if (typeof document === 'undefined') return

  document.documentElement.lang = language === 'ur' ? 'ur' : 'en'
  document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr'

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  let node = walker.nextNode()
  while (node) {
    applyTranslationToTextNode(node, language)
    node = walker.nextNode()
  }

  const elements = document.body.querySelectorAll('[placeholder], [aria-label], [title]')
  elements.forEach((element) => applyTranslationToElementAttributes(element, language))
}

export { applyLanguageToDocument, translateText }
