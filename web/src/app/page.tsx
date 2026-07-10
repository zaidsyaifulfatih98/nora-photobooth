import HomeLayout from './home/layout';
import Navbar from './home/components/Navbar';
import Hero from './home/components/Hero';
import Features from './home/components/Features';
import Packages from './home/components/Packages';
import Gallery from './home/components/Gallery';
import HowItWorks from './home/components/HowItWorks';
import Testimonials from './home/components/Testimonials';
import BookingForm from './home/components/BookingForm';
import Footer from './home/components/Footer';

export default function RootPage() {
  return (
    <HomeLayout>
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
    </HomeLayout>
  );
}
