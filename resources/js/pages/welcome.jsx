import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ArticlesSection from "../components/ArticlesSection";
import FormationsSection from "../components/FormationsSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-50 to-blue-100 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-7xl rounded-3xl shadow-2xl my-10 px-2 sm:px-8 lg:px-12 py-8 bg-white/80 backdrop-blur">
          <Hero />
          <ArticlesSection />
          <FormationsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
