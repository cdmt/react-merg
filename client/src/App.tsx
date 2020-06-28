import React from 'react';

import {FontData} from './generated/fontData';
import {useQuery} from 'react-apollo-hooks';
import {GET_ALL_FONTS} from './queries'

function App() {

  const {data, loading} = useQuery<FontData>(GET_ALL_FONTS, {
    suspend:false
  })

  if(loading || !data) return <div>Loading</div>

  return (
    <div className="App">
      <h1>Fonts</h1>
      <ul>
        {
          data && data.fonts && data.fonts.map(font => (
          <li key={font?._id || ''} data-id={font?._id}>
            {font?.name}
          </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
