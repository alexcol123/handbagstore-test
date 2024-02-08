'use client'

import Avatar from '../../../components/Avatar'
import Heading from '../../../components/Heading'
import ProductShowRating from '../../../components/products/ProductShowRating'
import moment from 'moment'

const ListRating = ({ product }) => {
  return (
    <div>
      <Heading title='Product Reviews' />
      <div className='text-sm mt-2'>
        {product.reviews &&
          product.reviews.map((review) => {
            return (
              <div
                key={review.id}
                className='w-full  sm:max-w-[330px] bg-base-200/40 border border-slate-500/20 rounded-xl p-2 shadow my-4'
              >
                <div className='flex flex-col gap-x-2  items-center justify-center '>
                  <div className='flex items-center  gap-2'>
                    <Avatar user={review.user.name} src={review?.user.image} />

                    <div className='flex flex-col  justify-center ml-2'>
                      <div className='font-semibold'>{review?.user.name}</div>
                      <div className='text-primary/70 text-xs'>
                        {moment(review.createdDate).fromNow()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-2  '>
                  <ProductShowRating productRating={review.rating} />
                  <div className='text-center px-6 max-h-[180px] overflow-y-scroll no-scrollbar '>
                    {review.comment}
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default ListRating
