const BASE_URL = "https://dummyjson.com/quotes"

// objectively, we don't need to wrap a simple one-liner like this inside a function, but
// a) i wanted to show you separation of concerns/purposes when building out a project that isn't just components,
// b) if this API function were reused in multiple places, I'd much rather just call getRandomQuote in those places
//    than the raw fetch line every time (violates D.R.Y. -> "don't repeat yourself")
export const getRandomQuote = () => 
  fetch(`${BASE_URL}/random`).then((response) => response.json())
