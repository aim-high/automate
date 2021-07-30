# Description: Input tech name (i.e. "iPad_"), amount of that category, and item number (i.e. 23, 09, 38). Output is concatenated tech name and number.
# Purpose: Easily manage large inventory of tech equipment when loaning and receiving from sites. 
# Author: Erica Ching (eching@aimhigh.org)

#!/usr/bin/python
import sys

print("Welcome to append_itemNumber!")
print("Input tech name (i.e. 'AHiPad_'), amount of that category, and item number (i.e. 23, 09, 38). Output is concatenated tech name and number.")

name = input("Name: ")
num = int(input("How many items?: "))
list = [];
numLoop = num;

while num != 0:
	item = input("Item number: ")
	list.append(name + item)
	num = num - 1

list.sort()	
	
i = 0;
for numLoop in list:
	print(list[i])
	i = i + 1
