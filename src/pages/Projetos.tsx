import React, { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/sections/Footer';
import './Projetos.css'; 

export default function Projetos() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        const revealEls = document.querySelectorAll('.reveal');
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
            );
            revealEls.forEach((el) => observer.observe(el));
            return () => {
                revealEls.forEach((el) => observer.unobserve(el));
            };
        } else {
            revealEls.forEach((el) => el.classList.add('visible'));
        }
    }, []);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play().catch(() => {});
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
        
        if (!isPlaying) {
            videoRef.current.play().catch(() => {});
            setIsPlaying(true);
        }
    };

    return (
        <div className="projetos-page-wrapper">
            <Header />
            <main>
                

    
    <section className="hero" id="hero" aria-label="Automação para um estilo de vida inteligente">

        
        <div className="hero-bg">
            <img src="/projetos/smart_home_hero.jpg" alt="Sala de estar inteligente com TV e iluminação LED azul" className="hero-img"
                id="hero-bg-img" />
            <div className="hero-overlay"></div>
        </div>

        
        <div className="hero-centered">

            
            <div className="hero-content-center">
                <div className="hero-tag">Automação Residencial &amp; Empresarial</div>

                <h1 className="hero-headline">
                    Desenvolvemos o seu Projeto de <em>Automação</em>
                </h1>


            </div>

            
            <div className="hero-tv-center">
                <div className="tv-wrapper">

                    
                    <div className="tv-bezel">


                        
                        <div className="tv-screen" id="tv-screen">
                            <video id="tv-video" ref={videoRef} autoPlay muted loop playsInline preload="auto"
                                aria-label="Vídeo de projetos Automattus">
                                <source src="/projetos/Automattus Projetos_Retangular.mp4" type="video/mp4" />
                            </video>

                            
                            
<div className="tv-controls" role="group" aria-label="Controles do vídeo">
    <button className="tv-ctrl-btn" onClick={togglePlay} type="button" aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}>
        {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" />
                <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" />
            </svg>
        ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <polygon points="5,3 19,12 5,21" fill="currentColor" />
            </svg>
        )}
    </button>
    <button className="tv-ctrl-btn" onClick={toggleMute} type="button" aria-label={isMuted ? "Ativar som do vídeo" : "Desativar som do vídeo"}>
        {isMuted ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        )}
    </button>
