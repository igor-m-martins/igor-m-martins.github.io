import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

import { useIsMobile } from "./hooks/useIsMobile";

function TypingEffect({ texts, speed = 150, delay = 1500, style }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), delay);
    } else if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
    }

    const timeout = setTimeout(() => {
      setText(texts[index].substring(0, subIndex));
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, texts, speed, delay]);

  return (
    <div style={style}>
      {text}
      <span className="cursor">|</span>
    </div>
  );
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
};

const services = [
  {
    titulo: "Risk Management Dashboard",
    descricao:
      "Informative dashboard developed for a risk management company, aimed at providing real-time visibility into operational issues and travel delays, contributing to the safety and efficiency of operations.",
    link: "#",
    image: "portfolio/rmd.jpg",
  },
  {
    titulo: "Detran RS | Vulnerability",
    descricao:
      "Discovered a vulnerability in the login page of a government system. The issue was responsibly disclosed to the appropriate security team and promptly fixed.",
    link: "#",
    image: "portfolio/detran.jpg",
  },
];

const posts = [
  {
    titulo: "Detran RS | Vulnerability",
    link: "https://r4msolo.medium.com/a-falha-do-detran-rs-xss-pt-br-en-us-a3e06abd7a0b",
  },
];

const testimonials = [
  {
    name: "Luxtel Internet",
    text: "Igor arrived recently, but he has already shown that he is very dedicated to his work that makes. There are those who say that he is also very curious, as he always goes in addition to developing your professional knowledge",
    image: "testimonials/testimonial-1.jpg",
  },
  {
    name: "My-Anh Wu",
    text: "It´s very pleasure to meet you and know you today Igor! You did a very good job to your best knowledge and information they´d provided you. You´re a good, polite and gentle young man that caught my attention and respect for you!",
    image: "testimonials/testimonial-2.jpg",
  },
];

