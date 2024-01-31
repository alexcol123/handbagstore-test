import { useState } from 'react'

const Select = ({
  id,
  label,
  type,
  disabled,
  register,
  required,
  errors,

  isOnSaleVal,
}) => {
  return (
    <div>
      <select
        id={id}
        {...register(id, { required })}
        disabled={disabled}
        placeholder=''
        type={type}
        className={`select select-primary w-full max-w-xs  ${
          errors[id] ? 'border-error   ' : 'border-slate-300'
        }
      ${errors[id] ? 'focus:border-error ' : 'focus:border-slate-300'}`}
        defaultValue={isOnSaleVal}
        htmlFor={id}
      >
        <option value='no'>No</option>
        <option value='sale'>Sale</option>
        <option value='clearance'>Clearance </option>
      </select>
    </div>
  )
}

export default Select
