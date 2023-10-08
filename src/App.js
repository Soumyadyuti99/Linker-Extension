
import './App.css';
import React,{useState} from 'react';

function App() {
  const [willTrack,setTrack] = useState('notracking');
  function handleChange(event){
    setTrack(event.target.value);
  }
  return (
    <div className="App">
      <React.Fragment>
        
      <p>Share Data to Linker!!</p>
        <div className='ImageWrapper'>
          
        </div>
        <label>
          <input type="radio" value="track" checked={willTrack === 'track'} onChange={handleChange} />
            Allow Sending Data
        </label>
        <label>
          <input type="radio" value="notracking" checked={willTrack === 'notracking'} onChange={handleChange} />
            Hide Content from Linker
        </label>
        
      </React.Fragment>
    </div>
  );
}

export default App;
