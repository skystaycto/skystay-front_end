import React, { useEffect } from "react";
import Faq from 'react-faq-component';
import AOS from 'aos';
import 'aos/dist/aos.css';

const data1 = {
  title: "General FAQs",
  rows: [
    {
      title: "What is Skystay?",
      content: "Skystay is an online platform that connects property owners who want to rent out their properties with guests seeking short-term or long-term accommodations. We also provide marketing and property management services to property owners.",
    },
    {
      title: "Do I need to sign up to book a property?",
      content: `No. You can book a property without creating an account. If you choose to create an account you will be able to add properties to your favourite list and view your bookings.`,
    },
    {
      title: "What payment methods do you accept?",
      content: "We accept Visa, Mastercard, American Express, Mpesa, Airtel Money and Pesapal's E-wallet.",
    },
    {
      title: "What is the best way to book one of your properties?",
      content: "You can book and pay for any of our properties online or call +254 743 501 162 or send a whatsapp.",
    },
    {
      title: "Do you offer long term bookings?",
      content: "Yes we do at all of our properties.",
    },
    {
      title: "What happens if I want to cancel my booking?",
      content: "You contact us on +254 743 501 162 or send a whatsapp. We will assist in cancelling your booking.",
    },
    {
      title: "What happens if I want to change my booking?",
      content: "You contact us on +254 743 501 162 or send a whatsapp. We will assist in changing your booking.",
    },
  ],
};

const data2 = {
  title: "Property Management FAQs",
  rows: [
    {
      title: "How do I onboard my property?",
      content: `You can fill the form on the onboarding page. We will reach out to you as soon as possible. <a href="/onboardform" class="text-blue hover:underline">Click here</a>`,
    },
    {
      title: "Why we collect payments on your behalf?",
      content: "We collect payments for bookings made through our booking engine and other channels. If we manage an account for your property on other platforms eg. Booking.com and Skystay.homes we will collect payments on your behalf. This is convenient as we can charge our commission and deposit the funds to your account.",
    },
    {
      title: "Can I rent out my Room?",
      content: "No. We only rent out the whole property. We do not allow guests to rent out individual rooms.",
    },
    {
      title: "How much commission do we charge?",
      content: "The commission we charge depends on the type of service we provide. If you are interested in having us market your property, we charge a commission only when we successfully find a guest to book it. If you would like us to both market and manage your property, the commission will be higher.",
    },
  ],
};

const styles = {
  bgColor: 'transparent',
  titleTextColor: '#111827',
  rowTitleColor: '#1F2937',
  rowContentColor: '#6B7280',
  arrowColor: '#006CE4',
  rowContentPaddingBottom: '20px',
  rowContentPaddingTop: '10px',
};
const config = { animate: true, arrowIcon: "V", tabFocus: true };

export default function Faqs() {

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className='bg-slate-50 min-h-screen font-outfit pt-32 pb-24 px-6 md:px-8'>

      {/* Header */}
      <div className='max-w-3xl mx-auto text-center mb-16' data-aos="fade-up">
        <span className='text-pink font-bold text-sm tracking-widest uppercase mb-2 block'>Help Center</span>
        <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4'>
          Frequently Asked Questions
        </h1>
        <p className='text-gray-500 text-lg'>Everything you need to know about the product and billing.</p>
      </div>

      {/* FAQ Sections */}
      <div className='max-w-3xl mx-auto space-y-8'>

        <div className='bg-white/80 backdrop-blur-xl border border-white/50 shadow-soft-lift rounded-[32px] p-8 md:p-10' data-aos="fade-up" data-aos-delay="100">
          <div className='faq-custom-wrapper [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-6 [&_.faq-row-wrapper]:border-gray-100 [&_.faq-row]:py-4 [&_.faq-title]:font-semibold [&_.faq-title]:text-lg'>
            <Faq data={data1} styles={styles} config={config} />
          </div>
        </div>

        <div className='bg-white/80 backdrop-blur-xl border border-white/50 shadow-soft-lift rounded-[32px] p-8 md:p-10' data-aos="fade-up" data-aos-delay="200">
          <div className='faq-custom-wrapper [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-6 [&_.faq-row-wrapper]:border-gray-100 [&_.faq-row]:py-4 [&_.faq-title]:font-semibold [&_.faq-title]:text-lg'>
            <Faq data={data2} styles={styles} config={config} />
          </div>
        </div>

      </div>
    </div>
  )
}
