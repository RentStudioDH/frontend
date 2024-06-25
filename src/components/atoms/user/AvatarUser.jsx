import { useContextGlobal } from '../../../contexts/global.context'

const AvatarUser = ({ size }) => {
  const { state } = useContextGlobal()
  const { userInitials } = state
  return (
    <div className="bg-back grid place-items-center userAvatar border border-gray-500 rounded-full cursor-pointer"
    style={{ width: `${size}px`, height: `${size}px` }}>
      <span className='txt-tertiary paragraph'>{userInitials}</span>
    </div>
  )
}

export default AvatarUser