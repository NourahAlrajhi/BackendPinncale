import whisper
import subprocess
import os
from urllib.request import urlopen, urlretrieve
import json
import requests
from cloudinary.utils import cloudinary_url
from dotenv import load_dotenv
load_dotenv()

# Import the Cloudinary libraries
# ==============================
import cloudinary
import cloudinary.uploader
import cloudinary.api
import ffmpeg

# r = requests.get('http://res.cloudinary.com/ddkx3lmtt/video/upload/v1674163194/CandidateInterview/n3ag8x3r1uxasrqxigpx.mkv')
config = cloudinary.config(secure=True)

# url = 'http://res.cloudinary.com/ddkx3lmtt/video/upload/v1674163194/CandidateInterview/n3ag8x3r1uxasrqxigpx.mkv'
# response = urlopen(url)
# output_json = json.loads(unicodedata(response.read()))
cloudinary.config( 
  cloud_name = "ddkx3lmtt", 
  api_key = "762496359684771", 
  api_secret = "bWNYJYSFyDmkE__trELFtXPy7jQ",
  secure = True
)


# video_url = cloudinary_url("v1674163194/CandidateInterview/n3ag8x3r1uxasrqxigpx.mkv", resource_type='video')
# dic_video = video_url[1]

os.environ["CLOUDINARY_URL"] = "cloudinary://762496359684771:bWNYJYSFyDmkE__trELFtXPy7jQ@ddkx3lmtt"
video_speech = cloudinary.CloudinaryVideo("v1674375576/CandidateInterview/dgflhkswrymx2kdiwhlx").video()


# Input file
in_file = "http://res.cloudinary.com/ddkx3lmtt/video/upload/v1674841122/CandidateInterview/kcynkerjpkc6ecoaa0jr.mkv"
# Output file
out_file = "kcynkerjpkc6ecoaa0jr.mp4"

# Run the conversion
(
    ffmpeg
    .input(in_file)
    .output(out_file, format="mp4")
    .run()
)



model = whisper.load_model("base")
result = model.transcribe(out_file, fp16=False, language='English')
print(result["text"])
