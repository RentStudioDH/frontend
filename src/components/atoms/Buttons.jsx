const Buttons = ({ text, bgColor, bColor, color , onClick, type='button'}) => {
  const buttonStyles = {
    background: bgColor,
    color: color,
    border: `1px solid ${bColor}`,

  }
  return (
    <button onClick={onClick} type={type} className={`btn rounded-full px-4 py-2 capitalize hover:brightness-50 legal`} style={buttonStyles} >{text}</button>  
  )
}

export default Buttons