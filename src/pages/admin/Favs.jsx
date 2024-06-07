import React from 'react'
import { useContextGlobal } from '../../contexts/global.context'
import Cards from '../../components/atoms/Cards';

const Favs = () => {
const{state} = useContextGlobal()
    console.log(state);
  return (
    <div>
        <h1>Favs</h1>
        <div>
            {state.favs.map(fav => <Cards key={fav.id} item={fav}/>)}   
        </div>
    </div>
  )
}

export default Favs