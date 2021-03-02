import numpy as np
import pandas as pd
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors
import matplotlib.pyplot as plt


!wget https://cdn.freecodecamp.org/project-data/books/book-crossings.zip

!unzip book-crossings.zip

books_filename = 'BX-Books.csv'
ratings_filename = 'BX-Book-Ratings.csv'

df_books = pd.read_csv(
    books_filename,
    encoding = "ISO-8859-1",
    sep=";",
    header=0,
    names=['isbn', 'title', 'author'],
    usecols=['isbn', 'title', 'author'],
    dtype={'isbn': 'str', 'title': 'str', 'author': 'str'})

df_ratings = pd.read_csv(
    ratings_filename,
    encoding = "ISO-8859-1",
    sep=";",
    header=0,
    names=['user', 'isbn', 'rating'],
    usecols=['user', 'isbn', 'rating'],
    dtype={'user': 'int32', 'isbn': 'str', 'rating': 'float32'})

df_ratings['user_count'] = df_ratings.groupby('user')['user'].transform('count')
df_ratings = df_ratings[df_ratings['user_count'] >= 200]

df_ratings['isbn_count'] = df_ratings.groupby('isbn')['isbn'].transform('count')
df_ratings = df_ratings[df_ratings['isbn_count'] >= 100]

df_ratings.drop(['user_count', 'isbn_count'], axis=1, inplace=True)
df_books_ratings = pd.merge(df_ratings, df_books, on='isbn')
df_books_ratings.head()

rating_pivot = df_books_ratings.pivot(index = 'title', columns = 'user', values = 'rating').fillna(0)

rating_matrix = csr_matrix(rating_pivot.values)
model_knn = NearestNeighbors(metric = 'cosine', algorithm = 'brute')
model_knn.fit(rating_matrix)

def get_recommends(book = ""):
  try:
    titles = model_knn.kneighbors(rating_pivot.loc[book, :].values.reshape(1, -1), n_neighbors=6)
    books = [book, []]
    for i, book in enumerate(titles[1][0]):
      if i != 0:
        books[1].append([rating_pivot.iloc[book, :].name, titles[0][0][i]])
    return books
  except:
    raise ValueError('Book not found.)

# Usage: get_recommends("Where the Heart Is (Oprah's Book Club (Paperback))")
