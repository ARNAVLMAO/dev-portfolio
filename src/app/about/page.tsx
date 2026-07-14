import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About — Computed",
  description:
    "Who I am, why I write, and what this blog is all about.",
};

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8">
        About
      </h1>
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="shrink-0 w-48 md:w-64 rounded-xl overflow-hidden shadow-sm border border-sage-dark/30 bg-sage/20">
          <Image 
            src="/profile.jpg" 
            alt="Arnav" 
            width={400} 
            height={533}
            className="object-cover w-full h-auto"
            priority
          />
        </div>
        <div className="prose-custom space-y-6 text-xl text-zinc-800 font-serif leading-relaxed max-w-prose">
          <p>
            I&apos;m Arnav, currently in Grade 12, currently obsessed with two unrelated things: recommending tech to anyone who&apos;ll listen, and figuring out why things fly.
          </p>
          <p>
            I started <em>Computed</em> because I wanted a place to think out
            loud. Not to sound smart, but to figure out if I actually understand
            the things I think I understand. Writing has a funny way of exposing
            the gaps.
          </p>
          <p>
            If something here makes you think, or makes you disagree, or makes
            you want to look something up — that&apos;s the whole point.
          </p>
        </div>
      </div>
    </div>
  );
}
