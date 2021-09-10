import React, { useState, useEffect } from 'react';
export const AppContext = React.createContext([{}, () => {}]);

export const AppProvider = (props) => {
  const [successCatch, setSuccessCatch] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  return (
    <AppContext.Provider
      value={[open, setOpen, successCatch, setSuccessCatch, data, setData]}
    >
      {props.children}
    </AppContext.Provider>
  );
};
