import { Head } from '@inertiajs/react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export default function AppLayout({ children, title }) {
    return (
        <>
            <Head>
                <meta name="csrf-token" content={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')} />
                {title && <title>{title}</title>}
            </Head>
            
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                
                <main className="flex-1">
                    {children}
                </main>
                
                <Footer />
            </div>
        </>
    );
}
