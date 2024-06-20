import { createContext, useContext } from "react";
import PropTypes from 'prop-types'

const Context = createContext();

export const StateContext = ({ children }) => {
  return (
    <Context.Provider value={{}}>
      {children}
    </Context.Provider>
  );
};

StateContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useStateContext = () => useContext(Context);
