const BASE_URL = 'http://localhost:5000' // our backend via json-server

const getReviews = () => {
  return fetch(`${BASE_URL}/reviews/`, {
	  method: "GET", // not totally necessary; fetch is GET by default
    headers: {
      'Content-Type': 'application/json'       
    }
	})
  .then((response)=> {
    return response.json()
  }).then((data)=> {
    // using Promise.resolve here will pass the data we have
    // fetched here as the returnedData passed when we use the function.
    // We could also just return the data; I'd just like to make steps explicit for fetch->then

    // getReviews().then((returnedData)=> { // when used in other places.})
    return Promise.resolve(data)
  })
}

const addReview = () => {
	// function to post a review
}