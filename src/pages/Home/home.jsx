import Banner from '../../components/Banner';
import NavBar from '../../components/NavBar';

export default function Home() {
  return (
    <div>
      <div class="background">
        <NavBar />
        <div className="container">
          <Banner />
        </div>
      </div>
    </div>
  );
}