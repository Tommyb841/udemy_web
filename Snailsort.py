
#Given an n x n array, return the array elements arranged from outermost
#elements to the middle element, traveling clockwise.


array = [[1,2,3],
         [8,9,4],
         [7,6,5]]
#snail(array) #=> [1,2,3,6,9,8,7,4,5]

#start loop to add elements to new array
#traverse and append the first row.
for x, i in enumerate(array):
    
# go to the end of next element if not last elemnet go to end of next element
# Until last element then traverse  back to first item in the element
#go up to the first item in the previous element until you reach the last element 
# then traverse through the element until the end 
