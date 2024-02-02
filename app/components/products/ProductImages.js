'use client'
import Image from 'next/image'
import { useState } from 'react'
import ProductSaleBadge from './ProductSaleBadge'
import NoImage from '../../../public/noimg.jpg'

const ProductImages = ({ cartProduct, product }) => {
  // console.log(product)

  const [curImg, setcurImg] = useState(0)

  return (
    <div className='flex flex-col md:flex-row  gap-4 p-2      lg:max-h-[900px]  '>
      {/*  Image scroll */}
      <div
        className='flex flex-row md:flex-col order-last md:order-first   items-center gap-2 md:gap-2 lg:gap-3  w-fit    
 
      '
      >
        {product.images.map((img, i) => {
          // console.log(img)

          return (
            <div
              key={i}
              onClick={() => setcurImg(+i)}
              className={`${
                i === curImg &&
                'rounded-sm  border-2 border-primary  transition duration-300 p-[1px]'
              } `}
            >
              <Image
                src={img.image}
                height={200}
                width={140}
                alt='product'
                className='w-20  h-full object-contain min-w-12 transition duration-300  hover:scale-90   '
              />
            </div>
          )
        })}
      </div>

      {/* Main */}

      <div className='flex items-center justify-center'>
        <div className='carousel w-full  '>
          <div className='carousel-item relative w-full h-full flex   '>
            <div className='relative overflow-hidden h-fit  '>
              <Image
                priority
                src={
                  product.images.length ? product.images[curImg].image : NoImage
                }
                height={850}
                width={800}
                alt='product'
                className='   object-contain object-center transition duration-300  hover:scale-110    '
              />
            </div>
            <div className='absolute flex justify-between transform -translate-y-1/2 left-1 right-1 top-1/2  '>
              <div
                onClick={() =>
                  curImg === 0
                    ? setcurImg(product.images.length - 1)
                    : setcurImg(curImg - 1)
                }
                className='btn btn-circle bg-base-100  '
              >
                ❮
              </div>

              <div
                onClick={() =>
                  curImg === product.images.length - 1
                    ? setcurImg(0)
                    : setcurImg(curImg + 1)
                }
                className='btn btn-circle bg-base-100'
              >
                ❯
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductImages
