import Slider from "./components/Slider"
import NewsSection from "./components/NewsSection"
import StatsSection from "./components/StatsSection"
import Projects from "./components/Projects"
import SeasonalProjectsSection from "./components/SeasonalProjects"
import StrategicPartners from "./components/StrategicPartners"
import Footer from "../../components/Footer"
import TextPressure from "../../../yes/TextPressure/TextPressure"
import CircularGallery from "../../../yes/CircularSlider"
import ProjectCard from "../../components/cards"

const Home = () => {
  return (
    <div>
       <Slider />
      <NewsSection />
      <StatsSection />
      <Projects />
      <SeasonalProjectsSection />
      <StrategicPartners /> 
{/* 
      <div style={{
        position: 'relative', 
        height: '600px', 
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000'
      }}>
        <TextPressure
          text="kin.oasis"
          flex={true}
          alpha={false}
          stroke={true}
          width={true}
          weight={true}
          italic={true}
          textColor="#ffffff"
          strokeColor="#ff0000"
          minFontSize={50}
          scale={true}
          fontFamily="Arial"
        />
      </div> */}
      <ProjectCard />
   <div style={{ height: '600px', position: 'relative' }}>
  <CircularGallery  bend={0.4} textColor="#ffffff" borderRadius={0.05} />
</div>
        <Footer /> 
    </div>
  );
};

export default Home;