import { DataFrame } from "pandas-js";

export default model = () => {
    // Example ratings data (replace with actual data)
    const ratingsData = {
        'User1': [4, 5, 0, 0, 3],  // Ratings for 5 common restaurants
        'User2': [0, 5, 4, 0, 0],
        'User3': [3, 0, 0, 4, 5],
        // ... additional users
    };
  
    const ratingsDf = new DataFrame(ratingsData, { index: ['Restaurant1', 'Restaurant2', 'Restaurant3', 'Restaurant4', 'Restaurant5'] });
    
    // Calculate user similarities (using cosine similarity for simplicity)
    //   const userSimilarities = cosineSimilarities(ratingsDf.values);
    
    // Choose a target user (e.g., User1) for recommendation
    const targetUser = 'User1';
    const targetUserRatings = ratingsDf[targetUser].values.reshape(1, -1);
    
    console.log(targetUserRatings);
    console.log(ratingsDf);
    
    // Calculate the similarity between the target user and all other users
    const similaritiesWithTarget = cosineSimilarities(targetUserRatings, ratingsDf.T.values);
    
    // Weighted sum of ratings from similar users to generate recommendations
    const recommendations = calculateRecommendations(similaritiesWithTarget, ratingsDf.values);
    
    // Exclude already rated restaurants
    const unratedRestaurants = ratingsDf.index[ratingsDf[targetUser] === 0];
    const recommendationsForUnrated = recommendations[ratingsDf[targetUser] === 0];
    
    const allRestaurants = ratingsDf.index;
    const recommendedRestaurants = allRestaurants[sortRecommendations(recommendations)];
    
    const N = 1;
    
    const topRecommendations = recommendedRestaurants.slice(0, N);
    console.log(`Top ${N} recommended restaurants for the group: ${topRecommendations[0]}`);
    
    // Example arrays of non-binary values (replace with your actual data)
    const winner = [3, 1, 5, 2, 4]; // Pretend this is the features of the users' top-rated restaurant
    const unratedPlaces = [
        [1, 5, 1, 6, 1],
        [2, 2, 3, 5, 1]
    ];
    const placeNames = ['Chappies', 'ZaZa'];
    
    // Reshape arrays to be 2D (required for cosine_similarity)
    const winner2D = reshapeArray(winner);
    
    // Calculate cosine similarity
    const similarityScores = [];
    for (const arr of unratedPlaces) {
        const arr2D = reshapeArray(arr);
        similarityScores.push(cosineSimilarity(winner2D, arr2D));
    }
    
    console.log(similarityScores);
    // The similarity_matrix is a 2D array, and the value at [0, 0] represents the cosine similarity
    
    const recPlaceValue = Math.max(...similarityScores);
    const recPlaceName = placeNames[similarityScores.indexOf(recPlaceValue)];
    
    console.log(`In this case, we recommend ${recPlaceName} with a similarity of ${Math.round(recPlaceValue * 100)}% to the top restaurant from the survey`);
    
    function cosineSimilarity(array1, array2) {
        if (array1.length !== array2.length) {
        throw new Error('Arrays must have the same length');
        }
    
        let dotProduct = 0;
        let magnitude1 = 0;
        let magnitude2 = 0;
    
        for (let i = 0; i < array1.length; i++) {
        dotProduct += array1[i] * array2[i];
        magnitude1 += array1[i] * array1[i];
        magnitude2 += array2[i] * array2[i];
        }
    
        if (magnitude1 === 0 || magnitude2 === 0) {
        return 0; // Handle the case where one of the arrays has zero magnitude
        }
    
        const similarity = dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
        return similarity;
    }
    
    function calculateRecommendations(similarities, ratingsMatrix) {
        const weightedSum = Array(ratingsMatrix[0].length).fill(0);
        let sumOfWeights = 0;
    
        for (let i = 0; i < similarities.length; i++) {
        const weight = similarities[i];
        sumOfWeights += Math.abs(weight);
        for (let j = 0; j < ratingsMatrix[i].length; j++) {
            weightedSum[j] += weight * ratingsMatrix[i][j];
        }
        }
    
        if (sumOfWeights === 0) {
        throw new Error('Sum of weights is zero, cannot calculate recommendations.');
        }
    
        const recommendations = weightedSum.map(value => value / sumOfWeights);
        return recommendations;
    }
    
    function sortRecommendations(recommendations) {
        const indices = Array.from(recommendations.keys());
    
        indices.sort((a, b) => recommendations[b] - recommendations[a]);
    
        return indices;
    }
    
    function reshapeArray(array) {
        return array.slice().map(value => [value]);
    }
}

