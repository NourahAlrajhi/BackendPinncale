
import sys, json

print('nnnnnnnnnnnn1111')
print('nnnnnnnnnnnn222')
print(sys.argv[1])
print(sys.argv[2])
print(sys.argv[3])
print(sys.argv[4])

sys.argv[1] #this is array of question
sys.argv[2] #this is array of importance
sys.argv[3] #this is array of records
sys.argv[4] #this is array of question ids in correct order

doubles_array = [1.1, 2.2, 3.3, 4.4]
double_variable = 3.14
string = "Passed"

data = {"doubleArray": doubles_array, "doubleVariable": double_variable, "string": string}
print(json.dumps(data), file=sys.stdout)
sys.stdout.flush()



