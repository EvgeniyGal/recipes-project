const Container = ({ children, addClass = '' }) => {
  return <div className={`container ${addClass}`}>{children}</div>;
};

export default Container;
