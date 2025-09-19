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
  const [isBannerFullyVisible, setIsBannerFullyVisible] = useState(false);
  const [touchDebug, setTouchDebug] = useState({
    startY: 0,
    currentY: 0,
    delta: 0,
  });

  // rectangle / observer info для debug
  const [bannerRect, setBannerRect] = useState({
    height: 0,
    top: 0,
    bottom: 0,
    ratio: 0,
  });

  const maxScroll = 200;
  const heroScrollRange = 200;
  const locationScrollRange = 200;
  const scrollStep = 20;

  // Update window width (and so vh changes indirectly)
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

  // IntersectionObserver + tolerant rect check для надёжной проверки "баннер полностью отображён"
  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;

    // пороги для observer (частичная информативность)
    const thresholds = [0, 0.25, 0.5, 0.75, 0.9, 0.99, 1];

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (!entry) return;

        const rect = entry.boundingClientRect;
        const ratio = entry.intersectionRatio;

        const height = rect.height;
        const top = rect.top;
        const bottom = rect.bottom;

        // Обновляем данные для отладки
        setBannerRect({
          height,
          top,
          bottom,
          ratio,
        });

        // вычисляем допуски (tolerance) — устойчиво к мобильным address-bar и пиксельным погрешностям
        const vhLocal = window.innerHeight;
        const heightTolerance = Math.max(8, Math.round(vhLocal * 0.02)); // min 8px or 2% VH
        const posTolerance = Math.max(4, Math.round(vhLocal * 0.01)); // min 4px or 1% VH

        // Два способа признать "полностью видимым":
        // 1) Intersection ratio почти 1 (наиболее прямой)
        const fullyByRatio = ratio >= 0.99;
        // 2) Высота баннера близка к VH и top≈0 и bottom≈vh (учитываем допуски)
        const fullyByRect =
          height >= vhLocal - heightTolerance &&
          Math.abs(top) <= posTolerance &&
          Math.abs(bottom - vhLocal) <= posTolerance;

        setIsBannerFullyVisible(fullyByRatio || fullyByRect);
      },
      {
        threshold: thresholds,
        // root: null (viewport) — по умолчанию
      }
    );

    observer.observe(el);

    // на ресайз нужно обновлять прямые rect-значения (быстрая корректировка)
    const handleResize = () => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      setBannerRect(prev => ({
        ...prev,
        height: r.height,
        top: r.top,
        bottom: r.bottom,
      }));
      // также можно пересчитать isBannerFullyVisible через тот же алгоритм, но observer сработает сам soon.
    };
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []); // пустой deps: создаём один observer на монтирование

  // Скролл колесом и тач
  useEffect(() => {
    let scrollTimeout;

    const handleWheel = event => {
      if (!isBannerFullyVisible) {
        // баннер не полностью в экране — пропускаем скролл дальше
        return;
      }

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
      if (!isBannerFullyVisible) return; // не блокируем touch, если баннер не на весь экран

      const y = event.touches[0].clientY;
      setTouchDebug(prev => ({ ...prev, startY: y, currentY: y, delta: 0 }));
    };

    const handleTouchMove = event => {
      if (!isBannerFullyVisible) return; // пропускаем стандартный скролл

      const currentY = event.touches[0].clientY;
      const delta = touchDebug.currentY - currentY;
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
  }, [currentScroll, maxTotalScroll, touchDebug, isBannerFullyVisible]);

  // Блокируем скролл документа только если баннер реально 100vh (fullyVisible) и ещё не закончен, и не mobile
  useEffect(() => {
    if (isBannerFullyVisible && !isBannerFinished && windowWidth >= 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isBannerFullyVisible, isBannerFinished, windowWidth]);

  // вычисления прогрессов/переводов (без изменений)
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

  const textBottom = isMobile ? '30%' : isTablet ? '25%' : '20%';
  const imageHeight = isMobile ? '100vh' : isTablet ? '80vh' : 'auto';

  // debug tolerances (тот же расчёт, что внутри observer)
  const heightTolerance = Math.max(8, Math.round(vh * 0.02));
  const posTolerance = Math.max(4, Math.round(vh * 0.01));

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
      <div className='fixed top-4 right-4 z-[9999] bg-white/90 text-gray-900 text-sm shadow-lg rounded-xl p-4 border border-gray-300 backdrop-blur-md max-w-xs'>
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

          <div className='mt-2 border-t pt-2 text-gray-600'>
            Banner Visibility
          </div>
          <div>
            <span className='font-bold'>fullyVisible:</span>{' '}
            {isBannerFullyVisible ? '✅' : '❌'}
          </div>
          <div>
            <span className='font-bold'>vh:</span> {vh}
          </div>
          <div>
            <span className='font-bold'>bannerHeight:</span>{' '}
            {Math.round(bannerRect.height)}
          </div>
          <div>
            <span className='font-bold'>bannerTop:</span>{' '}
            {Math.round(bannerRect.top)}
          </div>
          <div>
            <span className='font-bold'>bannerBottom:</span>{' '}
            {Math.round(bannerRect.bottom)}
          </div>
          <div>
            <span className='font-bold'>intersectionRatio:</span>{' '}
            {bannerRect.ratio.toFixed(2)}
          </div>
          <div>
            <span className='font-bold'>heightTol(px):</span> {heightTolerance}
          </div>
          <div>
            <span className='font-bold'>posTol(px):</span> {posTolerance}
          </div>

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
