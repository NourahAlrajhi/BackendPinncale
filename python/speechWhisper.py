import whisper
import subprocess
import os
from urllib.request import urlopen, urlretrieve
import json
import sys
import requests
from cloudinary.utils import cloudinary_url
from dotenv import load_dotenv
load_dotenv()
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

#sys.argv[1] #this is array of records
#sys.argv[2] #this is array of ActualAnswers
#sys.argv[3] #this is array of importance
#sys.argv[4] #this is array of question ids in correct order

RECORDARRAY=sys.argv[1]
EXPECTED = sys.argv[2]
IMPORTANCE = sys.argv[3]
IDARRAY=sys.argv[4]


ANSWERS= []
url = ""
video_format = "mp3"
result = ""

for i in range(len(IDARRAY)):
  for j in range(len(RECORDARRAY)):
    if RECORDARRAY[j]['QuestionAndAnswerID'] == IDARRAY[i]:
      url = RECORDARRAY[j]['imageUrl'].replace(RECORDARRAY[j]['imageUrl'][len(RECORDARRAY[j]['imageUrl']) - 3:], video_format) #replace mkv to mp3
      result = model.transcribe(url, fp16=False, language='English')
      ANSWERS.append(result["text"])


doubles_array, double_variable, string = c.ContextSimilarity(EXPECTED, ANSWERS, IMPORTANCE)

# for i in range(len(ANSWERS)):
#   print("Question" + str(i+1) + "================")
#   print(ANSWERS[i])
#   print("=======================")
  

data = {"doubleArray": doubles_array, "doubleVariable": double_variable, "string": string}
print(json.dumps(data), file=sys.stdout)
sys.stdout.flush()
