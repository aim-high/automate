#!/usr/bin/python
import sys

name = input("Name: ")
num = int(input("How many items?: "))
list = [];
numLoop = num;

while num != 0:
	item = input("Item number: ")
	list.append(name + item)
	num = num - 1

i = 0;
for numLoop in list:
	print(list[i])
	i = i + 1
