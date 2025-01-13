import React, { useState, useEffect } from 'react'; // Import useEffect and useState
import { Box, Button, Grid, TextField, MenuItem, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios'; // Import axios for making API requests

const AddNewItemForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // State for modal visibility
  const [openModal, setOpenModal] = useState(false);

  // State to hold stock data
  const [categories, setCategories] = useState([]);  // State for categories (dynamically fetched)
  const [brands, setBrands] = useState([]);  // State for brands
  const [suppliers, setSuppliers] = useState([]);  // State for suppliers
  const [containers, setContainers] = useState([]);  // State for containers
  const [units, setUnits] = useState([]);  // State for units

  // State for selected image
  const [selectedImage, setSelectedImage] = useState(null);  // State for storing selected image
  const [itemName, setItemName] = useState("");  // Item name
  const [itemDescription, setItemDescription] = useState("");  // Item description
  const [initialStock, setInitialStock] = useState(0);  // Initial stock value
  const [reOrderLevel, setReOrderLevel] = useState(10); 


  const [pkDescription, setPkDescription] = useState("Pack description");



  // States for selected values
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [selectedBrand, setSelectedBrand] = useState(""); 
  const [selectedSupplier, setSelectedSupplier] = useState(""); 
  const [selectedContainer, setSelectedContainer] = useState(""); 
  const [selectedUnit, setSelectedUnit] = useState(""); 

  // Handle back button click
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  /*
  // Handle Add New Item click
  const handleAddItem = () => {
    // Create new item object based on form values
    const newItem = {
      item_name: itemName,
      item_descr: itemDescription,
      scat_id: selectedCategory, // Assuming you have selectedCategory
      br_id: selectedBrand, // Assuming you have selectedBrand
      splr_id: selectedSupplier, // Assuming you have selectedSupplier
      net_volqty: initialStock,
      in_stock: initialStock, // Initial stock value
      rol: reOrderLevel, // Assuming you have reOrderLevel
      pk_descr: pkDescription, // Assuming you have pkDescription
      cont_id: selectedContainer, // Assuming you have selectedContainer
      ut_id: selectedUnit // Assuming you have selectedUnit
    };*/

    const handleAddItem = async () => {
      const newItem = {
        item_name: itemName,
        item_descr: itemDescription,
        scat_id: selectedCategory,
        br_id: selectedBrand,
        splr_id: selectedSupplier,
        net_volqty: initialStock,
        in_stock: initialStock, 
        rol: reOrderLevel,
        pk_descr: pkDescription,
        cont_id: selectedContainer,
        ut_id: selectedUnit
      };
  
      console.log("Sending POST request with data:", newItem);
  
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/add-new-item2`,
          newItem, 
          {
            headers: {
              'Content-Type': 'application/json', 
            },
          }
        );
  
        if (response.data.success) {
          console.log('Item added successfully:', response.data);
          // Assuming the response contains the item's ID and you're updating stock afterward
          restockItem(response.data.item_id, initialStock);
          setOpenModal(true);  // Open success modal
        } else {
          alert(response.data.message || 'Failed to add item.');
        }
      } catch (error) {
        const errorMessage = error.response?.data?.error || error.message || 'An unexpected error occurred';
        console.error('Error adding item:', errorMessage);
        alert(`Error: ${errorMessage}`);
      }
    };


  
  // Function to handle restocking an item
  const restockItem = (itemId, stockQuantity) => {
    // Prepare the data to be sent for restocking
    const restockData = {
      item_id: itemId,  // Item ID to restock
      new_stock: stockQuantity,  // New stock quantity (can be the initial stock or whatever needs to be added)
    };

    // Send restock request to backend
    axios.post(`${import.meta.env.VITE_API_URL}/update-stock`, restockData, {
      headers: {
        'Content-Type': 'application/json',  // Ensure the request is sent as JSON
      },
    })
    .then((response) => {
      if (response.data.success) {
        console.log('Stock updated successfully:', response.data);
      } else {
        alert(response.data.message || 'Failed to restock item.');
      }
    })
    .catch((error) => {
      console.error('Error restocking item:', error.response || error.message);
      alert('An error occurred while restocking the item.');
    });
  };

  // Handle modal close
  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
  };

  // Fetch all stock data from the backend on initial load
  useEffect(() => {
    console.log("Fetching categories, brands, suppliers, containers, and units...");
    fetchCategories();
    fetchBrands();
    fetchSuppliers();
    fetchContainers();
    fetchUnits();
  }, []);

  // Fetch categories from API
  const fetchCategories = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/categories`)
      .then((response) => {
        if (response.data && response.data.categories) {
          setCategories(response.data.categories);  // Update categories state with fetched categories
        } else {
          console.error('Categories data not found in response');
        }
      })
      .catch((error) => {
        console.error('Error fetching categories:', error.response || error.message);
      });
  };

  // Fetch brands from API
  const fetchBrands = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/brands`)
      .then((response) => {
        if (response.data && response.data.brands) {
          setBrands(response.data.brands); // Update brands state with fetched brands
        } else {
          console.error('Brands data not found in response');
        }
      })
      .catch((error) => {
        console.error('Error fetching brands:', error.response || error.message);
      });
  };

  // Fetch suppliers from API
  const fetchSuppliers = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/suppliers`)
      .then((response) => {
        if (response.data && response.data.suppliers) {
          setSuppliers(response.data.suppliers);  // Update suppliers state with fetched suppliers
        } else {
          console.error('Suppliers data not found in response');
        }
      })
      .catch((error) => {
        console.error('Error fetching suppliers:', error.response || error.message);
      });
  };

  // Fetch containers from API
  const fetchContainers = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/containers`)
      .then((response) => {
        if (response.data && response.data.containers) {
          setContainers(response.data.containers);  // Update containers state with fetched containers
        } else {
          console.error('Containers data not found in response');
        }
      })
      .catch((error) => {
        console.error('Error fetching containers:', error.response || error.message);
      });
  };

  // Fetch units from API
  const fetchUnits = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/units`)
      .then((response) => {
        if (response.data && response.data.units) {
          setUnits(response.data.units);  // Update units state with fetched units
        } else {
          console.error('Units data not found in response');
        }
      })
      .catch((error) => {
        console.error('Error fetching units:', error.response || error.message);
      });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];  // Get the selected file
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Generate URL for the selected image
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Back Button */}
      <Button
        variant="text"
        sx={{
          color: '#384295', // Blue text color
          textTransform: 'none', // Keep the text as is (not uppercase)
          fontWeight: 'normal',
          mb: 2, // Margin bottom to separate from the form
        }}
        onClick={handleBack} // Trigger back navigation
      >
        Back
      </Button>

      {/* Form Content */}
      <Grid container spacing={3}>
        {/* Upload Photo Container */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '85%',
            }}
          >
            {/* Image Preview Section - Image displayed above "Upload Photo" */}
            {selectedImage && (
              <Box sx={{ mb: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>
                <img
                  src={selectedImage}
                  alt="Selected"
                  style={{ width: '150px', height: 'auto', borderRadius: '8px', objectFit: 'cover' }}  // Adjusted width to make the image smaller
                />
              </Box>
            )}

            {/* Upload Photo and Choose File */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body1" gutterBottom>
                Upload Photo
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: 1 }}>
                File size limit: 2MB
              </Typography>

              {/* Choose file button */}
              <Button variant="contained" component="label">
                Choose File
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
            </Box>
          </Box>

          {/* Add New Item Button below Upload Photo container */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(to right, #14ADD6, #384295)',
                color: '#fff',
                '&:hover': {
                  background: 'linear-gradient(to right, #14ADD6, #384295)',
                },
                width: '100%',
                maxWidth: '400px',
                borderRadius: '8px',
              }}
              onClick={handleAddItem} // Trigger Add Item logic
            >
              Add New Item
            </Button>
          </Box>
        </Grid>

        {/* Item Details Form */}
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              p: 3,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Item Name"
                  fullWidth
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Item Description"
                  fullWidth
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField select label="Category" fullWidth defaultValue="">
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <MenuItem key={category.ID} value={category.Category}>
                        {category.Category}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">No categories available</MenuItem>
                  )}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField select label="Supplier" fullWidth defaultValue="">
                  {suppliers.length > 0 ? (
                    suppliers.map((supplier) => (
                      <MenuItem key={supplier.ID} value={supplier.Supplier}>
                        {supplier.Supplier}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">No suppliers available</MenuItem>
                  )}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField select label="Brand" fullWidth defaultValue="">
                  {brands.length > 0 ? (
                    brands.map((brand) => (
                      <MenuItem key={brand.ID} value={brand.Brand}>
                        {brand.Brand}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">No brands available</MenuItem>
                  )}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField select label="Container" fullWidth defaultValue="">
                  {containers.length > 0 ? (
                    containers.map((container) => (
                      <MenuItem key={container.ID} value={container.Container}>
                        {container.Container}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">No containers available</MenuItem>
                  )}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Net Vol/Qty"
                  fullWidth
                  type="number"
                  value={initialStock}
                  onChange={(e) => setInitialStock(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField select label="Unit" fullWidth defaultValue="">
                  {units.length > 0 ? (
                    units.map((unit) => (
                      <MenuItem key={unit.ID} value={unit.Unit}>
                        {unit.Unit}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">No units available</MenuItem>
                  )}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* Success Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Item Added Successfully</DialogTitle>
        <DialogContent>
          <Typography variant="body1">The item has been successfully added!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddNewItemForm;
