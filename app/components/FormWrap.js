import React from 'react'

const FormWrap = ({ children }) => {
  return (
    <div className='min-h-fit h-full flex items-center justify-center  '>
      <div className='max-w-[650px] w-full flex flex-col gap-6 items-center   rounded-box p-4 md:p-8   bg-base-200 border-2 border-primary  shadow-lg  '>
        {children}
      </div>
    </div>
  )
}

export default FormWrap
