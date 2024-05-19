import { useContextGlobal } from '../../contexts/global.context'

const ListProducts = () => {
  const { state, dispatch } = useContextGlobal()
  return (
    <main>
      <div>ListProducts</div>
    </main>
  )
}

export default ListProducts