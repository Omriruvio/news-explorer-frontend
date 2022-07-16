import './SavedNewsHeader.css';
import { useEffect, useState } from 'react';
import { useInfo } from '../../contexts/UserContext';
import { parseKeywords } from '../../utils/parseKeywords.ts';

const SavedNewsHeader = () => {
  const { currentUser, savedCards } = useInfo();
  const [keywords, setKeywords] = useState('');

  useEffect(() => {
    const newKeyWords = savedCards.map((card) => card.keyword);
    setKeywords(parseKeywords(newKeyWords));
  }, [savedCards]);

  return (
    <section className='saved-articles-info'>
      <h2 className='saved-articles-info__header'>Saved articles</h2>
      <span className='saved-articles-info__article-count'>
        {currentUser.name} you have {savedCards.length} saved articles
      </span>
      <span className='saved-articles-info__keywords'>By keywords: </span>
      <span className='saved-articles-info__keywords saved-articles-info__keywords_bold'>{keywords}</span>
    </section>
  );
};

export default SavedNewsHeader;
