import React from 'react'

const ProductColorOptions = ({ colors }) => {
  return (
    <div className={` flex items-center justify-center gap-1`}>
      {colors.length > 1 &&
        colors.map((item, i) => {
          // console.log('item ---- ', item)

          return (
            <div
              key={i}
              className={`rounded-full  border border-slate-300   w-3 h-3 `}
              style={{ backgroundColor: item.colorCode }}
            ></div>
          )
        })}
    </div>
  )
}

export default ProductColorOptions
