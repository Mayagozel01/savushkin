import logo from './logo.svg';
import './App.css';
import Banner from './components/banner/Banner';
import ScrollInteractiveBlock from './components/ScrollInterActiveBlock.js/ScrollInterActiveBlock';
import Gallery from './components/gallery/Gallery';
import OurVision from './components/ourvision/OurVision';

function App() {
  return (
    <div className=''>
      {' '}
      <Banner />
      {/* <ScrollInteractiveBlock /> */}
      <Gallery />
      <OurVision />
    </div>
  );
}

export default App;
