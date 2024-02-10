'use client'
import Heading from '@/app/components/Heading'
import { formatPrice } from '@/utils/formatPrice'
import { useState, useEffect } from 'react'

import { MdOutlineAttachMoney, MdMoneyOffCsred } from 'react-icons/md'
import { TbUsers } from 'react-icons/tb'
import { BsCashStack } from 'react-icons/bs'
import { FaRegEye } from 'react-icons/fa'
import { MdOutlineAddShoppingCart } from 'react-icons/md'
import { Icon } from '@mui/material'
import { formatNumber } from '@/utils/formatNumber'

const SummaryPage = ({ products, orders, users }) => {
  const [summaryData, setsummaryData] = useState({
    sale: {
      label: 'Total Sale',
      digit: 0,
      bgColor: 'bg-primary',
      textColor: 'text-primary-content',
      Icon: <BsCashStack size={25} />,
    },
    products: {
      label: 'Total Products',
      digit: 0,
      bgColor: 'bg-secondary',
      textColor: 'text-secondary-content',
      Icon: <MdOutlineAddShoppingCart size={25} />,
    },
    orders: {
      label: 'Total Orders',
      digit: 0,
      bgColor: 'bg-accent',
      textColor: 'text-accent-content',
      Icon: <FaRegEye size={25} />,
    },
    paidOrders: {
      label: 'Paid Orders',
      digit: 0,
      bgColor: 'bg-success',
      textColor: 'text-success-content',
      Icon: <MdOutlineAttachMoney size={25} />,
    },
    unPaidOrders: {
      label: 'UnPaid Orders',
      digit: 0,
      bgColor: 'bg-error',
      textColor: 'text-error-content',
      Icon: <MdMoneyOffCsred size={25} />,
    },
    users: {
      label: 'Total Users',
      digit: 0,
      bgColor: 'bg-warning',
      textColor: 'text-warning-content',
      Icon: <TbUsers size={25} />,
    },
  })

  useEffect(() => {
    setsummaryData((prev) => {
      let tempData = { ...prev }

      const totalSale = orders.reduce((acc, item) => {
        if (item.status === 'complete') {
          return acc + item.amount
        } else {
          return acc
        }
      }, 0)

      const paidOrders = orders.filter((order) => {
        return order.status === 'complete'
      })

      const unPaidOrders = orders.filter((order) => {
        return order.status !== 'pending'
      })

      tempData.sale.digit = totalSale
      tempData.orders.digit = orders.length
      tempData.paidOrders.digit = paidOrders.length
      tempData.unPaidOrders.digit = unPaidOrders.length
      tempData.products.digit = products.length
      tempData.users.digit = users.length

      return tempData
    })
  }, [orders, products, users])

  const summaryKeys = Object.keys(summaryData)

  return (
    <div>
      <div className='m-10 grid gap-5 sm:grid-cols-3 mx-auto max-w-screen-lg'>
        {summaryKeys &&
          summaryKeys.map((key) => {
            return (
              <div
                key={key}
                className='group relative px-4 py-6  flex flex-col items-center justify-center rounded-md shadow-lg bg-base-200/50 border border-base-300 hover:bg-base-200/20'
              >
                <div className='absolute -top-2 -left-2 shadow-md group-hover:-top-4 group-hover:scale-105 duration-300'>
                  <div
                    className={`w-14 h-14  rounded-md flex items-center justify-center   ${
                      summaryData[key].bgColor && summaryData[key].bgColor
                    } ${
                      summaryData[key].textColor && summaryData[key].textColor
                    } `}
                  >
                    {summaryData[key].Icon}
                  </div>
                </div>
                <div className='text-primary  mt-5 text-xl mb-4'>
                  {summaryData[key].label}
                </div>

                <p className='mt-2 font-semibold  text-3xl'>
                  {summaryData[key].label === 'Total Sale' ? (
                    <>{formatPrice(summaryData[key].digit)}</>
                  ) : (
                    <>{formatNumber(summaryData[key].digit)}</>
                  )}
                </p>

                {/* <span className='text-xs text-gray-400'>+4.9%</span> */}
              </div>
            )
          })}
      </div>

      <div className='flex w-full flex-col gap-4 mx-auto bg-base-300 p-5 my-40 '>
        <Heading title={'Mongo Charts'} center />
        <iframe
          style={{ margin: 'auto', padding: '8px' }}
          width='640'
          height='480'
          src='https://charts.mongodb.com/charts-mern-knrbk/embed/charts?id=65c67cb8-b4b7-4926-8b4d-4d00a628dd1f&maxDataAge=3600&theme=light&autoRefresh=true'
        ></iframe>

        <iframe
          style={{ margin: 'auto', padding: '8px' }}
          width='640'
          height='480'
          src='https://charts.mongodb.com/charts-mern-knrbk/embed/charts?id=65c68a66-d8af-409d-824d-783fcf85bb42&maxDataAge=3600&theme=light&autoRefresh=true'
        ></iframe>
      </div>
    </div>
  )
}

export default SummaryPage
