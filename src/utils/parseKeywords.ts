/**
 * Receives an array of keywords e.g.:
 * ['Nature', 'Parks', 'Yellowstone', 'Photography', 'Yellowstone', 'Nature', 'Nature']
 * Returns case corrected and summarized list of most used keywords,
 * Returns null on empty array, or non array inputs
 **/
const parseKeywords = (keywordArray: Array<String>): String | null => {
  if (!Array.isArray(keywordArray)) return null;

  const keywordMap: Map<String, number> = new Map();
  const caseCorrectedArray = keywordArray.map((word) => toFirstUppercase(word));
  caseCorrectedArray.forEach((keyword) => {
    let current: number | undefined;
    if ((current = keywordMap.get(keyword))) {
      keywordMap.set(keyword, Number(current) + 1);
    } else {
      keywordMap.set(keyword, 1);
    }
  });

  const sortedKeywords = [...keywordMap].sort(([, aCount], [, bCount]) => bCount - aCount);
  const first = sortedKeywords?.[0][0];
  const second = sortedKeywords?.[1][0];
  const rest = sortedKeywords.length - 2;

  switch (sortedKeywords.length) {
    case 0:
      return null;
    case 1:
      return `${first}`;
    case 2:
      return `${first} and ${second}`;
    default:
      return `${first}, ${second}, and ${rest} other`;
  }
};

const toFirstUppercase = (str: String): String => String(str)[0].toUpperCase() + String(str).slice(1).toLowerCase();

export { parseKeywords };
