'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import React, { useCallback } from 'react'

const CatergoryItem = ({ name, href, color, icon: Icon, selected }) => {
  const router = useRouter()
  const params = useParams()

  const handleClick = useCallback(() => {
    if (name === 'all') {
      router.push('/')
      return
    } else if (name === 'sale' || name === 'clearance') {
      let currentQuery = {}

      const updatedQuery = {
        ...currentQuery,
        isOnSale: name,
      }
      const url = queryString.stringifyUrl(
        { url: '/', query: updatedQuery },
        { skipNull: true }
      )

      router.push(url)
   
      return
    } else {
      let currentQuery = {}
      if (params) {
        currentQuery = queryString.parse(params.toString)
      }

      // console.log(params)
      // console.log('-----------')
      // console.log(currentQuery)

      const updatedQuery = {
        ...currentQuery,
        category: name.toLowerCase(),
      }

      const url = queryString.stringifyUrl(
        { url: '/', query: updatedQuery },
        { skipNull: true }
      )

      router.push(url)
    }
  }, [])

  //name, params, router

  return (
    <div
      onClick={() => handleClick()}
      key={name}
      href={href}
      className={`py-1 pl-3 hover:text-primary hover:bg-base-200 w-full h-full   ${
        color && 'text-error font-semibold cursor-pointer transition '
      }
      ${selected && 'bg-primary/20 '}


       `}
    >
      <div className='flex items-center justify-center gap-1'>
        <span className='hidden md:flex'> {name}</span>
        {Icon && (
          <span className='text-primary text-xl md:text-sm'>
            <Icon className={color && 'text-error'} />
          </span>
        )}
      </div>
    </div>
  )
}

export default CatergoryItem
