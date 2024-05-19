import { useContextGlobal } from '../../contexts/global.context'

const ListProducts = () => {
  const { state, dispatch } = useContextGlobal()
  return (
    <div>ListProducts</div>
  )
}

export default ListProducts