import React from 'react';
import JobRequisitionTable from './mm-job-req-table';
import RRTable from './mm-rr-table';

function ProductRequisitionTable() {
  return (
    <div>
      <RRTable/>
      <JobRequisitionTable />
    </div>
  );
}

export default ProductRequisitionTable;
