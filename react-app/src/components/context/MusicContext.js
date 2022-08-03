import React, { useContext, useRef, useState, useEffect, createContext } from 'react';
import ReactDOM from 'react-dom';




const MusicContext = createContext();
export const useMusicContext = () => useContext(MusicContext)



export default function MusicProvider({ children }) {

    const [audioLists, setAudioLists] = useState([]);
  


    return (
      <>
        <MusicContext.Provider
       value={{audioLists,
        setAudioLists}}
        >
          {children}
        </MusicContext.Provider>

      </>
    );
  }
