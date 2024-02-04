import React from 'react'

const ActionBtn = ({ icon: Icon, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center rounded cursor-pointer w-[40px] h-[30px]  border border-primary/60 hover:bg-primary hover:text-primary-content transition duration-500 ${
        disabled && 'opacity-50 cursor-not-allowed'
      } `}
    >
      <Icon size={18} />
    </button>
  )
}

export default ActionBtn
