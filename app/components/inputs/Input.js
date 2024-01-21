'use client'

import React from 'react'
import {
  Field,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form'

const Input = ({ id, label, type, disabled, register, required, errors }) => {
  return (
    <form className='w-full  relative'>
      <input
        autoComplete='off'
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=''
        type={type}
        className={`
        peer
      w-full 
      p-4
      pt-6
  
      border-2 
      rounded-box
      transition 
     disabled:opacity-70
     disabled:cursor-not-allowed
     ${errors[id] ? 'border-error   ' : 'border-slate-300'}
     ${errors[id] ? 'focus:border-error ' : 'focus:border-slate-300'}
     `}
      />
      <label
        className={`absolute  cursor-text text-md duration-150 transform -translate-y-3  top-5 z-10  origin-[0] left-4 peer-placeholder-shown:scale-100  peer-placeholder-shown:translate-y-0 peer-fucus:scale-75 peer-fucus:-translate-y-4 text-neutral
        ${errors[id] ? ' text-red-500 ' : 'text-slate-400'}
        `}
        htmlFor={id}
      >
        {label}
      </label>
    </form>
  )
}

export default Input
