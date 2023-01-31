from sentence_transformers import SentenceTransformer
model = SentenceTransformer("sentence-transformers/bert-base-nli-mean-tokens")
from transformers import AutoTokenizer, AutoModel
import torch
from sklearn.metrics.pairwise import cosine_similarity
import array

#fine tuning

def ContextSimilarity(expected, actual, importance):
    similarity = array.array("d", [0] * len(expected))
    critical = []
    medium = []
    low = []
    decision = ""
    overall = 0
    for i, value in enumerate(expected):
        # if expected[i] == "open ended question":
        if value == "Open Ended Question":
            # similarity[i] = 0 -- no need since the array is already initialized with zeros
            continue
        
        # compare similarity here and store it in the array "similarity"
        sentences = [value, actual[i],""]
        embeddings = model.encode(sentences)
        similarity[i] = cosine_similarity([embeddings[0]],embeddings[1:])[0][0]

        if importance[i] == "Critical":
            critical.append(0.50 * similarity[i])
        elif importance[i] == "High":
            medium.append(0.30 * similarity[i])
        elif importance[i] == "Low":
            low.append(0.20 * similarity[i])
        
        similarity[i] = round(similarity[i] * 100, 2)
        
    # can be done in numpy
    averageCritical = sum(critical) / len(critical)
    averageMedium = sum(medium) / len(medium)
    averageLow = sum(low) / len(low)

    overall = averageCritical + averageMedium + averageLow

    if overall > 0.60:
        decision = "Passed"
    else:
        decision = "Failed"
    
    overall = round(overall * 100, 2)
    
    return similarity, overall, decision

#for testing uncomment the code below 
# exp = ["hi", "hello", "welcome", "hi", "hi", "hello"]
# act = ["hi", "hi", "hello", "hello", "hello", "welcome"]
# imp = ["critical", "medium", "critical", "critical", "medium", "low"]

# sim, ov, dec= ContextSimilarity(exp, act, imp)

# print(sim)
# print(ov)
# print(dec)