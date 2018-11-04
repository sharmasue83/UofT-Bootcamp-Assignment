import pandas as pd
Poll_df =pd.read_csv("PyPollsmall.csv")

df = pd.DataFrame(Poll_df)
print(df)
# count rows

row_count = df["Voter ID"].count()
print(row_count)

Candidate_list = df["Candidate"].unique()
print(Candidate_list)

# Method
khan = df['Voter ID'] [df["Candidate"] == "Khan"].count()

Correy = df['Voter ID'] [df["Candidate"] == "Correy"].count()

Li = df['Voter ID'] [df["Candidate"] == "Li"].count()
Tooley = df['Voter ID'] [df["Candidate"] == "O'Tooley"].count()

print(khan)
print(Correy)
print(Li)
print(Tooley)

Percent_khan = (khan/row_count)*100
Percent_Correy = (Correy/row_count)*100
Percent_Li = (Li/row_count)*100
Percent_Tooley = (Tooley/row_count)*100

print(Percent_khan)
print(Percent_Correy)
print(Percent_Li)
print(Percent_Tooley)

# Method 2
cand_count = df.groupby("Candidate")
a=cand_count["Voter ID"].count()
b=a/row_count*100
print(a)
print(b)

new_df = pd.DataFrame({"Khan": [Percent_khan],
                       "Correy": [Percent_Correy],
                       "Li": [Percent_Li],
                       "O'Tooley":[Percent_Tooley]})
print(new_df)
winner = new_df.values.max()
print(winner)
print("Election Result")
print("-----------------------------------")
print("Total Votes:" + str(row_count))
print("Khan:" + str(Percent_khan) + "("+str(khan)+")")
print("Correy:" + str(Percent_Correy) + "("+str(Correy)+")")
print("Li:" + str(Percent_Li) + "("+str(Li)+")")
print("O'Tooley:" + str(Percent_Tooley) + "("+str(Tooley)+")")
print("--------------------------------------")
print("Winner:" + str(winner))
print("---------------------------------------")


    
    
with open("pypolloutput.txt", "w") as txt_file:
    txt_file.write(" Election Result" + "\n" +          
    "-----------------------------------------"+ "\n"+
    "Total Votes: " +str(row_count) + "\n" +
    "-----------------------------------------"+"\n"+
    "Khan: "+ str(Percent_khan) + " ("+ str(khan) + "\n"+
    
    "Correy: "+ str(Percent_Correy)+ " ("+ str(Correy)+")"+ "\n"+
                    
    "Li: " + str(Percent_Li)+ " ("+ str(Li)+")"+ "\n"+
    "O'Tooley: "+ str(Percent_Tooley)+ " ("+ str(Tooley)+")"+ "\n"+
    "--------------------------------------------------"+ "\n"+
    
    "Winner: " + str(winner) + "%"+ "\n"+
    
    "--------------------------------------------------")
    
    
                    
   
   
               