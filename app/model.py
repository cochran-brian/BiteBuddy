# Example ratings data (replace with actual data)
ratings_data = {
    'User1': [4, 5, 0, 0, 3],  # Ratings for 5 common restaurants
    'User2': [0, 5, 4, 0, 0],
    'User3': [3, 0, 0, 4, 5],
    # ... additional users
}

restaurants = ['Restaurant1', 'Restaurant2', 'Restaurant3', 'Restaurant4', 'Restaurant5']

# Calculate user similarities (using cosine similarity for simplicity)
def cosine_similarity(a, b):
    dot_product = sum(x * y for x, y in zip(a, b))
    norm_a = sum(x ** 2 for x in a) ** 0.5
    norm_b = sum(x ** 2 for x in b) ** 0.5
    return dot_product / (norm_a * norm_b)

ratings_array = [ratings_data[user] for user in ratings_data]

# Choose a target user (e.g., User1) for recommendation
target_user_index = 0
target_user_ratings = ratings_array[target_user_index]

print(target_user_ratings)
print(ratings_array)

# Calculate the similarity between the target user and all other users
similarities_with_target = [cosine_similarity(target_user_ratings, ratings) for ratings in ratings_array]

# Weighted sum of ratings from similar users to generate recommendations
recommendations = [
    sum(similarity * rating if rating != 0 else 0 for similarity, rating in zip(similarities_with_target, user_ratings)) /
    sum(similarity if user_rating != 0 else 0 for similarity, user_rating in zip(similarities_with_target, target_user_ratings))
    for user_ratings in zip(*ratings_array)
]

# Exclude already rated restaurants
unrated_restaurants = [i for i, rating in enumerate(target_user_ratings) if rating == 0]
recommendations_for_unrated = [recommendations[i] for i in unrated_restaurants]

all_restaurants = restaurants
recommended_restaurants = [restaurant for _, restaurant in sorted(zip(recommendations, all_restaurants), reverse=True)]

N = 1

top_recommendations = recommended_restaurants[:N]
print(f"Top {N} recommended restaurants for the group: {top_recommendations[0]}")

# Example arrays of non-binary values (replace with your actual data)
winner = [3, 1, 5, 2, 4]  # Pretend this is the features of the users' top-rated restaurant
unrated_places = [[2, 1, 5, 6, 3], [2, 2, 3, 5, 1]]
place_names = ['Chappies', 'ZaZa']

# Calculate cosine similarity
similarity_scores = [cosine_similarity(winner, place) for place in unrated_places]

print(similarity_scores)

rec_place_value = max(similarity_scores)
rec_place_name = place_names[similarity_scores.index(rec_place_value)]

print(f"In this case, we recommend {rec_place_name} with a similarity of {round(rec_place_value, 4) * 100}% to the top restaurant from the survey")
