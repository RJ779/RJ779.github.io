import csv 
import json 

csv_name = 'heic_questions6.csv'
json_name = 'questions.json'

with open(csv_name, 'r', encoding='utf-8') as csv_file: 
    reader = csv.DictReader(csv_file)
    data = list(reader)

with open(json_name, 'w', encoding='utf-8') as json_file: 
    json.dump(data, json_file, indent=2)

print("worked!")