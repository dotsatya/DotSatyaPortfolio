import About from "@/components/minimal/About/About";
import Experience from "@/components/minimal/Experience/Experience";
import TechToolls from "@/components/minimal/TechToolls/TechToolls";
import { FooterTitle } from "@/components/minimal/FooterTitle";
import GitHubActivities from "@/components/minimal/GitHubActivities/GitHubActivities";
import Projects from "@/components/minimal/Projects/Projects";
import Photography from "@/components/minimal/Photograohy/Photograohy";
import ContactMe from "@/components/minimal/ContactMe/ContactMe";
import SnowfallWrapper from "@/components/ui/snowfall-wrapper";

const page = () => {
  return (
    <>
      <div className="p-10 font-[poppins]">
        <SnowfallWrapper
          radius={[1, 2]}
          speed={[0.5, 1]}
          wind={[-0.5, 0.5]}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 100,
            pointerEvents: "none",
          }}
        />
        <About />
        <TechToolls />
        <GitHubActivities />
        <Experience />
        <Projects />
        {/* <Photography /> */}
        <ContactMe />
      </div>
      <FooterTitle text="DOT SATYA" />
    </>
  );
};

export default page;
