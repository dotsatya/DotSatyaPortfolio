import About from "@/components/minimal/About/About";
import Experience from "@/components/minimal/Experience/Experience";
import TechToolls from "@/components/minimal/TechToolls/TechToolls";
import { FooterTitle } from "@/components/minimal/FooterTitle";
import GitHubActivities from "@/components/minimal/GitHubActivities/GitHubActivities";

const page = () => {
  return (
    <>
      <div className="p-10 font-[poppins]">
        <About />
        {/* <TechToolls /> */}
        {/* <GitHubActivities /> */}
        {/* <Experience /> */}
      </div>
      {/* <FooterTitle text="DOT SATYA" /> */}
    </>
  );
};

export default page;
