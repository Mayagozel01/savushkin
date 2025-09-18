import { useRef, useState } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid'; // Heroicons
import videoSrc from '../../assets/video/cheese-shop_medium.mp4';
import bg_video from '../../assets/images/bg-video-section.jpg';
import highlight from '../../assets/images/highlited.png';
import './ourvision.css';

const OurVision = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className='relative z-10 flex h-[200vh] w-full'>
      {/* sticky container */}
      <div className='sticky left-0 top-0 flex h-screen w-full overflow-hidden z-12 absolute'>
        {/* fallback bg if video fails */}
        <img
          src={bg_video}
          alt='Background'
          className={`absolute inset-0 h-full w-full object-cover ${
            videoError ? 'block' : 'hidden'
          }`}
        />

        {/* video */}
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setVideoError(true)}
          className='absolute inset-0 h-full w-full object-cover z-10'
        />
      </div>

      {/* play/pause control */}
      <button
        onClick={togglePlay}
        className='absolute bottom-8 right-8 z-30 flex items-center gap-3'
      >
        <span className='font-bold uppercase text-white'>
          {isPlaying ? 'Pause' : 'Play'}
        </span>
        <div className='flex h-12 w-12 items-center justify-center rounded-full border border-black bg-white'>
          {isPlaying ? (
            <PauseIcon className='h-6 w-6 text-black' />
          ) : (
            <PlayIcon className='h-6 w-6 text-black' />
          )}
        </div>
      </button>
      <div className='absolute left-0 top-0 z-22 h-screen w-full bg-dough-500 mix-blend-lighten '>
        <div className='absolute left-0 top-0 z-22 flex h-screen w-full items-center justify-center'>
          <h1
            className='
    text-6xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-[90px]
    px-4 sm:px-8 md:px-16 lg:px-32 xl:px-32
    py-10 sm:py-16 md:py-20 lg:py-22
    font-bold w-full h-full 
    flex flex-col  text-center 
    mix-blend-lighten bg-[#fbf5ee] relative
    justify-center items-center leading-12  '
          >
            {' '}
            <span>Продукты для бизнеса. </span>
            <span>Свежесть ежедневно. </span>
            <span>Доверие всегда.</span>
          </h1>
        </div>
        <img
          src={highlight}
          alt='Highlight under last line'
          aria-hidden='true'
          className='absolute left-[50%] block aspect-[2618/1004] max-w-none translate-x-[-50%] mix-blend-normal
           bottom-[35%] w-[70%] sm:bottom-[30%]
            sm:w-[70%] md:bottom-[30%] md:w-[80%] lg:bottom-[30%] lg:w-[50%] h-[15%] xl:bottom-[30%]'
        />
      </div>
    </section>
  );
};

export default OurVision;
