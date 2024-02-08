import Image from 'next/image'
import { FaUserCircle } from 'react-icons/fa'

const Avatar = ({ src, user, widthSize = 10 }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt='avatar'
        className='rounded-full  w-20 h-20 object-cover '
        height={100}
        width={100}
      />
    )
  }

  //  return ( <FaUserCircle  size={30}  /> )

  return (
    <div
      className={` flex items-center justify-center  w-20 h-20 text-slate-200 bg-primary rounded-full text-2xl font-bold capitalize  ${
        widthSize && 'w-20 h-20 text-5xl'
      }`}
    >
      {user?.substring(0, 1)}
    </div>
  )
}

export default Avatar
