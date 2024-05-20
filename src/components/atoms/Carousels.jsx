import { useState } from 'react'

const Carousels = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }
  return (
    <div className="relative w-full max-w-lg mx-auto br-15">
      <div className="overflow-hidden relative h-64 sm:h-auto h-[320px]">
        <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((src, index) => <img key={index} src={src} alt={`Imagen ${index + 1}`} className="w-full flex-shrink-0" />)}
        </div>
      </div>
      <button onClick={handlePrev} className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bigtitle" type="button"><i className="text-white fa-solid fa-angle-left"></i></button>
      <button onClick={handleNext} className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bigtitle" type="button"><i className="text-white fa-solid fa-angle-right"></i></button>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2 p-2">
        {images.map((_, index) => <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-primary' : 'bg-base'}`} />)}
      </div>
    </div>
  )
}

export default Carousels