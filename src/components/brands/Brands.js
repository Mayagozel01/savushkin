import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Логотипы
import brand_1 from '../../assets/images/brands/brest.png';
import brand_2 from '../../assets/images/brands/byarozka.png';
import brand_3 from '../../assets/images/brands/laskleto.png';
import brand_4 from '../../assets/images/brands/savyshkin.png';
import brand_5 from '../../assets/images/brands/superkid.png';
import brand_6 from '../../assets/images/brands/svezha.png';
import brand_7 from '../../assets/images/brands/teos.png';
import brand_8 from '../../assets/images/brands/tvorobushki.png';

gsap.registerPlugin(ScrollTrigger);

const logos = [
  brand_1,
  brand_2,
  brand_3,
  brand_4,
  brand_5,
  brand_6,
  brand_7,
  brand_8,
];

const TOTAL_COLUMNS = 12;
const TOTAL_ROWS = 6;
const TOTAL_CELLS = TOTAL_COLUMNS * TOTAL_ROWS;
const logoPositions = [1, 25, 4, 11, 27, 28, 50, 57];

const Brands = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const logosEls = containerRef.current.querySelectorAll('.logo');

    logosEls.forEach((el, index) => {
      const col = logoPositions[index] % TOTAL_COLUMNS;
      const row = Math.floor(logoPositions[index] / TOTAL_COLUMNS);

      const centerCol = (TOTAL_COLUMNS - 1) / 2;
      const centerRow = (TOTAL_ROWS - 1) / 2;

      const offsetX = (col - centerCol) * 15;
      const offsetY = (row - centerRow) * 15;

      gsap.fromTo(
        el,
        {
          x: offsetX,
          y: offsetY,
          scale: 0.8,
          opacity: 0.6,
          filter: 'blur(4px)',
        },
        {
          x: 0,
          y: 0,
          scale: 1.3,
          opacity: 1,
          filter: 'blur(0px)',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 30%',
            scrub: true,
          },
        }
      );
    });
  }, []);

  const textCellsStartRow = 2;
  const textCellsEndRow = 3;
  const textCellsStartCol = 3;
  const textCellsEndCol = 8;

  const isInTextBlock = index => {
    const row = Math.floor(index / TOTAL_COLUMNS);
    const col = index % TOTAL_COLUMNS;
    return row >= 2 && row <= 3 && col >= 3 && col <= 8;
  };

  const gridCells = [];

  for (let i = 0; i < TOTAL_CELLS; i++) {
    if (isInTextBlock(i)) continue;

    const logoIndex = logoPositions.indexOf(i);
    if (logoIndex !== -1) {
      gridCells.push(
        <div
          key={i}
          className='logo flex justify-center items-center p-1 sm:p-2 md:p-3 rounded'
          style={{
            backgroundColor: '#ffffff',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            transform: 'translate(0,0) translateZ(0)',
            zIndex: 20,
            willChange: 'transform, filter',
            aspectRatio: '1/1',
          }}
        >
          <img
            src={logos[logoIndex]}
            alt={`Logo ${logoIndex}`}
            className='w-full h-auto max-h-6 sm:max-h-8 md:max-h-10 lg:max-h-12 object-contain p-1'
          />
        </div>
      );
    } else {
      gridCells.push(
        <div
          key={i}
          className='placeholder rounded'
          style={{
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            backgroundColor: '#f7f3ef',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
            aspectRatio: '1/1',
          }}
        />
      );
    }
  }

  return (
    <section
      className='py-12 md:py-20 lg:py-28 flex flex-col min-h-screen items-center justify-center'
      style={{
        background: 'radial-gradient(circle, #f6f4f1 40%, #fef7ef 100%)',
      }}
    >
      <div className='w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div
          ref={containerRef}
          className='integrations-grid grid gap-2 sm:gap-3 md:gap-4'
          style={{
            gridTemplateColumns: `repeat(${TOTAL_COLUMNS}, 1fr)`,
            gridTemplateRows: `repeat(${TOTAL_ROWS}, 1fr)`,
            perspective: '2500px',
            transformStyle: 'preserve-3d',
            width: '100%',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          <div
            key='center-text'
            className='flex flex-col justify-center items-center gap-1 md:gap-2'
            style={{
              gridColumn: `${textCellsStartCol + 1} / ${textCellsEndCol + 2}`,
              gridRow: `${textCellsStartRow + 1} / ${textCellsEndRow + 2}`,
              backgroundColor: 'transparent',
              pointerEvents: 'auto',
              aspectRatio: '6/1',
            }}
          >
            <h2 className='mb-1 md:mb-2 transition-all duration-500 text-center rotate-[-2deg] text-lg sm:text-xl md:text-2xl lg:text-3xl text-yellow-500 font-great-vibes'>
              Ваш надежный поставщик
            </h2>
            <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center transition-all duration-700'>
              Лидер рынка
            </h1>
          </div>
          {gridCells}
        </div>
      </div>
    </section>
  );
};

export default Brands;
