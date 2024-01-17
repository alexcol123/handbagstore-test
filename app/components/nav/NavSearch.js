import { FaSearch } from "react-icons/fa";

const NavSearch = () => {
  return (
    <div className='w-full flex items-center justify-center '>
      <div className="flex  ">
        <input type="text" placeholder="Search" className="input input-bordered w-full h-10  rounded-r-none  " />
        <button className='input w-12 h-10  rounded-l-none text-primary border border-primary/50'><FaSearch /></button>
      </div>
    </div>
  )
}

export default NavSearch