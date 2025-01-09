import React from "react";
import { AnimatedGradientText } from "../ui/animatedText";
import { cn } from "@/lib/utils";
import dashboardImg from "../../assets/aboutImage.jpeg";

const AaboutUs = () => {
  return (
    <div className="w-full py-32 flex-col items-center justify-center">
      <div className="container px-6 xs:px-8 sm:mx-8 lg:mx-auto grid grid-cols-1 lg:grid-cols-2  gap-8 relative">
        {/* part one */}
        <div className="col-span-full space-y-4">
          <AnimatedGradientText className="ml-0 bg-background backdrop-blur-0">
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-blue-400 via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}
            >
              Topaiglons
            </span>
          </AnimatedGradientText>
        </div>
        <div className="flex flex-col justify-start items-start order-2 lg:order-1">
          <div
            Lorem
            ipsum
            dolo
            className="flex items-start gap-4 rounded-lg p-4"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold">Apropos de nous</h3>
              <p className="text-sm xs:text-base text-muted-foreground pt-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur temporibus dicta deserunt vero consequuntur eos sit
                delectus soluta est iure, necessitatibus nulla aperiam quas at
                perspiciatis, suscipit corporis excepturi quos.
              </p>
              <p className="text-sm xs:text-base text-muted-foreground pt-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur temporibus dicta deserunt vero consequuntur eos sit
                delectus soluta est iure, necessitatibus nulla aperiam quas at
                perspiciatis, suscipit corporis excepturi quos.
              </p>
              <p className="text-sm xs:text-base text-muted-foreground pt-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur temporibus dicta deserunt vero consequuntur eos sit
                delectus soluta est iure, necessitatibus nulla aperiam quas at
                perspiciatis, suscipit corporis excepturi quos.
              </p>
              <p className="text-sm xs:text-base text-muted-foreground pt-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur temporibus dicta deserunt vero consequuntur eos sit
                delectus soluta est iure, necessitatibus nulla aperiam quas at
                perspiciatis, suscipit corporis excepturi quos Lorem, ipsum
                dolor sit amet consectetur adipisicing elit. Id deserunt aliquid
                nemo beatae nobis, ab ut quas, ullam voluptates perspiciatis,
                expedita animi atque eaque. Vitae maiores deleniti quasi
                officiis sint!
              </p>
              <p className="text-sm xs:text-base text-muted-foreground pt-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur temporibus dicta deserunt vero consequuntur eos sit
                delectus soluta est iure, necessitatibus nulla aperiam quas at
                perspiciatis, suscipit corporis excepturi quos.
              </p>
              <p className="text-sm xs:text-base text-muted-foreground pt-2 mb-6">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur temporibus dicta deserunt vero consequuntur eos sit
                delectus soluta est iure, necessitatibus nulla aperiam quas at
                perspiciatis, suscipit corporis excepturi quos.Lorem, ipsum
                dolor sit amet consectetur adipisicing elit. Aspernatur
                temporibus dicta deserunt vero consequuntur eos sit delectus
                soluta est iure, necessitatibus nulla aperiam quas at
                perspiciatis, suscipit corporis excepturi quos.
              </p>
              <button className="bg-black rounded-full text-white transition duration-300 px-9 py-2 text-sm hover:bg-gray-800">
                Commancer
              </button>
            </div>
          </div>
        </div>

        {/* img */}
        <div
          className={cn(
            "h-fit lg:sticky top-32 pl-16 pt-16 rounded-lg border border-r-gray-300 border-b-gray-300 animate-gradient bg-gradient-to-r from-[#627fba] via-[#b95480] to-[#627fab] bg-[length:var(--bg-size)_100%] [--bg-size:400%] order-1 lg:order-2"
          )}
        >
          <img
            src={dashboardImg}
            alt="Feature Img"
            className="w-full h-auto rounded-tl-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AaboutUs;
