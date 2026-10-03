import SnowfallWrapper from "@/components/ui/snowfall-wrapper";
import About from "@/components/minimal/About/About";
import Experience from "@/components/minimal/Experience/Experience";
import GitHubActivities from "@/components/minimal/GitHubActivities/GitHubActivities";
import Projects from "@/components/minimal/Projects/Projects";
import ContactMe from "@/components/minimal/ContactMe/ContactMe";
import Services from "@/components/minimal/Services/service";
import PhotoGraphy from "@/components/minimal/PhotoGraphy_SK_ui/PhotoGraphy";
import SkillConstellation from "@/components/minimal/Skills/SkillConstellation";
import Achievements from "@/components/minimal/Achivements/Achievements";
import TiltedTechToolls from "@/components/minimal/TechToolls/TiltedTechToolls";

const page = () => {
  return (
    <>
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 font-[poppins]">
        {/* <SnowfallWrapper
          snowflakeCount={80}
          radius={[1, 2]}
          speed={[0.5, 1]}
          wind={[0, 0.5]}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 100,
            pointerEvents: "none",
          }}
        /> */}
        <About />
        {/* <TiltedTechToolls /> */}
        <Services />
        <Achievements />
        <GitHubActivities />
        <Experience />
        <Projects />
        <SkillConstellation />
        <PhotoGraphy />
        <ContactMe />
      </div>
    </>
  );
};

export default page;
