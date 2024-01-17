'use client'
import Image from 'next/image'
import { useState } from 'react'
import ProductSaleBadge from './ProductSaleBadge'

const ProductImages = ({ cartProduct, product }) => {
  const [curImg, setcurImg] = useState(0)

  console.log(curImg)

  const imageList = product.colors.filter(
    (img) => img.color === cartProduct.currentColor
  )

  const imageArr = imageList[0].image

  return (
    <div className='carousel w-full'>
      <div className='carousel-item relative w-full flex'>
        <Image
          priority
          src={imageArr[curImg]}
          height={700}
          width={600}
          alt='product'
          className=' w-full h-full object-cover  flex-1 transition duration-300  hover:scale-110  '
        />
        <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
          <a
            onClick={() =>
              curImg === 0
                ? setcurImg(imageArr.length - 1)
                : setcurImg(curImg - 1)
            }
            className='btn btn-circle'
          >
            ❮
          </a>

          <a
            onClick={() =>
              curImg === imageArr.length - 1
                ? setcurImg(0)
                : setcurImg(curImg + 1)
            }
            className='btn btn-circle'
          >
            {' '}
            ❯
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProductImages
