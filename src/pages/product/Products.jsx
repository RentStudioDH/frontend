import { useContextGlobal } from '../../contexts/global.context';
import ProductLists from '../../components/molecules/product/ProductLists';
import SectionProducto from '../../components/organisms/sections/SectionProducto';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SectionHome from '../../components/organisms/sections/SectionHome';
import HomeSearch2 from '../../components/molecules/home/HomeSearch2';

const Products = () => {
  const { state } = useContextGlobal();
  const location = useLocation();
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    if (location.state && location.state.results) {
      setDisplayData(location.state.results);
    } else {
      setDisplayData(state.data);
    }
  }, [location.state, state.data]);

  return (
    <main>
      <SectionHome title='¡Hola! ¿Qué estás buscando hoy?' ContainerComponent={HomeSearch2} containerClass='grid place-items-center' />
      <SectionProducto data={displayData} Component={ProductLists} containerClass='grid p-section g-15' />
    </main>
  );
};

export default Products;
