'use client'
import Image from 'next/image'
import { useState } from 'react'
import ProductSaleBadge from './ProductSaleBadge'

const ProductImages = ({ cartProduct, product }) => {
  const [curImg, setcurImg] = useState(0)

  // console.log(curImg)

  const imageList = product.colors.filter(
    (img) => img.color === cartProduct.currentColor
  )

  const imageArr = imageList[0].image

  return (
    <div className='flex  gap-4 p-2'>
      <div className='flex flex-col  items-center gap-0 md:gap-2 lg:gap-3 max-h-[600px]  w-fit overflow-y-scroll '>
        {imageArr.map((img, i) => {
          // console.log(img)

          return (
            <div
              key={i}
              onClick={() => setcurImg(+i)}
              className={`${
                i === curImg &&
                'rounded-sm  border-2 border-primary/60  transition duration-300 '
              } `}
            >
              <Image
                priority
                src={imageArr[i]}
                height={200}
                width={140}
                alt='product'
                className='w-20  h-full object-cover'
              />
            </div>
          )
        })}
      </div>

      {/* Main */}

      <div className='carousel w-full'>
        <div className='carousel-item relative w-full flex '>
          <div className='relative overflow-hidden h-fit '>
            <Image
              priority
              src={imageArr[curImg]}
              height={700}
              width={600}
              alt='product'
              className=' min-w-full h-[700px] object-cover object-center flex-1 transition duration-300  hover:scale-110   '
            />
          </div>
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 '>
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
    </div>
  )
}

export default ProductImages
