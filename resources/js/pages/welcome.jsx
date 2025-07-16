// resources/js/pages/welcome.jsx
import  { usePage } from '@inertiajs/react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/Hero';
import ArticlesSection from '@/components/blog/ArticlesSection';
import FormationsSection from '@/components/formations/FormationsSection';
import Footer from '@/components/layout/Footer';

export default function Welcome() {
   const { featuredTrainings, recentArticles } = usePage().props;
  
  return (
    <>
    
        <Navbar />
        <main>
          <Hero />
            <FormationsSection formations={training} />
            <ArticlesSection articles={recentArticles} />
        </main>
        <Footer />
     
    </>
  );
}


