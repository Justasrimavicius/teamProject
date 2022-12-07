import praw
#<<<<<<< HEAD
import collections
import sys

#import pandas as pd
#import numpy as np
#import matplotlib as plt
#from collections import Counter
#>>>>>>> 0f3b4fb293773165fc7a9bf2538c049a6f228b5b

reddit = praw.Reddit(client_id="VxNJxCLCw8OIfB5PqrUIFg", 
                     client_secret="uRYevllCXluCxz5sqqbudMpZBkjBQw", 
                     user_agent="Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0")

#<<<<<<< HEAD
criteria = sys.argv[1]
abcdefg = int(sys.argv[2])
all_posts = reddit.subreddit('all')

raw_list = []
def pagrindine_funkcija(word):
    target = reddit.subreddit("popular")

    for i in target.search(word, limit=10000):
        if(len(i.title.split()) != 0):
            raw_list.extend(i.title.split())
        if(len(i.selftext.split()) != 0):
            raw_list.extend(i.selftext.split())
        
        
pagrindine_funkcija(criteria)
#frequency = collections.Counter(raw_list)
for i in range (len(raw_list)):
    raw_list[i] =  raw_list[i].upper()

ignore = ['and','from','you','off','up','me','the', 'with', 'had',
         'as', 'the','a','if','in','it','of','or', 'is', 'to', 'on',
          'this', 'was', 'were', 'my', 'do' , 'so', 'be', 'are', 'for', 'but', 'i', 'at', 'am', '*', '&', '***', '-']
for i in range (len(ignore)):
    ignore[i] =  ignore[i].upper()

frequency = collections.Counter( x for x in raw_list if x not in ignore)
#=======
def pagrindine_funkcija(criteria):
    raw_list = []
    def reddit_scrap(word):
        target = reddit.subreddit("popular")

        for i in target.search(word, limit=10000):
            if(len(i.title.split()) != 0):
                raw_list.extend(i.title.split())
            if(len(i.selftext.split()) != 0):
                raw_list.extend(i.selftext.split())
            
            
    reddit_scrap(criteria)
    frequency = collections.Counter(raw_list)


#>>>>>>> 0f3b4fb293773165fc7a9bf2538c049a6f228b5b
'''''
def freq(raw_list):

    for words in raw_list :
        print("Frequency of"," '" ,  words , "'", "is :", raw_list.count(words))
 
print(freq(raw_list))
'''
print(frequency.most_common(abcdefg))