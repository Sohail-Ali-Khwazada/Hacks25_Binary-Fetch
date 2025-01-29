import os
from dotenv import load_dotenv
from transformers import pipeline, AutoModelForCausalLM, AutoTokenizer
import requests
import json

# Load environment variables from .env file
load_dotenv()

# Retrieve the Gemini API key from the environment
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY

def sentiment(tweet):
    sentiment_analysis = pipeline("sentiment-analysis")
    result = sentiment_analysis(tweet)
    print(result[0]['label'])
    return result[0]['label']

def tweetCategory(tweet):
    classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

    candidate_labels = [
        "sports", 
        "politics", 
        "entertainment", 
        "technology", 
        "science", 
        "business", 
        "health", 
        "food", 
        "music", 
        "movies"
    ]

    result = classifier(tweet, candidate_labels)
    max_label = max(result['scores'])
    max_category = result['labels'][result['scores'].index(max_label)]
    print(f"{max_category} : {max_label}")    
    return max_category

def generateReplyGemini(sentiment, tweetCategory, tweet):
    # Construct the prompt to send to Gemini API
    prompt = f"{tweet}"

    # Prepare the data for the request
    data = {
        "contents": [
            {
                "parts": [{"text": prompt}]
            }
        ]
    }

    # Make the POST request to Gemini API
    headers = {'Content-Type': 'application/json'}
    response = requests.post(API_URL, headers=headers, data=json.dumps(data))

    # Check if the request was successful
    if response.status_code == 200:
        response_json = response.json()
        generated_reply = generated_reply = response_json['candidates'][0]['content']['parts'][0]['text']
        return generated_reply
    else:
        print(f"Error {response.status_code}: {response.text}")
        return "Sorry, I couldn't generate a reply."

# Main code to run the tweet analysis and reply generation
tweet = input("Enter a tweet: ")
sentiment_label = sentiment(tweet)
category_label = tweetCategory(tweet)

# Using Gemini API for reply generation
generated_reply = generateReplyGemini(sentiment_label, category_label, tweet)

print(f"\nGenerated reply: {generated_reply}")
