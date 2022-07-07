import './SearchResults.css';
import NewsCard from '../NewsCard/NewsCard';

const exampleCard = {
  alt: 'a corgi',
  src: 'http://placekitten.com/1920/1080',
  date: 'Novermber 4, 2020',
  header: "Everyone Needs a Special 'Sit Spot' in...",
  text: `Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me.`,
  source: `treehugger`,
  link: '#',
};

const SearchResults = () => {
  return (
    <section className="search-results">
      <h2 className="search-results__title">Search results</h2>
      <div className="search-results__article-container">
        <NewsCard {...exampleCard} />
      </div>
    </section>
  );
};

export default SearchResults;
