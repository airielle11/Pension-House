from django.http import HttpResponse

from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors
from datetime import date
from supabase import create_client, Client

public_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkbHl4bHhwdHlpYmxxc3N1Znh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3NjIyNDEsImV4cCI6MjA0ODMzODI0MX0.6i31MPTdsGWREIr2wXzZn5plVFu22QcgZDSXCTX6GRQ"

# Initialize the Supabase client
url = "https://hdlyxlxptyiblqssufxu.supabase.co"  #Supabase URL
key = public_key  #Supabase API key
supabase: Client = create_client(url, key)


def generate_report_v3(p_start_date: date, p_end_date: date):
    try:
        # Prepare function parameters for the Supabase RPC
        function_params = {
            "start_date": p_start_date.isoformat(),
            "end_date": p_end_date.isoformat(),
        }

        # Fetch data from Supabase RPC
        response = supabase.rpc("generate_report_v2", function_params).execute()

        if response.data:
            # Create a response object for the PDF file
            response_pdf = HttpResponse(content_type="application/pdf")
            response_pdf["Content-Disposition"] = 'attachment; filename="item_demand_report.pdf"'

            # Create a PDF document
            doc = SimpleDocTemplate(response_pdf, pagesize=letter)
            elements = []

            # Add title
            styles = getSampleStyleSheet()
            title = Paragraph(
                f"Maribago Seaview Pension and Spa<br/>Item Demand Report<br/>{p_start_date} to {p_end_date}",
                styles["Title"]
            )
            elements.append(title)
            elements.append(Spacer(1, 20))  # Add spacing after the title

            # Prepare table data (Headers + Rows)
            table_data = [["ID", "Item Name", "SKU", "Category", "Brand", "Supplier", "Total Demand"]]
            for column in response.data:
                row = [
                    column.get("ID", "N/A"),
                    column.get("Item name", "N/A"),
                    column.get("sku", "N/A"),
                    column.get("Category", "N/A"),
                    column.get("Brand", "N/A"),
                    column.get("Supplier", "N/A"),
                    column.get("Total Demand", "N/A"),
                ]
                table_data.append(row)

            # Create the table
            table = Table(table_data)
            table.setStyle(TableStyle([
                ("BACKGROUND", (0, 0), (-1, 0), colors.grey),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, 0), 12),
                ("BOTTOMPADDING", (0, 0), (-1, 0), 10),
                ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
                ("GRID", (0, 0), (-1, -1), 1, colors.black),
            ]))

            elements.append(table)

            # Build the PDF
            doc.build(elements)
            return response_pdf

        else:
            return HttpResponse("No data found.", content_type="text/plain")
    except Exception as e:
        return HttpResponse(f"An error occurred: {e}", content_type="text/plain")
