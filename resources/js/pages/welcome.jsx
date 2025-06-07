import Navbar from "../components/Navbar";
import ArticlesSection from "../components/ArticlesSection";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import FormationsSection from "../components/FormationsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-50 to-blue-100 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-7xl rounded-3xl shadow-2xl my-10 px-2 sm:px-8 lg:px-12 py-8 bg-white/80 backdrop-blur">
          <ArticlesSection />
          <Hero />
          <FormationsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
