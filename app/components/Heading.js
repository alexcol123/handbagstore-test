import React from 'react'

const Heading = ({title, center}) => {
  return (
    <div className={center ? 'text-center' : 'text-left' }>
      <h1 className="font-bold text-2xl ">{title}</h1>
    </div>
  )
}

export default Heading
