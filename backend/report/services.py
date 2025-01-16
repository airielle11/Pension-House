from django.http import HttpResponse
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors
from datetime import date
from supabase import create_client, Client

public_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkbHl4bHhwdHlpYmxxc3N1Znh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3NjIyNDEsImV4cCI6MjA0ODMzODI0MX0.6i31MPTdsGWREIr2wXzZn5plVFu22QcgZDSXCTX6GRQ"

# Initialize the Supabase client
url = "https://hdlyxlxptyiblqssufxu.supabase.co"  # Supabase URL
key = public_key  # Supabase API key
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

        # Log the response for debugging
        print("Supabase Response:", response.data)

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

            # Prepare styles for table cells with text wrapping
            table_styles = getSampleStyleSheet()
            cell_style = table_styles["BodyText"]
            cell_style.wordWrap = "CJK"

            # Prepare table data (Headers + Rows)
            table_data = [["ID", "Item Name", "SKU", "Category", "Brand", "Supplier", "Total Demand"]]
            for column in response.data:
                row = [
                    Paragraph(str(column.get("id", "N/A")), cell_style),
                    Paragraph(str(column.get("Item name", "N/A")), cell_style),
                    Paragraph(str(column.get("sku", "N/A")), cell_style),
                    Paragraph(str(column.get("Category", "N/A")), cell_style),
                    Paragraph(str(column.get("brand", "N/A")), cell_style),
                    Paragraph(str(column.get("supplier", "N/A")), cell_style),
                    Paragraph(str(column.get("Total demand", "N/A")), cell_style),
                ]
                table_data.append(row)

            # Dynamically adjust column widths
            col_widths = [40, 100, 80, 120, 80, 80, 50]  # Adjust widths as needed

            # Create the table with dynamic column widths
            table = Table(table_data, colWidths=col_widths)
            table.setStyle(TableStyle([
                ("BACKGROUND", (0, 0), (-1, 0), colors.grey),  # Header background
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),  # Header text color
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),  # Center align all content
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),  # Header font
                ("FONTSIZE", (0, 0), (-1, 0), 10),  # Header font size
                ("FONTSIZE", (0, 1), (-1, -1), 8),  # Smaller font size for table content
                ("BOTTOMPADDING", (0, 0), (-1, 0), 10),  # Padding for header
                ("BOTTOMPADDING", (0, 1), (-1, -1), 5),  # Padding for content rows
                ("BACKGROUND", (0, 1), (-1, -1), colors.beige),  # Row background
                ("GRID", (0, 0), (-1, -1), 1, colors.black),  # Grid lines
            ]))

            elements.append(table)

            # Build the PDF
            doc.build(elements)
            return response_pdf

        else:
            print("No data found for the given date range.")
            return HttpResponse("No data found for the selected date range.", content_type="text/plain")
    except Exception as e:
        print(f"Error generating report: {e}")
        return HttpResponse(f"An error occurred: {e}", content_type="text/plain")
