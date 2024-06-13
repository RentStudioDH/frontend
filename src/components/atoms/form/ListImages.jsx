import { useState, useEffect } from 'react'
import { useContextGlobal } from '../../../contexts/global.context'

const ListImages = ({ images, onImageChange, multiple = false, onAllImagesUploaded, message }) => {
  const { uploadImage } = useContextGlobal()
  const [imageList, setImageList] = useState(images || [])
  const [newImages, setNewImages] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadedImageIds, setUploadedImageIds] = useState(images.map((img) => img.id))

  useEffect(() => {
    setImageList(images)
    setUploadedImageIds(images.map((img) => img.id))
  }, [images])

  useEffect(() => {
    if (imageList.length > 0 && uploadedImageIds.length === imageList.length) {
      onAllImagesUploaded(true)
    } else {
      onAllImagesUploaded(false)
    }
  }, [uploadedImageIds, imageList, onAllImagesUploaded])

  const changeInput = (e) => {
    const newImgsToState = readmultifiles(e, imageList.length + newImages.length)
    const newImgsState = multiple ? [...newImages, ...newImgsToState] : newImgsToState
    setNewImages(newImgsState)
    setImageList((prev) => [...prev, ...newImgsToState])
    onImageChange([...imageList, ...newImgsToState], uploadedImageIds)
  }

  const readmultifiles = (e, idInicial) => {
    const files = e.currentTarget.files
    const arrayImages = []
    Object.keys(files).forEach((i) => {
      const file = files[i]
      const url = URL.createObjectURL(file)
      arrayImages.push({
        id: idInicial++,
        fileName: file.name,
        url,
        file,
      })
    })
    return arrayImages
  }

  const deleteImg = (id) => {
    const newImgs = imageList.filter((element) => element.id !== id)
    setImageList(newImgs)
    const newUploadedIds = uploadedImageIds.filter((uploadedId) => uploadedId !== id)
    setUploadedImageIds(newUploadedIds)
    setNewImages(newImages.filter((image) => image.id !== id))
    onImageChange(newImgs, newUploadedIds)
  }

  const uploadImages = async () => {
    setUploading(true)
    try {
      const formData = new FormData()
      newImages.forEach((image) => formData.append('files', image.file))

      const result = await uploadImage(formData)

      const newUploadedImages = result.map((uploadedImage) => ({
        id: uploadedImage.id,
        fileName: uploadedImage.fileName,
        url: uploadedImage.url,
      }))

      const updatedImages = [
        ...imageList.filter((img) => !newImages.some((newImg) => newImg.id === img.id)),
        ...newUploadedImages,
      ]

      const newUploadedIds = newUploadedImages.map((item) => item.id)
      setImageList(updatedImages)
      setUploadedImageIds((prev) => [...prev, ...newUploadedIds])
      setNewImages([])
      onImageChange(updatedImages, [...uploadedImageIds, ...newUploadedIds])
    } catch (error) {
      console.error('Error uploading images:', error)
    } finally {
      setUploading(false)
    }
  }

  const notUploadedCount = newImages.length
  const uploadedCount = uploadedImageIds.length - newImages.length
  const allUploaded = uploadedCount > 0 && notUploadedCount === 0

  return (
    <>
      <label className="flex items-end txt-tertiary paragraph g-5">
        <strong>Imágenes:</strong>
        <span className="txt-quaternary legal">
          {message ? (
            message
          ) : (
            <>
              {imageList.length === 0 && <>Subamos las imágenes de este producto</>}
              {imageList.length > 0 && (
                <>
                  {allUploaded
                    ? 'Todas las imágenes están subidas. ¿Deseas cambiar alguna?'
                    : `${uploadedCount} subidas - ${notUploadedCount} por subir`}
                </>
              )}
            </>
          )}
        </span>
      </label>
      <div className="p-15">
        <div className="overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 cont-listimages g-15">
            {imageList.map((imagen) => (
              <div className="relative shadow-lg br-15" key={imagen.id}>
                <button className="absolute txt-primary right-0 p-15 hover:brightness-50" onClick={() => deleteImg(imagen.id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
                <img alt="Preview" src={imagen.url} className="w-full h-full object-cover rounded" />
              </div>
            ))}
            <label className="bg-tertiary shadow-lg grid place-items-center text-white text-center paragraph hover:brightness-50 p-15 br-15 cursor-pointer">
              <span className="grid g-5">
                <i className="bigtitle fa-solid fa-arrow-up-from-bracket"></i>Seleccionar archivos
              </span>
              <input hidden type="file" multiple={multiple} onChange={changeInput} />
            </label>
            <button onClick={uploadImages} disabled={uploading || newImages.length === 0} className="bg-primary shadow-lg text-center paragraph text-white hover:brightness-50 p-15 br-15">
              <span className="grid g-5">
                {uploading ? (
                  <>
                    <i className="bigtitle fa-solid fa-spinner fa-spin"></i> Subiendo...
                  </>
                ) : (
                  <>
                    <i className="bigtitle fa-solid fa-cloud-upload-alt"></i> Subir Imágenes
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListImages
