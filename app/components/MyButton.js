'use client'
import React from 'react'
import { IconType } from 'react-icons'

const MyButton = ({ label, disabled, outline, small, icon: Icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
      btn
      btn-block
      disabled:opacity-60
      disabled:cursor-not-allowed
    hover:opacity-80
    transition
    flex items-center justify-center gap-8
    text-center	
    
    ${
      outline
        ? 'border border-primary text-primary  '
        : '    border-slate-500  bg-primary text-base-100 font-semibold'
    }
    ${small ? 'text-sm py-1 px-2 border-[1px] ' : 'text-md py-3 px-4 border-2 '}

    `}
    >
      <div>
        {Icon && <Icon size={24} />}
        {label}
      </div>
    </button>
  )
}

export default MyButton
