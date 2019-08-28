# Script that quickly allows user to input starting range and ending range for differing income levels
#  
# Created by Erica Ching (eching@aimhigh.org)

#!/usr/bin/python
import sys


list = [];
levels = ["Poverty", "Low Income", "Moderate Income", "Middle Income"];
num = 1;
numLoop = 1;

num1 = input("$")
list.append(num1)
while (num < 0):
	num2 = input("$" + num1 + " - $")
	list.append(num2)
	num1 = num2
	num = num - 1

print("\n ~~ Income Brackets ~~\n")

i = 0;
for numLoop in list:
	print("$" + list[i] + " - $" + list[i + 1])
	i = i + 1