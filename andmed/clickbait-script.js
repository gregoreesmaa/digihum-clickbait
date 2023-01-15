// NB! Run in browser console!
// Before running, open the facebook page, scroll as far as you want results from and fix the following variables;

// Store the element containing the posts in a global variable and set it here.
const postsContainer = temp1;

// Update the class names containing useful data.
const postClass = "x126k92a";
const imageClass = "xl1xv1r";
const referencedArticleUrlClass = "x1fey0fg";
const referencedArticleTitleClass = "xi2jdih";

// Check the page URL
const baseUrl = "https://www.facebook.com/klikimasin";


function getActualUrl(facebookUrl) {
  // Extract the query string from the URL
  const queryString = facebookUrl.split('?')[1];

  // Split the query string into key-value pairs
  const queryParams = queryString.split('&').map(param => {
    const [key, value] = param.split('=');
    return { [key]: value };
  });

  // Find the "u" parameter in the query string, which contains the actual URL
  const actualUrlParam = queryParams.find(param => param.hasOwnProperty('u'));

  // If the "u" parameter was found, return the URL it contains.
  // Otherwise, return original URL.
  return actualUrlParam ? decodeURIComponent(actualUrlParam.u) : facebookUrl;
}

function extractEmojis(html) {
  const regex = /(.*)<span[^>]*><img[^>]*alt="([^"]*)"[^>]*><\/span>(.*)/g;
  const emojis = [];

  let match;
  while (match = regex.exec(html)) {
    emojis.push(match[1] + match[2] + match[3]);
  }

  // If no emojis were found, return the input text
  if (emojis.length === 0) {
    return html;
  }

  // Join the array of strings into a single string and return it
  return emojis.join('');
}

const results = [...postsContainer.children].map(node => ({
  postUrl: [...node.getElementsByTagName("a")].map(e => e.href).filter(h => h.startsWith(`${baseUrl}/posts/`)).join("\n"),
  shortDescription: [...node.getElementsByClassName(postClass)].map(e => [...e.getElementsByTagName("div")].map(e2 => extractEmojis(e2.innerHTML)).join("\n")).join("\n"),
  imageUrl: [...node.getElementsByClassName(imageClass)].map(e => e.src).join("\n"),
  articleUrl: [...node.getElementsByClassName(referencedArticleUrlClass)].map(e => getActualUrl(e.href)).join("\n"),
  articleTitle: [...node.getElementsByClassName(referencedArticleTitleClass)].map(e => [...e.getElementsByTagName("span")].map(e2 => e2.innerHTML)).join("\n"),
}))

console.log(results);