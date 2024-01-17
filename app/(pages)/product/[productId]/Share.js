// Next share
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  EmailShareButton,
  EmailIcon,
} from 'next-share'

const Share = () => {
  return (
    <div>
      <FacebookShareButton
        url={
          'https://handbagstore-test-3.vercel.app/product/64a4ebe300900d44bb50628a'
        }
        quote={'Inside product page best prices on new handbags.'}
        hashtag={'#handbags'}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <PinterestShareButton
        url={
          'https://handbagstore-test-3.vercel.app/product/64a4ebe300900d44bb50628a'
        }
        media={'next-share is a social share buttons for your next React apps.'}
      >
        <PinterestIcon size={32} round />
      </PinterestShareButton>

      <RedditShareButton
        url={
          'https://handbagstore-test-3.vercel.app/product/64a4ebe300900d44bb50628a'
        }
        title={'next-share is a social share buttons for your next React apps.'}
      >
        <RedditIcon size={32} round />
      </RedditShareButton>

      <TwitterShareButton
        url={
          'https://handbagstore-test-3.vercel.app/product/64a4ebe300900d44bb50628a'
        }
        title={'next-share is a social share buttons for your next React apps.'}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <WhatsappShareButton
        url={
          'https://handbagstore-test-3.vercel.app/product/64a4ebe300900d44bb50628a'
        }
        title={'next-share is a social share buttons for your next React apps.'}
        separator=':: '
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <LinkedinShareButton
        url={
          'https://handbagstore-test-3.vercel.app/product/64a4ebe300900d44bb50628a'
        }
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <FacebookMessengerShareButton
        url={
          'https://handbagstore-test-3.vercel.app/product/64a4ebe300900d44bb50628a'
        }
        appId={''}
      >
        <FacebookMessengerIcon size={32} round />
      </FacebookMessengerShareButton>

      <EmailShareButton
        url={
          'https://handbagstore-test-3.vercel.app/product/64a4ebe300900d44bb50628a'
        }
        subject={'Next Share'}
        body='body'
      >
        <EmailIcon size={32} round />
      </EmailShareButton>
    </div>
  )
}

export default Share
