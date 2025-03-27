// Public facing page
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../public/BibleBaseNoBg.png";
import { TypeAnimation } from "react-type-animation";
import LibraryPicture from "../../../public/library.webp";
import Earth from "../../../public/earth.webp";
import CoffeeShop from "../../../public/coffeeShop.webp";

const Public = () => {
  return (
    <>
      {/*Nav Bar */}
      <div className=" bg-[#d9dcd6] flex py-7 justify-around border-b-2 ">
        <div className="flex-1 justify-items-end ">
          {/*About Section Could go here */}
          <img src={Logo} className="pr-4 max-w-15 min-w-15" />
        </div>
        <div className="flex">
          <h2 className=" flex-1 font-bold text-4xl text-[#260038] font-[Orbitron] ">
            BibleBase
          </h2>
        </div>
        {/* Buttons (Right-Aligned) */}
        <div className="flex-1">
          <div className="flex justify-end mr-3 ">
            <Link
              to="/login"
              className="px-1 py-2 text-xs  bg-black rounded-[6px] relative group  text-white hover:bg-gradient-to-r from-fuchsia-900 to-blue-900 transition duration-200 font-mono mr-3 md:px-8 md:text-base "
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-1 py-2 text-xs bg-black rounded-[6px] relative group  text-white hover:bg-gradient-to-r from-fuchsia-900 to-blue-900  transition duration-200 font-mono md:px-8 md:text-base "
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/*Hero section*/}
      <main className="mb-25 flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-28 mt-20">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-slate-900 sm:text-7xl">
          Your Bible <br />
          Your <span className="text-purple-500">Apologetics</span>
        </h1>

        <p className="mx-auto mt-12 max-w-xl text-lg text-slate-700 leading-7">
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "Sign Up Now to Start Organizing Your Apologetics",
              2000, // wait 2s
              "Sign Up Now to Start Taking Bible Notes",
              2000,
              "Sign Up Now to Start Reading Scripture",
              2000,
            ]}
            wrapper="span"
            speed={40}
            style={{
              fontSize: "21px",
              display: "inline-block",
              fontFamily: "monospace",
            }}
            repeat={Infinity}
          />
        </p>

        <Link to="/signup" className="mt-20">
          <button className="p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2 pt-4 pb-4 font-mono bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent text-3xl">
              Get Started
            </div>
          </button>
        </Link>
      </main>

      {/*Cards*/}

      <div className=" relative bg-[#f3f2f1] px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="absolute inset-0 ">
          <div className="h-1/3 bg-[#f3f2f1] sm:h-2/3"></div>
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover border-2"
                  src={LibraryPicture}
                  alt=""
                />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-[#d9dcd6] p-6 border-2">
                <div className="flex-1">
                  <p className="text-xl font-semibold text-gray-900">
                    Build Your Own Personal Library
                  </p>
                  <p className="mt-3 text-base text-gray-500">
                    Design and customize your very own library from the ground
                    up. Create unique bookshelves, fill them with books you
                    design, and dive into pages you write yourself
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover border-2"
                  src={Earth}
                  alt=""
                />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-[#d9dcd6] p-6 border-2">
                <div className="flex-1">
                  <p className="text-xl font-semibold text-gray-900">
                    Your Faith Travels With You
                  </p>
                  <p className="mt-3 text-base text-gray-500">
                    Access the Bible anytime, anywhere—with a built-in Bible
                    that's always at your fingertips. Whether you're at home, on
                    the go, or deep in study, you’ll never be without the Word.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover border-2"
                  src={CoffeeShop}
                  alt=""
                />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-[#d9dcd6] p-6 border-2">
                <div className="flex-1">
                  <p className="text-xl font-semibold text-gray-900">
                    Your Notes, Always Within Reach
                  </p>
                  <p className="mt-3 text-base text-gray-500">
                    Take your theological notes with you wherever life leads. Be
                    ready for meaningful conversations, spontaneous questions,
                    or quick study sessions with instant access to your personal
                    insights and our curated study notes—all in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="divider divider-primary">Coming Soon</div>

      {/*Coming Soon To Mobile */}
      <div class="chat chat-start bg-white ">
        <div class="chat-bubble mt-3">Have you heard?</div>
      </div>

      <div class="chat chat-end bg-white">
        <div class="chat-bubble">Heard what??</div>
      </div>

      <div class="chat chat-start bg-white">
        <div class="chat-bubble">BibleBase is coming to mobile!</div>
      </div>

      <div class="chat chat-end bg-white">
        <div class="chat-bubble ">Yay! I can't wait!! 🤩</div>
      </div>

      <div class="chat chat-start bg-white">
        <div class="chat-bubble mb-3">🎉🎉🎉</div>
      </div>

      <div className="divider divider-primary"></div>

      {/*Reviews*/}
      <section className="bg-[#f3f2f1] px-4 py-12 md:py-24">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-black text-black text-center text-3xl leading-none uppercase max-w-2xl mx-auto mb-12">
            What Users Are Saying
          </h2>
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 relative">
            <div className="bg-gray-200 rounded-lg p-8 text-center md:w-1/3">
              <p className="font-bold uppercase">Cole D.</p>
              <p className="text-xl font-light italic text-gray-700">
                "I've always been scared to talk about theology but having my
                notes with me gave me the confidence to share my faith!"
              </p>
              <div className="flex items-center justify-center space-x-2 mt-4">
                <svg
                  className="text-yellow-500 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  className="text-yellow-500 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  className="text-yellow-500 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  className="text-yellow-500 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  className="text-yellow-500 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
            </div>
            <div className="bg-gray-200 rounded-lg p-8 text-center md:w-1/3">
              <p className="font-bold uppercase">Cade T.</p>
              <p className="text-xl font-light italic text-gray-700">
                "Having the Bible with me wherever I go really helps me stay in
                the word!"
              </p>
              <div className="flex items-center justify-center space-x-2 mt-4">
                <svg
                  className="text-yellow-500 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  className="text-yellow-500 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  className="text-yellow-500 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  className="text-yellow-500 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  className="text-yellow-500 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
            </div>
            <div className="bg-gray-200 rounded-lg p-8 text-center md:w-1/3">
              <p className="font-bold uppercase">Joseph S.</p>
              <p className="text-xl font-light italic text-gray-700">
                "I use BibleBase to prepare my sermon notes, thanks BibleBase!"
              </p>
              <div className="flex items-center justify-center space-x-2 mt-4">
                <svg
                  className="text-yellow-500 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  className="text-yellow-500 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  className="text-yellow-500 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  className="text-yellow-500 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  className="text-yellow-500 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*Footer*/}

      <footer class="bg-[#260038] text-white py-4 px-3 mt-16 ">
        <div class="container mx-auto flex flex-wrap items-center justify-between mb-25">
          <div class="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
            <p class="text-xs text-gray-400 md:text-sm">
              Copyright {new Date().getFullYear()} &copy; All Rights Reserved
            </p>
          </div>
          <div class="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
            <ul class="list-reset flex justify-center flex-wrap text-xs md:text-sm gap-3">
              <li>
                <a href="#" class="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
              <li class="mx-4">
                <a href="#" class="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white">
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Public;

/* 

*/
