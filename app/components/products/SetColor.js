'use client'

import React from 'react'

const SetColor = ({ images, cartProduct, handleColorSelect }) => {

  //console.log(images)
  // console.log(images , cartProduct, handleColorSelect)

  //product.images[0].image[0]
  return (
    <div>
      <div className='flex gap-4 items-center'>
        <span className='font-semibold'>Color</span>
        <div className='flex gap-3 md:gap-1'>
          {images.map((image, i) => {
            // console.log(image.color)

            // console.log('image ========================')
            // console.log(cartProduct.currentColor, image.color)
            // console.log(cartProduct.currentColor === image.color)
            return (
              <div
                onClick={() => handleColorSelect(image, i)}
                key={i}
                className={`h-7 w-7 rounded-full  flex items-center justify-center
             ${cartProduct.currentColor === image.color ?  'border-4  border-success' : ''} 
                `}
              >
                <div
                  style={{ background: image.colorCode }}
                  className={` h-5 w-5 rounded-full border-[1px] cursor-pointer`}
                ></div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SetColor
