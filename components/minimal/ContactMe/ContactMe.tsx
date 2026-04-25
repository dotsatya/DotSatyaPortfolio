"use client";
import AnimatedHeaderSection from "@/lib/AnimattedHeading/AnimatedHeaderSection";
import MapBox from "./MapBox";
import MessageBox from "./MessageBox";

const ContactMe = () => {
  return (
    <section className="section pt-20 md:pb-10 overflow-x-hidden" id="contact">
      <AnimatedHeaderSection
        subTitle={"You Dream It, I Code it"}
        title={"Contact"}
        text={`WE’D love to hear from you and discus further!`}
        textColor={"text-black dark:text-white "}
        withScrollTrigger={true}
      />
      {/* <div
        className="container mx-auto grid grid-cols-2 gap-x-16 overflow-x-hidden
                  max-[992px]:gap-x-6 max-[768px]:grid-cols-1 max-[768px]:gap-y-8"
      >
        <MapBox />

        <MessageBox />
      </div> */}
      <div
        className="container mx-auto grid grid-cols-2 gap-x-16 items-start overflow-x-hidden
            max-[992px]:gap-x-6 max-[768px]:grid-cols-1 max-[768px]:gap-y-8"
      >
        <MapBox />
        <MessageBox />
      </div>
    </section>
  );
};

export default ContactMe;
