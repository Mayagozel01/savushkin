import { useRef, useState, useEffect, useMemo } from 'react';
import backgroundImg from '../../assets/images/banner-bg.avif';
import banner_img from '../../assets/images/banner-image.png';
import { Header } from '../Header';
import './banner.css';
import Locations from '../locations/Locations';

const Banner = () => {
  const bannerRef = useRef(null);
  const textItemsRef = useRef([]);
  const bannerImageRef = useRef(null);

  const [currentScroll, setCurrentScroll] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isBannerFinished, setIsBannerFinished] = useState(false);
  const [touchDebug, setTouchDebug] = useState({
    startY: 0,
    currentY: 0,
    delta: 0,
  });

  const maxScroll = 200;
  const heroScrollRange = 200;
  const locationScrollRange = 200;
  const scrollStep = 20;

  // Обновляем ширину окна для адаптивности
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  // Общая максимальная прокрутка баннера
  const maxTotalScroll = maxScroll + heroScrollRange + locationScrollRange;

  // Проверяем, завершен ли скролл баннера
  useEffect(() => {
    setIsBannerFinished(currentScroll >= maxTotalScroll);
  }, [currentScroll, maxTotalScroll]);

  // Скролл колесом
  useEffect(() => {
    let scrollTimeout;
    let touchStart = 0;

    const handleWheel = event => {
      const isAtEnd = currentScroll >= maxTotalScroll;

      if (event.deltaY > 0 && isAtEnd) return;

      if (!isAtEnd || (event.deltaY < 0 && currentScroll > 0)) {
        event.preventDefault();
        const adjustedDelta = Math.sign(event.deltaY) * scrollStep;

        setCurrentScroll(prev =>
          Math.min(Math.max(prev + adjustedDelta, 0), maxTotalScroll)
        );

        setIsScrolling(true);
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => setIsScrolling(false), 100);
      }
    };

    const startTouch = event => {
      const y = event.touches[0].clientY;
      setTouchDebug(prev => ({ ...prev, startY: y, currentY: y, delta: 0 }));
    };

    const handleTouchMove = event => {
      const currentY = event.touches[0].clientY;
      const delta = touchDebug.currentY - currentY; // движение вниз/вверх
      setTouchDebug(prev => ({ ...prev, currentY, delta }));

      if (Math.abs(delta) > 2) {
        setCurrentScroll(prev =>
          Math.max(0, Math.min(prev + delta, maxTotalScroll))
        );
        setIsScrolling(true);
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => setIsScrolling(false), 100);
      }
    };

    const blockElement = bannerRef.current;
    if (blockElement) {
      blockElement.addEventListener('wheel', handleWheel, { passive: false });
      blockElement.addEventListener('touchstart', startTouch, {
        passive: false,
      });
      blockElement.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      });
    }

    return () => {
      if (blockElement) {
        blockElement.removeEventListener('wheel', handleWheel);
        blockElement.removeEventListener('touchstart', startTouch);
        blockElement.removeEventListener('touchmove', handleTouchMove);
      }
      clearTimeout(scrollTimeout);
    };
  }, [currentScroll, maxTotalScroll]);

  useEffect(() => {
    setIsBannerFinished(currentScroll >= maxTotalScroll);
  }, [currentScroll, maxTotalScroll]);

  // Разрешаем скролл страницы только когда баннер завершен и скроллим вниз
  useEffect(() => {
    if (isBannerFinished || window.innerWidth < 768) {
      // Allow scroll only on mobile
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isBannerFinished]);

  const bannerProgress = Math.min(1, currentScroll / maxScroll);
  const heroOffset = Math.max(0, currentScroll - maxScroll);
  const heroProgress = Math.min(1, heroOffset / heroScrollRange);
  const locationOffset = Math.max(
    0,
    currentScroll - (maxScroll + heroScrollRange)
  );
  const locationProgress = Math.min(1, locationOffset / locationScrollRange);

  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
  const vh = window.innerHeight;

  const heroTranslateY = easeOutCubic(heroProgress) * vh * 0.9;
  const locationTranslateY =
    easeOutCubic(locationProgress) * vh * 0.9 + heroTranslateY;

  const textTranslateMultiplier = isMobile ? 1.8 : isTablet ? 1.2 : 1;

  const textArray = [
    'Ваши клиенты',
    'заслуживают',
    'лучшего.',
    'Мы поставляем',
    'продукты,',
    'которые',
    'вдохновляют',
    'и радуют.',
    'Создавайте вместе с нами.',
  ];

  const textSpans = useMemo(
    () =>
      textArray.map((text, index) => (
        <span
          key={index}
          ref={el => (textItemsRef.current[index] = el)}
          className='scrolling-text block transition-transform duration-500 ease-out text-wrap'
          style={{
            transform: `translateY(${-bannerProgress * 150 * textTranslateMultiplier}px)`,
            opacity: 1 - Math.max(heroProgress, locationProgress) * 0.8,
            willChange: 'transform, opacity',
          }}
        >
          {text}
        </span>
      )),
    [bannerProgress, heroProgress, locationProgress, textTranslateMultiplier]
  );

  // Адаптивный bottom для текста
  const textBottom = isMobile ? '30%' : isTablet ? '25%' : '20%';

  // Адаптивная высота картинки
  const imageHeight = isMobile ? '100vh' : isTablet ? '80vh' : 'auto';

  return (
    <div ref={bannerRef} className='relative w-full overflow-hidden h-[100vh]'>
      {/* Основной баннер */}
      <div
        className='relative w-full h-full flex flex-col items-center justify-start bg-cover bg-center'
        style={{
          backgroundImage: `url(${backgroundImg})`,
        }}
      >
        <Header />

        <div
          className='text-container flex flex-col text-8xl lg:text-6xl md:text-4xl sm:text-8xl
           gap-2 lg:gap-4 md:gap-2 sm:gap-2 text-center font-bold absolute z-[1] text-animate'
          style={{
            bottom: textBottom,
            maskImage:
              'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,1) 60%, rgba(255,255,255,0) 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,1) 60%, rgba(255,255,255,0) 100%)',
            willChange: 'transform, opacity',
          }}
        >
          {textSpans}
        </div>

        <img
          ref={bannerImageRef}
          src={banner_img}
          alt='Banner'
          className='absolute z-[3] transition-all duration-800 ease-out object-cover w-full banner-animate'
          style={{
            bottom: 0,
            width: '100%',
            height: imageHeight,
            maxHeight: vh,
            transform: `scale(${1 + bannerProgress * 0.05})`,
            opacity: 1 - Math.max(heroProgress, locationProgress) * 0.9,
            willChange: 'transform, opacity',
          }}
        />

        {/* Индикатор скролла */}
        <div
          className='absolute bottom-8 z-10 transition-opacity duration-400'
          style={{ opacity: 1 - Math.max(heroProgress, locationProgress) }}
        >
          <div className='animate-bounce w-6 h-10 border-2 border-white rounded-full flex justify-center'>
            <div className='w-1 h-3 bg-white rounded-full mt-2'></div>
          </div>
        </div>
      </div>

      {/* Hero секция */}
      <div
        className='flex flex-col lg:flex-row md:flex-row sm:flex-col  hero-section w-full px-4 z-[10] bg-[#fbf5ee] absolute transition-all duration-600 ease-out'
        style={{
          top: vh,
          height: vh * 0.9,
          transform: `translateY(-${heroTranslateY}px)`,
          boxShadow:
            heroProgress > 0.1 ? '0 -10px 30px rgba(0,0,0,0.1)' : 'none',
          willChange: 'transform',
        }}
      >
        <div
          className='flex flex-col justify-center items-center border-2
         border-black w-full lg:w-1/2 md:w-1/2 sm:w-full h-full transition-all duration-400 bg-white p-6 lg:p-16 xl:p-24'
        >
          <h2 className='mb-4 text-center rotate-[-2deg] text-2xl lg:text-5xl md:text-4xl sm:text-2xl text-yellow-500'>
            Ваш надежный поставщик
          </h2>
          <h1 className='text-4xl lg:text-8xl md:text-4xl sm:text-2xl font-bold text-center'>
            Лидер рынка
          </h1>
          <p className='mx-auto mt-6 max-w-lg text-center'>
            Крупнейший ассортимент с доставкой по всему региону для вашего
            удобства. Ежедневные поставки свежей продукции точно по графику для
            вашего бизнеса. Четкие поставки без задержек, чтобы вы всегда были
            готовы к работе.
          </p>
        </div>
        <div className='w-full lg:w-1/2 md:w-1/2 sm:w-full hero-bg h-full border-2 border-black border-l-0 transition-all duration-500'></div>
      </div>

      {/* Location секция */}
      <div
        className='flex location-section w-full z-[11] bg-[#fbf5ee] px-4 absolute transition-all duration-600 ease-out'
        style={{
          top: vh + vh * 0.9,
          height: vh * 0.9,
          transform: `translateY(-${locationTranslateY}px)`,
          boxShadow:
            locationProgress > 0.1 ? '0 -10px 30px rgba(0,0,0,0.1)' : 'none',
          willChange: 'transform',
        }}
      >
        <Locations />
      </div>
      {/* Панель отладки */}
      <div className='fixed top-4 right-4 z-[9999] bg-white/90 text-gray-900 text-sm shadow-lg rounded-xl p-4 border border-gray-300 backdrop-blur-md'>
        <h3 className='font-bold text-xs mb-2 text-gray-700 uppercase'>
          Debug Panel
        </h3>
        <div className='space-y-1 font-mono text-xs'>
          <div>
            <span className='font-bold'>scroll:</span> {currentScroll}
          </div>
          <div>
            <span className='font-bold'>banner:</span>{' '}
            {bannerProgress.toFixed(2)}
          </div>
          <div>
            <span className='font-bold'>hero:</span> {heroProgress.toFixed(2)}
          </div>
          <div>
            <span className='font-bold'>location:</span>{' '}
            {locationProgress.toFixed(2)}
          </div>
          <div>
            <span className='font-bold'>finished:</span>{' '}
            {isBannerFinished ? '✅' : '❌'}
          </div>
          <div>
            <span className='font-bold'>isScrolling:</span>{' '}
            {isScrolling ? '🌀' : '—'}
          </div>
          {/* touch debug */}
          <div className='mt-2 border-t pt-2 text-gray-600'>Touch Debug</div>
          <div>
            <span className='font-bold'>startY:</span> {touchDebug.startY}
          </div>
          <div>
            <span className='font-bold'>currentY:</span> {touchDebug.currentY}
          </div>
          <div>
            <span className='font-bold'>delta:</span> {touchDebug.delta}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
