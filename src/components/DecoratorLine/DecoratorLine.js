import './DecoratorLine.css';

const DecoratorLine = ({ isDark }) => {
  const decoratorClassname = `header__decorator ${isDark ? 'header__decorator_dark' : ''}`;
  return <div className={decoratorClassname}></div>;
};

export default DecoratorLine;
