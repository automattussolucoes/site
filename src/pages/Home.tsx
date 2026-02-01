
import Header from '@/components/Header';
import Hero from '@/sections/Hero';
import TrustBar from '@/sections/TrustBar';
import Solucoes from '@/sections/Solucoes';
import Diferenciais from '@/sections/Diferenciais';
import Produtos from '@/sections/Produtos';
import Processo from '@/sections/Processo';
import Depoimentos from '@/sections/Depoimentos';
import CTAFinal from '@/sections/CTAFinal';
import Footer from '@/sections/Footer';

export default function Home() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
            <Header />
            <main>
                <Hero />
                <TrustBar />
                <Solucoes />
                <Diferenciais />
                <Produtos />
                <Processo />
                <Depoimentos />
                <CTAFinal />
            </main>
            <Footer />
        </div>
    );
}
