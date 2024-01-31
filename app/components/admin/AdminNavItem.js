import React from 'react'

const AdminNavItem = ({ selected, icon: Icon, label }) => {
  return (
    <div
      className={`flex items-center justify-center text-center gap-1 p-2 border-b-2  cursor-pointer transition hover:bg-primary/10 duration-300  ${
        selected ? 'border-b-primary text-primary ' : 'border-transparent '
      }`}
    >
      <Icon size={20} />
      <div className='font-mediom text-sm text-center break-normal'>
        {label}
      </div>
    </div>
  )
}

export default AdminNavItem
