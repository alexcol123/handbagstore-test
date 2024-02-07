'use client'

import { useState, useEffect } from 'react'

//  'light', 'dark', 'emerald', 'winter', ,'forest', 'retro', 'aqua', 'luxury'
const themes = [
  { ariaLabel: 'light', value: 'light' },
  { ariaLabel: 'dark', value: 'dark' },
  { ariaLabel: 'emerald', value: 'emerald' },
  { ariaLabel: 'winter', value: 'winter' },
  { ariaLabel: 'forest', value: 'forest' },
  { ariaLabel: 'retro', value: 'retro' },
  { ariaLabel: 'aqua', value: 'aqua' },
  { ariaLabel: 'luxury', value: 'luxury' },
  { ariaLabel: 'cupcake', value: 'cupcake' },
  { ariaLabel: 'bumblebee', value: 'bumblebee' },
  { ariaLabel: 'corporate', value: 'corporate' },
  { ariaLabel: 'synthwave', value: 'synthwave' },
  { ariaLabel: 'cyberpunk', value: 'cyberpunk' },
  { ariaLabel: 'valentine', value: 'valentine' },
  { ariaLabel: 'halloween', value: 'halloween' },
  { ariaLabel: 'garden', value: 'garden' },
  { ariaLabel: 'lofi', value: 'lofi' },
  { ariaLabel: 'pastel', value: 'pastel' },
  { ariaLabel: 'fantasy', value: 'fantasy' },
  { ariaLabel: 'wireframe', value: 'wireframe' },
  { ariaLabel: 'black', value: 'black' },
  { ariaLabel: 'dracula', value: 'dracula' },
  { ariaLabel: 'cmyk', value: 'cmyk' },
  { ariaLabel: 'autumn', value: 'autumn' },
  { ariaLabel: 'business', value: 'business' },
  { ariaLabel: 'acid', value: 'acid' },
  { ariaLabel: 'lemonade', value: 'lemonade' },
  { ariaLabel: 'night', value: 'night' },
  { ariaLabel: 'coffee', value: 'coffee' },
  { ariaLabel: 'dim', value: 'dim' },
  { ariaLabel: 'nord', value: 'nord' },
  { ariaLabel: 'sunset', value: 'sunset' },
]

// 'light', 'dark','forest', 'winter', 'retro', 'aqua', 'luxury'
const ThemeToggle = () => {
  // const [themeVal, setthemeVal] = useState(
  //   localStorage.getItem('bgThemecolor')
  //     ? localStorage.getItem('bgThemecolor')
  //     : 'light'
  // )

  let themeCol = 'light'

  if (typeof window !== 'undefined') {
    // Perform localStorage action
    themeCol = localStorage.getItem('bgThemecolor')
  }

  const [themeVal, setthemeVal] = useState('light')

  // console.log(themeVal)

  const handleChange = (val) => (
    setthemeVal(val), localStorage.setItem('bgThemecolor', val)
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeVal)
  }, [themeVal])

  useEffect(() => {
    // Perform localStorage action
    if (localStorage.getItem('bgThemecolor')) {
      setthemeVal(localStorage.getItem('bgThemecolor'))
    }
  }, [])

  return (
    <div className=''>
      <div className='dropdown  border border-primary rounded-md '>
        <div tabIndex={0} role='button' className='btn btn-xs'>
          {themeVal}
        </div>

        <ul
          tabIndex={0}
          className='dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-40'
        >
          {themes.map((theme) => (
            <li key={theme.value}>
              <input
                type='radio'
                name='theme-dropdown'
                className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
                aria-label={theme.ariaLabel}
                value={themeVal | 'light'}
                onChange={(e) => handleChange(theme.value)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default ThemeToggle
