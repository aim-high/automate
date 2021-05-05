import os

'''# Function to rename multiple files
def main():
    for filename in enumerate(os.listdir("testing")):
        dst ="Hostel" + ".pdf"
        src ='xyz'+ filename
        dst ='xyz'+ dst
          
        # rename() function will
        # rename all the files
        os.rename(src, dst)
  
# Driver Code
if __name__ == '__main__':
      
    # Calling main() function
    main()
    '''

with open('../final.txt') as f:
    lines = []
    for line in f:
        line = line.replace("\n","")
        lines.append(line)

with open('../orig.txt') as f:
    original = []
    for line in f:
        line = line.replace("\n","")
        original.append(line)
                
print(lines)
print(original)
'''path = '/Users/erica/Documents/testdir'
files = os.listdir(path)
print(files)
'''
for x in range(0, 33): 
    os.rename(original[x], lines[x])
    

'''path = '/Users/erica/Documents/testdir'
files = os.listdir(path)

for index, file in enumerate(files):
    os.rename(os.path.join(path, file), os.path.join(path, ''.join([lines[index], '.pdf'])))
    print(index)
    print(file)
'''