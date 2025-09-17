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

const Brands = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const logosEls = containerRef.current.querySelectorAll('.logo');

    logosEls.forEach((el, index) => {
      const col = logoPositions[index] % TOTAL_COLUMNS;
      const row = Math.floor(logoPositions[index] / TOTAL_COLUMNS);

      const centerCol = (TOTAL_COLUMNS - 1) / 2;
      const centerRow = (TOTAL_ROWS - 1) / 2;

      const offsetX = (col - centerCol) * 15; // Уменьшаем смещение
      const offsetY = (row - centerRow) * 15; // Уменьшаем смещение

      // Убираем глубину по Z - оставляем только 2D движение
      const scaleStart = 0.8;
      const opacityStart = 0.6;

      gsap.fromTo(
        el,
        {
          // НАЧАЛЬНОЕ состояние: смещены и уменьшены
          x: offsetX,
          y: offsetY,
          z: 0, // Без глубины!
          scale: scaleStart,
          opacity: opacityStart,
          filter: 'blur(4px)',
        },
        {
          // КОНЕЧНОЕ состояние: в центре ячейки
          x: 0,
          y: 0,
          z: 0,
          scale: 1.3, // Увеличиваем немного
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

  const logoPositions = [
    1,
    25,
    4,
    11, // верхняя строка, колонки 1,2,4,5
    27,
    28,
    50,
    57, // другие позиции вне блока текста
  ];

  // Функция проверки, попадает ли индекс ячейки в центральный блок
  const isInTextBlock = index => {
    const row = Math.floor(index / TOTAL_COLUMNS);
    const col = index % TOTAL_COLUMNS;
    return (
      row >= 2 &&
      row <= 3 && // ряды 2 и 3 (0-based)
      col >= 3 &&
      col <= 8 // колонки 3-8 (0-based)
    );
  };

  // Рендер сетки
  const gridCells = [];

  for (let i = 0; i < TOTAL_CELLS; i++) {
    // Если ячейка внутри центрального блока с текстом, пропускаем её (чтобы вставить один большой блок)
    if (isInTextBlock(i)) continue;

    const logoIndex = logoPositions.indexOf(i);
    if (logoIndex !== -1) {
      gridCells.push(
        <div
          key={i}
          className='logo flex justify-center items-center p-4 rounded'
          style={{
            backgroundColor: '#ffffff',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            transform: 'translate(0,0) translateZ(0)',
            zIndex: 20, // Добавляем z-index чтобы логотипы были поверх placeholder'ов
            willChange: 'transform, filter',
          }}
        >
          <img
            src={logos[logoIndex]}
            alt={`Logo ${logoIndex}`}
            className='max-h-12'
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
          }}
        />
      );
    }
  }

  return (
    <section
      className='p-16 h-[100vh] flex flex-col items-center justify-center'
      style={{
        background: 'radial-gradient(circle, #f6f4f1ff) 40%, #fef7efff) 100%)',
      }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div
          ref={containerRef}
          className='integrations-grid grid gap-[0.8rem]'
          style={{
            gridTemplateColumns: `repeat(${TOTAL_COLUMNS}, 1fr)`,
            gridTemplateRows: `repeat(${TOTAL_ROWS}, 1fr)`,
            perspective: '2500px',
            transformStyle: 'preserve-3d',
            pointerEvents: 'none',
            width: '100%',
            height: '100%',
          }}
        >
          <div
            key='center-text'
            className='flex justify-center items-center'
            style={{
              gridColumn: `${textCellsStartCol + 1} / ${textCellsEndCol + 2}`,
              gridRow: `${textCellsStartRow + 1} / ${textCellsEndRow + 2}`,
              backgroundColor: 'transparent',
              pointerEvents: 'auto',
            }}
          >
            <h2
              className='text-center font-bold'
              style={{
                fontSize: '1.875rem',
                color: '#6b6b6b',
              }}
            >
              Наши партнеры
            </h2>
          </div>
          {gridCells}
        </div>
      </div>
    </section>
  );
};

export default Brands;
