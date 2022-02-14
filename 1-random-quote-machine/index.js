const textContainer = document.getElementById('text');
const authorContainer = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');

async function fetchQuotes() {
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
  const data = await response.json();
  const text = data.content;
  const author = data.originator.name;
  return { text, author };
}

function changeQuoteBoxContent() {
  fetchQuotes().then((rsp) => {
    if (rsp.text.length > 200) {
      changeQuoteBoxContent();
    } else {
      textContainer.innerHTML = rsp.text;
      authorContainer.innerHTML = '- ' + rsp.author;
    }
  });
}

changeQuoteBoxContent();

newQuoteButton.addEventListener('click', () => changeQuoteBoxContent());
