// CarouselGallery.jsx
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import gallery1 from '../../assets/images/gallery1.jpg';
import gallery2 from '../../assets/images/gallery2.png';
import gallery3 from '../../assets/images/gallery3.png';
import gallery4 from '../../assets/images/gallery4.jpg';
import gallery5 from '../../assets/images/gallery5.jpg';

const images = [
  gallery1,
  gallery3,
  gallery4,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
];

const CarouselGallery = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      dragFree: true, // Включает свободное перетаскивание
      containScroll: 'trimSnaps',
    },
    [Autoplay({ delay: 3000, stopOnInteraction: true })]
  );

  return (
    <div
      className='overflow-hidden px-6 py-12 bg-[#f9f5f0] cursor-grab active:cursor-grabbing'
      ref={emblaRef}
    >
      <div className='flex select-none'>
        {images.map((src, i) => (
          <div
            key={i}
            className='
              flex-[0_0_65%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] 
              -mx-6 px-3
            '
          >
            <div
              className='
                odd:rotate-[-5deg] even:rotate-[5deg] 
                bg-white rounded-xl shadow-lg 
                overflow-hidden 
                transform transition-transform duration-300 hover:scale-105
                h-full flex flex-col
              '
            >
              <div className='flex-1 relative min-h-[250px] sm:min-h-[300px] lg:min-h-[350px]'>
                <img
                  src={src}
                  alt={`gallery-${i}`}
                  className='
                    object-cover opacity-0 animate-fadeIn
                    w-full h-full absolute inset-0
                  '
                  draggable='false'
                />
              </div>
              <p className='text-center text-sm text-gray-600 py-2'>
                Photo {i + 1}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselGallery;
