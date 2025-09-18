import { useState } from 'react';
import './header.css';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '#', label: 'Home' },
    { href: '#', label: 'Brands' },
    { href: '#', label: 'Products' },
    { href: '#', label: 'Locations' },
  ];

  return (
    <header className='fixed w-full z-[100] px-4 header-animate'>
      {/* Desktop header */}
      <div className='hidden lg:flex h-[60px] items-center justify-between px-6 w-full bg-white border-2 border-gray-200 rounded-md capitalize py-[2rem]'>
        <div className='flex-1 font-[400] text-[1rem] flex gap-4'>
          <a
            href='#'
            className='block border-b-2 border-white hover:border-yellow-500'
          >
            Home
          </a>
          <a
            href='#'
            className='block border-b-2 border-white hover:border-yellow-500'
          >
            Brands
          </a>
        </div>

        <div className='grow relative text-center'>
          <h1 className='font-[400] italic text-[1.2rem]'>Hoştap</h1>
          <h1 className='font-[400] italic text-[1.2rem]'>
            Доставляем быстро, поставляем надёжно
          </h1>
        </div>

        <div className='flex-1 font-[400] text-[1rem] flex gap-6 justify-end'>
          <a
            href='#'
            className='block border-b-2 border-white hover:border-yellow-500'
          >
            Products
          </a>
          <a
            href='#'
            className='block border-b-2 border-white hover:border-yellow-500'
          >
            Locations
          </a>
        </div>
      </div>

      {/* Mobile/Tablet header */}
      <div className='lg:hidden flex items-center justify-between bg-white border-2 border-gray-200 rounded-md px-6 py-[2rem]'>
        <h1 className='font-[400] italic text-[1.2rem]'>Hoştap</h1>

        {/* Second headline */}
        <h1 className='font-[400] italic text-[1rem] text-center flex-1'>
          Доставляем быстро, поставляем надёжно
        </h1>

        {/* Burger button */}
        <button
          className='relative w-8 h-6 flex flex-col justify-between items-center ml-4 z-[10]'
          onClick={() => setIsOpen(!isOpen)}
          aria-label='Toggle menu'
        >
          <span
            className={`block h-[3px] w-full bg-black rounded transition-transform duration-300 ${
              isOpen ? 'rotate-45 translate-y-[9px]' : ''
            }`}
          />
          <span
            className={`block h-[3px] w-full bg-black rounded transition-opacity duration-300 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block h-[3px] w-full bg-black rounded transition-transform duration-300 ${
              isOpen ? '-rotate-45 ' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <nav
        className={`lg:hidden fixed left-0 w-full bg-white border-t border-gray-200 shadow-md transition-all duration-500 overflow-hidden ${
          isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className='flex flex-col gap-4 py-[2rem] px-6 text-[1.1rem] font-[400] capitalize'>
          {links.map((link, i) => (
            <li key={i}>
              <a
                href={link.href}
                className='block border-b-2 border-white hover:border-yellow-500 transition-colors'
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
