import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData } from '../../utils/js/apiRequest';
import SectionProducto from '../../components/organisms/sections/SectionProducto';
import ProductHeader from '../../components/molecules/product/ProductHeader';
import ProductDetails from '../../components/molecules/product/ProductDetails';
import ProductIdeas from '../../components/molecules/product/ProductIdeas';
import ProductGallery from '../../components/molecules/product/ProductGallery';
import LoadingOverlay from "../../components/atoms/LoadingOverlay.jsx";
import ErrorDialog from '../../components/atoms/ErrorDialog';

const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const productData = await fetchData({ method: 'GET', endpoint: `/products/${id}` });
                if (!productData.attachments || productData.attachments.length === 0) {
                    throw new Error('El producto no tiene imágenes disponibles aún.');
                }
                setProduct(productData);
                transformAndSetImages(productData.attachments);
            } catch (error) {
                setError(new Error('No se pudo obtener el producto.'));
                setOpenDialog(true);
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [id]);

    const transformAndSetImages = (attachments) => {
        const transformedImages = attachments.map((attachment, index) => ({
            ...attachment,
            id: index
        }));
        setImages(transformedImages);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="min-h-screen">
                <LoadingOverlay open={loading} />
            </div>
        );
    }

    return (
        <main>
            {product && (
                <>
                    <SectionProducto
                        data={product}
                        Component={ProductHeader}
                        sectionClass='bg-back productHeader'
                        containerClass='flex flex-col sm:flex-row justify-between items-start sm:items-center p-15 g-15'
                    />
                    <SectionProducto
                        data={product}
                        Component={ProductDetails}
                        sectionClass='productDetails'
                        containerClass='grid grid-cols-1 sm:grid-cols-2 p-section g-15'
                    />
                    <SectionProducto
                        data={{...product, attachments: images}}
                        Component={ProductGallery}
                        sectionClass='bg-white productGallery'
                        containerClass='grid p-section g-5'
                    />
                    <SectionProducto
                        data={product}
                        Component={ProductIdeas}
                        containerClass='p-section'
                    />
                </>
            )}
            <ErrorDialog
                open={openDialog}
                handleClose={handleCloseDialog}
                message={error ? error.message : 'No se pudo obtener el producto'}
            />
        </main>
    );
};

export default Product;
