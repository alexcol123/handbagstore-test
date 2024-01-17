// Next share
import { FacebookShareButton, FacebookIcon } from 'next-share'



const Share = () => {
  console.log(img)
  return (
    <div>
      <FacebookShareButton
        url={'https://handbagstore-test-3.vercel.app/product/1'}
        quote={'Inside product page best prices on new handbags.'}
        hashtag={'#handbags'}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </div>
  )
}

export default Share
