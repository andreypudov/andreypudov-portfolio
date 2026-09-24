import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function NotFoundPage() {
  return (
    <>
      <Header />

      <main>
        <div className="not-found">
          <div className="overlay">
            <h1>Oops — This Page<br />Is Out of Focus</h1>
            <p>The photo you’re looking for isn’t in this frame.</p>
            <nav>
              <a href="/portfolio/">→ Return to Portfolio</a>
              <a href="/">→ Go Home</a>
              <a href="/contact/">→ Contact Me</a>
            </nav>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
