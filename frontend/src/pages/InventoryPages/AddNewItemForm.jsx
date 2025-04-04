import React, { useState, useEffect } from 'react'; 
import { Box, Button, Grid, TextField, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2

const AddNewItemForm = () => {
  const navigate = useNavigate();

  // State for dropdowns
  const [categories, setCategories] = useState([]);  
  const [brands, setBrands] = useState([]);  
  const [suppliers, setSuppliers] = useState([]);  
  const [containers, setContainers] = useState([]);  
  const [units, setUnits] = useState([]);  

  // Item details
  const [itemName, setItemName] = useState("");  
  const [itemDescription, setItemDescription] = useState("");  
  const [netVol, setNetVol] = useState(0);  
  const [inStock, setInStock] = useState(0);  
  const [reOrderLevel, setReOrderLevel] = useState(0);  
  const [pkDescription, setPkDescription] = useState("");

  // States for selected values
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [selectedBrand, setSelectedBrand] = useState(""); 
  const [selectedSupplier, setSelectedSupplier] = useState(""); 
  const [selectedContainer, setSelectedContainer] = useState(""); 
  const [selectedUnit, setSelectedUnit] = useState(""); 

  const handleBack = () => {
    navigate(-1); 
  };

  const handleAddItem = async () => {
    const formData = {
      p_item_name: itemName,
      p_item_descr: itemDescription,
      p_scat_id: selectedCategory,
      p_br_id: selectedBrand,
      p_splr_id: selectedSupplier,
      p_net_volqty: parseInt(netVol, 10),
      p_in_stock: parseInt(inStock, 10),
      p_rol: reOrderLevel,
      p_pk_descr: pkDescription,
      p_cont_id: selectedContainer,
      p_ut_id: selectedUnit,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-new-item3/`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'The item has been successfully added.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: response.data.error || 'An error occurred',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'An unexpected error occurred';
      Swal.fire({
        title: 'Error',
        text: `Error: ${errorMessage}`, // errorMessage is interpolated here
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchSuppliers();
    fetchContainers();
    fetchUnits();
  }, []);

  const fetchCategories = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/categories`) // Use backticks here
      .then((response) => setCategories(response.data.categories || []))
      .catch((error) => console.error('Error fetching categories:', error));
  };
  
  const fetchBrands = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/brands`) // Use backticks here
      .then((response) => setBrands(response.data.brands || []))
      .catch((error) => console.error('Error fetching brands:', error));
  };
  
  const fetchSuppliers = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/suppliers`) // Use backticks here
      .then((response) => setSuppliers(response.data.suppliers || []))
      .catch((error) => console.error('Error fetching suppliers:', error));
  };
  
  const fetchContainers = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/containers`) // Use backticks here
      .then((response) => setContainers(response.data.containers || []))
      .catch((error) => console.error('Error fetching containers:', error));
  };
  
  const fetchUnits = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/units`) // Use backticks here
      .then((response) => setUnits(response.data.units || []))
      .catch((error) => console.error('Error fetching units:', error));
  };
  

  return (
    <Box sx={{ p: 3 }}>
      <Button variant="text" onClick={handleBack}>Back</Button>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}><TextField label="Item Name" fullWidth value={itemName} onChange={(e) => setItemName(e.target.value)} /></Grid>
              <Grid item xs={12} md={6}><TextField label="Item Description" fullWidth value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} /></Grid>
              <Grid item xs={12} md={6}><TextField select label="Category" fullWidth value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>{categories.map((category) => <MenuItem key={category.ID} value={category.ID}>{category.Category}</MenuItem>)}</TextField></Grid>
              <Grid item xs={12} md={6}><TextField select label="Supplier" fullWidth value={selectedSupplier} onChange={(e) => setSelectedSupplier(e.target.value)}>{suppliers.map((supplier) => <MenuItem key={supplier.ID} value={supplier.ID}>{supplier.Supplier}</MenuItem>)}</TextField></Grid>
              <Grid item xs={12} md={6}><TextField select label="Brand" fullWidth value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>{brands.map((brand) => <MenuItem key={brand.ID} value={brand.ID}>{brand.Brand}</MenuItem>)}</TextField></Grid>
              <Grid item xs={12} md={6}><TextField select label="Container" fullWidth value={selectedContainer} onChange={(e) => setSelectedContainer(e.target.value)}>{containers.map((container) => <MenuItem key={container.ID} value={container.ID}>{container.Container}</MenuItem>)}</TextField></Grid>
              <Grid item xs={12} md={6}><TextField label="Net Vol/Qty" fullWidth type="number" value={netVol} onChange={(e) => setNetVol(e.target.value)} /></Grid>
              <Grid item xs={12} md={6}><TextField select label="Unit" fullWidth value={selectedUnit} onChange={(e) => setSelectedUnit(e.target.value)}>{units.map((unit) => <MenuItem key={unit.ID} value={unit.ID}>{unit.Unit}</MenuItem>)}</TextField></Grid>
              <Grid item xs={12} md={6}><TextField label="In Stock" fullWidth type="number" value={inStock} onChange={(e) => setInStock(e.target.value)} /></Grid>
              <Grid item xs={12} md={6}><TextField label="Reorder Level" fullWidth type="number" value={reOrderLevel} onChange={(e) => setReOrderLevel(e.target.value)} /></Grid>
              <Grid item xs={12} md={6}><TextField label="Pack Description" fullWidth value={pkDescription} onChange={(e) => setPkDescription(e.target.value)} /></Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button variant="contained" sx={{ background: 'linear-gradient(to right, #14ADD6, #384295)', width: '100%', maxWidth: '400px' }} onClick={handleAddItem}>
          Add New Item
        </Button>
      </Box>
    </Box>
  );
};

export default AddNewItemForm;