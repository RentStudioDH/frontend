import React, { useState, useEffect } from 'react';
import { useContextGlobal } from '../../../contexts/global.context';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { IconButton, InputBase, Paper, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, MenuItem, Select, Button, Box, Typography } from '@mui/material';
import { Calendar } from 'react-date-range';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const HomeSearch = ({ title }) => {
  const { state } = useContextGlobal();
  const { categories, data: products } = state;

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [filteredData, setFilteredData] = useState(products);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openDateDialog, setOpenDateDialog] = useState(false);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, category, dateRange, products]);

  const handleSearch = () => {
    const [startDate, endDate] = dateRange;
    const filtered = products.filter(product => {
      const matchesTitle = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category ? product.category.name === category : true;
      const matchesDate = startDate && endDate ? 
        (new Date('2024-06-01') <= endDate && new Date('2024-06-10') >= startDate) : true; // Ajustar según los datos reales
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

  const theme = createTheme({
    palette: {
      primary: {
        main: '#A62639',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h4" color="primary" align="center" gutterBottom>
        <strong>{title}</strong>
      </Typography>
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
            <i className="fa-solid fa-tags" style={{ color: theme.palette.primary.main }}></i>
          </IconButton>
          <IconButton onClick={handleOpenDateDialog} sx={{ p: '10px' }} aria-label="calendario">
            <i className="fa-solid fa-calendar" style={{ color: theme.palette.primary.main }}></i>
          </IconButton>
          <IconButton onClick={handleSearch} sx={{ p: '10px' }} aria-label="buscar">
            <i className="fa-solid fa-magnifying-glass" style={{ color: theme.palette.primary.main }}></i>
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
                <MenuItem key={cat.slug} value={cat.name}>{cat.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleCloseCategoryDialog}>Aplicar</Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={openDateDialog} onClose={handleCloseDateDialog}>
        <DialogTitle>Seleccionar Fechas</DialogTitle>
        <DialogContent>
          <Calendar
            dateRange={dateRange}
            onChange={(ranges) => setDateRange([ranges.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
          />
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleCloseDateDialog}>Aplicar</Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Typography variant="h6" color="primary" align="center" gutterBottom>
        Resultados
      </Typography>
      <Box sx={{ width: { xs: "100%", md: "60%" }, mx: 'auto' }}>
        <ul>
          {filteredData.map(product => (
            <li key={product.id}>{product.name} - {product.category.name}</li>
          ))}
        </ul>
      </Box>
    </ThemeProvider>
  );
};

export default HomeSearch
