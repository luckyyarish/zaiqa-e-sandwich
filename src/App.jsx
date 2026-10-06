import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Menu as MenuIcon, X, Phone } from "lucide-react";
import { siInstagram } from "simple-icons/icons";
import logo from "./assets/logo.jpg";
import sandwichImg from "./assets/sandwich.png";
import coldCoffeeImg from "./assets/cold coffee.png";
import strawberryShake from "./assets/Strawberry Milkshake.png";
import mangoShake from "./assets/Mango Milkshake.png";
import chocoShake from "./assets/Choco Milkshake.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const SectionLabel = ({ label }) => (
  <p className="text-xs tracking-[0.2em] text-ember font-medium mb-3">
    {label}
  </p>
);

const navItems = [
  { label: "Home", href: "#" },
  { label: "Menu", href: "#menu" },
  { label: "Map", href: "#map" },
  { label: "Contact", href: "#contact" },
];

const menuItems = [
  "VEG GRILL",
  "PANEER GRILL",
  "CORN GRILL",
  "PANEER CORN CHEESE",
  "COLD COFFEE",
  "STRAWBERRY SHAKE",
  "MANGO SHAKE",
  "CHOCO SHAKE",
];

const reels = [
  { video: "/videos/reel1.mp4", poster: "/posters/reel1.jpg" },
  { video: "/videos/reel2.mp4", poster: "/posters/reel2.jpg" },
  { video: "/videos/reel3.mp4", poster: "/posters/reel3.jpg" },
  { video: "/videos/reel4.mp4", poster: "/posters/reel4.jpg" },
  { video: "/videos/reel5.mp4", poster: "/posters/reel5.jpg" },
  { video: "/videos/reel6.mp4", poster: "/posters/reel6.jpg" },
];

const shakes = [
  { img: strawberryShake, name: "Strawberry Milkshake", price: "₹50" },
  { img: mangoShake, name: "Mango Milkshake", price: "₹50" },
  { img: chocoShake, name: "Choco Milkshake", price: "₹60" },
];

const reelComments = [
  {
    user: "@alone_moon4",
    text: "Sandwich 🥪 had an amazing 🤩 taste, simply out of words to praise this shop. Highly recommended...... ❤️",
  },
  {
    user: "@_.mr_saif_07",
    text: "Zaiqa-e-Sandwich serves one of the best sandwiches I've ever had. Absolutely delicious! 🥪🔥",
  },
  { user: "@tabrezprince8", text: "Delicious sandwich bro. ❤️❤️❤️" },
  {
    user: "@_____duaaa._",
    text: "Sandwich ka taste toh genuinely next level tha 😋✨",
  },
   {
    user: "@aamir__raza21",
    text: "Test Verified 🔥 Always visit 🙌",
  },
  {
    user: "@abhishek_kumar_malakar_",
    text: "Taste bahut yummy 😋 tha brohh. Superb 😍",
  },
];

const ReelPlayer = ({ video, poster, isPlaying, onPlay, registerRef }) => {
  const videoRef = useRef(null);

  return (
    <div className="relative w-full h-full">
      <video
        ref={(el) => {
          videoRef.current = el;
          registerRef(el);
        }}
        src={video}
        poster={poster}
        className="w-full h-full object-cover"
        controls={isPlaying}
        preload="none"
        playsInline
        onPause={() => {
          if (isPlaying) onPlay(null);
        }}
      />
      {!isPlaying && (
        <button
          onClick={() => {
            onPlay(video);
            videoRef.current?.play();
          }}
          className="absolute inset-0 flex items-center justify-center bg-ink/20"
          aria-label="Play reel"
        >
          <div className="w-14 h-14 rounded-full bg-paper/90 flex items-center justify-center">
            <Play className="w-6 h-6 text-ink ml-1" fill="currentColor" />
          </div>
        </button>
      )}
    </div>
  );
};

