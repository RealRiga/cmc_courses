import React from "react";
import { Link } from "react-router-dom";

import AboutSection1 from "../../components/about/About1";
import AboutSection2 from "../../components/about/OurMission";
import AboutSection3 from "../../components/about/OurVisions";
import OurValues from "../../components/about/OurValues";
import Testimonials from "../../components/about/Testimonials";
import back from "../../assets/images/back.png";
const About = () => {
  return (
    <>
      {/* <section className='py-10 bg-[radial-gradient(169.40%_89.55%_at_94.76%_6.29%,rgba(200,251,231,0.40)_10%,rgba(17,241,241,0.40)_40%,rgba(51,255,168,0.30)_90%)]'> */}
      <section className="py-10" style={{ backgroundImage: `url(${back})` }}>
        
        <div className=" w-full items-center justify-center text-center">
          <h1 className="text-lg">About Us</h1>
          <span className="text-span text-fontSize1 sm:text-fontSize3">
            Everything You Need To Know About ExpertSkillz
          </span>
        </div>
        <AboutSection1 />
        <AboutSection2 />
        <AboutSection3 />
        <OurValues />
        <Testimonials />
      </section>
    </>
  );
};

export default About;
