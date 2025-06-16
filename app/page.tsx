"use client"
import Image from "next/image";
import Link from "next/link";
import Authentication from "./_components/Authentication";
import ProfileAvatar from "./_components/ProfileAvatar";
import { useAuthContext } from "./provider";


import { Phone, Mail, Linkedin, Github, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Feature = ({ title, description, imageUrl }: { title: string, description: string, imageUrl: string }) => (
  <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
    <img src={imageUrl} alt={title} className="mb-4 rounded-md w-full h-60 object-contain " />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
);

export default function Home() {

  const user = useAuthContext();

  return (
    <div className="w-full">
      <header className="flex   flex-wrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-neutral-800 dark:border-neutral-700">
        <nav className="  p-1   px-4 flex justify-between w-full items-center  " aria-label="Global">
          <div className="flex items-center justify-between ">
              <Image src={'/logo.png'} alt='logo' width={100} height={50}
                className='height-[60px] w-[80px] object-contain' />              {/* </button> */}
          </div>
          <div  className=" ">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end sm:ps-7">

              {!user?.user?.email ? <Authentication>
                <div>
                  <Button className="flex text-white items-center cursor-pointer gap-x-2 font-bold  sm:border-s sm:border-gray-300 py-2 sm:py-0 sm:ms-4 sm:my-6 sm:ps-6 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-500" >
                    Get Started
                  </Button>
                </div>
              </Authentication> :
              <ProfileAvatar />
              }
            </div>
          </div>
        </nav>
      </header>
      <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
        {/* Header */}


        {/* Hero Section */}
        <section className="container mx-auto mt-12 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                Generate Code <span className="text-indigo-600">from Wireframes</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Transform your design ideas into functional code effortlessly.
                Streamline your development process and bring your projects to life faster.
              </p>
              {<Authentication>
                <Button className="flex text-white items-center cursor-pointer  font-bold gap-x-2  sm:border-s sm:border-gray-300 py-2 sm:py-0   dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-500" >
                  <Authentication>
                    Get Started
                  </Authentication>
                </Button>
              </Authentication>
              }
            </div>
            <div>
              <img
                src="/logo.png"
                alt="Hero Illustration"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto mt-20 px-6 ">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">Features</h2>
          <div className=" flex flex-col md:flex-row justify-between items-center gap-8 ">
            <Feature
              title="AI-Powered Conversion"
              description="Automatically convert wireframes to clean, efficient code."
              imageUrl="/1st.png"
            />
            <Feature
              title="Customizable Output"
              description="Tailor the generated code to your specific needs and framework."
              imageUrl="/2nd.png"
            />
            <Feature
              title="Real-Time Preview"
              description="See your code come to life with instant, interactive previews."
              imageUrl="/3rd.png"
            />
          </div>
        </section>



        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 py-12 mt-20">
          <div className="text-center mt-8">
            <p>&copy; {new Date().getFullYear()} WireframeGen.</p>
          </div>
        </footer>
      </div>

    </div>
  );
}
