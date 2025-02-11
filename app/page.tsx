"use client"

import Image from "next/image"
import Link from "next/link"
import WorldMap from "react-svg-worldmap";

import { Button } from "@/components/ui/button"
import { SignedOut, UserButton } from "@clerk/nextjs";
import { SignedIn, SignInButton } from "@clerk/clerk-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-6 px-4 sm:px-6 lg:px-8 bg-white border-b">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            {/* <Image src="/logo-placeholder.svg" alt="Visa Route Logo" width={40} height={40} /> */}
            <span className="ml-2 text-2xl font-bold text-primary">Visa Route</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="#features" className="text-gray-600 hover:text-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-gray-600 hover:text-primary">
                  How It Works
                </Link>
              </li>
             <li>
             <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
             </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        {/* <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">Predict Your Visa Application Outcome Instantly</h1>
              <p className="text-xl mb-8">
                Our AI-powered system analyzes your application details to provide accurate predictions in seconds.
              </p>
              <Button size="lg" asChild>
                <Link href="/predict">Start Your Prediction</Link>
              </Button>
            </div>
          </div>
        </section> */}







<section
  className="bg-gradient-to-r from-primary to-primary-dark text-white py-20"
  style={{ backgroundImage: '/lol.jpg', backgroundSize: 'cover', backgroundPosition: 'center' }}
>
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">Predict Your Visa Application Outcome Instantly</h1>
      <p className="text-xl mb-8">
        Our AI-powered system analyzes your application details to provide accurate predictions in seconds.
      </p>
      <Button size="lg" asChild>
        <Link href="/predict">Start Your Prediction</Link>
      </Button>
    </div>
  </div>
</section>













                  <section  className="py-20 bg-gray-50">
                  {/* <WorldMap
        color="red"
        title="Top 10 Populous Countries"
        value-suffix="people"
        size="lg"
        data={data}
      /> */}


        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Visa Route?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Instant Results", description: "Get your visa application prediction in seconds, not days." },
                {
                  title: "High Accuracy",
                  description: "Our AI model is trained on millions of visa applications for precise predictions.",
                },
                {
                  title: "User-Friendly",
                  description: "Simple interface that anyone can use, no complex forms or procedures.",
                },
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">How Visa Route Works</h2>
            <div className="max-w-3xl mx-auto">
              <ol className="relative border-l border-gray-200">
                {[
                  {
                    title: "Enter Your Details",
                    description: "Provide basic information about your visa application.",
                  },
                  { title: "AI Analysis", description: "Our advanced AI processes your information in real-time." },
                  {
                    title: "Get Your Prediction",
                    description: "Receive an instant prediction on your visa application outcome.",
                  },
                  {
                    title: "Plan Your Next Steps",
                    description: "Use the insights to improve your application or proceed with confidence.",
                  },
                ].map((step, index) => (
                  <li key={index} className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-primary rounded-full -left-4 ring-4 ring-white">
                      {index + 1}
                    </span>
                    <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

       
      

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Predict Your Visa Outcome?</h2>
            <p className="text-xl mb-8">Join thousands of satisfied users and get your instant prediction now.</p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/predict">Start Your Free Prediction</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Image src="/logo-placeholder.svg" alt="Visa Route Logo" width={40} height={40} />
              <span className="ml-2 text-xl font-bold">Visa Route</span>
            </div>
            <nav>
              <ul className="flex flex-wrap justify-center md:justify-end space-x-4">
                <li>
                  <Link href="#" className="hover:text-primary-light">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary-light">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary-light">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mt-8 text-center text-sm">© {new Date().getFullYear()} Visa Route. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

