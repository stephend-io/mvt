export const SizeShower = () => (
  <div>
    <div className='absolute top-5 left-5 bg-lime-700 p-2 rounded-lg sm:invisible'>
      xs
    </div>
    <div className='absolute top-5 left-5 bg-red-700 p-2 rounded-lg invisible sm:visible md:invisible'>
      sm
    </div>
    <div className='absolute top-5 left-5 bg-violet-700 p-2 rounded-lg invisible md:visible lg:invisible'>
      md
    </div>
    <div className='absolute top-5 left-5 bg-yellow-700 p-2 rounded-lg invisible lg:visible xl:invisible'>
      lg
    </div>
    <div className='absolute top-5 left-5 bg-slate-200 p-2 rounded-lg invisible xl:visible'>
      xl
    </div>
  </div>
);
