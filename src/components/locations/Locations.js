import { useState, useEffect } from 'react';
import './locations.css';

const Locations = () => {
  // Sample images for the carousel - replace with your actual location images
  const locationImages = [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(prev =>
      prev === locationImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide(prev =>
      prev === 0 ? locationImages.length - 1 : prev - 1
    );
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex hero-section h-[100vh] w-full bg-white'>
      {/* Carousel Section */}
      <div className='w-1/2 h-full border-2 border-black border-r-0 relative overflow-hidden'>
        <div
          className='flex h-full transition-transform duration-500 ease-in-out'
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {locationImages.map((image, index) => (
            <div
              key={index}
              className='min-w-full h-full bg-cover bg-center'
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className='absolute left-4 top-1/2 transform -translate-y-1/2  text-white p-2 rounded-full hover:bg-black/70 transition-colors'
          aria-label='Previous slide'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className='absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full hover:bg-black/70 transition-colors'
          aria-label='Next slide'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </button>

        {/* Indicator Dots */}
        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
          {locationImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className='flex flex-col items-center justify-center pt-8 border-2 border-black w-1/2'>
        <h2 className='font-great-vibes text-center text-6xl mb-10 text-yellow-500'>
          Our Locations
        </h2>
        <div className='p-8 w-full flex flex-col gap-12'>
          <div className='w-full gap-6 flex'>
            <div className='flex flex-col gap-4 w-[60%]'>
              <h1 className='text-5xl font-bold transition-all duration-700'>
                Address
              </h1>
              <p>
                Turkmenistan, Ashgabat, 1001, 50 years of October street, 15
              </p>
            </div>
            <div className='flex flex-col gap-4 '>
              <h1 className='text-5xl font-bold transition-all duration-700'>
                Phone
              </h1>
              <p>+993 12 34 56 78</p>
              <p>+993 12 34 56 78</p>
            </div>
          </div>
          <div className='w-full gap-6 flex'>
            <div className='flex flex-col gap-4 w-[60%]'>
              <h1 className='text-5xl font-bold transition-all duration-700'>
                Address
              </h1>
              <p>
                Turkmenistan, Ashgabat, 1001, 50 years of October street, 15
              </p>
            </div>
            <div className='flex flex-col gap-4 '>
              <h1 className='text-5xl font-bold transition-all duration-700'>
                Phone
              </h1>
              <p>+993 12 34 56 78</p>
              <p>+993 12 34 56 78</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
