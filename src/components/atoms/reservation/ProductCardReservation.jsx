import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Rating, useMediaQuery, CircularProgress, Box } from '@mui/material';
import { useContextGlobal } from '../../../contexts/global.context';

const ProductCardReservation = () => {
    const { state, getProductById, setReservaData } = useContextGlobal();
    const { reservaData } = state;
    const [productData, setProductData] = useState(null);
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

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
    }, [reservaData.id]);

    if (!productData) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
            </Box>
        );
    }

    const firstImage = productData.attachments && productData.attachments.length > 0
        ? productData.attachments[0].url
        : 'https://digitalhouse-e7-pi.s3.amazonaws.com/-Rhd-l2yWTj6iEqg7EhN9Q%3D%3D.png';

    return (
        <Card sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', 
            marginBottom: 2, 
            height: isMobile ? 'auto' : '16rem', 
            boxShadow: 3, 
            paddingY: '5px' 
        }}>
            <CardMedia
                component="img"
                sx={{ width: isMobile ? '100%' : '40%', height: isMobile ? 'auto' : '100%' }}
                image={firstImage}
                alt={productData.name}
            />
            <CardContent sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between', 
                height: isMobile ? 'auto' : '100%' 
            }}>
                <div>
                    <Rating name="read-only" value={productData.rating || 4} readOnly />
                    <Typography variant="h5" fontWeight={500} color="#511C29" component="div">
                        {productData.name}
                    </Typography>
                    <Typography
                        variant="body1"
                        color="#A29C9B"
                        sx={{ maxHeight: '6rem', overflowY: 'auto' }}
                    >
                        {productData.description}
                    </Typography>
                </div>
                <Typography variant="body1" fontWeight={500} color="#511C29" sx={{ marginTop: 2 }}>
                    Precio por día: ${productData.price}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProductCardReservation;
