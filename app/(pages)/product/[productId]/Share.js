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

const Share = ({ url }) => {
  console.log(typeof url)
  return (
    <div className='bg-base-200/50 py-2 px-4 rounded'>
      <h2 className='text-center mb-2'>Share on Social Media</h2>
      <div className='flex gap-2'>
        <FacebookShareButton
          url={url}
          quote={'Inside product page best prices on new handbags.'}
          hashtag={'#handbags'}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <PinterestShareButton
          url={url}
          media={
            'next-share is a social share buttons for your next React apps.'
          }
        >
          <PinterestIcon size={32} round />
        </PinterestShareButton>

        <RedditShareButton
          url={url}
          title={
            'next-share is a social share buttons for your next React apps.'
          }
        >
          <RedditIcon size={32} round />
        </RedditShareButton>

        <TwitterShareButton
          url={url}
          title={
            'next-share is a social share buttons for your next React apps.'
          }
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <WhatsappShareButton
          url={url}
          title={
            'next-share is a social share buttons for your next React apps.'
          }
          separator=':: '
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>

        <LinkedinShareButton url={url}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>

        <FacebookMessengerShareButton url={url} appId={''}>
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>

        <EmailShareButton url={url} subject={'Next Share'} body='body'>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
    </div>
  )
}

export default Share
