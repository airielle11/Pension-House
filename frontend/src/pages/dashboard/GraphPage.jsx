import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Typography,
  Avatar,
  CircularProgress,
} from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const GraphPage = ({ handleAddNewItem }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [stockList, setStockList] = useState([]);
  const [predictedDemand, setPredictedDemand] = useState([]);
  const [predictionStats, setPredictionStats] = useState({ mape: 0, mse: 0, mad: 0 });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

  useEffect(() => {
    fetchStockList();
  }, []);

  const fetchStockList = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/get-stocks`);
      console.log('Stock list fetched:', response.data);
      setStockList(response.data.stocks || []); // Fallback to an empty array
    } catch (error) {
      console.error('Error fetching stocks:', error.message);
    }
  };

  const fetchPredictedDemand = async (itemId) => {
    if (loadingPrediction) return; // Prevent overlapping calls
  
    setLoadingPrediction(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/predict_demand/`, {
        item_id: itemId,
      });
      console.log('Predicted demand:', response.data);
  
      // Assuming forecasted_value is a single value
      const forecastedValue = response.data.forecasted_value || 0;
  
      // Generate data for the graph (e.g., 30 days with the same forecasted value)
      const generatedData = Array.from({ length: 30 }, (_, index) => ({
        date: `2025-01-${String(index + 1).padStart(2, '0')}`, // Replace with real dates if available
        demand: forecastedValue,
      }));
  
      setPredictedDemand(generatedData); // Set as array for LineChart
  
      setPredictionStats({
        mape: response.data.mape || 0,
        mse: response.data.mse || 0,
        mad: response.data.mad || 0,
      });
    } catch (error) {
      console.error('Error fetching predicted demand:', error.message);
    } finally {
      setLoadingPrediction(false);
    }
  };
  

  const handleViewMoreClick = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
    fetchPredictedDemand(item.id);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedItem(null);
    setQuantity('');
  };

  const handleRestock = async () => {
    if (!quantity || !selectedItem) {
      alert('Please enter a quantity to restock.');
      return;
    }

    const parsedQuantity = parseInt(quantity.replace(/[^\d]/g, ''), 10);
    if (parsedQuantity <= 0) {
      alert('Please enter a valid positive quantity.');
      return;
    }

    const updatedStock = { item_id: selectedItem.id, new_stock: parsedQuantity };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/update-stock/`, updatedStock, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        console.log('Stock updated successfully:', response.data);
        setStockList((prevStockList) =>
          prevStockList.map((item) =>
            item.id === selectedItem.id
              ? { ...item, in_stock: item.in_stock + parsedQuantity }
              : item
          )
        );
        handleCloseModal();
      } else {
        alert(`Error: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      console.error('Error updating stock:', error.message);
      alert('An error occurred while updating the stock.');
    }
  };

  const handleGenerateReport = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    setLoadingReport(true);
    try {
      const requestData = { start_date: startDate, end_date: endDate };
      console.log('Requesting report generation:', requestData);

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/generate_report`, requestData, {
        responseType: 'blob', // Expect a file (PDF) in the response
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'item_demand_report.pdf';
      link.click();
    } catch (error) {
      console.error('Error generating report:', error.message);
      alert('An error occurred while generating the report. Please try again.');
    } finally {
      setLoadingReport(false);
    }
  };

  return (
    <div>
      <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S/N</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Added By</TableCell>
                <TableCell>Date Added</TableCell>
                <TableCell>Net Vol Qty</TableCell>
                <TableCell>In Stock</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockList.length > 0 ? (
                stockList.map((item, index) => (
                  <TableRow key={index} onClick={() => handleViewMoreClick(item)}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Avatar alt={item.item_name} src={item.image || 'https://via.placeholder.com/100'} />
                    </TableCell>
                    <TableCell>{item.item_name}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.brand}</TableCell>
                    <TableCell>{item.added_by || 'N/A'}</TableCell>
                    <TableCell>{item.added_at || 'N/A'}</TableCell>
                    <TableCell>{item.net_vol_qty || 'N/A'}</TableCell>
                    <TableCell>{item.in_stock}</TableCell>
                    <TableCell>{item.supplier || 'N/A'}</TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            item.status === 'Out of Stock'
                              ? '#ED3237'
                              : item.status === 'Low in Stock'
                              ? '#F29425'
                              : '#10A142',
                        }}
                      >
                        {item.status}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => fetchPredictedDemand(item.id)}
                        disabled={loadingPrediction}
                      >
                        {loadingPrediction ? <CircularProgress size={24} /> : 'Predict Demand'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={13} align="center">
                    No stock data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Predicted Demand for Next Month</Typography>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={predictedDemand}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="demand" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">MAPE: {predictionStats.mape}</Typography>
            <Typography variant="body1">MSE: {predictionStats.mse}</Typography>
            <Typography variant="body1">MAD: {predictionStats.mad}</Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

GraphPage.propTypes = {
  handleAddNewItem: PropTypes.func.isRequired,
};

export default GraphPage;
