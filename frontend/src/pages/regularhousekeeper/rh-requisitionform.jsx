import React from "react";
import MainCard from "../../components/MainCard.jsx";
import RequisitionForm from "../requisition/RequisitionForm.jsx"

const RequisitionFormForHousekeeper = () => {
  return (
    <MainCard title="Select Requisition Type">
      <RequisitionForm />
    </MainCard>
  );
};

export default RequisitionFormForHousekeeper;
