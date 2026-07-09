import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Packages from './components/Packages';
import Gallery from './components/Gallery';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

export default function LandingPage() {
  return (
    <main className='overflow-x-hidden'>
      <Navbar />
      <Hero />
      <Features />
      <Packages />
      <Gallery />
      <HowItWorks />
      <Testimonials />
      <BookingForm />
      <Footer />
    </main>
  );
}
