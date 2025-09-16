export function Header() {
  return (
    <div className='header fixed w-full px-4 z-[100]'>
      <div className=' h-[60px] flex items-center justify-between px-6 w-full bg-white border-2 border-gray-200 rounded-md capitalize  py-[2rem]'>
        <div className='flex-1 font-[400] text-[1rem] flex gap-4 '>
          <a
            href='#'
            className='block border-b-2 border-white  hover:border-yellow-500'
          >
            Home
          </a>
          <a
            href='#'
            className='block border-b-2 border-white  hover:border-yellow-500'
          >
            Brands
          </a>
        </div>
        <div className='grow flex justify-center text-center'>
          <h1 className='font-[700] '>Доставляем быстро, поставляем надёжно</h1>
        </div>
        <div className='flex-1  font-[400] text-[1rem] flex gap-6 justify-end'>
          <a
            href='#'
            className='block border-b-2 border-white  hover:border-yellow-500'
          >
            products
          </a>
          <a
            href='#'
            className='block border-b-2 border-white  hover:border-yellow-500'
          >
            locations
          </a>
        </div>
      </div>
    </div>
  );
}
