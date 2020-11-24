# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""


import pandas as pd;

df = pd.read_csv('datasetv5.csv')

nomsStates = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

mycolumns = ['location','fatalities','year'] 


df2 = df[mycolumns]



dic = {}

listData = df2.values.tolist()

listData = sorted(listData, key=lambda listData: listData[2])

listState2noun = ["New York" , 'American Samoa' , 'New Hampshire' , 'New Jersey' , 'New Mexico' , 'North Carolina', 'North Dakota' , 'West Virginia' , 'Puerto Rico' , 'Rhode Island' , 'South Carolina' , 'South Dakota']


nomSplit = []

        
for state2n in listState2noun:
    for elem in listData:
        if(state2n in elem[0]):
            nomSplit = elem[0].split(" ")
            elem[0] = nomSplit[len(nomSplit)-2]+ " "+  nomSplit[len(nomSplit)-1]


for state in nomsStates:
    for elem in listData:
        if state in elem[0]:
            nomSplit = elem[0].split(" ")
            if(len(nomSplit)==3):
                elem[0] = nomSplit[2]
            else:
                pass
        else:
            pass
              
        

        

                

"""

if(("New York" or 'American Samoa' or 'New Hampshire' or 'New Jersey' or 'New Mexico' or 'North Carolina'or 'North Dakota' or 'West Virginia' or 'Puerto Rico' or 'Rhode Island' or 'South Carolina' or 'South Dakota') in elem[0]):
                nomSplit = elem[0].split(" ")
                elem[0] = nomSplit(len(nomSplit)-2)+" "+nomSplit(len(nomSplit)-1)
            elif (('District of Columbia' or 'Northern Mariana Islands') in elem[0]):
                nomSplit = elem[0].split(" ")
                elem[0] = nomSplit(len(nomSplit)-3)+" "+nomSplit(len(nomSplit)-2)+" "+nomSplit(len(nomSplit)-1)
            else:
                nomSplit = elem[0].split(" ")
                elem[0] = nomSplit[len(nomSplit)-1]

"""

listDataSort = []

for elem in listData:
    listDataSort.append([elem[0],elem[2],0])
    
    
new_list = [] 
for i in listDataSort : 
    if i not in new_list: 
        new_list.append(i)
        
        
for year_and_state in listDataSort:
    for elem in listData:
        if (elem[0] == year_and_state[0] and elem[2] == year_and_state[1]):
            year_and_state[2] = year_and_state[2] + elem[1]
    
    




#df3 = pd.DataFrame(listDataSort, columns=["state","year","fatalities"])
#df3.to_csv('fatalitiesByYearAndState.csv', index=False)

listAnnee = []

for elem in listDataSort:
    if elem[0] == "California":
        listAnnee.append([elem[1],elem[2]])



#df3 = pd.DataFrame(listAnnee, columns=["date","value"])
#df3.to_csv('californiaInfos.csv', index=False)
