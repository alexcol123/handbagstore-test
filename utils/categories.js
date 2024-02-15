import { AiFillPhone, AiOutlineDesktop, AiOutlineLaptop } from 'react-icons/ai'
import {
  MdOutlineDesk,
  MdOutlineWatch,
  MdStorefront,
  MdTv,
  MdWatch,
} from 'react-icons/md'
import { RiHandbagLine } from 'react-icons/ri'
import { LiaGlassesSolid } from 'react-icons/lia'
import { PiHighHeelLight } from 'react-icons/pi'
import { MdDiscount } from 'react-icons/md'
import { GiPearlNecklace } from 'react-icons/gi'

export const categories = [
  { href: '#', name: 'handbags', icon: RiHandbagLine },
  { href: '#', name: 'watches', icon: MdOutlineWatch },
  { href: '#', name: 'sunglasses', icon: LiaGlassesSolid },
  { href: '#', name: 'shoes', icon: PiHighHeelLight },
  { href: '#', name: 'accessories', icon: GiPearlNecklace },
]

export const menuLinks = [
  { href: '#', name: 'all' },
  { href: '#', name: 'sale' },

  // Include all categories above
  ...categories,

  { href: '#', name: 'clearance', icon: MdDiscount, color: true },
]
