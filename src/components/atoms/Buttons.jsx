const Buttons = ({ text, bgColor, bColor, color }) => {
  const buttonStyles = {
    background: bgColor,
    color: color,
    border: `1px solid ${bColor}`,
  }
  return (
    <button className={`btn rounded-full px-4 py-2 capitalize hover:brightness-50 legal`} style={buttonStyles}>{text}</button>  
  )
}

export default Buttons