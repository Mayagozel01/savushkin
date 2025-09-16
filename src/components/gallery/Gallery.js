import CarouselGallery from '../carouselgallery/CarouselGallery';

const Gallery = () => {
  return (
    <div className='flex hero-section flex flex-col h-screen w-full px-4'>
      <div className='flex flex-col justify-center items-center transition-all duration-400  p-6 lg:p-16 xl:p-24 xxl:p-32'>
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
      <CarouselGallery />
    </div>
  );
};

export default Gallery;
