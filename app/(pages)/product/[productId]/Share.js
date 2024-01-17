'use client'
// Next share
import { FacebookShareButton, FacebookIcon } from 'next-share'

const Share = () => {
  return (
    <div>
      <FacebookShareButton
        url={'https://handbagstore-test-3.vercel.app/'}
        quote={'best prices on new handbags.'}
        hashtag={'#handbags'}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </div>
  )
}

export default Share
