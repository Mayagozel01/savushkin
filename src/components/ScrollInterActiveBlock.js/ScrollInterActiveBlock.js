import React, { useState, useEffect, useRef } from 'react';

// Стили компонента (можно вынести в отдельный CSS-файл)
const styles = {
  scrollSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '500px',
    margin: '50px auto',
    backgroundColor: '#333',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    border: '2px solid #555',
  },
  textContainer: {
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // Используем `mask-image` для создания градиента прозрачности
    maskImage:
      'linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%)',
    WebkitMaskImage:
      'linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%)',
  },
  textItem: {
    fontSize: '2em',
    fontWeight: 'bold',
    color: '#fff',
    margin: '10px 0',
    transition: 'transform 0.2s ease-in-out',
  },
};

const ScrollInteractiveBlock = () => {
  const [currentScroll, setCurrentScroll] = useState(0);
  const blockRef = useRef(null);

  const maxScroll = 200; // Максимальное виртуальное значение прокрутки

  useEffect(() => {
    const handleWheel = event => {
      const scrollDelta = event.deltaY;
      const newScroll = currentScroll + scrollDelta;

      // Проверка для передачи прокрутки документу
      if (newScroll < 0 || newScroll > maxScroll) {
        return;
      }

      event.preventDefault();
      setCurrentScroll(newScroll);
    };

    const blockElement = blockRef.current;
    if (blockElement) {
      blockElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (blockElement) {
        blockElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, [currentScroll, maxScroll]);

  // Единая логика для всех текстовых блоков
  const getTextItemStyle = () => {
    const offset = (currentScroll / maxScroll) * 50;

    // Все текстовые блоки будут сдвигаться на одну и ту же величину
    return {
      ...styles.textItem,
      transform: `translateY(${-offset}px)`,
    };
  };

  return (
    <div style={styles.scrollSection} ref={blockRef}>
      <div style={styles.textContainer}>
        <div style={getTextItemStyle()}>Текст 1</div>
        <div style={getTextItemStyle()}>Текст 2</div>
        <div style={getTextItemStyle()}>Текст 3</div>
      </div>
    </div>
  );
};

export default ScrollInteractiveBlock;
