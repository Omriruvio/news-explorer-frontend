import './Hamburger.css';

const Hamburger = ({ isDark }) => {
  const burgerClassName = `hamburger ${isDark ? 'hamburger_dark' : ''}`;
  return <button className={burgerClassName}></button>;
};

export default Hamburger;
