import { useState, useEffect } from 'react'

const ListImages = ({ images, onImageChange, multiple }) => {
  const [imageList, setImageList] = useState(images || [])

  useEffect(() => {
    setImageList(images)
  }, [images])

  const changeInput = (e) => {
    const newImgsToState = readmultifiles(e, imageList.length)
    const newImgsState = multiple ? [...imageList, ...newImgsToState] : newImgsToState
    setImageList(newImgsState)
    onImageChange(newImgsState)
  }

  const readmultifiles = (e, idInicial) => {
    const files = e.currentTarget.files
    const arrayImages = []
    Object.keys(files).forEach((i) => {
      const file = files[i]
      const url = URL.createObjectURL(file)
      arrayImages.push({
        id: idInicial++,
        name: file.name,
        url,
        file,
      })
    })
    return arrayImages
  }

  const deleteImg = (id) => {
    const newImgs = imageList.filter((element) => element.id !== id)
    setImageList(newImgs)
    onImageChange(newImgs)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-y-auto max-h-96 mt-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imageList.map((imagen) => (
            <div className="relative" key={imagen.id}>
              <button
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                onClick={() => deleteImg(imagen.id)}
              >
                x
              </button>
              <img alt="Preview" src={imagen.url} className="w-full h-full object-cover rounded" />
            </div>
          ))}
          <label className="bg-yellow-500 text-white py-2 px-4 rounded cursor-pointer inline-block">
            <span>Seleccionar archivos</span>
            <input hidden type="file" multiple={multiple} onChange={changeInput} />
          </label>
        </div>
      </div>
    </div>
  )
}

export default ListImages