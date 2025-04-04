from gotrue.errors import AuthApiError
import tkinter as tk
from tkinter import filedialog
import mimetypes

from supabase_client import supabase


import logging

logger = logging.getLogger(__name__)



def add_new_supplier(
    p_splr_name: str,
    p_cont_p: str,
    p_email: str,
    p_phone: str,
    p_website: str,
    p_landline: str,
    p_splr_descr: str,
    p_st_no: str,
    p_st_name: str,
    p_unit_no: str,
    p_city: str,
    p_state: str,
    p_zip: str,
    p_country: str
):
    try:
        logger.info("Adding new supplier...")

        params = {
            "p_splr_name": p_splr_name,
            "p_cont_p": p_cont_p,
            "p_email": p_email,
            "p_phone": p_phone,
            "p_website": p_website,
            "p_landline": p_landline,
            "p_splr_descr": p_splr_descr,
            "p_st_no": p_st_no,
            "p_st_name": p_st_name,
            "p_unit_no": p_unit_no,
            "p_city": p_city,
            "p_state": p_state,
            "p_zip": p_zip,
            "p_country": p_country
        }

        # Execute the RPC (Assumes supabase is correctly initialized)
        db_response = supabase.rpc("add_new_supplier_wrapper", params).execute()

        return db_response.data

    except Exception as e:
        logger.error(f"An error occurred while adding a new supplier: {str(e)}")
        raise Exception(f"Error in add_new_supplier: {str(e)}")  # Re-raise the exception for better handling in the caller


""" d
def add_new_supplier(
    p_splr_name: str,
    p_cont_p: str,
    p_email: str,
    p_phone: str,
    p_website: str,
    p_landline: str,
    p_splr_descr: str,
    p_st_no: str,
    p_st_name: str,
    p_unit_no: str,
    p_city: str,
    p_state: str,
    p_zip: str,
    p_country: str
):
    try:
        logger.info("Adding new supplier...")

        params = {
            "p_splr_name": p_splr_name,
            "p_cont_p": p_cont_p,
            "p_email": p_email,
            "p_phone": p_phone,
            "p_website": p_website,
            "p_landline": p_landline,
            "p_splr_descr": p_splr_descr,
            "p_st_no": p_st_no,
            "p_st_name": p_st_name,
            "p_unit_no": p_unit_no,
            "p_city": p_city,
            "p_state": p_state,
            "p_zip": p_zip,
            "p_country": p_country
        }

        # Execute the RPC (Assumes supabase is correctly initialized)
        db_response = supabase.rpc("add_new_supplier_wrapper", params).execute()

        return db_response.data

    except Exception as e:
        logger.error(f"An error occurred while adding a new supplier: {str(e)}")
        raise Exception(f"Error in add_new_supplier: {str(e)}")  # Re-raise the exception for better handling in the caller


"""






def add_new_brand(new_brand_name: str):
    try:
        logger.info("Adding new brand...")

        # Ensure the new brand name is a non-empty string
        if not isinstance(new_brand_name, str) or not new_brand_name.strip():
            logger.error("Invalid brand name provided.")
            return {"error": "Brand name must be a non-empty string."}  # Return error directly

        function_params = {
            "p_br_name": new_brand_name
        }

        # Execute the RPC to add the new brand
        response = supabase.rpc("add_new_brand_wrapper", function_params).execute()

        # Log the full response for debugging
        logger.info(f"RPC response: {response}")

        # Print the response data for debugging purposes
        print("Response data:", response.data)

        # Return the response data
        return response.data

    except Exception as e:
        logger.error(f"An error occurred while adding a new brand: {str(e)}")
        return {"error": f"Error in add_new_brand: {str(e)}"}  # Return error message instead of raising it




"""
def get_suppliers():
    try:
        response = supabase.rpc("get_suppliers").execute()

        if response.data:
            suppliers = []
            # Iterate through each record and collect the supplier data
            for column in response.data:
                suppliers.append({
                    "ID": column.get("id", "N/A"),
                    "Supplier": column.get("supplier", "N/A")
                })
            return {"success": True, "suppliers": suppliers}
        else:
            return {"success": False, "message": "No suppliers found"}

    except Exception as e:
        return {"success": False, "error": f"An error occurred: {str(e)}"}
"""

