// variables to bind with elements in the tree
const textContainer = document.getElementById('text');
const authorContainer = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');
const tweetQuoteLink = document.getElementById('tweet-quote');

// function to fetch random quote from API endpoint
async function fetchQuotes() {
  // code from rapid API random quote documentation
  const response = await fetch(
    'https://quotes15.p.rapidapi.com/quotes/random/',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'quotes15.p.rapidapi.com',
        'x-rapidapi-key': 'a40a668e8amsh7b7a9299cb89da1p1a0699jsnf93fdd415d8e',
      },
    }
  );

  // using json() to read readable stream from response
  const data = await response.json();

  // get quote content from response
  const text = data.content;

  // get quote author from response
  const author = data.originator.name;

  // return quote content and author combined as an object
  return { text, author };
}

// function to get quote content and author and update UI
function changeQuoteBoxContent() {
  fetchQuotes().then((rsp) => {
    // if quote is too long
    if (rsp.text.length > 200) {
      changeQuoteBoxContent();
    } else {
      textContainer.innerHTML = rsp.text;
      authorContainer.innerHTML = '- ' + rsp.author;
    }
  });
}

// fetch a random quote on first loading
changeQuoteBoxContent();

// when the new tweet is clicked
newQuoteButton.addEventListener('click', () => changeQuoteBoxContent());

// when the tweet button is clicked
tweetQuoteLink.addEventListener('click', () => {
  // combined quote content and author as string
  const quoteCurrentContent = `"${textContainer.innerHTML}" ${authorContainer.innerHTML}`;

  // create a link that makes a tweet
  const finalTweetLink =
    'https://twitter.com/intent/tweet?text=' + encodeURI(quoteCurrentContent);

  // update the href attribute of the tweet button
  tweetQuoteLink.href = finalTweetLink;
});
