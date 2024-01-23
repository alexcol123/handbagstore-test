'use client'
import Image from 'next/image'
import { useState } from 'react'
import ProductSaleBadge from './ProductSaleBadge'

const ProductImages = ({ cartProduct, product }) => {

console.log(product)

  const [curImg, setcurImg] = useState(0)


  return (
    <div className='flex flex-col md:flex-row  gap-4 p-2'>
      {/*  Image scroll */}
      <div className='flex flex-row md:flex-col order-last md:order-first  items-center gap-2 md:gap-2 lg:gap-3 max-h-[600px]  w-fit   md:overflow-y-scroll  '>
        {product.images.map((img, i) => {
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
                src={img}
                height={200}
                width={140}
                alt='product'
                className='w-20  h-full object-cover min-w-12 '
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
              src={product.images[curImg]}
              height={700}
              width={600}
              alt='product'
              className=' min-w-full h-[400px]  md:h-[600px]  lg:h-[700px] object-cover object-bottom transition duration-300  hover:scale-110    '
            />
          </div>
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 '>
            <a
              onClick={() =>
                curImg === 0
                  ? setcurImg(product.images.length - 1)
                  : setcurImg(curImg - 1)
              }
              className='btn btn-circle'
            >
              ❮
            </a>

            <a
              onClick={() =>
                curImg === product.images.length - 1
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
