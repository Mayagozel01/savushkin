const Footer = () => {
  return (
    <footer className='bg-black text-[#fbf5ee] py-8 mt-16'>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='flex flex-col md:flex-row md:justify-between space-y-8 md:space-y-0 md:space-x-8 text-center md:text-left'>
          {/* Контактная информация */}
          <div className='flex-1'>
            <h3 className='font-bold text-lg mb-4 text-yellow-500'>Контакты</h3>
            <p className='mb-2'>
              <strong>Телефон:</strong>{' '}
              <a href='tel:+9931234567'>+993 23-45-67</a>
            </p>
            <p className='mb-2'>
              <strong>Email:</strong>{' '}
              <a href='mailto:info@вашдистрибьютор.ru'>
                {' '}
                info@вашдистрибьютор.ru
              </a>
            </p>
            <p className='mb-2'>
              <strong>Адрес:</strong> г. Москва, ул. Примерная, 10
            </p>
            <p className='mb-2'>
              <strong>Время работы:</strong> Пн-Пт, 9:00 - 18:00
            </p>
          </div>

          {/* Навигация */}
          <div className='flex-1'>
            <h3 className='font-bold text-lg mb-4 text-yellow-500'>
              Навигация
            </h3>
            <ul className='space-y-2'>
              <li>
                <a
                  href='/about'
                  className='hover:text-yellow-500 transition-colors duration-200'
                >
                  О нас
                </a>
              </li>
              <li>
                <a
                  href='/products'
                  className='hover:text-yellow-500 transition-colors duration-200'
                >
                  Продукты
                </a>
              </li>
              <li>
                <a
                  href='/partnership'
                  className='hover:text-yellow-500 transition-colors duration-200'
                >
                  Сотрудничество
                </a>
              </li>
              <li>
                <a
                  href='/news'
                  className='hover:text-yellow-500 transition-colors duration-200'
                >
                  Новости
                </a>
              </li>
            </ul>
          </div>

          {/* Социальные сети */}
          <div className='flex-1'>
            <h3 className='font-bold text-lg mb-4 text-yellow-500'>
              Мы в соцсетях
            </h3>
            <div className='flex justify-center md:justify-start space-x-4'>
              <a
                href='#'
                aria-label='Facebook'
                className='hover:text-yellow-500 transition-colors duration-200'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  className='w-8 h-8' // ИЗМЕНЕНО: теперь иконка 32x32px
                >
                  <path
                    fill='currentColor'
                    d='M12.001 2c-5.523 0-10 4.477-10 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89c1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.344 21.129 22 16.992 22 12c0-5.523-4.477-10-10-10'
                  />
                </svg>
              </a>
              <a
                href='#'
                aria-label='Instagram'
                className='hover:text-yellow-500 transition-colors duration-200'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  className='w-8 h-8' // ИЗМЕНЕНО: теперь иконка 32x32px
                >
                  <path
                    fill='currentColor'
                    fillRule='evenodd'
                    d='M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1M12 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6m-5 3a5 5 0 1 1 10 0a5 5 0 0 1-10 0'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </a>
              <a
                href='#'
                aria-label='Telegram'
                className='hover:text-yellow-500 transition-colors duration-200'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  className='w-8 h-8' // ИЗМЕНЕНО: теперь иконка 32x32px
                >
                  <path
                    fill='currentColor'
                    d='m16.463 8.846l-1.09 6.979a.588.588 0 0 1-.894.407l-3.65-2.287a.588.588 0 0 1-.095-.923l3.03-2.904c.034-.032-.006-.085-.046-.061l-4.392 2.628a1.23 1.23 0 0 1-.87.153l-1.59-.307c-.574-.111-.653-.899-.114-1.122l8.502-3.515a.882.882 0 0 1 1.21.952'
                  ></path>
                  <path
                    fill='currentColor'
                    fillRule='evenodd'
                    d='M12 1.706C6.315 1.706 1.706 6.315 1.706 12S6.315 22.294 12 22.294S22.294 17.685 22.294 12S17.685 1.706 12 1.706M3.47 12a8.53 8.53 0 1 1 17.06 0a8.53 8.53 0 0 1-17.06 0'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Авторское право и юридическая информация */}
        <div className='mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400'>
          <p>&copy; 2024 Название компании. Все права защищены.</p>
          <div className='mt-2 space-x-4'>
            <a
              href='/privacy'
              className='hover:text-yellow-500 transition-colors duration-200'
            >
              Политика конфиденциальности
            </a>
            <a
              href='/terms'
              className='hover:text-yellow-500 transition-colors duration-200'
            >
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
