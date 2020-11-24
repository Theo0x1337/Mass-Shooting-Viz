#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Nov 16 19:14:58 2020

@author: theobernardin
"""

import pandas as pd;

df = pd.read_csv('datasetv5.csv')

nomsStates = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
dic = {}
dicYearFatalities = {}

truc = []

for indice in df.index:
    for elem in nomsStates:
        if elem in df['location'][indice]:
            if elem in dic.keys():
                dic[elem] = df['fatalities'][indice] + dic[elem]
            else:
                dic[elem] = df['fatalities'][indice]
                

for elem in nomsStates:
    if elem not in dic.keys():
        dic[elem] = 0
    


    
for cle in dic.keys():
    if dic[cle] == 0:
        dic[cle] = [dic[cle],0]
    elif dic[cle] > 0 and dic[cle] < 25 :
        dic[cle] = [dic[cle],1]
    elif dic[cle] > 25 and dic[cle] < 50 :
        dic[cle] = [dic[cle],2]
    else :
        dic[cle] = [dic[cle],3]

        


"""
newData = pd.DataFrame(list(dic.items()),columns = ['state','fatalities']) 


newData.to_csv('fatalitiesByStates.csv')
"""

states = []
fatalities = []
values = []
for key in dic.keys():
    if dic[key] not in states:
        states.append(key)
        fatalities.append(dic[key][0])
        values.append(dic[key][1])

for i in range(0,len(states)):
    print(states[i])
    print(fatalities[i])
    print(values[i])
    print("----------------")

dic = {'state': states, 'fatalities': fatalities, 'values': values}   
    
df = pd.DataFrame(dic)  
    
# saving the dataframe  
df.to_csv('fatalitiesByStates.csv')
    
