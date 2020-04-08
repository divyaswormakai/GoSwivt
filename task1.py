clusterCount=0
class flat:
	def __init__(self,val,visited):
		self.val = val
		self.visited=visited

	def visit(self):
		self.visited = True


def readFile(filename):
	f = open(filename,"r+")
	line = f.readline()
	finalArr = []
	iCount,jCount = 0,0
	while line:
		rowArr=[]
		for char in line:
			if char == '0':
				rowArr.append(flat(0,False))
				iCount+=1
			elif char == '+':
				rowArr.append(flat(1,False))
				iCount+=1
		finalArr.append(rowArr)
		jCount+=1

		line = f.readline()
	return finalArr,iCount//jCount,jCount

def CheckClustersIter():
	clusterCount =0
	for row in range(rowMax):
		for col in range(colMax):
			if not arr[row][col].visited:
				print(row,col)

				if arr[row][col].val:
					clusterList=list()
					clusterList.append([row,col])
					clusterMembers =0
					while len(clusterList)>0:
						i,j = clusterList.pop()
						if not arr[i][j].visited:
							arr[i][j].visit()
							print("------------",i,j)
							if j-1>=0 and arr[i][j-1].val:
								clusterList.append([i,j-1])
								clusterMembers+=1
							if j+1<colMax and arr[i][j+1].val:
								clusterList.append([i,j+1])
								clusterMembers+=1
							if j-1>=0 and i+1<rowMax and arr[i+1][j-1].val:
								clusterList.append([i+1,j-1])
								clusterMembers+=1
							if i+1<rowMax and arr[i+1][j].val:
								clusterList.append([i+1,j])
								clusterMembers+=1
							if j+1<colMax and i+1<rowMax and arr[i+1][j+1].val:
								clusterList.append([i+1,j+1])
								clusterMembers+=1
					if clusterMembers>0:
						clusterCount+=1
				else:
					arr[row][col].visit()
	return clusterCount

if __name__ == '__main__':
	fileArr = ['task1_1.txt','task1_2.txt']
	arr,colMax,rowMax = readFile(fileArr[0])

	count =CheckClustersIter()
	print(count)
	# for row in arr:
	# 	for col in row:
	# 		print(col.val,col.visited)
	# 	print('\n')
