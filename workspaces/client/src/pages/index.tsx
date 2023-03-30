import { NextPage } from 'next';
import ClientPrimaryLayout from '@client/components/shared/layouts/ClientPrimary';
import Motivation from '@client/components/homePage/Motivation/Motivation';
import AboutUs from '@client/components/homePage/AboutUs';
import Testimonials from '@client/components/homePage/Testimonial/Testimonials';
import Footer from '@client/components/shared/Footer/Footer';

const HomePage: NextPage = () => {
  return (
    <ClientPrimaryLayout
      props={{
        gap: ['2rem', null, '5rem'],
      }}
    >
      <Motivation />
      <AboutUs />
      <Testimonials />
      <Footer />
    </ClientPrimaryLayout>
  );
};

export default HomePage;
