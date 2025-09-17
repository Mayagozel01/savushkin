import logo from './logo.svg';
import './App.css';
import Banner from './components/banner/Banner';
import ScrollInteractiveBlock from './components/ScrollInterActiveBlock.js/ScrollInterActiveBlock';
import Gallery from './components/gallery/Gallery';
import OurVision from './components/ourvision/OurVision';
import Brands from './components/brands/Brands';

function App() {
  return (
    <div className=''>
      {' '}
      <Banner />
      {/* <ScrollInteractiveBlock /> */}
      <Brands />
      <OurVision />
      <Gallery />
    </div>
  );
}

export default App;
