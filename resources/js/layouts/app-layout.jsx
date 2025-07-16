// resources/js/layouts/app-layout.jsx
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16"> {/* Ajout de pt-16 */}
        {children}
      </main>
      <Footer />
    </div>
  );
}
