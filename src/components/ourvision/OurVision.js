import { useRef, useState } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid'; // Heroicons
import videoSrc from '../../assets/video/cheese-pizza-asthetic.mp4';
import bg_video from '../../assets/images/bg-video-section.jpg';
import highlight from '../../assets/images/highlited.png';

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

        {/* highlight image */}
        <img
          src={highlight}
          alt='Circle highlight around title'
          aria-hidden='true'
          className='absolute left-1/2 translate-x-[-50%] bottom-[-48px] w-[90%] 
                         sm:bottom-[-40px] sm:w-[70%] 
                         md:bottom-[-88px] md:w-[80%] 
                         lg:bottom-[-64px] lg:w-[75%] 
                         xl:bottom-[-88px]'
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
          <h1 className='text-[6rem] px-[20rem] py-[5rem] font-bold h-full w-full flex flex-col justify-center items-center text-center mix-blend-lighten bg-[#fbf5ee]'>
            {' '}
            Наше видение — вдохновлять клиентов, предлагая продукты, которые
            приносят радость и уверенность
            <img
              src={highlight}
              alt='Circle highlight around title'
              aria-hidden='true'
              className='absolute left-1/2 translate-x-[-50%] bottom-[-48px] w-[60%]  
                         sm:bottom-[0] sm:w-[70%] 
                         md:bottom-[5rem] md:w-[60%] 
                         lg:bottom-[10rem] lg:w-[50%] 
                         xl:bottom-[10rem]'
            />
          </h1>
        </div>
      </div>
    </section>
  );
};

export default OurVision;
