import React from 'react';
import StockList from './StockList.jsx';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import AnalyticsInventory from './AnalyticsInventory.jsx'; // Update import to use AnalyticsInventory
import { Grid, Box } from '@mui/material'; // Import Grid and Box from Material UI

const stockListData = [
  {
    id: '1',
    name: 'Item 1',
    description: 'Description 1',
    category: 'Category 1',
    supplier: 'Supplier 1',
    brand: 'Brand 1',
    container: 'Container 1',
    volume: '1L',
    unit: 'Unit 1',
    pieces: 100,
    image: 'https://via.placeholder.com/50', // Image for the product
    sku: 'SKU001',
    dateAdded: '2023-01-01',
    netVolQty: '1L',
    inStock: 10
  },
  {
    id: '2',
    name: 'Item 2',
    description: 'Description 2',
    category: 'Category 2',
    supplier: 'Supplier 2',
    brand: 'Brand 2',
    container: 'Container 2',
    volume: '500ml',
    unit: 'Unit 2',
    pieces: 200,
    image: 'https://via.placeholder.com/50', // Image for the product
    sku: 'SKU002',
    dateAdded: '2023-02-01',
    netVolQty: '500ml',
    inStock: 5
  },
  // Add more items here as needed
];

export default function StocksInventoryPage() {
  const navigate = useNavigate();

  // Function to handle the redirect when Add New Item is clicked
  const handleAddNewItem = () => {
    navigate('/add-new-item'); // Navigate to the AddNewItemForm page
  };

  // Calculate the total count of items and percentage
  const totalItems = stockListData.reduce((total, item) => total + item.pieces, 0);
  const percentageChange = 5; // For example purposes
  const extraRevenue = "$5000"; // Example value

  // Additional example analytics data
  const analyticsData = [
    {
      title: 'Categories',
      count: totalItems.toString(),
      percentage: percentageChange,
      isLoss: false,
      extra: extraRevenue,
    },
    {
      title: 'Total Items',
      count: '1500',
      percentage: 10,
      isLoss: false,
      extra: '$2000',
    },
    {
      title: 'Items Low in Stock',
      count: '1000',
      percentage: -8,
      isLoss: true,
      extra: '$1000',
    },
  ];

  return (
    <div>
      {/* Grid container to arrange AnalyticsInventory components side by side */}
      <Grid container spacing={2}>
        {analyticsData.map((data, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <AnalyticsInventory
              title={data.title}
              count={data.count}
              percentage={data.percentage}
              isLoss={data.isLoss}
              extra={data.extra}
              color="primary"
            />
          </Grid>
        ))}
      </Grid>

      {/* Add space below the AnalyticsInventory components */}
      <Box sx={{ mb: 4 }} /> {/* This adds a margin at the bottom of the Grid container */}

      {/* Pass stockList data and handleAddNewItem function to StockList component */}
      <StockList stockList={stockListData} handleAddNewItem={handleAddNewItem} />
    </div>
  );
}
