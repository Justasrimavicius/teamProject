import collections
import itertools
import tweepy as tw
import re

import sys

# idk about safety of these keys?
# these should be transfered to .env file
api_key = 'PxNIdoUIzWxBVWHyrtGGYbge4'
api_secret = 'AuNIaE8Uc6KjH3z1aFJ6S3psOfDAEAqxaQRNHTiFpJZ3oEpWyf'
access_token = '1342488469331976193-pnsUcP0eAQhcznk7jXWWEzrotpR1p8'
access_token_secret = 'qWEvsiim57Z9znObxsWb5jdowQDGOpR236vBR8utjjH00'

def main():
    # AUTHENTICATION
    auth = tw.OAuthHandler(api_key, api_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tw.API(auth, wait_on_rate_limit=True)

    # INPUT - these should be gotten from .js
    key_word = sys.argv[1]
    number = sys.argv[2]


    # FUNCTION REFERENCES
    twitter_users, tweet_time, tweet_likes, tweet_string, tweet_no_url = get_tweets(key_word, number, api)
    
    # returns word frequency
    frequent_words = word_frequency(tweet_no_url)


if __name__ == "__main__":
    try:
        main()
    except:
        print("nop")

# FUNCTIONS
def get_tweets(key_word, number, api):
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

    return frequent_words