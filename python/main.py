from keys import *
import tweepy as tw
import pandas as pd
import numpy as np
import os

auth = tw.OAuthHandler(api_key, api_secret)
auth.set_access_token(access_token, access_token_secret)
api = tw.API(auth, wait_on_rate_limit=True)

def get_tweets(key_word):
    twitter_users = []
    tweet_time = []
    tweet_likes = []
    tweet_string = []
    for tweet in tw.Cursor(api.search_tweets,
                           q = key_word + " -filter:retweets",
                           lang = "en",
                           result_type = "mixed").items(345): # mixed, recent, popular
        twitter_users.append(tweet.user.name)
        tweet_time.append(tweet.created_at)
        tweet_likes.append(tweet.favorite_count)
        tweet_string.append(tweet.text)

    return twitter_users, tweet_time, tweet_likes, tweet_string

def export_tweets(twitter_users, tweet_time, tweet_likes, tweet_string, key_word):
    df = pd.DataFrame({"name": twitter_users,
                       "time": tweet_time,
                       "likes": tweet_likes,
                       "tweet": tweet_string})
    df.to_csv(f"{key_word}.csv")
    df['time'] = df['time'].dt.tz_localize(None)
    df.to_excel(f"{key_word}-tweets.xlsx",
                sheet_name = f"{key_word}")

    return df

twitter_users, tweet_time, tweet_likes, tweet_string = get_tweets("Bugatti")
df = export_tweets(twitter_users, tweet_time, tweet_likes, tweet_string, "Bugatti")
