import whisper
import subprocess
import os
from urllib.request import urlopen, urlretrieve
import json
import sys
# import requests
from cloudinary.utils import cloudinary_url
# from dotenv import load_dotenv
# load_dotenv()
import cloudinary
import cloudinary.uploader
import cloudinary.api
import ContextSimilarity as c
config = cloudinary.config(secure=True)

cloudinary.config( 
  cloud_name = "ddkx3lmtt", 
  api_key = "762496359684771", 
  api_secret = "bWNYJYSFyDmkE__trELFtXPy7jQ",
  secure = True
)
os.environ["CLOUDINARY_URL"] = "cloudinary://762496359684771:bWNYJYSFyDmkE__trELFtXPy7jQ@ddkx3lmtt"

model = whisper.load_model("base") 

# RECORDARRAY2=[{
#   "imageUrl":"http://res.cloudinary.com/ddkx3lmtt/video/upload/v1675370638/CandidateInterview/ymfy3xexllzzlu2gvl2d.mkv",
#   "publicId":"CandidateInterview/ymfy3xexllzzlu2gvl2d",
#   "QuestionAndAnswerID":"022d25b9-1f76-46cf-bd24-b2ba8432c168"
# },
# {
#    "imageUrl":"http://res.cloudinary.com/ddkx3lmtt/video/upload/v1675370638/CandidateInterview/oqbvfibwjcxts3bgaf5l.mkv",
#   "publicId":"CandidateInterview/oqbvfibwjcxts3bgaf5l",
#   "QuestionAndAnswerID":"00cea5dc-3810-4cf9-8ead-cca14534c727"
# },
# {
#    "imageUrl":"http://res.cloudinary.com/ddkx3lmtt/video/upload/v1675370638/CandidateInterview/ibki4zqgrkutgwkfp12g.mkv",
#   "publicId":"CandidateInterview/ibki4zqgrkutgwkfp12g",
#   "QuestionAndAnswerID":"dc15a552-8710-4471-964d-3bc25db10a4e"
# },
# {
#   "imageUrl":"http://res.cloudinary.com/ddkx3lmtt/video/upload/v1675370638/CandidateInterview/zkegya9nepyu6ndhamab.mkv",
#   "publicId":"CandidateInterview/zkegya9nepyu6ndhamab",
#   "QuestionAndAnswerID":"d0aff3c3-e499-44f0-8e83-4588ebc6ab88"
# }]

# IDARRAY2=["022d25b9-1f76-46cf-bd24-b2ba8432c168","00cea5dc-3810-4cf9-8ead-cca14534c727","d0aff3c3-e499-44f0-8e83-4588ebc6ab88","dc15a552-8710-4471-964d-3bc25db10a4e"]

#sys.argv[1] #this is array of records
#sys.argv[2] #this is array of ActualAnswers
#sys.argv[3] #this is array of importance
#sys.argv[4] #this is array of question ids in correct order
# json.loads(sys.argv[1])
RECORDARRAY=sys.argv[1]
EXPECTED = sys.argv[2]
IMPORTANCE = sys.argv[3]
IDARRAY=sys.argv[4]
ArrayAfterLoadRecord = json.loads(RECORDARRAY)

ArrayAfterLoadAnswers = json.loads(EXPECTED)

ArrayAfterLoadImportance = json.loads(IMPORTANCE)

ArrayAfterLoadID = json.loads(IDARRAY)


# print("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVV")
# print(RECORDARRAY)
# print(EXPECTED)
# print(IMPORTANCE)
# print(IDARRAY)
# print(ArrayAfterLoadRecord[0]["QuestionAndAnswerID"])
# print("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVV")

ANSWERS= []
url = ""
video_format = "mp3"
result = ""

for i in range(len(ArrayAfterLoadID)):
  for j in range(len(ArrayAfterLoadRecord)):
    if ArrayAfterLoadRecord[j]["QuestionAndAnswerID"] == ArrayAfterLoadID[i]:
      url = ArrayAfterLoadRecord[j]["imageUrl"].replace(ArrayAfterLoadRecord[j]["imageUrl"][len(ArrayAfterLoadRecord[j]["imageUrl"]) - 3:], video_format) #replace mkv to mp3
      result = model.transcribe(url, fp16=False, language='English')
      ANSWERS.append(result["text"])


# print("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVV2222222")
# print(ArrayAfterLoadAnswers)
# print(ANSWERS)
# print(ArrayAfterLoadImportance)
# print("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVV2222222")

doubles_array, double_variable, string = c.ContextSimilarity(ArrayAfterLoadAnswers, ANSWERS, ArrayAfterLoadImportance)

# for i in range(len(ANSWERS)):
#   print("Question" + str(i+1) + "================")
#   print(ANSWERS[i])
#   print("=======================")
  

data = {"doubleArray": doubles_array, "doubleVariable": double_variable, "string": string}

# print("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVV33333")
# print(data)
# print(json.dumps(data))
# print("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVV333333")
print(json.dumps(data), file=sys.stdout)
sys.stdout.flush()
