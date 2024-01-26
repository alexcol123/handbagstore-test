'use client'
import React from 'react'
import { IconType } from 'react-icons'

const MyButton = ({
  label,
  disabled,
  outline,
  small,
  icon: Icon,
  onClick,
  isLoading,
  btnBGColor,
  btnTextColor,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={` btn btn-block transition duration-300 flex items-center justify-center gap-8 text-center	btn-primary 
       ${btnBGColor && `btn-neutral ${btnBGColor} hover:border hover:border-primary `}
       ${btnTextColor && `${btnTextColor}`}
   
       ${isLoading && 'btn-loading opacity-70 disabled'}

       ${outline && 'btn-outline'}
       ${small && 'btn-small w-fit'}


     


    `}

      // ${isLoading && 'opacity-70 '}

      // ${disabled && 'btn-disabled cursor-not-allowed '}

      // ${
      //   outline
      //     ? ' border border-primary text-primary  '
      //     : ' border-slate-500  bg-primary text-base-100 font-semibold'
      // }
      // ${
      //   small
      //     ? 'text-sm py-1  border-[1px] w-fit '
      //     : 'text-md py-3 px-4 border-2 '
      // }
    >
      <div className='flex items-center justify-center gap-2'>
        {Icon && <Icon size={24} />}
        {label}
        {isLoading && <span className='loading loading-spinner'></span>}
      </div>
    </button>
  )
}

export default MyButton
