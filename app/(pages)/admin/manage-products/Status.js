const Status = ({ text, bgColor, icon: Icon, textColor,}) => {


  return (
    <div
  
      className={`flex items-center justify-center py-1 px-3  shadow-xl border-2  rounded-box ${bgColor} ${textColor} `}
    >
      {text}
      {Icon && (
        <span>
          <Icon size={16} />
        </span>
      )}
    </div>
  )
}

export default Status
