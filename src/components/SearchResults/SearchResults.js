import './SearchResults.css';
import NewsCard from '../NewsCard/NewsCard';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import { useEffect, useState } from 'react';

const exampleCards = [
  {
    alt: 'a corgi',
    src: 'http://placekitten.com/1920/1080',
    date: 'Novermber 4, 2020',
    header: "Everyone Needs a Special 'Sit Spot' in...",
    text: `Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me.`,
    source: `treehugger`,
    link: '#',
  },
  {
    alt: 'a corgi',
    src: 'http://placekitten.com/400/300',
    date: 'Novermber 4, 2020',
    header: 'Nature makes you better',
    text: `We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the ..`,
    source: `National parks Traveler`,
    link: '#',
  },
  {
    alt: 'a corgi',
    src: 'http://placekitten.com/1920/1080',
    date: 'Novermber 4, 2020',
    header: "Everyone Needs a Special 'Sit Spot' in...",
    text: `Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me.`,
    source: `treehugger`,
    link: '#',
  },
  {
    alt: 'a corgi',
    src: 'http://placekitten.com/400/300',
    date: 'Novermber 4, 2020',
    header: 'Nature makes you better',
    text: `We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the ..`,
    source: `National parks Traveler`,
    link: '#',
  },
  {
    alt: 'a corgi',
    src: 'http://placekitten.com/250/200',
    date: 'Novermber 4, 2020',
    header: 'Grand Teton Renews Historic Crest Trail',
    text: `“The linking together of the Cascade and Death Canyon trails, at their heads, took place on October...`,
    source: `National parks Traveler`,
    link: '#',
  },
  {
    alt: 'a corgi',
    src: 'http://placekitten.com/960/640',
    date: 'Novermber 4, 2020',
    header: 'Nostalgic Photos of Tourists in U.S. Nation...',
    text: `Uri Løvevild Golman and Helle Løvevild Golman are National Geographic Explorers and...`,
    source: `treehugger`,
    link: '#',
  },
  {
    alt: 'a corgi',
    src: 'http://placekitten.com/1080/720',
    date: 'Novermber 4, 2020',
    header: "Scientists Don't Know Why Polaris Is So Weird",
    text: `Humans have long relied on the starry sky to push into new frontiers, sail to the very edge...`,
    source: `treehugger`,
    link: '#',
  },
];

const SearchResults = () => {
  const [displayCards, setDisplayCards] = useState([]);
  const [displaySets, setDisplaySets] = useState(0);

  const getDisplayCards = (cardArray, count = 1, size = 3) => {
    const lastIndex = count * size - 1;
    const cardsToDisplay = cardArray.slice(0, lastIndex + 1);
    return cardsToDisplay.map((card, i) => <NewsCard key={i} {...card}></NewsCard>);
  };

  const handleGetNextCards = () => {
    const cards = getDisplayCards(exampleCards, displaySets + 1);
    setDisplayCards(cards);
    setDisplaySets(displaySets + 1);
  };

  useEffect(() => {
    const newCards = getDisplayCards(exampleCards, displaySets);
    setDisplayCards(newCards);
  }, [displaySets]);

  return (
    <section className="search-results">
      <h2 className="search-results__title">Search results</h2>
      <ul className="search-results__article-container">{displayCards}</ul>
      <ShowMoreButton getNextCards={handleGetNextCards} />
    </section>
  );
};

export default SearchResults;
