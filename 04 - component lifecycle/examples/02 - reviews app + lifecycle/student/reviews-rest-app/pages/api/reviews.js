const BASE_URL = 'http://localhost:5000' // our backend via json-server

export const getReviews = () => {
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

export const addReview = ({ title, comment, rating }) => {
  return fetch(`${BASE_URL}/reviews`, {
    method: "POST", // here, I *need* to specify POST
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      comment,
      rating
    })
  }).then((response) => {
    return response.json()
  }).then((data) => {
    // The API response body is giving me an object of what I just posted
    // (prevents us double-hitting the API -> GET right after we POST);
    // -> so I want to add what I just made to my stateful array and re-render.

    // Remember, stateful variables are immutable, so I need to reconstruct the entire
    // array and then overwrite the value.}
    return Promise.resolve(data)
  })
}