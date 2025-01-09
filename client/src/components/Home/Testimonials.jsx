import React from "react";
import { AnimatedGradientText } from "../ui/animatedText";
import { cn } from "@/lib/utils";
import { Marquee } from "../ui/marquee";

const reviews = [
  {
    name: "Jack Daniel",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill Doe",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John Smith",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane Doe",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny Crapel",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James Crossb",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative w-80 cursor-pointer overflow-hidden rounded-xl border p-4 sm:p-8 flex flex-col justify-between",
        // light styles
        "border-primary/[.15] bg-muted/70 hover:bg-muted/80"
      )}
    >
      <blockquote className="mt-2 text-sm">{body}</blockquote>
      <div className="flex flex-row items-center gap-2 mt-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
    </figure>
  );
};

const Testimonials = () => {
  return (
    <div className="w-full py-32  px-6 xs:px-8 sm:mx-8 lg:mx-auto flex flex-col items-center justify-center overflow-hidden">
      <AnimatedGradientText className="bg-background backdrop-blur-0">
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-blue-400 via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
          )}
        >
          Témoignages
        </span>
      </AnimatedGradientText>

      {/* Part Two */}
      <h2 className="text-2xl mt-4 xs:text-3xl sm:text-4xl font-bold">
        Ce que disent nos clients
      </h2>
      <p className="text-base text-muted-foreground lg:max-w-[75%] mt-4 text-center">
        Découvrez ce que nos clients disent de nos services
      </p>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mt-16">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
    </div>
  );
};

export default Testimonials;
