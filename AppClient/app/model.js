import { returnKeyLabel } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";

export default function model(inputRestaurants, nonSurveyData, ratingsData) {
    // Example ratings data (replace with actual data)
    // const ratingsData = {
    //     'User1': [4, 5, 0, 0, 3],  // Ratings for 5 common restaurants
    //     'User2': [0, 5, 4, 0, 0],
    //     'User3': [3, 0, 0, 4, 5],
    //     // ... additional users
    // };
    
    // const restaurants = ['Restaurant1', 'Restaurant2', 'Restaurant3', 'Restaurant4', 'Restaurant5'];

    // Calculate user similarities (using cosine similarity for simplicity)
    function cosineSimilarity(a, b) {
        const dotProduct = a.map((x, i) => x * b[i]).reduce((acc, val) => acc + val, 0);
        const normA = Math.sqrt(a.map(x => x ** 2).reduce((acc, val) => acc + val, 0));
        const normB = Math.sqrt(b.map(x => x ** 2).reduce((acc, val) => acc + val, 0));
        return dotProduct / (normA * normB);
    }
    
    const ratingsArray = Object.values(ratingsData);
    
    // Choose a target user (e.g., User1) for recommendation
    const targetUserIndex = 0;
    const targetUserRatings = ratingsArray[targetUserIndex];
    
    console.log(targetUserRatings);
    console.log(ratingsArray);
    
    // Calculate the similarity between the target user and all other users
    const similaritiesWithTarget = ratingsArray.map(ratings => cosineSimilarity(targetUserRatings, ratings));
    
    // Weighted sum of ratings from similar users to generate recommendations
    const recommendations = inputRestaurants.map((_, i) => {
        const numerator = ratingsArray.reduce((acc, userRatings, j) => {
        const similarity = similaritiesWithTarget[j];
        const userRating = userRatings[i];
        return acc + (similarity * (userRating !== 0 ? userRating : 0));
        }, 0);
    
        const denominator = similaritiesWithTarget.reduce((acc, similarity, j) => {
        const userRating = targetUserRatings[i];
        return acc + (similarity * (userRating !== 0 ? 1 : 0));
        }, 0);
    
        return denominator !== 0 ? numerator / denominator : 0;
    });
    
    // Exclude already rated restaurants
    const unratedRestaurants = targetUserRatings.map((rating, i) => (rating === 0 ? i : -1)).filter(index => index !== -1);
    const recommendationsForUnrated = unratedRestaurants.map(i => recommendations[i]);
    
    const allRestaurants = inputRestaurants;
    const recommendedRestaurants = allRestaurants
        .map((restaurant, i) => ({ restaurant, recommendation: recommendations[i] }))
        .sort((a, b) => b.recommendation - a.recommendation)
        .map(item => item.restaurant);
    
    const N = 1;

    console.log(recommendedRestaurants)
    
    const topRecommendations = recommendedRestaurants.slice(0, N);
    console.log(`Top ${N} recommended restaurants for the group: ${topRecommendations[0].name}`);
    
    // Example arrays of non-binary values (replace with your actual data)
    const winner = toFeatureArray(topRecommendations[0]);  
    var unratedPlaces = []
    const placeNames = [];
    nonSurveyData.forEach(restaurant => {
        placeNames.push(restaurant.name);
        unratedPlaces.push(toFeatureArray(restaurant));
    });
    
    
    // Calculate cosine similarity
    const similarityScores = unratedPlaces.map(place => cosineSimilarity(winner, place));
    
    console.log(similarityScores);
    
    const recPlaceValue = Math.max(...similarityScores);
    const recPlaceName = placeNames[similarityScores.indexOf(recPlaceValue)];
    
    console.log(`In this case, we recommend ${recPlaceName} with a similarity of ${Math.round(recPlaceValue * 100)}% to the top restaurant from the survey`);

    return {
        topVoted: topRecommendations[0],
        topSimilar: nonSurveyData[similarityScores.indexOf(recPlaceValue)],
        bottomVoted: recommendedRestaurants[recommendedRestaurants.length - 1]
    }
}


function toFeatureArray(restaurant){
    features = [];
    features.push(restaurant.delivery ? 1 : 0);
    features.push(restaurant.reservable ? 1 : 0);
    features.push(restaurant.takeout ? 1 : 0);
    features.push(restaurant.serves_breakfast ? 1 : 0);
    features.push(restaurant.serves_brunch ? 1 : 0);
    features.push(restaurant.serves_lunch ? 1 : 0);
    features.push(restaurant.serves_dinner ? 1 : 0);
    features.push(restaurant.serves_vegetarian_food ? 1 : 0);
    features.push(restaurant.serves_beer ? 1 : 0);
    features.push(restaurant.serves_wine ? 1 : 0);
    features.push(restaurant.rating);
    features.push(restaurant.price_level);

    return features;
}