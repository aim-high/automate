# Description: On a rolling basis throughout the summer, paper student applications are entered into Google Forms.
#              This script automates creating and deleting columns which originally were done manually.
# Purpose: Reformat paper student applications from Google Forms' export in order to import into student database. 
# Author: Erica Ching (eching@aimhigh.org)

#!/usr/bin/python3
import openpyxl
from datetime import date

now = date.today()
now = now.strftime('%m-%d-%Y')

wb = openpyxl.load_workbook('Student Import.xlsx')
ws = wb['Person']

ws.delete_cols(77,14) 		# delete columns BY:CL
ws.delete_cols(19,54)		# delete columns S:BT
ws.delete_cols(16,2)		# delete columns 16:17
ws.delete_cols(11,4)
ws.delete_cols(6,4)
ws.delete_cols(1,3)

ws = wb['Student app']
# insert one column to right of current school region
ws.insert_cols(22)

# insert one column to the right of Site choices
ws.insert_cols(10)
ws.insert_cols(9)
ws.insert_cols(8)

# insert 5 columns for person
ws.insert_cols(1,5)

wb.save('Google Forms student app import to FMP ' + now + '.xlsx')
print('Renamed file: Google Forms student app import to FMP ' + now + '.xlsx')
