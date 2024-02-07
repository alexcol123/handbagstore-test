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
import { MdDiscount } from "react-icons/md";
import { GiPearlNecklace } from 'react-icons/gi'

export const menuLinks = [
  { href: '#', name: 'all' },
  { href: '#', name: 'sale' },
  { href: '#', name: 'handbags', icon: RiHandbagLine },
  { href: '#', name: 'watches', icon: MdOutlineWatch },
  { href: '#', name: 'sunglasses', icon: LiaGlassesSolid },
  { href: '#', name: 'shoes', icon: PiHighHeelLight },
  { href: '#', name: 'accesories', icon: GiPearlNecklace },
  { href: '#', name: 'clearance',icon: MdDiscount , color: true },
]

export const categories = [
  { href: '#', name: 'handbags', icon: RiHandbagLine },
  { href: '#', name: 'watches', icon: MdOutlineWatch },
  { href: '#', name: 'sunglasses', icon: LiaGlassesSolid },
  { href: '#', name: 'shoes', icon: PiHighHeelLight },
  { href: '#', name: 'accesories', icon: GiPearlNecklace },
]
