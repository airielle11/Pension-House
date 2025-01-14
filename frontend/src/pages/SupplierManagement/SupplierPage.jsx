import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SupplierPage.css';

function SupplierPage() {
  const [supplierData, setSupplierData] = useState({
    p_splr_name: '',
    p_cont_p: '',
    p_email: '',
    p_phone: '',
    p_website: '',
    p_landline: '',
    p_splr_descr: '',
    p_st_no: '',
    p_st_name: '',
    p_unit_no: '',
    p_city: '',
    p_state: '',
    p_zip: '',
    p_country: ''
  });

  const [newBrandName, setNewBrandName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // New state to hold the list of suppliers and brands
  const [suppliers, setSuppliers] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Fetch suppliers and brands on component mount
    const fetchData = async () => {
      try {
        const supplierResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/all-suppliers`
        );
        setSuppliers(supplierResponse.data.suppliers);

        const brandResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/brands`
        );
        setBrands(brandResponse.data.brands);
      } catch (error) {
        console.error('Error fetching suppliers and brands:', error);
      }
    };
    fetchData();
  }, []);

  const handleSupplierSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Log the data being sent in the request
    console.log("Sending data for new supplier:", supplierData);
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-supplier/`,
        supplierData, // Send JSON data directly
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      
  
      if (response.status === 201) {
        setMessage(response.data.message);
        setError('');
        /*
        // Re-fetch suppliers after adding new supplier
        const supplierResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/all-suppliers`
        );
        setSuppliers(supplierResponse.data.suppliers);*/
      } 
    } catch (error) {
      setError(error.response.data.error);
      setMessage('');
    } finally {
      setLoading(false);
    }
  };
  

  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Sending data for new brand:", newBrandName);
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-brand/`,
        new URLSearchParams({ new_brand_name: newBrandName }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.status === 201) {
        setMessage(response.data.message);
        setError('');
        // Re-fetch brands after adding new brand
        const brandResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/brands`
        );
        setBrands(brandResponse.data.brands);
      } else {
        setError(response.data.error || 'An error occurred');
        setMessage('');
      }
    } catch (error) {
      setError('An unexpected error occurred');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  const handleSupplierChange = (e) => {
    const { name, value } = e.target;
    setSupplierData({
      ...supplierData,
      [name]: value,
    });
  };

  const handleBrandChange = (e) => {
    setNewBrandName(e.target.value);
  };

  

  return (
    <div className="supplier-page-container">
      <h1 className="page-title">Supplier and Brand Management</h1>
  
      <div className="form-wrapper">
        {/* Add Supplier Form */}
        <div className="form-container">
          <h2 className="form-title">Add Supplier</h2>
          <form onSubmit={handleSupplierSubmit} className="form">
            {/* Input fields for supplier */}
            <div className="form-field">
              <label htmlFor="p_splr_name" className="form-label">Supplier Name</label>
              <input
                type="text"
                name="p_splr_name"
                value={supplierData.p_splr_name}
                onChange={handleSupplierChange}
                placeholder="Supplier Name"
                required
                className="form-input"
              />
            </div>
  
            <div className="form-field">
              <label htmlFor="p_cont_p" className="form-label">Contact Person</label>
              <input
                type="text"
                name="p_cont_p"
                value={supplierData.p_cont_p}
                onChange={handleSupplierChange}
                placeholder="Contact Person"
                className="form-input"
              />
            </div>
  
            <div className="form-field">
              <label htmlFor="p_email" className="form-label">Email</label>
              <input
                type="email"
                name="p_email"
                value={supplierData.p_email}
                onChange={handleSupplierChange}
                placeholder="Email"
                className="form-input"
              />
            </div>
  
            <div className="form-field">
              <label htmlFor="p_phone" className="form-label">Phone</label>
              <input
                type="text"
                name="p_phone"
                value={supplierData.p_phone}
                onChange={handleSupplierChange}
                placeholder="Phone"
                className="form-input"
              />
            </div>
  
            <div className="form-field">
              <label htmlFor="p_website" className="form-label">Website</label>
              <input
                type="url"
                name="p_website"
                value={supplierData.p_website}
                onChange={handleSupplierChange}
                placeholder="Website"
                className="form-input"
              />
            </div>
  
            <div className="form-field">
              <label htmlFor="p_landline" className="form-label">Landline</label>
              <input
                type="text"
                name="p_landline"
                value={supplierData.p_landline}
                onChange={handleSupplierChange}
                placeholder="Landline"
                className="form-input"
              />
            </div>
  
            <div className="form-field">
              <label htmlFor="p_splr_descr" className="form-label">Description</label>
              <textarea
                name="p_splr_descr"
                value={supplierData.p_splr_descr}
                onChange={handleSupplierChange}
                placeholder="Description"
                className="form-input"
              />
            </div>
  
            <div className="form-field">
              <label htmlFor="p_st_no" className="form-label">Street Number</label>
              <input
                type="text"
                name="p_st_no"
                value={supplierData.p_st_no}
                onChange={handleSupplierChange}
                placeholder="Street Number"
                className="form-input"
              />
            </div>
  
            <div className="form-field">
              <label htmlFor="p_st_name" className="form-label">Street Name</label>
              <input
                type="text"
                name="p_st_name"
                value={supplierData.p_st_name}
                onChange={handleSupplierChange}
                placeholder="Street Name"
                className="form-input"
              />
            </div>
  
            <div className="form-field">
              <label htmlFor="p_unit_no" className="form-label">Unit Number</label>
              <input
                type="text"
                name="p_unit_no"
                value={supplierData.p_unit_no}
                onChange={handleSupplierChange}
                placeholder="Unit Number"
                className="form-input"
              />
            </div>
  
            <div className="form-field">
              <label htmlFor="p_city" className="form-label">City</label>
              <input
                type="text"
                name="p_city"
                value={supplierData.p_city}
                onChange={handleSupplierChange}
                placeholder="City"
                className="form-input"
              />
            </div>
  
            <div className="form-field">
              <label htmlFor="p_state" className="form-label">State</label>
              <input
                type="text"
                name="p_state"
                value={supplierData.p_state}
                onChange={handleSupplierChange}
                placeholder="State"
                className="form-input"
              />
            </div>
  
            <div className="form-field">
              <label htmlFor="p_zip" className="form-label">Zip Code</label>
              <input
                type="text"
                name="p_zip"
                value={supplierData.p_zip}
                onChange={handleSupplierChange}
                placeholder="Zip Code"
                className="form-input"
              />
            </div>
  
            <div className="form-field">
              <label htmlFor="p_country" className="form-label">Country</label>
              <input
                type="text"
                name="p_country"
                value={supplierData.p_country}
                onChange={handleSupplierChange}
                placeholder="Country"
                className="form-input"
              />
            </div>
  
            <button type="submit" className="form-button" disabled={loading}>
              {loading ? 'Adding Supplier...' : 'Add Supplier'}
            </button>
          </form>
        </div>
  
        <hr className="divider" />
  
        {/* Add Brand Form */}
        <div className="form-container">
          <h2 className="form-title">Add Brand</h2>
          <form onSubmit={handleBrandSubmit} className="form">
            <div className="form-field">
              <label htmlFor="new_brand_name" className="form-label">Brand Name</label>
              <input
                type="text"
                name="new_brand_name"
                value={newBrandName}
                onChange={handleBrandChange}
                placeholder="Brand Name"
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="form-button" disabled={loading}>
              {loading ? 'Adding Brand...' : 'Add Brand'}
            </button>
          </form>
        </div>
      </div>
  
      {/* Display messages */}
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
  
      {/* New container for displaying suppliers and brands in tables */}
      <div className="table-container">
        <h2 className="table-title">Suppliers and Brands</h2>
  
        {/* Suppliers Table */}
        <h3>Suppliers</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Contact Person</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length === 0 ? (
              <tr>
                <td colSpan="5">No suppliers found</td>
              </tr>
            ) : (
              suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td>{supplier.supplier}</td>
                  <td>{supplier.contact_person}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.phone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
  
        {/* Brands Table */}
        <h3>Brands</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Brand Name</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.ID}>
                <td>{brand.Brand}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}  

export default SupplierPage;