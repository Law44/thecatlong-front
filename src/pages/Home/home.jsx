import Banner from '../../components/Banner';
import NavBar from '../../components/NavBar';
import CircleBackground from '../../components/CircleBackground';

export default function Home() {
  return (
    <div>
      <div class="background">
        <CircleBackground/>
        <NavBar />
        
        <div className="container">
          <Banner />
        </div>
      </div>
    </div>
  );
}