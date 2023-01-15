// NB! Run in browser console!
// Set the date range
const beforeDate = "15.01.2022";
const afterDate = "01.03.2019";

function unixToString(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function stringToUnix(stringDate) {
  const dateArr = stringDate.split("."); // split the string by "."
  const day = dateArr[0];
  const month = dateArr[1] - 1;  // month is 0-based
  const year = dateArr[2];
  const date = new Date(year, month, day);
  return Math.floor(date.getTime() / 1000);
}

const results = {};

function queryNext(endDate) {
  if (stringToUnix(afterDate) > stringToUnix(endDate)) {
    console.log(Object.values(results));
    return;
  }
  console.log("Querying up to", endDate);

  // Query up to 500 items and output them as an array.
  fetch(`https://www.err.ee/api/category/latest/109?from=${afterDate}&to=${endDate}&limit=500`)
    .then(r => r.json())
    .then(r => {
      r.forEach(result => {
        results[result.id] = {
          articleUrl: result.canonicalUrl,
          articleTitle: result.heading
        };
      });

      if (r.length === 0) {
        queryNext("01.01.1981");
        return;
      }
      const last = r[r.length - 1];
      queryNext(unixToString(last.updated));
    })
}

queryNext(beforeDate);