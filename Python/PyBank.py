# import os for writing csv path

import os
budget = os.path.join("", "PyBank.csv")

#import csv to read he csv file

import csv
with open(budget, 'r') as budget_data:
    csvreader=csv.reader(budget_data)
    # put next at this stage so that the loop has instructions to move to the next.
    # assign next to header that header is excluded while reading a loop.
    header = next(csvreader)
    
    
    #Q1) Find total number of months. so create months variable and list.
    months =[]
    total_months =0
    #Q2 Find total net amount of profit/losses between months
    amount=[]
    total_amount=0
    #Q3 Find average change in Profit/losses between months
    #so find difference between first line an dsecond line, put them in list,
    #append and find the differences. put this difference in the list and sum
    revenue =[] # this is for column 2 excel
     # this is for the list that will be created of subtraction.
    rev=0
    #Q4 Find greates increase in profit (date and amount)
    dates=[]
    for line in csvreader:
    # append rows so that the loop become continuous until the rows are empty
        
        months.append(line[0]) # always append in the empty list and not the variable.
        total_months += 1 # month = col 0
        
        amount.append(line[1])# amount = col 1
        total_amount = total_amount + int(line[1])
        
        revenue.append(int(line[1]))
        rev_diff = []
        max_change = revenue[0]
        min_change = revenue[0]
        
        dates.append(line[0])
        
       # Method 1: differnece of amount between months
        rev_diff = [revenue[i+1] - revenue[i] for i in range(len(revenue)-1)]
        
        #Method 2 : differnece of amount between months
    for i in range(len(revenue)): # consider range as we need difference between rows.
       
      #Q4 Find greates increase in profit (date and amount)
        if revenue[i] >= max_change:
            month_increase = dates[i]
            max_change = revenue[i]
        elif revenue[i] <= min_change:
            min_change = revenue[i]
            month_decrease = dates[i]
            
# find average change between the months.                
average_change = sum(rev_diff)   / len(rev_diff)     
           
        
        
print(total_months) #always print outside the loop to avoid errors.Is there a better #reason to do so??
print(total_amount)
print(revenue)        
print(rev_diff) 
print(average_change)
print(max_change)
print(min_change)
print(month_increase)
print(month_decrease)
     
 # printing text in .txt file
with open("output.txt", "w") as txt_file:
    txt_file.write(" Financial Analysis" + "\n" +
    "-----------------------------------------"+ "\n"+
    "Total months is: " +"$"+str(total_months) + "\n" +
    "Total : " +"$"+str(total_amount) + "\n" +
    "Average Change: "+"$"+str(average_change)+ "\n"+
    "Greatest increase in profits: "+str(month_increase)+ "  ($" + str(max_change)+ ")" +"\n"+
    
    "Greatest decrease in profits: " +str(month_decrease)+  "  ($" + str(min_change)+")")
                                                                         
    