def get_all_suppliers():
    try:
        # Call the Supabase RPC function to fetch all suppliers
        response = supabase.rpc("get_suppliers").execute()

        print(response)  # Debug: Print the raw response to inspect it

        if response.data:
            suppliers = []
            # Iterate through each record and collect the supplier data
            for column in response.data:
                suppliers.append({
                    "id": column.get("id", "N/A"),
                    "supplier": column.get("supplier", "N/A"),
                    "contact_person": column.get("contact person", "N/A"),
                    "email": column.get("email", "N/A"),
                    "phone": column.get("phone", "N/A"),
                    "website": column.get("website", "N/A"),
                    "landline": column.get("landline", "N/A"),
                    "description": column.get("description", "N/A"),
                    
                })
            return {"success": True, "suppliers": suppliers}
        else:
            return {"success": False, "message": "No suppliers found"}
    except Exception as e:
        print(f"Error occurred: {str(e)}")  # Debug: Print error message
        return {"success": False, "error": f"An error occurred: {str(e)}"}

""" old
def get_all_suppliers():
    try:
        # Call the Supabase RPC function to fetch all suppliers
        response = supabase.rpc("get_all_suppliers").execute()

        if response.data:
            suppliers = []
            # Iterate through each record and collect the supplier data
            for column in response.data:
                suppliers.append({
                    "id": column.get("id", "N/A"),
                    "name": column.get("splr_name", "N/A"),
                    "contact_person": column.get("cont_p", "N/A"),
                    "email": column.get("email", "N/A"),
                    "phone": column.get("phone", "N/A"),
                    "website": column.get("website", "N/A"),
                    "landline": column.get("landline", "N/A"),
                    "description": column.get("splr_descr", "N/A"),
                    "street_no": column.get("st_no", "N/A"),
                    "street_name": column.get("st_name", "N/A"),
                    "unit_no": column.get("unit_no", "N/A"),
                    "city": column.get("city", "N/A"),
                    "state": column.get("state", "N/A"),
                    "zip": column.get("zip", "N/A"),
                    "country": column.get("country", "N/A"),
                })
            return {"success": True, "suppliers": suppliers}
        else:
            return {"success": False, "message": "No suppliers found"}
    except Exception as e:
        return {"success": False, "error": f"An error occurred: {str(e)}"}

"""


"""

def get_all_suppliers():
    try:
        # Fetch all suppliers from the database
        suppliers = Supplier.objects.all()

        # Prepare the data to be returned
        supplier_data = []
        for supplier in suppliers:
            supplier_data.append({
                "id": supplier.id,
                "name": supplier.splr_name,
                "contact_person": supplier.cont_p,
                "email": supplier.email,
                "phone": supplier.phone,
                "website": supplier.website,
                "landline": supplier.landline,
                "description": supplier.splr_descr,
                "street_no": supplier.st_no,
                "street_name": supplier.st_name,
                "unit_no": supplier.unit_no,
                "city": supplier.city,
                "state": supplier.state,
                "zip": supplier.zip,
                "country": supplier.country,
            })
        
        # Return the data as a dictionary
        return {"suppliers": supplier_data}
    
    except Exception as e:
        # Log the exception or print it for debugging
        print(f"Error occurred while fetching suppliers: {str(e)}")
        # Return an error message if something goes wrong
        return {"error": f"An error occurred: {str(e)}"}
        
        """


def get_brands():
    try:
        response = supabase.rpc("get_brands").execute()

        if response.data:
            brands = []
            # Iterate through each record and collect the brand data
            for column in response.data:
                brands.append({
                    "ID": column.get("id", "N/A"),
                    "Brand": column.get("brand", "N/A")
                })
            return {"success": True, "brands": brands}
        else:
            return {"success": False, "message": "No brands found"}

    except Exception as e:
        return {"success": False, "error": f"An error occurred: {str(e)}"}