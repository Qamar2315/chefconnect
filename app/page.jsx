"use client"
import Image from 'next/image';

function HomePage() {
  return (
    <>
      <section className="relative h-screen">
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/home_page_background.jpg" // Path to your image
            alt="Background"
            fill
            style={{ objectFit: "cover" }}
            quality={80}
          />
          <div className="absolute inset-0 z-0 bg-black opacity-50" ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full flex justify-center items-center h-full">
          {/* Your content goes here */}
          <p className="text-white text-center text-2xl font-serif md:text-5xl hover:text-gray-300 hover:scale-105 animation-fadeIn transition">
            Welcome to Chef Connect
            <br />
            Where Passionate Cooks Share and Discover Recipes!
          </p>

        </div>
      </section>
    </>
  );
}

export default HomePage;
