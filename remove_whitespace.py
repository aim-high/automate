'''
Remove leading and trailing whitespace within cells. 
'''
import openpyxl

wb = openpyxl.load_workbook('{filename}')
sheet = wb['Sheet1']

tuple(sheet['E2':'E354']) # get access to cells E2:E254
for rowOfCellObjects in sheet['E2':'E354']:
	for cellObj in rowOfCellObjects:
		string = str(cellObj.value) 
		cellObj.value = string.strip()
		
wb.save('{filename}')		
wb.close()
print('Done!')		
			