import React, { useState, useId, useCallback, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import { Link } from 'react-router-dom';

const ImageCarousel = ({ images }: { images: string[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-white/5 group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((src, idx) => (
            <div className="flex-[0_0_100%] min-w-0" key={idx}>
              <img 
                src={src} 
                alt={`Slide ${idx + 1}`} 
                className="w-full h-auto object-cover pointer-events-none" 
                referrerPolicy="no-referrer" 
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              scrollTo(idx);
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              selectedIndex === idx ? 'bg-stone-300' : 'bg-stone-600'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-900 text-white font-['Montserrat'] selection:bg-[#CF3200] selection:text-white relative overflow-hidden">
      {/* Red Glow */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
      <div
        aria-hidden="true"
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)] pointer-events-none"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#CF3200] to-[#A62800] opacity-20"
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
          }}
        />
      </div>

      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 bg-stone-900/80 backdrop-blur-md border-b border-white/5">
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')} className="-m-1.5 p-1.5 flex items-center">
              <span className="sr-only">TRAFF</span>
              <img alt="TRAFF" src="https://i.ibb.co/pv9d1XcC/Frame-43159.png" className="h-10 w-auto" referrerPolicy="no-referrer" />
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-x-8 lg:items-center lg:justify-center absolute left-1/2 -translate-x-1/2">
            <a href="#program" onClick={(e) => scrollToSection(e, 'program')} className="text-sm font-semibold leading-6 text-stone-300 hover:text-white transition-colors">Что внутри?</a>
            <a href="#cases" onClick={(e) => scrollToSection(e, 'cases')} className="text-sm font-semibold leading-6 text-stone-300 hover:text-white transition-colors">Кейсы</a>
            <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="text-sm font-semibold leading-6 text-stone-300 hover:text-white transition-colors">Частые вопросы</a>
          </div>

          <div className="flex lg:hidden">
            <button 
              type="button" 
              onClick={() => setIsMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-stone-400 hover:text-white transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button 
              onClick={(e) => scrollToSection(e, 'checkout')} 
              className="rounded-md bg-[#CF3200] hover:bg-[#A62800] px-5 py-2.5 text-sm font-medium text-white transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(207,50,0,0.4)] uppercase tracking-wide"
            >
              ВСТУПИТЬ В TRAFF
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-stone-900/95 backdrop-blur-md flex flex-col pt-20 px-6">
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-5 right-5 p-2.5 text-stone-400 hover:text-white"
          >
            <span className="sr-only">Close menu</span>
            <X className="h-8 w-8" />
          </button>
          <nav className="flex flex-col gap-8 text-2xl font-medium mt-10">
            <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')} className="hover:text-[#CF3200] transition-colors">Главная</a>
            <a href="#program" onClick={(e) => scrollToSection(e, 'program')} className="hover:text-[#CF3200] transition-colors">Что внутри?</a>
            <a href="#cases" onClick={(e) => scrollToSection(e, 'cases')} className="hover:text-[#CF3200] transition-colors">Кейсы</a>
            <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="hover:text-[#CF3200] transition-colors">Частые вопросы</a>
            
            <button 
              onClick={(e) => scrollToSection(e, 'checkout')} 
              className="mt-4 w-fit self-start bg-[#CF3200] hover:bg-[#A62800] text-white font-medium py-3 px-6 rounded-md text-lg transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(207,50,0,0.4)] uppercase tracking-wide text-center"
            >
              ВСТУПИТЬ В TRAFF
            </button>
          </nav>
        </div>
      )}

      {/* Block 1: Hero Section */}
      <section 
        id="hero" 
        className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 min-h-screen flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto"
      >
        <GridBackground className="[mask-image:linear-gradient(to_bottom,white_0%,white_20%,transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0, y: 150, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 w-full relative z-0 max-w-4xl mx-auto"
        >
          <h1 className="text-[26px] sm:text-[34px] md:text-[42px] leading-[1.2] text-center font-bold tracking-tight mb-6">
            Как с нуля выйти <br />
            на <span className="relative inline-block whitespace-nowrap">
              2-3k$ в месяц
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#CF3200]" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M 2 10 Q 50 0, 98 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
              </svg>
            </span> на арбитраже трафика?
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed font-medium">
            <strong className="text-white font-bold">Смотри видео ниже:</strong> внутри готовая система, которая сэкономит тебе месяцы тестов, нервов и решит 99% проблем с банами и поиском связок
          </p>
        </motion.div>
        
        <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center mt-8">
          <motion.div 
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full z-10 flex flex-col items-center px-4 sm:px-0"
          >
            {/* Screen Frame */}
            <div className="relative w-full aspect-[16/10] bg-stone-950 rounded-t-xl sm:rounded-t-3xl border-[6px] sm:border-[12px] border-stone-800 flex items-center justify-center overflow-hidden shadow-2xl shadow-[#CF3200]/20">
              {/* MacBook Pro Notch */}
              <div className="absolute top-0 inset-x-0 mx-auto w-16 sm:w-24 h-2.5 sm:h-3.5 bg-stone-800 rounded-b-sm sm:rounded-b-md z-20 flex items-center justify-center">
                {/* Camera dot */}
                <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 bg-stone-950 rounded-full opacity-80 shadow-inner"></div>
              </div>
              
              {/* Video Player */}
              <div className="w-full h-full bg-stone-900 flex items-center justify-center overflow-hidden">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/OvbZeqIxbXI?autoplay=1&mute=1&loop=1&playlist=OvbZeqIxbXI&controls=1&rel=0" 
                  title="TRAFF Video" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            {/* Base */}
            <div className="relative w-[115%] sm:w-[110%] h-3 sm:h-5 bg-gradient-to-b from-stone-400 to-stone-600 rounded-b-xl sm:rounded-b-2xl flex justify-center shadow-2xl">
              {/* Thumb notch */}
              <div className="w-16 sm:w-24 h-1.5 sm:h-2 bg-stone-500 rounded-b-md shadow-inner"></div>
            </div>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            onClick={(e) => scrollToSection(e, 'checkout')} 
            className="mt-24 sm:mt-36 bg-[#CF3200] hover:bg-[#A62800] text-white font-bold py-4 px-10 sm:px-16 rounded-md text-lg sm:text-xl transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(207,50,0,0.5)] uppercase tracking-wide w-full sm:w-auto"
          >
            ВСТУПИТЬ В TRAFF
          </motion.button>
        </div>
      </section>

      {/* Marquee */}
      <div className="w-full bg-[#CF3200] py-4 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex gap-8 items-center text-white font-black text-xl md:text-2xl uppercase tracking-widest">
          <span>TIKTOK ADS</span>
          <span>•</span>
          <span>META ADS</span>
          <span>•</span>
          <span>УБТ</span>
          <span>•</span>
          <span>НЕЙРОСЕТИ</span>
          <span>•</span>
          <span>VIBECODING</span>
          <span>•</span>
          <span>ТРАФИК</span>
          <span>•</span>
          <span>TIKTOK ADS</span>
          <span>•</span>
          <span>META ADS</span>
          <span>•</span>
          <span>УБТ</span>
          <span>•</span>
          <span>НЕЙРОСЕТИ</span>
          <span>•</span>
          <span>VIBECODING</span>
          <span>•</span>
          <span>ТРАФИК</span>
          <span>•</span>
          <span>TIKTOK ADS</span>
          <span>•</span>
          <span>META ADS</span>
          <span>•</span>
          <span>УБТ</span>
          <span>•</span>
          <span>НЕЙРОСЕТИ</span>
          <span>•</span>
          <span>VIBECODING</span>
          <span>•</span>
          <span>ТРАФИК</span>
        </div>
      </div>

      {/* Block 3: Accordion */}
      <motion.section 
        id="program" 
        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-12 pb-16 md:pt-16 md:pb-24 px-6 max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">Что внутри?</h2>
        <div className="space-y-2">
          <AccordionItem 
            title="Условно Бесплатный Трафик (УБТ)" 
            content={
              <div className="space-y-4">
                <p>TikTok, Shorts, Reels, Threads: от правильной реги до обхода банов и нулей на просмотрах</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Схема «Спам-залива»: как брать объемом через сетку аккаунтов и уникализацию креативов</li>
                  <li>Рабочие связки для перелива трафика</li>
                  <li>Офферы на залив</li>
                </ul>
              </div>
            } 
          />
          <AccordionItem 
            title="Платный трафик: TikTok Ads и Meta ADS" 
            content={
              <div className="space-y-4">
                <p>Несколько часов лекций, в которых наглядно разобраны все технические моменты, лайфхаки и тд</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>От регистрации кабинетов до первых конверсий</li>
                  <li>Полный сетап: антидетекты, прокси, трекеры, документы</li>
                  <li>Обход банов и проблем с верификацией</li>
                  <li>Офферы на залив и связки</li>
                </ul>
              </div>
            } 
          />
          <AccordionItem 
            title="Доступ к моим офферам" 
            content="Тебе не нужно искать, кому продавать трафик. Ты сможешь лить заявки лично мне, за которые я буду платить" 
          />
          <AccordionItem 
            title="Моя поддержка" 
            content="В любой момент вы можете мне написать и я помогу вам с решением вашей проблемы или проконсультирую по вопросам которые вас интересуют" 
          />
          <AccordionItem 
            title="Гайды по Вайбкодингу" 
            content="Делаем сайты, Telegram-ботов и даже мини-игры вообще без навыков программирования" 
          />
          <AccordionItem 
            title="Гайды по Нейроконтенту" 
            content="Показываю как делать ИИ видео и фото для цепляющего контента" 
          />
          <AccordionItem 
            title="Гайды по поиску клиентов" 
            content="Где брать адекватных заказчиков на свой трафик. Даю простые скрипты общения: что и кому писать, чтобы люди хотели с тобой работать и платили нормальные деньги без долгих уговоров" 
          />
        </div>
      </motion.section>

      {/* Block: Cases */}
      <motion.section 
        id="cases" 
        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-16 md:py-24 bg-stone-900/50 relative"
      >
        <GridBackground />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Кейсы участников</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="bg-stone-800/30 border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-stone-700 rounded-full flex items-center justify-center text-xl font-bold">1</div>
                <div>
                  <h3 className="font-bold text-lg">Максим</h3>
                  <p className="text-[#CF3200] font-medium">1000$ и ROI 220%</p>
                </div>
              </div>
              <div className="text-stone-400 text-sm space-y-2">
                <p>До этого он пытался лить TikTok ADS на оффер который у него уже был, но получалось не очень.</p>
                <p>После вступления в TRAFF буквально за 12 дней он заработал <strong className="text-white">80.000 рублей</strong> открутив всего 400$ на рекламу</p>
              </div>
              <div className="mt-auto">
                <ImageCarousel images={[
                  "https://i.ibb.co/1f0vBJj9/Frame-43160.png",
                  "https://i.ibb.co/7dc5RWmq/Gemini-Generated-Image-ao8s30ao8s30ao8s.png",
                  "https://i.ibb.co/P8z1JbR/Frame-43162.png"
                ]} />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="bg-stone-800/30 border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-stone-700 rounded-full flex items-center justify-center text-xl font-bold">2</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">Артём</h3>
                    <a href="https://t.me/xxxtimacion" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors">@xxxtimacion</a>
                  </div>
                  <p className="text-[#CF3200] font-medium">800$ за 8 дней</p>
                </div>
              </div>
              <div className="text-stone-400 text-sm space-y-2">
                <p>Никогда не занимался арбитражом трафика, и умел лишь базово монтировать видео</p>
                <p>Сразу начал изучать TikTok ADS. Глянул видосы и просто повторил. За 2 дня он нашел эксперта, которому нужен был трафик и начал лить</p>
                <div className="pt-1">
                  <p><strong className="text-white">Итог:</strong></p>
                  <ul className="list-disc pl-4 mt-1 space-y-1">
                    <li>Потрачено на рекламу: <strong className="text-white">300$</strong></li>
                    <li>Перелил подписчиков: <strong className="text-white">1017 шт</strong></li>
                    <li>Чистая прибыль: <strong className="text-white">815$</strong></li>
                  </ul>
                </div>
              </div>
              <div className="mt-auto rounded-lg overflow-hidden border border-white/5">
                <img src="https://i.ibb.co/tTRQm84z/Group-1000011021.png" alt="Group-1000011021" className="w-full h-auto" referrerPolicy="no-referrer" />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="bg-stone-800/30 border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-stone-700 rounded-full flex items-center justify-center text-xl font-bold">3</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">Алекс</h3>
                    <a href="https://t.me/alexcryptooooo" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors">@alexcryptooooo</a>
                  </div>
                  <p className="text-[#CF3200] font-medium">87.000₽ за 10 дней</p>
                </div>
              </div>
              <div className="text-stone-400 text-sm space-y-2">
                <p>Алекс решил себя попробовать в <strong className="text-white">УБТ арбитраже</strong>. По гайдам сделал аккаунты с Инсте, Ютубе и ТикТоке, и начал заливать видео.</p>
                <p>За <strong className="text-white">10 дней</strong> он собрал в сумме примерно <strong className="text-white">400.000</strong> просмотров и перелил <strong className="text-white">1057</strong> заявок, за которые ему заплатили <strong className="text-white">1057$</strong></p>
              </div>
              <div className="mt-auto">
                <img src="https://i.ibb.co/MkjbDJRb/image-71s8.png" alt="Результат Алекса" className="w-full h-auto rounded-lg border border-white/5" referrerPolicy="no-referrer" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Block: FAQ */}
      <motion.section 
        id="faq" 
        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-16 md:py-24 px-6 max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">Частые вопросы</h2>
        <div className="space-y-2">
          <FaqItem 
            title="Кому подойдет TRAFF?" 
            content={
              <ul className="space-y-3">
                <li><strong className="text-white">Новичкам</strong>, которые хотят уйти из найма и начать зарабатывать онлайн на арбитраже трафика</li>
                <li><strong className="text-white">Арбитражникам</strong> для поиска новых источников трафика и масштабирования дохода</li>
                <li><strong className="text-white">Владельцам каналов или экспертам</strong> для получения трафика сильно дешевле рыночного</li>
                <li><strong className="text-white">Владельцам бизнесов</strong> для привлечения трафика на свои продукты</li>
              </ul>
            } 
          />
          <FaqItem 
            title="Я из РФ/РБ. Смогу ли я лить трафик?" 
            content={
              <div className="space-y-3">
                <p>Конечно! И это наше главное преимущество. То, что TikTok и Meta отключили для РФ/РБ - нам только на руку, потому что на рынке осталось меньше конкурентов</p>
                <p>В Академии есть отдельный подробный блок по обходу всех ограничений. От прокси и антидетект браузеров до виртуальных карт</p>
                <p>Никаких границ нет, мы спокойно работаем на весь мир</p>
              </div>
            } 
          />
          <FaqItem 
            title="Нужен ли бюджет на старт?" 
            content="Нет. В блоке УБТ (условно-бесплатный трафик) мы подробно разбираем, как начать с полного нуля без вложений в рекламу. А для работы с TikTok ADS и Meta ADS хватит 30$" 
          />
          <FaqItem 
            title="Сколько времени нужно уделять в день?" 
            content="На старте достаточно 2-3 часов в день. Когда набьете руку и поймете алгоритмы, многие процессы можно будет автоматизировать" 
          />
          <FaqItem 
            title="Подойдет ли мне, если я полный ноль?" 
            content="Да. Обучение построено пошагово - от правильной регистрации первого аккаунта до вывода первых заработанных денег" 
          />
          <FaqItem 
            title="Как долго у меня будет доступ к материалам?" 
            content={<>Доступ к материалам, всем будущим обновлениям и моей личной поддержке предоставляется <strong className="text-white font-bold">НАВСЕГДА</strong></>} 
          />
        </div>
      </motion.section>

      {/* Block 4: Checkout */}
      <motion.section 
        id="checkout" 
        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-24 px-6 flex items-center justify-center min-h-[80vh] relative"
      >
        <GridBackground />
        <div className="text-center max-w-2xl w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Доступ <span className="relative inline-block">
              НАВСЕГДА
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#CF3200]" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M 2 10 Q 50 0, 98 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
              </svg>
            </span>
          </h2>
          <div className="mb-8 flex flex-col items-center justify-center">
            <span className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-stone-400 leading-none px-2 py-2">120 $</span>
            <span className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-stone-400 leading-none px-2 py-2 -mt-2">(9900 ₽)</span>
          </div>
          <div className="text-stone-400 text-lg md:text-xl mb-12 space-y-6">
            <p>
              <strong className="text-white font-medium">Залил 100 заявок - <span className="relative inline-block whitespace-nowrap">окупил обучение<svg className="absolute w-full h-2 -bottom-1 left-0 text-[#CF3200]" viewBox="0 0 100 12" preserveAspectRatio="none"><path d="M 2 10 Q 50 0, 98 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" /></svg></span>.</strong> По моим гайдам ребята делают этот объем за первые дни работы
            </p>
            <div className="relative inline-block px-3 sm:px-4 py-3 my-4">
              {/* Left Bracket */}
              <svg className="absolute left-0 top-0 h-full w-4 sm:w-5 overflow-visible" viewBox="0 0 20 100" preserveAspectRatio="none" fill="none">
                <path d="M 17 4 C 7 4 5 9 4 19 C 2 49 3 79 5 89 C 6 95 9 94 17 94" stroke="#CF3200" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              </svg>
              {/* Right Bracket */}
              <svg className="absolute right-0 top-0 h-full w-4 sm:w-5 overflow-visible" viewBox="0 0 20 100" preserveAspectRatio="none" fill="none">
                <path d="M 3 4 C 13 4 15 9 16 19 C 18 49 17 79 15 89 C 14 95 11 94 3 94" stroke="#CF3200" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              </svg>
              <p className="relative z-10 m-0">
                Если остались вопросы, пиши мне - <a href="https://t.me/xxxdimacion" target="_blank" rel="noopener noreferrer" className="text-[#CF3200] hover:underline">@xxxdimacion</a>
              </p>
            </div>
            <p className="text-white font-normal text-xl md:text-2xl pt-6">
              Вступай в <strong className="font-bold">TRAFF</strong> и начни зарабатывать свои <strong className="font-bold">первые <span className="relative inline-block whitespace-nowrap">100-200к₽<svg className="absolute w-full h-2 -bottom-1 left-0 text-[#CF3200]" viewBox="0 0 100 12" preserveAspectRatio="none"><path d="M 2 10 Q 50 0, 98 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" /></svg></span></strong>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <a href="https://t.me/m/rtNyhVGXN2Ji" target="_blank" rel="noopener noreferrer" className="bg-[#CF3200] hover:bg-[#A62800] text-white font-medium py-3 px-8 rounded-md transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(207,50,0,0.4)] w-full sm:w-auto text-center flex flex-col items-center justify-center">
              <span className="text-base font-bold uppercase tracking-wide">ОПЛАТИТЬ ПЕРЕВОДОМ</span>
              <span className="text-xs text-white/80 mt-0.5 uppercase tracking-wide">(КАРТА И КРИПТА)</span>
            </a>
            <a href="https://t.me/tribute/app?startapp=sOS7" target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-md transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] w-full sm:w-auto text-center flex flex-col items-center justify-center">
              <span className="text-base font-bold uppercase tracking-wide">ОПЛАТИТЬ ЧЕРЕЗ TRIBUTE</span>
              <span className="text-xs text-white/80 mt-0.5 uppercase tracking-wide">(Любые карты)</span>
            </a>
          </div>
        </div>
      </motion.section>

      {/* Block 5: Footer */}
      <footer className="py-8 px-6 border-t border-white/10 bg-stone-900">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-4">
          <img src="https://i.ibb.co/pv9d1XcC/Frame-43159.png" alt="TRAFF" className="h-8" referrerPolicy="no-referrer" />
          <div className="flex flex-col sm:flex-row gap-4 text-stone-500 text-sm text-center">
            <Link to="/disclaimer" className="hover:text-white transition-colors">Дисклеймер</Link>
            <Link to="/offer" className="hover:text-white transition-colors">Договор оферты</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
          </div>
          <p className="text-[10px] text-stone-600 max-w-2xl text-center leading-tight">
            * Meta Platforms Inc. (владелец Facebook и Instagram) признана экстремистской организацией, её деятельность запрещена на территории Российской Федерации.
          </p>
        </div>
      </footer>
    </div>
  );
}

