import React from 'react'

const FormWrap = ({ children }) => {
  return (
    <div className='min-h-fit h-full flex items-center justify-center py-4 my-4  '>
      <div className='max-w-[450px] w-full flex flex-col gap-5 items-center   rounded-box p-4 md:p-8    bg-base-200/50 border-2 border-primary/20  shadow-lg  '>
        {children}
      </div>
    </div>
  )
}

export default FormWrap
