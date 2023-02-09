import azure.cognitiveservices.speech as speechsdk
import time
import json
import sys
# import requests
from cloudinary.utils import cloudinary_url
# from dotenv import load_dotenv
# load_dotenv()
import cloudinary
import cloudinary.uploader
import cloudinary.api

config = cloudinary.config(secure=True)
url = ""
video_format = "wav"

speech_config = speechsdk.SpeechConfig(subscription='5537925079fc4f01b9a648399bb78f77', region='eastus')
speech_config.speech_recognition_language="en-US"

fillers = json.load(open('wordsDL.json'))

filler_word_found = []

url = "http://res.cloudinary.com/ddkx3lmtt/video/upload/v1675370638/CandidateInterview/ymfy3xexllzzlu2gvl2d.mkv".replace("http://res.cloudinary.com/ddkx3lmtt/video/upload/v1675370638/CandidateInterview/ymfy3xexllzzlu2gvl2d.mkv"[len("http://res.cloudinary.com/ddkx3lmtt/video/upload/v1675370638/CandidateInterview/ymfy3xexllzzlu2gvl2d.mkv") - 3:], video_format) #replace mkv to mp3

RECORDARRAY2=[{
  "imageUrl":"http://res.cloudinary.com/ddkx3lmtt/video/upload/v1675370638/CandidateInterview/ymfy3xexllzzlu2gvl2d.mkv",
  "publicId":"CandidateInterview/ymfy3xexllzzlu2gvl2d",
  "QuestionAndAnswerID":"022d25b9-1f76-46cf-bd24-b2ba8432c168"
},
{
   "imageUrl":"http://res.cloudinary.com/ddkx3lmtt/video/upload/v1675370638/CandidateInterview/oqbvfibwjcxts3bgaf5l.mkv",
  "publicId":"CandidateInterview/oqbvfibwjcxts3bgaf5l",
  "QuestionAndAnswerID":"00cea5dc-3810-4cf9-8ead-cca14534c727"
},
{
   "imageUrl":"http://res.cloudinary.com/ddkx3lmtt/video/upload/v1675370638/CandidateInterview/ibki4zqgrkutgwkfp12g.mkv",
  "publicId":"CandidateInterview/ibki4zqgrkutgwkfp12g",
  "QuestionAndAnswerID":"dc15a552-8710-4471-964d-3bc25db10a4e"
},
{
  "imageUrl":"http://res.cloudinary.com/ddkx3lmtt/video/upload/v1675370638/CandidateInterview/zkegya9nepyu6ndhamab.mkv",
  "publicId":"CandidateInterview/zkegya9nepyu6ndhamab",
  "QuestionAndAnswerID":"d0aff3c3-e499-44f0-8e83-4588ebc6ab88"
}]


IDARRAY2=["022d25b9-1f76-46cf-bd24-b2ba8432c168","00cea5dc-3810-4cf9-8ead-cca14534c727","d0aff3c3-e499-44f0-8e83-4588ebc6ab88","dc15a552-8710-4471-964d-3bc25db10a4e"]


# def from_mic():
#     audio_config = speechsdk.audio.AudioConfig(use_default_microphone=True)
#     speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)

#    # print("Speak into your microphone.")
#     speech_recognition_result = speech_recognizer.recognize_once_async().get()

#     if speech_recognition_result.reason == speechsdk.ResultReason.RecognizedSpeech:
#         speech_recognition_result.text
#         with open ('writeme.txt', 'w') as file:
#             # Check if given file contains any filler.
#             for filler in fillers.filler:
#                 # If any filller word is found in the code.
#                 if speech_recognition_result.text.includes(filler):
#                     file.write(speech_recognition_result.text)
#     elif speech_recognition_result.reason == speechsdk.ResultReason.NoMatch:
#       speech_recognition_result.no_match_details
#     elif speech_recognition_result.reason == speechsdk.ResultReason.Canceled:
#         cancellation_details = speech_recognition_result.cancellation_details
#         cancellation_details.reason
#         if cancellation_details.reason == speechsdk.CancellationReason.Error:
#             cancellation_details.error_details
           



def check_filler(text):
    a=text
    for filler in fillers['fillers']:
      if filler in text:
        filler_word_found.append(text)
def from_file():
    audio_config = speechsdk.audio.AudioConfig(filename='output.wav')
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)

    done = False
    

    def stop_cb(evt):
        global a
        global b
        a= len(filler_word_found)
        b='low' if len(filler_word_found) < 10 else 'medium' if len(filler_word_found) < 15 else 'high' 
        evt.session_id
        speech_recognizer.stop_continuous_recognition()
        nonlocal done
        done = True

    speech_recognizer.session_started.connect(lambda evt: evt.session_id)
    speech_recognizer.session_stopped.connect(lambda evt: (evt.session_id))
    speech_recognizer.canceled.connect(lambda evt:evt.session_id)

    # speech_recognizer.recognizing.connect(lambda evt: print('RECOGNIZING: {}'.format(evt)))
    
    speech_recognizer.recognized.connect(lambda evt: check_filler(evt.result.text))
    speech_recognizer.session_stopped.connect(stop_cb)

    speech_recognizer.canceled.connect(stop_cb)  
    
    
    speech_recognizer.start_continuous_recognition()
   
    while not done:
        time.sleep(.5)
    a_array.append(a)
    b_array.append(b)

# from_mic()
a_array=[]
b_array=[]

for i in range(len(IDARRAY2)):
  for j in range(len(RECORDARRAY2)):
    if RECORDARRAY2[j]["QuestionAndAnswerID"] == IDARRAY2[i]:
        filler_word_found = []
        from_file()




data = {"doubleArray": a_array, "doubleVariable": 21.22, "string": b_array }


print(json.dumps(data), file=sys.stdout)
sys.stdout.flush()
