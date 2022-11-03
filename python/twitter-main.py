from keys import *
import pandas as pd
import numpy as np
import os

# Suteiktų Twitter API raktų autentifikacija
auth = tw.OAuthHandler(api_key, api_secret)
auth.set_access_token(access_token, access_token_secret)
api = tw.API(auth, wait_on_rate_limit=True)

# Paieškos įvestis (žodis(-iai)) aprašoma kintamuoju
def get_tweets(key_word):
    twitter_users = []
    tweet_time = []
    tweet_likes = []
    tweet_string = []
    for tweet in api.search_tweets(q = key_word,
                                   lang = "en",
                                   result_type = "mixed", # mixed, recent, popular
                                   count = 100):
        # if (not tweet.retweeted) and ('RT @' not in tweet.text):
        twitter_users.append(tweet.user.name)
        tweet_time.append(tweet.created_at)
        tweet_likes.append(tweet.favorite_count)
        tweet_string.append(tweet.text)

    return twitter_users, tweet_time, tweet_likes, tweet_string

# Įrašų transformavimas į Excel'io failą
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

# Kreipinys į funkciją atitinkamams įrašams išvesti
twitter_users, tweet_time, tweet_likes, tweet_string = get_tweets("Formula1")
df = export_tweets(twitter_users, tweet_time, tweet_likes, tweet_string, "Formula1")
