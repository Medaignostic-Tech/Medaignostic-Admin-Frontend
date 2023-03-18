import MainNavbar from './MainNavbar';
import HomeTeam from './HomeTeam';
import HomeHero from './HomeHero';
import HomeContact from './HomeContact';
import HomeFeatures from './HomeFeatures';
import {Parallax} from 'react-parallax';
import aboutImg from '../assets/bg.jpg';


function Home() {

    return (
        <div className="home-background">
            <MainNavbar/>
            <Parallax
                bgImage={aboutImg}
                strength={500}
                renderLayer={() => (
                    <HomeHero />
                )}>
                <div style={{
                    height: '200vh'
                }}></div>
            </Parallax>
            <Parallax bgImage={aboutImg} strength={500} renderLayer={() => (<HomeFeatures />)}>
                <div style={{
                    height: window.innerWidth < 768 ? '500vh' : '200vh'
                }}></div>
            </Parallax>
            <HomeTeam />
            <HomeContact />
        </div>
    );
}

export default Home;