export default function App() {
  
  const isMobile = useIsMobile();
  useEffect(() => {
    console.log(isMobile ? "[!] Mobile" : "[!] Desktop");
  }, [isMobile]);

  const [index, setIndex] = useState(0);

  // Change testimonial every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (

    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <nav className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 text-white z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-right">
          <div className="space-x-4 text-sm sm:text-base">
            <a href="#about" className="hover:text-blue-400 transition">
              About
            </a>
            <a href="#services" className="hover:text-blue-400 transition">
              Services
            </a>
            <a href="#portfolio" className="hover:text-blue-400 transition">
              Portfolio
            </a>
            <a href="#posts" className="hover:text-blue-400 transition">
              Posts
            </a>
          </div>
        </div>
      </nav>

      {/* Banner */}
      <header
        style={{
          height: "100vh",
          backgroundImage: "url('banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 1rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
            Igor Martins
          </h1>

          {/* Social media */}
        <div className="mt-4 flex gap-6 justify-center text-white text-2xl z-10 relative">
          <a
            href="https://instagram.com/igor.m.martins"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/igor-m-705a50192/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/igor-m-martins"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>

          <div className="mt-4">
            <TypingEffect
              texts={[
                "Freelance Developer",
                "Security Specialist",
                "Automation Expert",
                "CTF Player",
              ]}
              style={{
                fontSize: "1.25rem",
                color: "white",
                fontWeight: "500",
              }}
            />
          </div>
        </div>

      </header>

      <main className={`flex-grow mx-auto p-4 sm:p-6 space-y-16 ${isMobile ? "max-w-[25rem]" : "max-w-5xl"}`}>
        <section id="about" className="text-white px-4 sm:px-6">
          <div className="w-full max-w-x1 p-6 bg-gray-800 rounded-xl shadow text-center mx-auto">
            <img src="/me.jpg" alt="Igor Martins" className="w-28 h-28 rounded-full object-cover border-4 border-gray-600 mx-auto mb-4"/>
            <h2 className="mb-2 text-xl font-bold">About me</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              Passionate about technology and cybersecurity, I actively
              participated in the Trace Labs program, where I applied OSINT
              techniques to help locate missing persons.
              <br/>
              <br/>
              I hold a Professional Pentest certification from Desec Security
              and am currently pursuing a Bachelor’s degree in Computer
              Engineering at UDELAR (Universidad de la República). In parallel,
              I offer freelance programming services, developing secure and
              efficient digital solutions.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-6 text-xs sm:text-sm">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">📞 Telefone:</span>
                <a
                  href="tel:+59895343497"
                  className="underline hover:text-blue-400"
                >
                  +598 95 343 497
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">✉️ E-mail:</span>
                <a
                  href="mailto:martinsdevops@proton.me"
                  className="underline hover:text-blue-400"
                >
                  martinsdevops@proton.me
                </a>
              </div>
            </div>
          </div>
        </section>


      {/* Services */}
      <section
        id="services"
        className="text-white px-4 sm:px-6 flex flex-col items-center"
      >
        <h2 className="text-2xl mb-8 font-bold text-center">Services</h2>

        <div className="flex flex-wrap gap-6 w-full">
          {/* Widget 1 */}
          <div className="bg-gray-800 p-6 rounded-xl shadow w-full max-w-xs flex-shrink-0 text-center">
            <h3 className="mb-2 text-lg">🖥️ Web Development</h3>
            <p className="text-sm text-gray-300">
              Development of modern, responsive, and fast websites. I also fix bugs and optimize existing pages.
            </p>
          </div>

          {/* Widget 2 */}
          <div className="bg-gray-800 p-6 rounded-xl shadow w-full max-w-xs flex-shrink-0 text-center">
            <h3 className="mb-2 text-lg">🔒 Cybersecurity</h3>
            <p className="text-sm text-gray-300">
              Identification and analysis of security vulnerabilities in websites and systems.
            </p>
          </div>

          {/* Widget 3 */}
          <div className="bg-gray-800 p-6 rounded-xl shadow w-full max-w-xs flex-shrink-0 text-center">
            <h3 className="mb-2 text-lg">⚙️ Scripts and Automation</h3>
            <p className="text-sm text-gray-300">
              Automation of tasks using custom scripts and helpful bots.
            </p>
          </div>
        </div>

        <a
          href="https://www.fiverr.com/igor_m_martins"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 bg-green-600 hover:bg-green-700 transition-colors text-white font-bold py-3 px-8 rounded-lg inline-block"
        >
          Visit my Fiverr
        </a>
      </section>


        {/* Testimonials */}
        <section
          className="text-white px-4 sm:px-6 flex justify-center"
          aria-label="Testimonials"
        >
          <div className="max-w-xl w-full">
            <Slider {...settings}>
              {testimonials.map((item, idx) => (
                <div key={idx} className="px-2">
                  <div className="bg-gray-800 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4 shadow">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                    />
                    <div>
                      <p className="italic mb-2 text-sm sm:text-base">{item.text}</p>
                      <strong className="text-sm sm:text-base">{item.name}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>


        {/* Portfolio */}
        <section id="portfolio" className="px-4 sm:px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-white text-center sm:text-left">Portfolio</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map(({ titulo, image, descricao, link }, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col sm:flex-row bg-gray-800 rounded-2xl shadow hover:bg-gray-700 transition overflow-hidden"
              >
                <img
                  src={image}
                  alt={titulo}
                  className="w-full sm:w-32 h-48 sm:h-auto object-cover rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none"
                />
                <div className="p-4 flex flex-col justify-center">
                  <h3 className="text-xl font-semibold mb-2 text-white">{titulo}</h3>
                  <p className="text-sm text-gray-300">{descricao}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Posts */}
        <section id="posts" className="px-2 sm:px-6">
          <h2 className="text-3xl font-bold mb-6">Posts</h2>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
            {posts.map(({ titulo, link }, i) => (
              <li key={i}>
                <a
                  href={link}
                  className="text-blue-400 hover:underline break-words"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {titulo}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 p-6 text-center space-x-6 text-sm sm:text-base">
        <a
          href="https://instagram.com/igor.m.martins"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500"
          aria-label="Instagram"
        >
          Instagram
        </a>
        <a
          href="https://www.linkedin.com/in/igor-m-705a50192/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
          aria-label="LinkedIn"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/igor-m-martins"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300"
          aria-label="GitHub"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}