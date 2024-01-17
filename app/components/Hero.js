


const Hero = ({


  url = 'https://images.pexels.com/photos/220072/pexels-photo-220072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  opacity = '60',
  title = 'title',
  body = '',
  btnText = 'Get Started',
  showButton = false
}) => {
  return (
    <div className="hero h-[300px] my-8" style={{ backgroundImage: `url(${url})` }}>
      <div className={`hero-overlay bg-opacity-${opacity}`}></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-3xl">

          <h1 className="mb-5 text-5xl font-semibold">{title}</h1>
          <p className="mb-5 text-2xl">{body}</p>
        {showButton &&   <button className="btn btn-primary ">{btnText}</button>}
        </div>
      </div>
    </div>


  )
}

export default Hero