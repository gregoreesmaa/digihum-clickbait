// NB! Run in browser console!
// Set the date range
const startDate = "15.01.2022";
const endDate = "01.03.2019";

// Query up to 500 items and output them as an array.
fetch(`https://www.err.ee/api/category/latest/109?from=${endDate}&to=${endDate}&limit=500`)
  .then(r => r.json())
  .then(r => r.map(x => ({
    articleUrl: x.canonicalUrl,
    articleTitle: x.heading
  })))
  .then(JSON.stringify)
  .then(console.log);