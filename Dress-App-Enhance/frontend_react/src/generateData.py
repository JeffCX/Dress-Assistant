import os 
import json
import re
filterd = [".DS_Store"]

"""{
  SHIRT:
    [{
      order:"Take out the shirt",
      file:"TakeOutShirt"
    },
    {
      order:"Open the shirt",
      file:"OpenShirt"
    },{
      order:"Turn the shirt around",
      file:"TurnShirtAround",
    },{
      order:"Put the Arm Through the Hole",
      file:"PutArmThroughHole"
    }]
  
    
   
}"""

gan = [i for i in os.listdir("./audio") if i not in filterd]
result = {}
for j in gan:
    result[j] = []
    lst = [i for i in os.listdir("./audio/" + j) if i not in filterd]
    for i in lst:
        temp={}
       
        order = " ".join(i.split(".")[0].split("_"))
        temp["order"] = order
        temp["file"] = i
        result[j].append(temp)


with open('data.json', 'w') as outfile:
    json.dump(result, outfile)
