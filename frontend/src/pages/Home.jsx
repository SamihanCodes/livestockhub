import { Link } from "react-router-dom";
import hero from "../assets/hero.jpg";
import cow from "../assets/cow.jpg";
import goat from "../assets/goat.jpg";
import sheep from "../assets/sheep.jpg";
import Footer from "../components/Footer";
import "./Home.css";

const Home = () => {
  return (
    <div>
      {/* HERO SECTION */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(2,57,74,0.7), rgba(2,57,74,0.7)), url(${hero})`,
        }}
      >
        <div className="hero-content">
          <h1>LiveStockHub</h1>
          <p>
            India’s digital marketplace for buying and selling livestock.
            Smart. Secure. Transparent.
          </p>

          <Link to="/register">
            <button className="hero-btn">Get Started Free</button>
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features container">
        <h2>Why LiveStockHub?</h2>

        <div className="feature-grid">
          {[
            { title: "Verified Sellers", desc: "All sellers are authenticated.", icon: "✅" },
            { title: "Real-time Bidding", desc: "Transparent bidding system.", icon: "💰" },
            { title: "Direct Chat", desc: "Instant buyer–seller chat.", icon: "💬" },
            { title: "Secure Payments", desc: "Safe transactions.", icon: "🔐" },
            { title: "Admin Monitoring", desc: "Fraud prevention.", icon: "🛡️" },
            { title: "Digital Records", desc: "All data stored securely.", icon: "📊" },
          ].map((f, i) => (
            <div key={i} className="feature-card">
              <div className="icon">{f.icon}</div>
              <p className="heading">{f.title}</p>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LIVESTOCK SHOWCASE */}
      <section className="livestock">
        <h2>Trade All Kinds of Livestock</h2>

        <div className="livestock-grid">
          {[
            { img: cow, name: "Cattle" },
            { img: goat, name: "Goats" },
            { img: sheep, name: "Sheep" },
          ].map((item, i) => (
            <div key={i} className="livestock-card">
              <img src={item.img} alt={item.name} />
              <div>{item.name}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
