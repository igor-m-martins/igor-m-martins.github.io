import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaInstagram, FaLinkedin, FaGithub, FaBars, FaTimes } from "react-icons/fa";

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

const socialIconMap = {
  Instagram: FaInstagram,
  LinkedIn: FaLinkedin,
  GitHub: FaGithub,
};

export default function App() {
  const [siteData, setSiteData] = useState(null);
  const [fetchError, setFetchError] = useState("");
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    console.log(isMobile ? "[!] Mobile" : "[!] Desktop");
  }, [isMobile]);

  useEffect(() => {
    const url = `${import.meta.env.BASE_URL}site-data.json`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load site-data.json: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setSiteData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setFetchError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!siteData?.testimonials?.length) {
      return undefined;
    }

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % siteData.testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [siteData?.testimonials?.length]);

  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <span className="text-base sm:text-lg">Loading website data...</span>
      </div>
    );
  }

  if (!siteData) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4 text-center">
        <div>
          <p className="text-lg font-semibold mb-2">Failed to load website data.</p>
          <p className="text-sm text-gray-300">{fetchError || "Check the site-data.json file and reload the page."}</p>
        </div>
      </div>
    );
  }

  const {
    header,
    typingEffect,
    navLinks,
    socialLinks,
    about,
    services,
    portfolio,
    testimonials,
    posts,
    footerLinks,
  } = siteData;

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <nav className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 text-white z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-lg font-semibold">Portfolio</div>

          <div className="hidden sm:flex space-x-4 text-sm sm:text-base">
            {navLinks.map((link, idx) => (
              <a key={idx} href={link.href} className="hover:text-blue-400 transition">
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="sm:hidden p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>

        {menuOpen && (
          <div className="sm:hidden border-t border-gray-700 bg-gray-900 bg-opacity-95 px-4 pb-4">
            <div className="flex flex-col space-y-2 pt-3 text-sm">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block hover:text-blue-400 transition"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <header
        style={{
          height: "100vh",
          backgroundImage: `url('${header.backgroundImage}')`,
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
            {header.name}
          </h1>

          <div className="mt-4 flex gap-6 justify-center text-white text-2xl z-10 relative">
            {socialLinks.map((item, idx) => {
              const Icon = socialIconMap[item.icon || item.name];
              return (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400"
                  aria-label={item.name}
                >
                  {Icon ? <Icon /> : item.name}
                </a>
              );
            })}
          </div>

          <div className="mt-4">
            <TypingEffect
              texts={typingEffect.texts}
              speed={typingEffect.speed}
              delay={typingEffect.delay}
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
            <img
              src={about.image}
              alt={about.title}
              className="w-28 h-28 rounded-full object-cover border-4 border-gray-600 mx-auto mb-4"
            />
            <h2 className="mb-2 text-xl font-bold">{about.title}</h2>
            <p className="leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {about.description}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-6 text-xs sm:text-sm">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">📞 Telefone:</span>
                <a href={`tel:${about.phone}`} className="underline hover:text-blue-400">
                  {about.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">✉️ E-mail:</span>
                <a href={`mailto:${about.email}`} className="underline hover:text-blue-400">
                  {about.email}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="text-white px-4 sm:px-6 flex flex-col items-center">
          <h2 className="text-2xl mb-8 font-bold text-center">Services</h2>

          <div className="flex flex-wrap gap-6 w-full justify-center">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-gray-800 p-6 rounded-xl shadow w-full max-w-xs flex-shrink-0 text-center"
              >
                <h3 className="mb-2 text-lg">{service.icon} {service.title}</h3>
                <p className="text-sm text-gray-300">{service.description}</p>
              </div>
            ))}
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

        <section id="portfolio" className="px-4 sm:px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-white text-center sm:text-left">Portfolio</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {portfolio.map(({ title, image, description, link }, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col sm:flex-row bg-gray-800 rounded-2xl shadow hover:bg-gray-700 transition overflow-hidden"
              >
                <img
                  src={image}
                  alt={title}
                  className="w-full sm:w-32 h-48 sm:h-auto object-cover rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none"
                />
                <div className="p-4 flex flex-col justify-center">
                  <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
                  <p className="text-sm text-gray-300">{description}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="text-white px-4 sm:px-6 flex justify-center" aria-label="Testimonials">
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

        <section id="posts" className="px-2 sm:px-6">
          <h2 className="text-3xl font-bold mb-6">Posts</h2>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
            {posts.map(({ title, link }, i) => (
              <li key={i}>
                <a
                  href={link}
                  className="text-blue-400 hover:underline break-words"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="bg-gray-800 p-6 text-center space-x-6 text-sm sm:text-base">
        {footerLinks
          .filter((item) => item.href)
          .map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
              aria-label={item.name}
            >
              {item.name}
            </a>
          ))}
        {footerLinks.find((item) => item.img) && (
          <img
            src={footerLinks.find((item) => item.img).img}
            className="hidden" 
            alt=""
          />
        )}
      </footer>
      {fetchError && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
          Erro ao carregar dados: {fetchError}
        </div>
      )}
    </div>
  );
}
