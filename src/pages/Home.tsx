import Header from '@/components/Header';
import WhatsAppButton from '@/components/WhatsAppButton';
import Hero from '@/sections/Hero';
import TrustBar from '@/sections/TrustBar';
import AutomacaoSection from '@/sections/AutomacaoSection';
import SistemasDinamicos from '@/sections/SistemasDinamicos';
import Produtos from '@/sections/Produtos';
import ProdutosIndicados from '@/sections/ProdutosIndicados';
import Diferenciais from '@/sections/Diferenciais';
import Depoimentos from '@/sections/Depoimentos';
import CTAFinal from '@/sections/CTAFinal';
import Footer from '@/sections/Footer';

export default function Home() {
    return (
        <div className="min-h-screen bg-white text-[#1E293B] overflow-x-hidden">
            <Header />
            <main id="main-content">
                <Hero />
                <TrustBar />
                <AutomacaoSection />
                <Produtos />
                <ProdutosIndicados />
                <Diferenciais />
                <SistemasDinamicos />
                <Depoimentos />
                <CTAFinal />
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
}
