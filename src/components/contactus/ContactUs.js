import contactuspic from '../../assets/images/contactus-pic.jpg';
import contactuspic2 from '../../assets/images/contact-us-pic2.jpg';
import contactuspic3 from '../../assets/images/contact-us-pic3.jpg';

const ContactUs = () => {
  console.log(contactuspic); // For debugging; should log the image URL

  return (
    <div className='flex flex-col md:flex-row  items-end min-h-screen w-full z-[11] bg-[#fbf5ee] px-4 sm:px-6 lg:px-8'>
      <div className='flex flex-col md:flex-row hero-section h-[90vh] w-full bg-white'>
        <div
          className='h-[50vh] md:h-full border-2 border-black flex-1'
          style={{
            backgroundImage: `url(${contactuspic})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className='flex flex-1 flex-col justify-center items-center border-2 border-black p-4 sm:p-6 lg:p-8'>
          <div className='flex flex-col justify-center transition-all duration-400 p-4 sm:p-6 lg:p-12 xl:p-16'>
            <h2
              className='mb-4 transition-all duration-500
             text-center rotate-[-2deg] text-3xl sm:text-4xl lg:text-5xl mb-[-1rem] text-yellow-500 font-semibold'
            >
              Свяжитесь с нами
            </h2>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-center transition-all duration-700 text-[#2d1e0f]'>
              Выбирайте лучшее
            </h1>
          </div>
          <form className='w-full max-w-md space-y-4 mt-6'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <input
                type='text'
                placeholder='First Name'
                className='flex-1 p-3 border border-[#e8e1d9] rounded-md bg-[#fefaf6] text-[#2d1e0f] focus:outline-none focus:ring-2 focus:ring-yellow-500'
                required
              />
              <input
                type='text'
                placeholder='Last Name'
                className='flex-1 p-3 border border-[#e8e1d9] rounded-md bg-[#fefaf6] text-[#2d1e0f] focus:outline-none focus:ring-2 focus:ring-yellow-500'
                required
              />
            </div>
            <input
              type='email'
              placeholder='Email'
              className='w-full p-3 border border-[#e8e1d9] rounded-md bg-[#fefaf6] text-[#2d1e0f] focus:outline-none focus:ring-2 focus:ring-yellow-500'
              required
            />
            <textarea
              placeholder='Your Message'
              className='w-full p-3 border border-[#e8e1d9] rounded-md bg-[#fefaf6] text-[#2d1e0f] focus:outline-none focus:ring-2 focus:ring-yellow-500 h-32 resize-none'
              required
            ></textarea>
            <button
              type='submit'
              className='w-full p-3 bg-yellow-500 text-[#2d1e0f] rounded-md hover:bg-yellow-500 transition-all duration-300'
            >
              Отправить сообщение
            </button>
          </form>
          <div className='mt-8 text-center text-[#2d1e0f]'>
            <h3 className='text-xl sm:text-2xl font-semibold mb-4'>
              Наши контакты
            </h3>
            <p className='text-sm sm:text-base'>
              <a href='tel:Тел.: +99362145-678'>Тел.: +993 62 145-678</a>
            </p>
            <p className='text-sm sm:text-base'>
              <a href='mailto:contact@company.com'>Email: contact@online.com</a>
            </p>
            <p className='text-sm sm:text-base'>
              Address: 123 Excellence Way, Best City, BC 12345
            </p>
            <div className='flex justify-center gap-4 mt-4'>
              <a
                href='#'
                className='text-yellow-500 hover:text-yellow-600 transition-all duration-300'
              >
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.22-1.79L9 14v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' />
                </svg>
              </a>
              <a
                href='#'
                className='text-yellow-500 hover:text-yellow-600 transition-all duration-300'
              >
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.91 8-4.94 8-9.95z' />
                </svg>
              </a>
              <a
                href='#'
                className='text-yellow-500 hover:text-yellow-600 transition-all duration-300'
              >
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26h-.01c-.9 0-1.73.35-2.34.96a3.3 3.3 0 00-2.35-.96H7.76a3.26 3.26 0 00-3.26 3.26v5.3m4.5-9.1c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5S13.88 6.4 12.5 6.4s-2.5 1.12-2.5 2.5zm7 9.1c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5z' />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
