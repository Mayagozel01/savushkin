import { useRef, useState, useEffect } from 'react';
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

  const maxScroll = 200; // Максимальный скролл основного баннера
  const heroStartScroll = maxScroll; // Когда начинается показ Hero
  const heroScrollRange = 200; // Диапазон для плавного скролла Hero
  const locationStartScroll = maxScroll + heroScrollRange; // Когда начинается показ Location
  const locationScrollRange = 200; // Диапазон для плавного скролла Location
  const scrollStep = 10; // Меньший шаг скролла для плавности

  useEffect(() => {
    let scrollTimeout;

    const handleWheel = event => {
      const scrollDelta = event.deltaY;
      // Уменьшаем шаг скролла и сохраняем направление
      const adjustedDelta = Math.sign(scrollDelta) * scrollStep;
      const newScroll = currentScroll + adjustedDelta;

      // Ограничиваем общий скролл
      const maxTotalScroll = maxScroll + heroScrollRange + locationScrollRange;
      if (newScroll < 0) {
        setCurrentScroll(0);
        return;
      }

      if (newScroll > maxTotalScroll) {
        setCurrentScroll(maxTotalScroll);
        return;
      }

      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 100);

      event.preventDefault();
      setCurrentScroll(newScroll);
    };

    const blockElement = bannerRef.current;
    if (blockElement) {
      blockElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (blockElement) {
        blockElement.removeEventListener('wheel', handleWheel);
      }
      clearTimeout(scrollTimeout);
    };
  }, [
    currentScroll,
    maxScroll,
    heroScrollRange,
    locationScrollRange,
    scrollStep,
  ]);

  // Вычисляем прогресс основного баннера (0 до 1)
  const bannerProgress = Math.min(1, currentScroll / maxScroll);

  // Вычисляем прогресс поднятия Hero (от 0 до 1)
  const heroOffset = Math.max(0, currentScroll - heroStartScroll);
  const heroProgress = Math.min(1, heroOffset / heroScrollRange);

  // Вычисляем прогресс поднятия Location (от 0 до 1)
  const locationOffset = Math.max(0, currentScroll - locationStartScroll);
  const locationProgress = Math.min(1, locationOffset / locationScrollRange);

  // Easing функция для плавности
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

  // Высота поднятия Hero (90vh = 90% высоты экрана)
  const heroTranslateY = easeOutCubic(heroProgress) * 90;

  // Высота поднятия Location (90vh = 90% высоты экрана)
  const locationTranslateY =
    easeOutCubic(locationProgress) * 90 + heroTranslateY;

  // Рассчитываем количество скроллов для полного поднятия
  const scrollsToComplete = Math.ceil(
    (heroScrollRange + locationScrollRange) / scrollStep
  );

  return (
    <div ref={bannerRef} className='relative w-full overflow-hidden'>
      {/* Основной баннер */}
      <div
        className='h-[100vh] w-full px-4 pt-[5vh] bg-cover bg-center flex flex-col items-center justify-start relative'
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <Header />
        <div
          className='text-container flex flex-col gap-[20px] text-center text-6xl font-bold absolute bottom-[22rem] z-[1] will-change-transform'
          style={{
            maskImage:
              'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 40%, rgba(255, 255, 255, 1) 60%, rgba(255, 255, 255, 0) 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 40%, rgba(255, 255, 255, 1) 60%, rgba(255, 255, 255, 0) 100%)',
          }}
        >
          {[
            'Ваши клиенты',
            'заслуживают лучшего.',
            'Мы поставляем продукты,',
            'которые вдохновляют',
            'и радуют.',
            'Создавайте вместе с нами.',
          ].map((text, index) => (
            <span
              key={index}
              ref={el => (textItemsRef.current[index] = el)}
              className='scrolling-text block h-[3rem] transition-all duration-500 ease-out'
              style={{
                transform: `translateY(${-bannerProgress * 150}px)`,
                opacity: 1 - Math.max(heroProgress, locationProgress) * 0.8,
              }}
            >
              {text}
            </span>
          ))}
        </div>

        <img
          ref={bannerImageRef}
          src={banner_img}
          alt='Banner'
          className='absolute bottom-[-10rem] h-auto z-[3] transition-all duration-800 ease-out'
          style={{
            transform: `scale(${1 + bannerProgress * 0.05})`,
            opacity: 1 - Math.max(heroProgress, locationProgress) * 0.9,
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

      {/* Первая Hero секция */}
      <div
        className='flex hero-section h-[90vh] w-full px-4 z-[10]  bg-[#fbf5ee] absolute top-[100vh] transition-all duration-600 ease-out'
        style={{
          transform: `translateY(-${heroTranslateY}vh)`,
          boxShadow:
            heroProgress > 0.1 ? '0 -10px 30px rgba(0,0,0,0.1)' : 'none',
        }}
      >
        <div className='flex flex-col justify-center items-center border-2 border-black w-1/2 transition-all duration-400 bg-white p-6 lg:p-16 xl:p-24 xxl:p-32'>
          <h2 className=' mb-4 transition-all duration-500 text-center rotate-[-2deg] text-5xl  mb-[-2rem] text-yellow-500'>
            Ваш надежный поставщик
          </h2>
          <h1 className='text-8xl font-bold text-center transition-all duration-700'>
            Лидер рынка
          </h1>
          <p className='mx-auto mt-6 max-w-lg text-center '>
            {' '}
            Крупнейший ассортимент с доставкой по всему региону для вашего
            удобства. Ежедневные поставки свежей продукции точно по графику для
            вашего бизнеса. Четкие поставки без задержек, чтобы вы всегда были
            готовы к работе.
          </p>
        </div>
        <div className='w-1/2 hero-bg h-full border-2 border-black border-l-0 transition-all duration-500'></div>
      </div>

      {/* Location секция */}
      <div
        className='flex location-section h-[90vh] w-full z-[11] bg-[#fbf5ee] px-4 absolute top-[190vh] transition-all duration-600 ease-out'
        style={{
          transform: `translateY(-${locationTranslateY}vh)`,
          boxShadow:
            locationProgress > 0.1 ? '0 -10px 30px rgba(0,0,0,0.1)' : 'none',
        }}
      >
        <Locations />
      </div>
    </div>
  );
};

export default Banner;
