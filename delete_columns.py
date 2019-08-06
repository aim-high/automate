import openpyxl
from datetime import date

now = date.today()
now = now.strftime('%m-%d-%Y')

wb = openpyxl.load_workbook('Student Import.xlsx')
ws = wb.get_sheet_by_name('Person')
ws.delete_cols(1,3)
ws.delete_cols(3,4)
ws.delete_cols(4,4)
ws.delete_cols(5,2)
ws.delete_cols(6,58)
ws.delete_cols(10,15)

ws = wb.get_sheet_by_name('Student app')
# insert one column to the right of Site choices
ws.insert_cols(8)
ws.insert_cols(10)
ws.insert_cols(12)

# insert one column to right of current school region
ws.insert_cols(25)
ws.insert_cols(1,5)

wb.save('Google Forms student app import to FMP ' + now + '.xlsx')
print('Renamed file: Google Forms student app import to FMP ' + now + '.xlsx')
