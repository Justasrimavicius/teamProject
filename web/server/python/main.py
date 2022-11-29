from keys import *
import collections
import itertools
import tweepy as tw
import pandas as pd
import numpy as np
import re
import os
import sys
# FUNCTIONS
def get_tweets(key_word, number):
    twitter_users = []
    tweet_time = []
    tweet_likes = []
    tweet_string = []
    tweet_no_url = [] # for data analysis
    for tweet in tw.Cursor(api.search_tweets,
                           q = key_word + " -filter:retweets",
                        #    tweet_mode = "extended", # doesn't work
                           result_type = "mixed", # settings: mixed, recent, popular
                           lang = "en").items(number):
        twitter_users.append(tweet.user.name)
        tweet_time.append(tweet.created_at)
        tweet_likes.append(tweet.favorite_count)
        tweet_string.append(tweet.text)
        tweet_no_url.append(remove_url(tweet.text)) # for data analysis

    return twitter_users, tweet_time, tweet_likes, tweet_string, tweet_no_url

def remove_url(text): # for data analysis

    return " ".join(re.sub("([^0-9A-Za-z \t])|(\w+:\/\/\S+)", "", text).split())

def word_frequency(tweet_no_url):
    tweet_words = []
    for tweet in tweet_no_url:
        tweet_words.append(tweet.lower().split())
    frequent_words = collections.Counter(list(itertools.chain(*tweet_words)))

    return frequent_words.most_common(resultQty)

def export_tweets(twitter_users, tweet_time, tweet_likes, tweet_string, key_word):
    tweets_df = pd.DataFrame({"name": twitter_users,
                              "time": tweet_time,
                              "likes": tweet_likes,
                              "tweet": tweet_string})
    # df.to_csv(f"{key_word}.csv") # .csv can be imported via excel power query
    tweets_df['time'] = tweets_df['time'].dt.tz_localize(None)
    tweets_df.to_excel(f"{key_word}-tweets.xlsx")

    return tweets_df

def export_words(frequent_words, key_word):
    words_df = pd.DataFrame(frequent_words.most_common(100), columns = ["word", "quantity"])
    words_df.to_excel(f"{key_word}-words.xlsx")

    return words_df

# AUTHENTICATION
auth = tw.OAuthHandler(api_key, api_secret)
auth.set_access_token(access_token, access_token_secret)
api = tw.API(auth, wait_on_rate_limit=True)

# INPUT
key_word = sys.argv[1]
number = 100
resultQty = int(sys.argv[2])

# FUNCTION REFERENCES
twitter_users, tweet_time, tweet_likes, tweet_string, tweet_no_url = get_tweets(key_word, number)
frequent_words = word_frequency(tweet_no_url)
# export_tweets(twitter_users, tweet_time, tweet_likes, tweet_string, key_word)
# export_words(word_frequency(tweet_no_url), key_word)

# print(export_tweets(twitter_users, tweet_time, tweet_likes, tweet_string, key_word))
# print(word_frequency(tweet_no_url))
print(frequent_words)
