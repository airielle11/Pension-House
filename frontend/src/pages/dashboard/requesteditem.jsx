import React from 'react';

const styles = {
  container: {
    width: '90%',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'left',
    margin: '20px 0',
  },
  table: {
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '10px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
  },
  cell: {
    flex: 1,
    textAlign: 'left',
  },
  image: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '5px',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
};

export default function RequestedItem({ product, onBack }) {
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Requested Product Details</h2>
      {product ? (
        <div style={styles.table}>
          <div style={styles.row}>
            <div style={styles.cell}>Product Name:</div>
            <div style={styles.cell}>{product.productName}</div>
          </div>
          <div style={styles.row}>
            <div style={styles.cell}>Category:</div>
            <div style={styles.cell}>{product.category}</div>
          </div>
          <div style={styles.row}>
            <div style={styles.cell}>Brand:</div>
            <div style={styles.cell}>{product.brand}</div>
          </div>
          <div style={styles.row}>
            <div style={styles.cell}>Quantity:</div>
            <div style={styles.cell}>{product.quantity}</div>
          </div>
          <div style={styles.row}>
            <div style={styles.cell}>Product Image:</div>
            <div style={styles.cell}>
              <img
                src={product.image}
                alt={product.productName}
                style={styles.image}
              />
            </div>
          </div>
          <button style={styles.button} onClick={onBack}>
            Back to Requisitions
          </button>
        </div>
      ) : (
        <h4>No Product Details Available</h4>
      )}
    </div>
  );
}
