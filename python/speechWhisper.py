import whisper

model = whisper.load_model("base")
result = model.transcribe("backend/python/audio/ariana.wav", fp16=False, language='English')
print(result["text"])