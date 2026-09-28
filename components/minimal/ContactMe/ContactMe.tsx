"use client";
import AnimatedHeaderSection from "@/components/ui/AnimattedHeading/AnimatedHeaderSection";
import MapBox from "./MapBox";
import MessageBox from "./MessageBox";

const ContactMe = () => {
  return (
    <section className="section pt-20 md:pb-10 overflow-x-hidden" id="contact">
      <AnimatedHeaderSection
        subTitle={
          <>
            You{" "}
            <span className="font-bold text-lime-600 dark:text-lime-300">
              Dream
            </span>{" "}
            It, I{" "}
            <span className="font-bold text-lime-600 dark:text-lime-300">
              Code
            </span>{" "}
            It
          </>
        }
        title={
          <>
            <span className="font-semibold text-black dark:text-white">
              LET’S
            </span>{" "}

            <span
              className="
          font-bold
          italic
          text-transparent
          [-webkit-text-stroke:1.5px_#65a30d]
          dark:[-webkit-text-stroke:1.5px_#bef264]
        "
            >
              COOK
            </span>

            <span className="text-lime-600 dark:text-lime-300">.</span>
          </>
        }
        text={[
          <>
            LET&apos;S{" "}
            <span className="font-bold text-lime-600 dark:text-lime-300">
              BUILD
            </span>{" "}
            <span className=" text-gray-500">SOMETHING </span>
            <span className="font-bold text-lime-600 dark:text-lime-300">
              {" "}
              GREAT
            </span>
          </>,
          <>and discuss further!</>,
        ]}
        textColor="text-black dark:text-white"
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
