'use client'

import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import { useForm } from 'react-hook-form'
import { FaSearch } from 'react-icons/fa'

const NavSearch = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      searchTerm: '',
    },
  })

  const onSubmit = async (data) => {
    if (!data.searchTerm) return router.push('/')

    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: { searchTerm: data.searchTerm },
      },
      { skipNull: true }
    )

    router.push(url)
  }

  return (
    <div className='w-full flex items-center justify-center '>
      <form className='flex  '>
        <input
          {...register('searchTerm')}
          type='text'
          placeholder='Search'
          className='input input-bordered w-full h-10  rounded-r-none  '
        />
        <button
          onClick={handleSubmit(onSubmit)}
          className='input w-12 h-10  rounded-l-none text-primary border border-primary/50'
        >
          <FaSearch size={22} />
        </button>
      </form>
    </div>
  )
}

export default NavSearch
