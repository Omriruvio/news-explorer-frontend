interface Article {
  keyword: string;
  title: string;
  description: string;
  publishedAt: string;
  url: string;
  urlToImage: string;
  source: { name: string };
  id: string;
}

/**
 * Returns an array sorted by the most dominant keyword property
 * in a dedcending order.
 * @param cards Array of articles
 */

const sortByRelevance = (cards: Article[]): Article[] | null => {
  const weights: Map<string, number> = new Map();
  cards.forEach((article) => {
    const { keyword } = article;
    let value: number | undefined = weights.get(keyword);
    if (value) {
      weights.set(keyword, value + 1);
    } else {
      weights.set(keyword, 1);
    }
  });

  return [...cards].sort((articleA, articleB) => {
    const a = weights.get(articleB.keyword) || 0;
    const b = weights.get(articleA.keyword) || 0;
    return a - b;
  });
};

export { sortByRelevance };
