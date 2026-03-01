import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { submitOrder } from '../lib/api';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: { name: string; price: string; sku: string } | null;
}

export const CheckoutModal = ({ 
  isOpen, 
  onClose, 
  product 
}: CheckoutModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState<{ id: string; createdAt: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    region: '',
    postalCode: '',
    country: 'Russia',
    comment: ''
  });

  if (!isOpen || !product) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        customer: {
          email: formData.email,
          name: formData.name,
          phone: formData.phone
        },
        shipping: {
          address1: formData.address1,
          address2: formData.address2,
          city: formData.city,
          region: formData.region,
          postalCode: formData.postalCode,
          country: formData.country
        },
        items: [{
          sku: product.sku,
          title: product.name,
          qty: 1,
          price: parseFloat(product.price.replace(/\s/g, ''))
        }],
        comment: formData.comment || `Order for ${product.name}`,
        currency: 'RUB'
      };

      const result = await submitOrder(payload);
      setOrderResult({ id: result.orderId, createdAt: result.createdAt });
    } catch (err: any) {
      console.error('Submit error:', err);
      setError(err.message || 'Произошла ошибка. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
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

        {orderResult ? (
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-brand/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-brand w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Заказ принят!</h2>
            <p className="text-white/60 mb-8">
              Ваш номер заказа: <span className="text-white font-bold">#{orderResult.id.slice(0, 8)}</span>
              <br />
              Мы свяжемся с вами в ближайшее время для подтверждения.
            </p>
            <button 
              onClick={onClose}
              className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-brand transition-colors"
            >
              Вернуться на главную
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-2">Оформление заказа</h2>
            <p className="text-white/50 mb-8">Вы выбрали: <span className="text-brand font-bold">{product.name}</span></p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">ФИО</label>
                <input 
                  required
                  disabled={isSubmitting}
                  type="text"
                  placeholder="Иван Иванов"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-brand transition-colors disabled:opacity-50"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email</label>
                  <input 
                    required
                    disabled={isSubmitting}
                    type="email"
                    placeholder="ivan@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-brand transition-colors disabled:opacity-50"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Телефон</label>
                  <input 
                    required
                    disabled={isSubmitting}
                    type="tel"
                    placeholder="+7 (999) 000-00-00"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-brand transition-colors disabled:opacity-50"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Адрес доставки</label>
                <input 
                  required
                  disabled={isSubmitting}
                  type="text"
                  placeholder="Улица, дом, квартира"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-brand transition-colors disabled:opacity-50"
                  value={formData.address1}
                  onChange={e => setFormData({...formData, address1: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Дополнительно (квартира, подъезд)</label>
                <input 
                  disabled={isSubmitting}
                  type="text"
                  placeholder="Кв. 42, под. 2"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-brand transition-colors disabled:opacity-50"
                  value={formData.address2}
                  onChange={e => setFormData({...formData, address2: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Город</label>
                  <input 
                    required
                    disabled={isSubmitting}
                    type="text"
                    placeholder="Москва"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-brand transition-colors disabled:opacity-50"
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Регион</label>
                  <input 
                    disabled={isSubmitting}
                    type="text"
                    placeholder="Московская обл."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-brand transition-colors disabled:opacity-50"
                    value={formData.region}
                    onChange={e => setFormData({...formData, region: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Индекс</label>
                  <input 
                    required
                    disabled={isSubmitting}
                    type="text"
                    placeholder="101000"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-brand transition-colors disabled:opacity-50"
                    value={formData.postalCode}
                    onChange={e => setFormData({...formData, postalCode: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Страна</label>
                  <input 
                    required
                    disabled={isSubmitting}
                    type="text"
                    placeholder="Россия"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-brand transition-colors disabled:opacity-50"
                    value={formData.country}
                    onChange={e => setFormData({...formData, country: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Комментарий к заказу</label>
                <textarea 
                  disabled={isSubmitting}
                  placeholder="Напишите пожелания к доставке..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-brand transition-colors disabled:opacity-50 min-h-[100px] resize-none"
                  value={formData.comment}
                  onChange={e => setFormData({...formData, comment: e.target.value})}
                />
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand text-black font-bold py-4 rounded-2xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>Оформить заказ на {product.price} руб. <ArrowRight className="w-5 h-5" /></>
                  )}
                </button>
                <p className="text-[10px] text-center text-white/30 mt-4">
                  Нажимая кнопку, вы соглашаетесь с условиями оферты и политикой конфиденциальности.
                </p>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};