</div>

                        </div>

                        
                        <div className="tv-stand">
                            <div className="tv-stand-neck"></div>
                            <div className="tv-stand-base"></div>
                        </div>

                    </div>
                </div>
            </div>

            
            <div className="hero-below-tv">
                <a href="https://wa.me/5584988924296?text=Olá,%20gostaria%20de%20solicitar%20um%20projeto%20personalizado%20para%20minha%20casa/empresa."
                    target="_blank" rel="noopener" className="btn-hero" id="btn-hero-cta">
                    Solicitar Projeto
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                            strokeLinejoin="round" />
                    </svg>
                </a>
            </div>

        </div>

        
        <div className="hero-scroll-indicator" aria-hidden="true">
            <div className="scroll-line"></div>
        </div>

    </section>

    
    <section className="section-solutions" id="solucoes" aria-labelledby="solutions-heading">
        <div className="container">
            <div className="section-label reveal">Nossas Soluções</div>
            <h2 className="section-title reveal" id="solutions-heading">
                Soluções em Automação Residencial e Empresarial
            </h2>
            <p className="section-intro reveal">
                A Automattus desenvolve projetos completos de automação residencial, integrando tecnologia,
                segurança e conforto em um único sistema inteligente. Transformamos casas e ambientes
                corporativos em espaços conectados, eficientes e totalmente controláveis pelo celular
                ou comando de voz.
            </p>

            <div className="solutions-grid">

                <article className="solution-card reveal" style={{"--card-delay": "0s"} as React.CSSProperties}>
                    <div className="card-img-wrap">
                        <img src="/projetos/sol_iluminacao.jpg" alt="Iluminação Inteligente" loading="lazy" />
                    </div>
                    <div className="card-body">
                        <div className="card-icon-wrap">
                            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                                <circle cx="14" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" />
                                <path
                                    d="M14 2v3M14 23v3M2 14h3M23 14h3M5.5 5.5l2.1 2.1M20.4 20.4l2.1 2.1M20.4 7.6l-2.1 2.1M7.6 20.4l-2.1 2.1"
                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h3 className="card-title">Iluminação Inteligente</h3>
                        <p className="card-desc">Controle de intensidade, cores e automação por horários ou sensores de
                            presença. Mais conforto, economia e personalização.</p>
                    </div>
                </article>

                <article className="solution-card reveal" style={{"--card-delay": "0.08s"} as React.CSSProperties}>
                    <div className="card-img-wrap">
                        <img src="/projetos/sol_seguranca.jpg" alt="Segurança Residencial" loading="lazy" />
                    </div>
                    <div className="card-body">
                        <div className="card-icon-wrap">
                            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                                <rect x="3" y="7" width="22" height="16" rx="2" stroke="currentColor"
                                    strokeWidth="1.5" />
                                <path d="M9 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" stroke="currentColor"
                                    strokeWidth="1.5" />
                                <circle cx="14" cy="15" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </div>
                        <h3 className="card-title">Segurança Residencial</h3>
                        <p className="card-desc">Câmeras IP, fechaduras eletrônicas com biometria, alarmes e sensores
                            integrados para monitoramento em tempo real.</p>
                    </div>
                </article>

                <article className="solution-card reveal" style={{"--card-delay": "0.16s"} as React.CSSProperties}>
                    <div className="card-img-wrap">
                        <img src="/projetos/sol_climatizacao.jpg" alt="Climatização Inteligente" loading="lazy" />
                    </div>
                    <div className="card-body">
                        <div className="card-icon-wrap">
                            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                                <path d="M9 14c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.5"
                                    strokeLinecap="round" />
                                <path d="M5 14c0-4.97 4.03-9 9-9s9 4.03 9 9" stroke="currentColor" strokeWidth="1.5"
                                    strokeLinecap="round" />
                                <circle cx="14" cy="20" r="2" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M14 18v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h3 className="card-title">Climatização Inteligente</h3>
                        <p className="card-desc">Termostatos e ar-condicionado que ajustam automaticamente a temperatura,
                            garantindo conforto e eficiência energética.</p>
                    </div>
                </article>

                <article className="solution-card reveal" style={{"--card-delay": "0.24s"} as React.CSSProperties}>
                    <div className="card-img-wrap">
                        <img src="/projetos/sol_cortinas.jpg" alt="Cortinas Automatizadas" loading="lazy" />
                    </div>
                    <div className="card-body">
                        <div className="card-icon-wrap">
                            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                                <rect x="4" y="10" width="6" height="14" rx="1" stroke="currentColor"
                                    strokeWidth="1.5" />
                                <rect x="11" y="6" width="6" height="18" rx="1" stroke="currentColor"
                                    strokeWidth="1.5" />
                                <rect x="18" y="13" width="6" height="11" rx="1" stroke="currentColor"
                                    strokeWidth="1.5" />
                                <path d="M4 6h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h3 className="card-title">Cortinas Automatizadas</h3>
                        <p className="card-desc">Cortinas e persianas controladas por aplicativo ou assistentes virtuais,
                            elevando a sofisticação da sua casa.</p>
                    </div>
                </article>

                <article className="solution-card reveal" style={{"--card-delay": "0.32s"} as React.CSSProperties}>
                    <div className="card-img-wrap">
                        <img src="/projetos/sol_entretenimento.jpg" alt="Entretenimento e Áudio" loading="lazy" />
                    </div>
                    <div className="card-body">
                        <div className="card-icon-wrap">
                            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                                <rect x="3" y="5" width="22" height="15" rx="2" stroke="currentColor"
                                    strokeWidth="1.5" />
                                <path d="M9 23h10M14 20v3" stroke="currentColor" strokeWidth="1.5"
                                    strokeLinecap="round" />
                                <path d="M10 12l2.5 2.5L18 9" stroke="currentColor" strokeWidth="1.5"
                                    strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="card-title">Entretenimento e Áudio</h3>
                        <p className="card-desc">Som ambiente, smart TVs e home theaters integrados à automação para
                            uma experiência imersiva e centralizada.</p>
                    </div>
                </article>

                <article className="solution-card reveal" style={{"--card-delay": "0.40s"} as React.CSSProperties}>
                    <div className="card-img-wrap">
                        <img src="/projetos/sol_energia.jpg" alt="Gerenciamento de Energia" loading="lazy" />
                    </div>
                    <div className="card-body">
                        <div className="card-icon-wrap">
                            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                                <circle cx="14" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M14 6V2M14 22v-8" stroke="currentColor" strokeWidth="1.5"
                                    strokeLinecap="round" />
                                <path d="M10 22h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h3 className="card-title">Gerenciamento de Energia</h3>
                        <p className="card-desc">Tomadas inteligentes que monitoram o consumo em tempo real, promovendo
                            economia e gestão eficiente de energia.</p>
                    </div>
                </article>

                <article className="solution-card reveal" style={{"--card-delay": "0.48s"} as React.CSSProperties}>
                    <div className="card-img-wrap">
                        <img src="/projetos/sol_eletrodomesticos.jpg" alt="Eletrodomésticos Inteligentes" loading="lazy" />
                    </div>
                    <div className="card-body">
                        <div className="card-icon-wrap">
                            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                                <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M14 8v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="card-title">Eletrodomésticos Inteligentes</h3>
                        <p className="card-desc">Robôs aspiradores, cafeteiras e geladeiras conectadas, integradas ao
                            ecossistema da casa inteligente para uma rotina mais prática.</p>
                    </div>
                </article>

                <article className="solution-card reveal" style={{"--card-delay": "0.56s"} as React.CSSProperties}>
                    <div className="card-img-wrap">
                        <img src="/projetos/sol_assistentes.jpg" alt="Assistentes Virtuais" loading="lazy" />
                    </div>
                    <div className="card-body">
                        <div className="card-icon-wrap">
                            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                                <path d="M12 4v16m4-12v8m4-10v12m-12-8v4" stroke="currentColor" strokeWidth="1.5"
                                    strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="card-title">Assistentes Virtuais</h3>
                        <p className="card-desc">Integração completa com Alexa, Google Assistant e Apple HomeKit para
                            controle por voz inteligente e natural.</p>
                    </div>
                </article>

            </div>
        </div>
    </section>

    
    <section className="section-how" id="como-funciona" aria-labelledby="how-heading">
                <div className="container">
                    <div className="how-inner">
                        <div className="how-header">
                            <div className="section-label reveal">Como Funciona</div>
                            <h2 className="section-title reveal" id="how-heading">Da ideia ao ambiente totalmente
                                conectado
                            </h2>
                        </div>

                        <div className="how-steps">
                            <div className="how-step reveal" style={{"--card-delay": "0s"} as React.CSSProperties}>
                                <div className="step-number">01</div>
                                <div className="step-content">
                                    <div className="step-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path
                                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor"
                                                strokeWidth="1.5" />
                                            <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.5"
                                                strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <h3 className="step-title">Diagnóstico Técnico</h3>
                                    <p className="step-desc">Analisamos o ambiente, suas necessidades e o nível de automação
                                        ideal para o seu espaço. Levantamento completo, presencial ou remoto.</p>
                                </div>
                            </div>

                            <div className="how-step reveal" style={{"--card-delay": "0.10s"} as React.CSSProperties}>
                                <div className="step-number">02</div>
                                <div className="step-content">
                                    <div className="step-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor"
                                                strokeWidth="1.5" />
                                            <path d="M8 12h8M8 8h5M8 16h3" stroke="currentColor" strokeWidth="1.5"
                                                strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <h3 className="step-title">Projeto Personalizado</h3>
                                    <p className="step-desc">Desenvolvemos um projeto exclusivo, alinhado ao seu estilo de
                                        vida,
                                        orçamento e objetivos: conforto, segurança ou eficiência energética.</p>
                                </div>
                            </div>

                            <div className="how-step reveal" style={{"--card-delay": "0.20s"} as React.CSSProperties}>
                                <div className="step-number">03</div>
                                <div className="step-content">
                                    <div className="step-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path
                                                d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <h3 className="step-title">Instalação Especializada</h3>
                                    <p className="step-desc">Nossa equipe técnica realiza a instalação e configuração
                                        completa, integrando todos os sistemas com precisão e cuidado com o acabamento.
                                    </p>
                                </div>
                            </div>

                            <div className="how-step reveal" style={{"--card-delay": "0.30s"} as React.CSSProperties}>
                                <div className="step-number">04</div>
                                <div className="step-content">
                                    <div className="step-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor"
                                                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5"
                                                strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <h3 className="step-title">Suporte Contínuo</h3>
                                    <p className="step-desc">Oferecemos suporte técnico contínuo, atualizações e expansões
                                        do sistema para garantir que sua automação evolua com você.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="section-social" id="depoimentos" aria-labelledby="social-heading">
                <div className="container">
                    <div className="section-label reveal">Clientes &amp; Resultados</div>
                    <h2 className="section-title reveal" id="social-heading">O que nossos clientes estão dizendo</h2>

                    <div className="testimonials-grid">
                        <blockquote className="testimonial-card reveal" style={{"--card-delay": "0s"} as React.CSSProperties}>
                            <div className="testimonial-stars" aria-label="5 estrelas"><span>★★★★★</span></div>
                            <p className="testimonial-text">"Pessoal muito eficiente, desde o atendimento com Vinicius, o
                                responsável pela empresa, do agendamento, até a realização do serviço, muito prático e
                                de forma responsável !"
                            </p>
                            <footer className="testimonial-author">
                                <div className="author-avatar" aria-hidden="true">EE</div>
                                <div>
                                    <strong className="author-name">Ellen Espg</strong>
                                    <span className="author-role">Cliente</span>
                                </div>
                            </footer>
                        </blockquote>

                        <blockquote className="testimonial-card reveal" style={{"--card-delay": "0.12s"} as React.CSSProperties}>
                            <div className="testimonial-stars" aria-label="5 estrelas"><span>★★★★★</span></div>
                            <p className="testimonial-text">"O serviço que foi feito, ficou excelente. Profissional
                                capacitado e muito educado. Recomendo"</p>
                            <footer className="testimonial-author">
                                <div className="author-avatar" aria-hidden="true">GS</div>
                                <div>
                                    <strong className="author-name">Gerson Silva</strong>
                                    <span className="author-role">Cliente</span>
                                </div>
                            </footer>
                        </blockquote>

                        <blockquote className="testimonial-card reveal" style={{"--card-delay": "0.24s"} as React.CSSProperties}>
                            <div className="testimonial-stars" aria-label="5 estrelas"><span>★★★★★</span></div>
                            <p className="testimonial-text">"O Vinicius e seus colaboradores são muito atenciosos,
                                cuidadosos e ágeis na prestação do serviços. Gostei muito e indico com certeza!"</p>
                            <footer className="testimonial-author">
                                <div className="author-avatar" aria-hidden="true">MJ</div>
                                <div>
                                    <strong className="author-name">Mabel Jales</strong>
                                    <span className="author-role">Cliente</span>
                                </div>
                            </footer>
                        </blockquote>
                    </div>

                </div>
            </section>

            
            <section className="section-cta" id="contato" aria-labelledby="cta-heading">
                <div className="cta-bg-lines" aria-hidden="true">
                    <span></span><span></span><span></span>
                </div>
                <div className="container">
                    <div className="cta-inner">
                        <div className="cta-tag reveal">Pronto para começar?</div>
                        <h2 className="cta-headline reveal" id="cta-heading">
                            Fazemos a Automação da sua Casa ou Empresa
                        </h2>
                        <p className="cta-sub reveal">
                            Fale com a gente e descubra como a automação pode transformar a experiência do seu lar ou
                            empresa.
                        </p>
                        
                        <div className="cta-actions reveal">
                            <a href="https://wa.me/5584986094938?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20automa%C3%A7%C3%A3o%20residencial."
                                target="_blank" rel="noopener" className="btn-cta-main" id="btn-cta-whatsapp">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path
                                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Falar no WhatsApp
                            </a>
                        </div>


                    </div>
                </div>
            </section>

            
            
            </main>
            <Footer />
        </div>
    );
}