function AccordionItem({ title, content }: { title: string, content: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex justify-between items-center text-left focus:outline-none group cursor-pointer"
      >
        <span className="text-xl md:text-2xl font-medium group-hover:text-[#CF3200] transition-colors">{title}</span>
        <ChevronDown className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}
      >
        <div className="text-stone-400 text-lg leading-relaxed">{content}</div>
      </div>
    </div>
  );
}

function FaqItem({ title, content }: { title: string, content: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group cursor-pointer"
      >
        <span className="text-lg md:text-xl font-medium group-hover:text-[#CF3200] transition-colors">{title}</span>
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
      >
        <div className="text-stone-400 text-base leading-relaxed">{content}</div>
      </div>
    </div>
  );
}

function SectionDivider() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full h-32 relative flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_50%,transparent)]">
          <svg aria-hidden="true" className="absolute inset-0 h-full w-full stroke-white/5">
            <defs>
              <pattern id="divider-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M.5 32V.5H32" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth="0" fill="url(#divider-grid)" />
          </svg>
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-[#CF3200]/50 to-transparent"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-16 bg-[#CF3200]/10 blur-3xl rounded-full pointer-events-none"></div>
    </motion.div>
  );
}

function GridBackground({ className = "[mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" }: { className?: string }) {
  const patternId = useId();
  return (
    <svg
      aria-hidden="true"
      className={`absolute inset-0 -z-10 h-full w-full stroke-white/10 ${className}`}
    >
      <defs>
        <pattern
          x="50%"
          y="0"
          id={patternId}
          width="200"
          height="200"
          patternUnits="userSpaceOnUse"
        >
          <path d="M.5 200V.5H200" fill="none" />
        </pattern>
      </defs>
      <svg x="50%" y="0" className="overflow-visible fill-stone-800/20">
        <path
          d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
          strokeWidth="0"
        />
      </svg>
      <rect fill={`url(#${patternId})`} width="100%" height="100%" strokeWidth="0" />
    </svg>
  );
}
