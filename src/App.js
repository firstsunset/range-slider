import './App.css';
import RangeSlider from './components/RangeSlider';

function App() {
  return (
    <div className="App">
      <RangeSlider min={100} max={900} step={100} />
    </div>
  );
}

export default App;