const App = () => {
  const [activeReel, setActiveReel] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const videoRefs = useRef({});
  const menuRef = useRef(null);

  const handlePlay = (video) => {
    Object.entries(videoRefs.current).forEach(([src, el]) => {
      if (src !== video && el) el.pause();
    });
    setActiveReel(video);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-paper text-ink font-body selection:bg-marigold selection:text-ink">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center relative">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Zaiqa E Sandwich Logo"
            className="w-10 h-10 rounded-full object-cover border border-ink/10"
          />
          <span className="text-sm tracking-[0.15em] font-semibold">
            ZAIQA E SANDWICH
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#" className="text-ember border-b-2 border-ember pb-1">
            Home
          </a>
          <a href="#menu" className="hover:text-ember transition-colors">
            Menu
          </a>
          <a href="#map" className="hover:text-ember transition-colors">
            Map
          </a>
          <a href="#contact" className="hover:text-ember transition-colors">
            Contact
          </a>
        </nav>

        <div ref={menuRef} className="md:hidden relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-1.5 rounded-full hover:bg-ink/5 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5 text-ink" />
            ) : (
              <MenuIcon className="w-5 h-5 text-ink" />
            )}
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full right-0 mt-2 bg-paper border border-ink/10 rounded-2xl shadow-xl flex flex-col overflow-hidden z-50 min-w-[180px]"
              >
                {navItems.map((item, i) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={
                      "px-5 py-4 text-sm font-medium hover:bg-ember/10 hover:text-ember active:bg-ember/20 transition-colors" +
                      (i !== navItems.length - 1
                        ? " border-b border-ink/10"
                        : "")
                    }
                  >
                    {item.label}
                  </a>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-10 pb-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-xs tracking-[0.2em] text-ember font-medium mb-4">
            FIRST TIME IN BALLIA · GRILLED SANDWICHES
          </p>
          <h1 className="font-heading font-bold text-5xl md:text-6xl leading-[1.05] mb-6">
            Enjoy Every
            <br />
            <span className="text-ember">Tasty</span> &{" "}
            <span className="text-marigold">Grilled</span>
            <br />
            Bite with us
          </h1>
          <p className="text-steel text-base mb-8 max-w-sm">
            <em className="italic">"Khao Befikar, Zaiqa Sabse Behtar"</em>{" "}
            <br /> Fresh grilled sandwiches, cold coffee, and premium
            milkshakes, made to order.
          </p>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-24 h-0.5 bg-gradient-to-r from-marigold via-ember to-ink" />
            <span className="text-xs text-steel">4:00 PM – 10:00 PM</span>
          </div>
          <a
            href="#menu"
            className="inline-flex items-center gap-2 bg-ember text-paper font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-ink transition-colors"
          >
            View Menu
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="flex justify-center"
        >
          <img
            src={sandwichImg}
            alt="Grilled Sandwich"
            className="w-full max-w-md object-contain drop-shadow-xl"
          />
        </motion.div>
      </section>

      {/* Ticker */}
      <div className="border-y border-ink/10 py-3 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee">
          {[...menuItems, ...menuItems].map((item, i) => (
            <span key={i} className="text-sm text-ember tracking-wide mx-4">
              {item} <span className="text-ink/20">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Menu */}
      <section id="menu" className="max-w-5xl mx-auto px-6 py-24">
        <SectionLabel label="MENU" />
        <h2 className="font-heading font-bold text-4xl md:text-5xl mb-16">
          What we sell
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 items-stretch">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 bg-paper border border-ink/10 rounded-xl p-8"
          >
            <p className="text-xs tracking-[0.15em] text-steel mb-6">
              GRILLED SANDWICHES
            </p>
            <ul className="divide-y divide-ink/10">
              <li className="flex justify-between py-4 text-lg">
                <span>Signature Veg Grill Sandwich</span>
                <span className="text-steel">₹50</span>
              </li>
              <li className="flex justify-between py-4 text-lg">
                <span>Premium Paneer Sandwich</span>
                <span className="text-steel">₹70</span>
              </li>
              <li className="flex justify-between py-4 text-lg">
                <span>Delicious Corn Sandwich</span>
                <span className="text-steel">₹70</span>
              </li>
              <li className="flex justify-between py-4 text-lg font-medium">
                <span>ZAIQA Paneer Corn Cheese Sandwich</span>
                <span className="text-ember">₹90</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-paper border border-ink/10 rounded-xl p-8 flex flex-col"
          >
            <p className="text-xs tracking-[0.15em] text-steel mb-6">
              COLD COFFEE
            </p>
            <img
              src={coldCoffeeImg}
              alt="Cold Coffee"
              className="w-24 h-36 object-contain mx-auto my-4"
            />
            <ul className="divide-y divide-ink/10 mt-auto">
              <li className="flex justify-between py-4 text-lg">
                <span>Strong Cold Coffee</span>
                <span className="text-steel">₹60</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <p className="text-xs tracking-[0.15em] text-steel mb-6">
          PREMIUM MILKSHAKES
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
          {shakes.map((shake, i) => (
            <motion.div
              key={shake.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className="bg-paper border border-ink/10 rounded-xl p-6 flex flex-col items-center text-center"
            >
              <div className="h-48 w-full flex items-end justify-center mb-4">
                <img
                  src={shake.img}
                  alt={shake.name}
                  className="max-h-full max-w-[70%] object-contain"
                />
              </div>
              <p className="font-medium">{shake.name}</p>
              <p className="text-steel text-sm mt-1">{shake.price}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-xs tracking-[0.15em] text-steel mb-6">COMBOS</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { name: "ZAIQA Sandwich + Cold Coffee", price: "₹140" },
            { name: "ZAIQA Sandwich + Strawberry Milkshake", price: "₹130" },
          ].map((combo) => (
            <div
              key={combo.name}
              className="flex justify-between items-center bg-paper border border-ink/10 rounded-xl px-6 py-5"
            >
              <span className="text-base">{combo.name}</span>
              <span className="text-ember font-semibold">{combo.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Reels */}
      <section
        id="reels"
        className="max-w-5xl mx-auto px-6 py-24 border-t border-ink/10"
      >
        <SectionLabel label="SOCIAL" />
        <h2 className="font-heading font-bold text-4xl md:text-5xl mb-16">
          See us in action
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {reels.map((reel) => (
            <div
              key={reel.video}
              className="w-full max-w-sm aspect-[9/16] bg-card rounded-xl overflow-hidden border border-ink/10"
            >
              <ReelPlayer
                video={reel.video}
                poster={reel.poster}
                isPlaying={activeReel === reel.video}
                onPlay={handlePlay}
                registerRef={(el) => (videoRefs.current[reel.video] = el)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Word of Mouth */}
      <section
        id="reviews"
        className="max-w-5xl mx-auto px-6 py-24 border-t border-ink/10"
      >
        <SectionLabel label="WORD OF MOUTH" />
        <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4">
          What people say
        </h2>
        <p className="text-steel text-sm mb-16 max-w-md">
          Real Instagram comments from real customers. Visit us and leave your
          own comment to be featured here.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {reelComments.map((c, i) => (
            <motion.div
              key={c.user}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-paper border border-ink/10 rounded-xl p-6"
            >
              <p className="text-ink/80 text-sm leading-relaxed mb-4">
                {c.text}
              </p>
              <p className="text-ember font-medium text-sm">{c.user}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Map */}
      <section
        id="map"
        className="max-w-5xl mx-auto px-6 py-24 border-t border-ink/10"
      >
        <SectionLabel label="FIND US" />
        <h2 className="font-heading font-bold text-4xl md:text-5xl mb-16">
          Locate our shop
        </h2>
        <div
          className="w-full relative rounded-xl overflow-hidden border border-ink/10"
          style={{ paddingTop: "56.25%" }}
        >
          <iframe
            title="Zaiqa E Sandwich Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d400.887551346028!2d86.312556!3d25.4190702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f1f7599d8795d3%3A0x127c0d2992704ec0!2sZAIQA%20E%20SANDWICH!5e1!3m2!1sen!2sin!4v1788073069919!5m2!1sen!2sin"
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </section>

      {/* Footer / Visit */}
      <footer id="contact" className="bg-ink text-paper py-24">
        <div className="max-w-5xl mx-auto px-6">
          <SectionLabel label="CONTACT" />
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-16">
            Come taste it yourself
          </h2>
          <div className="border-t border-paper/15 pt-12">
            <p className="text-paper/70 text-base mb-2">
              <strong className="text-paper">ZAIQA E SANDWICH</strong> — In
              front of Cake 4 All,
              <br /> Chhoti Ballia Bazar, Near RSAS High School (50m ahead),
              <br /> Ballia, Begusarai, Bihar - 851211
            </p>
            <p className="text-paper/70 text-base mb-8">
              Open daily, 4:00 PM to 10:00 PM
            </p>

            <p className="text-paper/70 text-base mb-8 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <a
                href="tel:+918539000386"
                className="hover:text-marigold transition-colors"
              >
                +91 85390 00386
              </a>
              <span className="text-paper/30">/</span>
              <a
                href="tel:+918709437937"
                className="hover:text-marigold transition-colors"
              >
                +91 87094 37937
              </a>
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://instagram.com/zaiqaesandwich"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-paper text-ink px-6 py-3 rounded-full text-sm font-medium hover:bg-marigold transition-colors"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-current"
                >
                  <path d={siInstagram.path} />
                </svg>
                Follow on Instagram
              </a>
              <a
                href="https://maps.google.com/?q=Cake+4+All,Ballialakhminia-III,Bihar"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-paper/30 text-paper px-6 py-3 rounded-full text-sm font-medium hover:border-paper transition-colors"
              >
                Get directions
              </a>
            </div>
          </div>
          <p className="text-xs text-paper/30 mt-16">
            © {new Date().getFullYear()} Zaiqa E Sandwich. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
