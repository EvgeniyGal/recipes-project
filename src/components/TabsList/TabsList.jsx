import cl from './tabsList.module.scss';
import PropTypes from 'prop-types';

const TabsForCurrentUser = [
  'My recipes',
  'My favorites',
  'Followers',
  'Following',
];
const TabsForUsers = ['Recipes', 'Followers'];
const TabsList = ({
  activeTab,
  setActiveTab,
  setCurrentPage,
  isCurrentUser,
}) => {
  const RenderTabs = isCurrentUser ? TabsForCurrentUser : TabsForUsers;

  const handleClick = e => {
    const tab = e.target.textContent;
    setActiveTab(tab);
    setCurrentPage(1);
  };
  return (
    <ul className={cl.tabsList}>
      {RenderTabs.map(tab => (
        <li
          key={tab}
          className={activeTab === tab ? cl.active : ''}
          onClick={handleClick}
        >
          {tab}
        </li>
      ))}
    </ul>
  );
};

TabsList.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  isCurrentUser: PropTypes.any,
  setCurrentPage: PropTypes.func.isRequired,
};

export default TabsList;
