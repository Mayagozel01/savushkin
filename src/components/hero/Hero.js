import './hero.css';

const Hero = () => {
  return (
    <div className='flex hero-section h-screen w-full px-4'>
      <div className='flex flex-col justify-center items-center border-2 border-black w-1/2'>
        <h2 className='font-great-vibes text-6xl mb-4'>We love Food </h2>
        <h1>Catering</h1>
      </div>
      <div className='w-1/2 hero-bg h-full border-2 border-black border-l-0'></div>
    </div>
  );
};

export default Hero;
