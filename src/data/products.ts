export interface Product {
  id: string;
  slug: string;
  name: string;
  price: string;
  description: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  features: string[];
  specs: { label: string; value: string }[];
  sku: string;
  colors: { name: string; hex: string }[];
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'plaud-note',
    name: 'Plaud Note',
    price: '21 000',
    description: 'Классический ИИ-диктофон для ежедневных задач.',
    fullDescription: 'PLAUD NOTE — это первый в мире ИИ-диктофон на базе ChatGPT. Тонкий корпус из авиационного алюминия толщиной всего 2.97 мм. Идеально помещается в кошелек или крепится к смартфону через MagSafe.',
    image: 'https://uk.plaud.ai/cdn/shop/files/plaud-note-black.webp?v=1759799193',
    gallery: [
      'https://uk.plaud.ai/cdn/shop/files/plaud-note-black.webp?v=1759799193',
      'https://uk.plaud.ai/cdn/shop/files/plaud-note-silver-front.webp?v=1759799193'
    ],
    features: [
      "64 ГБ памяти",
      "30 ч записи",
      "Бесплатный стартовый ИИ-план",
      "Чехол MagSafe в комплекте"
    ],
    specs: [
      { label: "Толщина", value: "2.97 мм" },
      { label: "Вес", value: "30 г" },
      { label: "Память", value: "64 ГБ" },
      { label: "Батарея", value: "30 часов записи" }
    ],
    sku: 'PLAUD-NOTE',
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Silver', hex: '#d1d1d1' },
      { name: 'Starlight', hex: '#e3d9c6' },
      { name: 'Navy Blue', hex: '#1a2a4a' }
    ]
  },
  {
    id: '2',
    slug: 'plaud-note-pro',
    name: 'Plaud Note Pro',
    price: '26 000',
    description: 'Максимальная производительность для профессионалов.',
    fullDescription: 'PLAUD NOTE PRO предлагает расширенные возможности для тех, кому нужно больше. Увеличенная память, улучшенное шумоподавление и премиальные аксессуары в комплекте.',
    image: 'https://uk.plaud.ai/cdn/shop/files/PlaudNotePro-front-black.webp?v=1759235691',
    gallery: [
      'https://uk.plaud.ai/cdn/shop/files/PlaudNotePro-front-black.webp?v=1759235691',
      'https://uk.plaud.ai/cdn/shop/files/plaud-note-black.webp?v=1759799193'
    ],
    features: [
      "128 ГБ памяти",
      "50 ч записи",
      "Пожизненная подписка AI Pro",
      "Премиальный кожаный чехол",
      "Шумоподавление нового поколения"
    ],
    specs: [
      { label: "Толщина", value: "2.97 мм" },
      { label: "Вес", value: "30 г" },
      { label: "Память", value: "128 ГБ" },
      { label: "Батарея", value: "50 часов записи" }
    ],
    sku: 'PLAUD-NOTE-PRO',
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Silver', hex: '#d1d1d1' }
    ]
  }
];
