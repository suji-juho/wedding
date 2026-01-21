import Hero from './components/Hero';
import Greeting from './components/Greeting';
import Calendar from './components/Calendar';
import Location from './components/Location';
import Gallery from './components/Gallery';
import Account from './components/Account';
import Guestbook from './components/Guestbook';
import Footer from './components/Footer';
import HeartEffect from './components/HeartEffect';

function App() {
  return (
    <div className="min-h-screen">
      <HeartEffect />
      <Hero />
      <Greeting />
      <Calendar />
      <Gallery />
      <Location />
      <Account />
      <Guestbook />
      <Footer />
    </div>
  );
}

export default App;
