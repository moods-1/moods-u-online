import React from 'react';

import { NothingHere } from '../assets';

const NothingToSeeHere = () => {
  return (
    <div className='w-full'>
      <p className='text-xl sm:text-4xl font-medium text-center'>Nothing to see here.</p>
          <img src={NothingHere} alt='nothing to see' className='mx-auto w-full sm:w-96' />
    </div>
  )
}

export default NothingToSeeHere