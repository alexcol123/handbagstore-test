// Next share
import { FacebookShareButton, FacebookIcon } from 'next-share'

export const metadata = {
  title: 'Handbag Store',
  description: 'Handbags at the best prices buy today',
  metadataBase: new URL('https://handbagstore-test-3.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    images: [{ url: '../../../../public/yellow.jpg' }],
  },
}

const Share = () => {
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
