import React, { useState, useEffect } from 'react';
import { IconButton, InputBase, Paper, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, MenuItem, Select, Button, Box, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const HomeSearch = ({title}) => {
  const data = [
    { id: 1, title: 'Producto 1', category: 'Categoría 1', availableFrom: new Date('2024-06-01'), availableTo: new Date('2024-06-10') },
    { id: 2, title: 'Producto 2', category: 'Categoría 2', availableFrom: new Date('2024-07-01'), availableTo: new Date('2024-07-10') },
    // ... otros productos
  ];

  const categories = ['Categoría 1', 'Categoría 2', 'Categoría 3'];

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [filteredData, setFilteredData] = useState(data);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openDateDialog, setOpenDateDialog] = useState(false);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, category, dateRange]);

  const handleSearch = () => {
    const [startDate, endDate] = dateRange;
    const filtered = data.filter(product => {
      const matchesTitle = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category ? product.category === category : true;
      const matchesDate = startDate && endDate ? 
        (product.availableFrom <= endDate && product.availableTo >= startDate) : true;
      return matchesTitle && matchesCategory && matchesDate;
    });
    setFilteredData(filtered);
  };

  const handleOpenCategoryDialog = () => {
    setOpenCategoryDialog(true);
  };

  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
  };

  const handleOpenDateDialog = () => {
    setOpenDateDialog(true);
  };

  const handleCloseDateDialog = () => {
    setOpenDateDialog(false);
  };

  return (
    <>
      <h1 className='txt-accent bigtitle'><strong>{title}</strong></h1>
      <Box sx={{ width: { xs: "100%", md: "60%" }, mb: 2, mx: 'auto' }}>
        <Paper 
          elevation={2} 
          sx={{ borderRadius: "28px", display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1 }}
        >
          <InputBase 
            sx={{ ml: 2, flex: 1 }} 
            placeholder="Buscar productos..." 
            inputProps={{ 'aria-label': 'Buscar productos...' }} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IconButton onClick={handleOpenCategoryDialog} sx={{ p: '10px' }} aria-label="categoría">
            <i className="fa-solid fa-tags txt-primary"></i>
          </IconButton>
          <IconButton onClick={handleOpenDateDialog} sx={{ p: '10px' }} aria-label="calendario">
            <i className="fa-solid fa-calendar txt-primary"></i>
          </IconButton>
          <IconButton onClick={handleSearch} sx={{ p: '10px' }} aria-label="buscar">
            <i className="fa-solid fa-magnifying-glass txt-primary"></i>
          </IconButton> 
        </Paper>
      </Box>

      <Dialog open={openCategoryDialog} onClose={handleCloseCategoryDialog}>
        <DialogTitle>Seleccionar Categoría</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="category-select-label">Categoría</InputLabel>
            <Select
              labelId="category-select-label"
              value={category}
              label="Categoría"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value=""><em>Todas las categorías</em></MenuItem>
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={handleCloseCategoryDialog}>Aplicar</Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={openDateDialog} onClose={handleCloseDateDialog}>
        <DialogTitle>Seleccionar Fechas</DialogTitle>
        <DialogContent>
          <DatePicker
            selected={dateRange[0]}
            onChange={(update) => setDateRange(update)}
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            selectsRange
            inline
          />
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={handleCloseDateDialog}>Aplicar</Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Typography variant="h6" color="primary" align="center" gutterBottom>
        Resultados
      </Typography>
      <Box sx={{ width: { xs: "100%", md: "60%" }, mx: 'auto' }}>
        <ul>
          {filteredData.map(product => (
            <li key={product.id}>{product.title} - {product.category}</li>
          ))}
        </ul>
      </Box>
    </>
  );
};

export default HomeSearch;
