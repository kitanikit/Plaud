import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ChevronRight, 
  Mic, 
  Shield, 
  Zap, 
  Clock, 
  Battery,
  Cpu,
  Smartphone,
  ArrowRight
} from 'lucide-react';
import { products } from '../data/products';
import { CheckoutModal } from '../components/CheckoutModal';

export const ProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.slug === slug);
  
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(product?.image || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Товар не найден</h1>
          <Link to="/" className="text-brand hover:underline flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <Mic className="text-black w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-[0.1em] uppercase">
              PLAUD<span className="text-brand">-MARKET</span>
            </span>
          </Link>
          <Link to="/" className="text-sm font-medium text-white/70 hover:text-white transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> На главную
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Gallery */}
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="aspect-square rounded-[40px] overflow-hidden glass p-8"
              >
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                  draggable="false"
                />
              </motion.div>
              <div className="grid grid-cols-4 gap-4">
                {product.gallery.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square rounded-2xl overflow-hidden glass p-2 transition-all ${activeImage === img ? 'border-brand/50 scale-105' : 'border-white/5 opacity-50 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" draggable="false" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-10">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-black tracking-[0.2em] uppercase mb-6"
                >
                  <Zap className="w-3 h-3 fill-brand" />
                  В наличии
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-6xl font-bold tracking-tighter mb-4"
                >
                  {product.name}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-white/50 leading-relaxed"
                >
                  {product.description}
                </motion.p>
              </div>

              {/* Color Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Цвет: <span className="text-white">{selectedColor}</span></h3>
                </div>
                <div className="flex gap-4 p-2 glass rounded-2xl w-fit">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`relative w-10 h-10 rounded-full transition-all duration-300 ${selectedColor === color.name ? 'ring-2 ring-brand ring-offset-4 ring-offset-black scale-110' : 'hover:scale-105'}`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor === color.name && (
                        <motion.div 
                          layoutId="activeColor"
                          className="absolute inset-0 rounded-full border-2 border-white/20"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-baseline gap-4"
              >
                <span className="text-5xl font-bold">{product.price}</span>
                <span className="text-white/40 text-xl">руб.</span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <button 
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full bg-brand text-black font-bold py-5 rounded-3xl text-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(16,185,129,0.2)]"
                >
                  Купить сейчас <ArrowRight className="w-6 h-6" />
                </button>
                <p className="text-center text-sm text-white/30">Бесплатная доставка по всей России</p>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                {product.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-white/70 glass p-4 rounded-2xl">
                    <CheckCircle2 className="text-brand w-5 h-5 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t border-white/5">
                <h3 className="text-xl font-bold mb-6">Характеристики</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-white/5">
                      <span className="text-white/40 text-sm uppercase tracking-widest font-bold">{spec.label}</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <section className="mt-32">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-8">О продукте</h2>
              <p className="text-white/60 text-lg leading-relaxed mb-12">
                {product.fullDescription}
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="glass p-8 rounded-[40px]">
                  <div className="w-12 h-12 bg-brand/10 rounded-2xl flex items-center justify-center mb-6">
                    <Shield className="text-brand w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold mb-3">Безопасность</h4>
                  <p className="text-white/50 text-sm">Шифрование корпоративного уровня гарантирует, что ваши данные всегда под защитой.</p>
                </div>
                <div className="glass p-8 rounded-[40px]">
                  <div className="w-12 h-12 bg-brand/10 rounded-2xl flex items-center justify-center mb-6">
                    <Cpu className="text-brand w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold mb-3">Интеллект</h4>
                  <p className="text-white/50 text-sm">Алгоритмы GPT-4o обеспечивают высочайшее качество расшифровки и резюмирования.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <AnimatePresence>
        {isCheckoutOpen && (
          <CheckoutModal 
            isOpen={isCheckoutOpen} 
            onClose={() => setIsCheckoutOpen(false)} 
            product={{ 
              name: `${product.name} (${selectedColor})`, 
              price: product.price, 
              sku: `${product.sku}-${selectedColor.toUpperCase().replace(/\s+/g, '-')}` 
            }} 
          />
        )}
      </AnimatePresence>

      <footer className="py-20 px-6 border-t border-white/5 text-center text-white/20 text-xs uppercase tracking-widest font-bold">
        © 2026 PLAUD-MARKET. Все права защищены.
      </footer>
    </div>
  );
};
