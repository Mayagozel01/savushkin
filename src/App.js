import logo from './logo.svg';
import './App.css';
import Banner from './components/banner/Banner';
import ScrollInteractiveBlock from './components/ScrollInterActiveBlock.js/ScrollInterActiveBlock';
import Gallery from './components/gallery/Gallery';

function App() {
  return (
    <div className=''>
      {' '}
      <Banner />
      {/* <ScrollInteractiveBlock /> */}
      <Gallery />
    </div>
  );
}

export default App;
