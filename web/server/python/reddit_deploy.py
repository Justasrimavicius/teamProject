import praw
from collections import Counter

import sys

# def main():
# get criteria from .js (criteria should be a string)
criteria = sys.argv[1]

reddit = reddit(client_id="VxNJxCLCw8OIfB5PqrUIFg", 
                    client_secret="uRYevllCXluCxz5sqqbudMpZBkjBQw", 
                    user_agent="Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0")

all_posts = reddit.subreddit('all')
raw_list = []
target = reddit.subreddit("all")

for i in target.search(criteria, limit=10000):
    if(len(i.title.split()) != 0):
        raw_list.extend(i.title.split())
    if(len(i.selftext.split()) != 0):
        raw_list.extend(i.selftext.split())
    # reikia else if statement, jeigu nebus title ar selftext visai(even tho its unlikely)

frequency = dict(Counter(raw_list))
# should return frequency.most_common(any_number)
#  any_number is the number of most common words

# if __name__ == "__main__":
#     try:
#         main()
#     except:
#         print("nop")