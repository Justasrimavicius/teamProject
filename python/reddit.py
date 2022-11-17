import praw
import pandas as pd
import numpy as np
import matplotlib as plt
from collections import Counter

reddit = praw.Reddit(client_id="VxNJxCLCw8OIfB5PqrUIFg", 
                     client_secret="uRYevllCXluCxz5sqqbudMpZBkjBQw", 
                     user_agent="Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0")

criteria = input("Iveskite paieškos kriterijų: \n ")
def pagrindine_funkcija(criteria):
    all_posts = reddit.subreddit('all')
    scraped_data = pd.DataFrame()
    raw_list = []
    def reddit_scrap(word):
        target = reddit.subreddit("all")

        for i in target.search(word, limit=10000):
            if(len(i.title.split()) != 0):
                raw_list.extend(i.title.split())
            if(len(i.selftext.split()) != 0):
                raw_list.extend(i.selftext.split())
            
            
    reddit_scrap(criteria)
    frequency = Counter(raw_list)


'''''
def freq(raw_list):

    for words in raw_list :
        print("Frequency of"," '" ,  words , "'", "is :", raw_list.count(words))
 
print(freq(raw_list))
'''
print(frequency.most_common(100))