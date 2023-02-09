import azure.cognitiveservices.speech as speechsdk
import time
import json

speech_config = speechsdk.SpeechConfig(subscription='5537925079fc4f01b9a648399bb78f77', region='eastus')
speech_config.speech_recognition_language="en-US"

fillers = json.load(open('./wordsDL.json'))

filler_word_found = []

def from_mic():
    audio_config = speechsdk.audio.AudioConfig(use_default_microphone=True)
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)

    print("Speak into your microphone.")
    speech_recognition_result = speech_recognizer.recognize_once_async().get()

    if speech_recognition_result.reason == speechsdk.ResultReason.RecognizedSpeech:
        print("Recognized: {}".format(speech_recognition_result.text))
        with open ('writeme.txt', 'w') as file:
            # Check if given file contains any filler.
            for filler in fillers.filler:
                # If any filller word is found in the code.
                if speech_recognition_result.text.includes(filler):
                    file.write(speech_recognition_result.text)
    elif speech_recognition_result.reason == speechsdk.ResultReason.NoMatch:
        print("No speech could be recognized: {}".format(speech_recognition_result.no_match_details))
    elif speech_recognition_result.reason == speechsdk.ResultReason.Canceled:
        cancellation_details = speech_recognition_result.cancellation_details
        print("Speech Recognition canceled: {}".format(cancellation_details.reason))
        if cancellation_details.reason == speechsdk.CancellationReason.Error:
            print("Error details: {}".format(cancellation_details.error_details))
            print("Did you set the speech resource key and region values?")

def check_filler(text):
    print("Checking {a} for filler words".format(a=text))
    for filler in fillers['fillers']:
      if filler in text:
        filler_word_found.append(text)
def from_file():
    audio_config = speechsdk.audio.AudioConfig(filename='output.wav')
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)

    done = False
    

    def stop_cb(evt):
        print("Total filler words found ---> {a}, Frequency of Filler words ---> {b}".format(a=len(filler_word_found), b='low' if len(filler_word_found) < 10 else 'medium' if len(filler_word_found) < 15 else 'high'))
        print('CLOSING on {}'.format(evt.session_id))
        speech_recognizer.stop_continuous_recognition()
        nonlocal done
        done = True

    speech_recognizer.session_started.connect(lambda evt: print('SESSION STARTED: {}'.format(evt.session_id)))
    speech_recognizer.session_stopped.connect(lambda evt: print('SESSION STOPPED {}'.format(evt.session_id)))
    speech_recognizer.canceled.connect(lambda evt: print('CANCELED {}'.format(evt.session_id)))

    # speech_recognizer.recognizing.connect(lambda evt: print('RECOGNIZING: {}'.format(evt)))
    
    speech_recognizer.recognized.connect(lambda evt: check_filler(evt.result.text))
    speech_recognizer.session_stopped.connect(stop_cb)
    speech_recognizer.canceled.connect(stop_cb)
    
    speech_recognizer.start_continuous_recognition()
    while not done:
        time.sleep(.5)


# from_mic()
from_file()

