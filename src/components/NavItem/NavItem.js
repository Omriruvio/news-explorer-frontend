import './NavItem.css';

const NavItem = ({ children, isDark, hasBubble, text, isLarge }) => {
  let navItemClassname = `navbar__text ${isDark ? 'navbar__text_dark' : ''}`;
  if (hasBubble) navItemClassname += ` navbar__text_with-bubble`;
  if (isLarge) navItemClassname += ` navbar__text_with-large-bubble`;
  return (
    <div className={navItemClassname}>
      {text}
      {children}
    </div>
  );
};

export default NavItem;
