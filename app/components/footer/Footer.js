import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";



const Footer = () => {
  return (
    <div className="bg-base-300 mt-8">
      <div className="container mx-auto">
        <footer className="flex   justify-between py-12 ">

          <nav className="flex flex-col items-center gap-2  w-full ">
            <div className="flex flex-col gap-2">
              <header className="font-bold uppercase text-primary">Services</header>
              <a className="link link-hover">Branding</a>
              <a className="link link-hover">Design</a>
              <a className="link link-hover">Marketing</a>
              <a className="link link-hover">Advertisement</a>
            </div>
          </nav>


          <nav className="flex flex-col items-center gap-2  w-full ">
            <div className="flex flex-col gap-2">
              <h2 className="font-bold uppercase text-primary">Company</h2>
              <a className="link link-hover">About us</a>
              <a className="link link-hover">Contact</a>
              <a className="link link-hover">Jobs</a>
              <a className="link link-hover">Press kit</a>
            </div>
          </nav>


          <nav className="flex flex-col items-center gap-2  w-full ">
            <header className="font-bold uppercase text-primary">Social</header>
            <div className="flex gap-4 ">
              <a>
                <FaFacebook size={20} />
              </a>
              <a>
                <FaInstagram size={20} />
              </a>
              <a>
                <FaTwitter size={20} />

              </a>
            </div>
          </nav>
        </footer>

      </div>

    </div>
  )
}

export default Footer