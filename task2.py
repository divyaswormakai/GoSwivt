def readFile(filename):
	f = open(filename,"r+")
	line = f.readline()
	finalArr = []
	iCount,jCount = 0,0
	j_c=list()
	c_j=list()
	while line:
		if len(line)>1:
			left,right = line.split(':')
			l = left
			r= right.split(' ')
			lCorrect=int(l[1])
			rCorrect=[]
			for elem in r:
				if len(elem)>0:
					char = elem[1]
					rCorrect.append(int(char))

			if left[0] == 'c':
				c_j.append([lCorrect,rCorrect])
			if left[0] == 'j':
				j_c.append([lCorrect,rCorrect])
			size = len(rCorrect)

		line = f.readline()
	return j_c,c_j,size

def FindCostMatrix():
	costMatrix = [[0 for x in range(size)] for y in range(size)]
	# Calculating the cost graph
	for elem in j_c:
		elem_ind=elem[0]-1
		wt=1
		for indx in elem[1]:
			indx-=1
			costMatrix[indx][elem_ind]+=wt
			wt+=1
	for elem in c_j:
		elem_ind=elem[0]-1
		wt=1
		for indx in elem[1]:
			indx-=1
			costMatrix[elem_ind][indx]+=wt
			wt+=1
	return costMatrix



def HungarianMethod():
	Step1()
	Step2()
	return(Step3())

# Row wise operation
def Step1():
	for i in range(size):
		minVal = min(costMatrix[i])
		for j in range(size):
			costMatrix[i][j]-=minVal

#Colum wise operation
def Step2():
	for i in range(size):
		minValCol = [min(i) for i in zip(*costMatrix)][i]
		for j in range(size):
			costMatrix[j][i]-=minValCol

# Row and Column Scanning
def Step3():
	rowIndx = 0
	finalAnswer = ['' for x in range(size)]
	# Row Scanning
	for row in costMatrix:
		zeroCount = [a for a in row if a==0]
		if len(zeroCount)<=1:
			zeroIndex = row.index(0)
			# print(rowIndx+1,zeroIndex+1)
			finalAnswer[rowIndx]=("c"+str(rowIndx+1)+": j"+str(zeroIndex+1))

			for colIndx in range(size):
				if costMatrix[colIndx][zeroIndex]==0:
					costMatrix[colIndx][zeroIndex]=1000

		rowIndx+=1

	#Column Scanning
	for i in range(size):
		for j in range(size):
			if costMatrix[j][i]==0:
				finalAnswer[j]=("c"+str(j+1)+": j"+str(i+1))

	return finalAnswer

if __name__ == '__main__':
	fileArr = ['task2_1.txt','task2_2.txt','task2_3.txt','task2_4.txt']
	j_c,c_j,size = readFile(fileArr[3])

	costMatrix = FindCostMatrix()
	finalAnswer = HungarianMethod()
	for row in finalAnswer:
		print(row)
