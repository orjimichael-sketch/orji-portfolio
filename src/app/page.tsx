import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectList from "@/components/ProjectList";
import About from "@/components/About";
import Services from "@/components/Services";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Skills from "@/components/Skills";
import Faq from "@/components/Faq";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-10 sm:gap-14 lg:gap-20">
        <Hero />
        <ProjectList />
        <About />
        <Services />
        <ExperienceTimeline />
        <Skills />
        <Faq />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
