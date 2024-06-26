import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Rating } from '@mui/material';
import { useContextGlobal } from '../../../contexts/global.context';

const ProductCardReservation = () => {
    const { state, getProductById, setReservaData } = useContextGlobal();
    const { reservaData } = state;
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProductById(reservaData.id);
                setProductData(data);
                // Update reservaData in global context
                setReservaData({ ...reservaData, productData: data });
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchData();
    }, [reservaData.id, getProductById, setReservaData]);

    if (!productData) {
        return <div>Loading...</div>;
    }

    const firstImage = productData.attachments && productData.attachments.length > 0
        ? productData.attachments[0].url
        : 'https://digitalhouse-e7-pi.s3.amazonaws.com/-Rhd-l2yWTj6iEqg7EhN9Q%3D%3D.png';

    return (
        <Card style={{ display: 'flex', marginBottom: '16px', height: '15rem' }}>
            <CardMedia
                component="img"
                style={{ width: "40%" }}
                image={firstImage}
                alt={productData.name}
            />
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div>
                    <Rating name="read-only" value={productData.rating || 4} readOnly />
                    <Typography variant="h5" fontWeight={500} color="#511C29" component="div">
                        {productData.name}
                    </Typography>
                    <Typography variant="body1" color="#A29C9B">
                        {productData.description}
                    </Typography>
                </div>
                <Typography variant="body1" fontWeight={500} color="#511C29" style={{ marginTop: '16px' }}>
                    Precio por día: ${productData.price}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProductCardReservation;
