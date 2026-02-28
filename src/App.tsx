/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, 
  Cpu, 
  Zap, 
  Shield, 
  Smartphone, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X, 
  Play, 
  Layers,
  Clock,
  Battery,
  ArrowRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <Mic className="text-black w-5 h-5" />
          </div>
          <span className="text-xl font-black tracking-[0.1em] uppercase">
            PLAUD<span className="text-brand">-MARKET</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#features" className="hover:text-white transition-colors">Функции</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">Как это работает</a>
          <a href="#pricing" className="hover:text-white transition-colors">Цены</a>
          <button className="bg-white text-black px-5 py-2 rounded-full hover:bg-brand hover:text-black transition-all font-semibold">
            Купить сейчас
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>Функции</a>
            <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>Как это работает</a>
            <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Цены</a>
            <button className="bg-brand text-black w-full py-3 rounded-xl font-bold">Купить сейчас</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: { icon: any, title: string, description: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="glass p-8 rounded-3xl hover:border-brand/30 transition-colors group"
  >
    <div className="w-12 h-12 bg-brand/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon className="text-brand w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-white/60 leading-relaxed">{description}</p>
  </motion.div>
);

const CheckoutModal = ({ 
  isOpen, 
  onClose, 
  product 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  product: { name: string; price: string } | null 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: ''
  });

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order Data:', { product, customer: formData });
    alert('Данные приняты! Теперь можно подключать эквайринг для оплаты ' + product.price + ' руб.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg glass p-8 rounded-[40px] border-white/10 overflow-y-auto max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold mb-2">Оформление заказа</h2>
        <p className="text-white/50 mb-8">Вы выбрали: <span className="text-brand font-bold">{product.name}</span></p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40">ФИО</label>
            <input 
              required
              type="text"
              placeholder="Иван Иванов"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-brand transition-colors"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email</label>
              <input 
                required
                type="email"
                placeholder="ivan@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-brand transition-colors"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Телефон</label>
              <input 
                required
                type="tel"
                placeholder="+7 (999) 000-00-00"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-brand transition-colors"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Адрес доставки</label>
            <input 
              required
              type="text"
              placeholder="Улица, дом, квартира"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-brand transition-colors"
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Город</label>
              <input 
                required
                type="text"
                placeholder="Москва"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-brand transition-colors"
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Индекс</label>
              <input 
                required
                type="text"
                placeholder="101000"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-brand transition-colors"
                value={formData.zip}
                onChange={e => setFormData({...formData, zip: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              className="w-full bg-brand text-black font-bold py-4 rounded-2xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              Перейти к оплате {product.price} руб. <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-[10px] text-center text-white/30 mt-4">
              Нажимая кнопку, вы соглашаетесь с условиями оферты и политикой конфиденциальности.
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; price: string } | null>(null);

  const handlePurchase = (name: string, price: string) => {
    setSelectedProduct({ name, price });
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden w-full">
      <Navbar />
      
      <AnimatePresence>
        {isCheckoutOpen && (
          <CheckoutModal 
            isOpen={isCheckoutOpen} 
            onClose={() => setIsCheckoutOpen(false)} 
            product={selectedProduct} 
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-brand/20 blur-[120px] rounded-full -z-10 opacity-30" />
        
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-black tracking-[0.2em] uppercase mb-8 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
          >
            <Zap className="w-3 h-3 fill-brand" />
            Работает на базе ChatGPT-4o
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-gradient"
          >
            Заметки, <br className="hidden md:block" />
            переосмысленные ИИ.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            PLAUD NOTE — это первый в мире ИИ-диктофон на базе ChatGPT. 
            Запись одним нажатием, мгновенная расшифровка и умные резюме.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => handlePurchase('Plaud AI', '21 000')}
              className="bg-brand text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_10px_30px_rgba(16,185,129,0.3)]"
            >
              Заказать сейчас <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 rounded-full font-bold text-lg border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2">
              <Play className="w-5 h-5 fill-white" /> Смотреть видео
            </button>
          </motion.div>
        </div>

        {/* Product Image Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 max-w-5xl mx-auto relative"
        >
          <div className="aspect-[16/9] rounded-3xl overflow-hidden glass relative group">
            <div className="absolute top-8 left-8 z-20">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <div className="w-6 h-6 bg-brand rounded flex items-center justify-center">
                  <Mic className="text-black w-4 h-4" />
                </div>
                <span className="text-sm font-black tracking-widest uppercase">PLAUD<span className="text-brand">-MARKET</span></span>
              </div>
            </div>
            <img 
              src="https://techcrunch.com/wp-content/uploads/2025/08/Plaud-Note-Pro.jpg" 
              alt="Устройства Plaud Note Pro" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
              draggable="false"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            {/* Floating UI Elements */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
              <div className="glass p-4 rounded-2xl max-w-xs">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Живая расшифровка</span>
                </div>
                <p className="text-sm text-white/80 italic">"Сроки проекта были перенесены на третий квартал, чтобы обеспечить полную оптимизацию всех моделей ИИ..."</p>
              </div>
              <div className="hidden md:block glass p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand/20 rounded-xl flex items-center justify-center">
                    <Layers className="text-brand w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Интеллект-карта создана</div>
                    <div className="text-[10px] text-white/40">Визуализация структуры вашей встречи</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Расшифровка", value: "57+ языков" },
            { label: "Толщина", value: "2.97 мм" },
            { label: "Время работы", value: "30 часов" },
            { label: "Память", value: "64 ГБ" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-white/40 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Все, что вам нужно, <br />чтобы запечатлеть гениальность.</h2>
            <p className="text-white/50 max-w-xl mx-auto">Создано для профессионалов, которые ценят свое время. Позвольте ИИ взять на себя утомительную работу по ведению заметок.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Mic}
              title="Двухрежимная запись"
              description="Переключайтесь между записью телефонных разговоров и режимом встреч с помощью простого физического переключателя. Кристально чистый звук каждый раз."
              delay={0.1}
            />
            <FeatureCard 
              icon={Cpu}
              title="ИИ-резюмирование"
              description="На базе GPT-4o. Получайте структурированные протоколы встреч, списки задач и интеллект-карты через несколько секунд после окончания записи."
              delay={0.2}
            />
            <FeatureCard 
              icon={Smartphone}
              title="Интеграция с приложением"
              description="Легко синхронизируйте записи с телефоном. Редактируйте, делитесь и экспортируйте в Notion, Slack или Google Drive одним нажатием."
              delay={0.3}
            />
            <FeatureCard 
              icon={Shield}
              title="Приоритет приватности"
              description="Шифрование корпоративного уровня. Ваши данные принадлежат вам. Мы никогда не используем ваши записи для обучения наших моделей."
              delay={0.4}
            />
            <FeatureCard 
              icon={Battery}
              title="Непревзойденная выносливость"
              description="30 часов непрерывной записи и 60 дней в режиме ожидания. Он всегда готов, когда приходит вдохновение."
              delay={0.5}
            />
            <FeatureCard 
              icon={Clock}
              title="Мгновенный поиск"
              description="Ищите по всей истории ваших разговоров с помощью ключевых слов. Никогда больше не забывайте детали."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-12 tracking-tight">От голоса к <br />инсайтам за 3 шага.</h2>
              <div className="space-y-12">
                {[
                  { step: "01", title: "Запись", desc: "Нажмите физическую кнопку, чтобы начать запись встреч, звонков или лекций." },
                  { step: "02", title: "Расшифровка", desc: "Наш ИИ преобразует ваше аудио в текст с точностью до 99% на 57+ языках." },
                  { step: "03", title: "Резюме", desc: "Получите профессионально оформленное резюме, интеллект-карту и список задач." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="text-brand font-mono font-bold text-xl">{item.step}</span>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-white/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[40px] overflow-hidden glass p-8">
                <div className="w-full h-full bg-black/40 rounded-3xl flex flex-col p-6 overflow-hidden">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-brand" />
                      <span className="text-xs font-bold uppercase tracking-widest">ИИ-резюме</span>
                    </div>
                    <div className="text-[10px] text-white/30">2 мин назад</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-4 bg-white/10 rounded-full w-3/4" />
                    <div className="h-4 bg-white/10 rounded-full w-full" />
                    <div className="h-4 bg-white/10 rounded-full w-5/6" />
                    
                    <div className="pt-6">
                      <div className="text-xs font-bold text-brand mb-3 uppercase tracking-widest">Задачи</div>
                      <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded border border-white/20" />
                            <div className="h-3 bg-white/5 rounded-full flex-1" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/20 blur-3xl rounded-full -z-10" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand/10 blur-3xl rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Product Gallery Section */}
      <section className="py-32 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                Инструмент <span className="text-brand italic">нового поколения</span> для бизнеса.
              </h2>
              <p className="text-white/50 text-lg">
                PLAUD — это не просто диктофон. Это ваш персональный ассистент, который позволяет сосредоточиться на главном: на людях и идеях.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
            {/* Large Main Image */}
            <motion.div 
              className="md:col-span-8 md:row-span-2 rounded-[40px] overflow-hidden glass relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://uk.plaud.ai/cdn/shop/files/plaud-note-silver-front.webp?v=1759799193" 
                alt="Plaud Note Silver" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
                draggable="false"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-10 flex flex-col justify-end">
                <div className="bg-brand/10 border border-brand/20 w-fit px-3 py-1 rounded-full text-[10px] font-bold text-brand uppercase tracking-widest mb-4">
                  Премиум материалы
                </div>
                <h3 className="text-3xl font-bold mb-3">Безупречный дизайн</h3>
                <p className="text-white/60 max-w-md leading-relaxed">
                  Тонкий корпус из авиационного алюминия толщиной всего 2.97 мм. Идеально помещается в кошелек или крепится к смартфону через MagSafe.
                </p>
              </div>
            </motion.div>

            {/* Top Right */}
            <motion.div 
              className="md:col-span-4 rounded-[40px] overflow-hidden glass relative group"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <img 
                src="https://uk.plaud.ai/cdn/shop/files/PlaudNotePro-front-black.webp?v=1759235691" 
                alt="Plaud Note Pro Interface" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
                draggable="false"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-xl font-bold mb-2">Интеллектуальный контроль</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Мгновенная информация о заряде и режиме работы. Всегда готов к записи важных мыслей.
                </p>
              </div>
            </motion.div>

            {/* Bottom Right */}
            <motion.div 
              className="md:col-span-4 rounded-[40px] overflow-hidden glass relative group"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <img 
                src="https://uk.plaud.ai/cdn/shop/files/plaud-note-black.webp?v=1759799193" 
                alt="Plaud Note Black" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
                draggable="false"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-xl font-bold mb-2">Эстетика продуктивности</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Инструмент, который подчеркивает ваш профессионализм на каждой встрече.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Выберите свой PLAUD.</h2>
            <p className="text-white/50">Начните записывать свой мир сегодня.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Standard */}
            <div className="glass p-10 rounded-[40px] border-white/5 flex flex-col">
              <div className="aspect-square mb-8 rounded-3xl overflow-hidden bg-white/5">
                <img 
                  src="https://uk.plaud.ai/cdn/shop/files/plaud-note-black.webp?v=1759799193" 
                  alt="Plaud AI" 
                  className="w-full h-full object-contain p-4"
                  referrerPolicy="no-referrer"
                  draggable="false"
                />
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Plaud AI</h3>
                <p className="text-white/40 text-sm">Классический ИИ-диктофон.</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-bold">21 000</span>
                <span className="text-white/40 ml-2">руб.</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {["64 ГБ памяти", "30 ч записи", "Бесплатный стартовый ИИ-план", "Чехол MagSafe в комплекте"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                    <CheckCircle2 className="text-brand w-5 h-5" /> {feat}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handlePurchase('Plaud AI', '21 000')}
                className="w-full py-4 rounded-2xl border border-white/10 font-bold hover:bg-white/5 transition-colors"
              >
                Выбрать
              </button>
            </div>

            {/* Pro */}
            <div className="glass p-10 rounded-[40px] border-brand/30 bg-brand/5 flex flex-col relative overflow-hidden">
              <div className="absolute top-6 right-6 bg-brand text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Лучший выбор
              </div>
              <div className="aspect-square mb-8 rounded-3xl overflow-hidden bg-white/5">
                <img 
                  src="https://uk.plaud.ai/cdn/shop/files/PlaudNotePro-front-black.webp?v=1759235691" 
                  alt="Plaud AI PRO" 
                  className="w-full h-full object-contain p-4"
                  referrerPolicy="no-referrer"
                  draggable="false"
                />
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Plaud AI PRO</h3>
                <p className="text-white/40 text-sm">Максимальная производительность.</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-bold">26 000</span>
                <span className="text-white/40 ml-2">руб.</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {["128 ГБ памяти", "50 ч записи", "Пожизненная подписка AI Pro", "Премиальный кожаный чехол", "Шумоподавление нового поколения"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                    <CheckCircle2 className="text-brand w-5 h-5" /> {feat}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handlePurchase('Plaud AI PRO', '26 000')}
                className="w-full py-4 rounded-2xl bg-brand text-black font-bold hover:scale-[1.02] transition-transform"
              >
                Купить сейчас
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6 group cursor-pointer">
                <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <Mic className="text-black w-5 h-5" />
                </div>
                <span className="text-xl font-black tracking-[0.1em] uppercase">
                  PLAUD<span className="text-brand">-MARKET</span>
                </span>
              </div>
              <p className="text-white/40 max-w-sm leading-relaxed">
                Помогаем людям и командам фиксировать, организовывать и использовать результаты их самых важных разговоров.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Продукт</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li><a href="#" className="hover:text-brand transition-colors">Функции</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">ИИ-подписка</a></li>
                <li><a href="https://apps.apple.com/ru/app/plaud-ai-note-taker/id6450364080?ysclid=mm4wxvtjfg472969820" className="hover:text-brand transition-colors">Скачать приложение</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Аксессуары</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Компания</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li><a href="#" className="hover:text-brand transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Поддержка</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Политика конфиденциальности</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Условия использования</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5 text-xs text-white/20 uppercase tracking-widest font-bold">
            <div>© 2026 ИП Сентюрин Никита Алексеевич  ИНН: 501218277990</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Telegram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
