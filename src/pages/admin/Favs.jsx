import React from 'react'
import { useContextGlobal } from '../../contexts/global.context'
import Cards from '../../components/atoms/Cards';

const Favs = () => {
const{state} = useContextGlobal()
    console.log(state);
  return (
    <div >
        <h1 className='text-center txt-accent txt-center subtitle'>Favoritos</h1>
        <span className=" h-[2px] bg-primary flex  "></span>
        <div className='grid gap-3 w-1/2 relative left-64'>
            {state.favs.map(fav => <Cards key={fav.id} type={'product'} data={fav} item={fav}/>)}   
        </div>
    </div>
  )
}

export default Favs