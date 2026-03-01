import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function PrivacyPolicy() {

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className='bg-slate-50 min-h-screen font-outfit pt-32 pb-24 px-6 md:px-8'>

      {/* Header */}
      <div className='max-w-4xl mx-auto text-center mb-16' data-aos="fade-up">
        <span className='text-blue font-bold text-sm tracking-widest uppercase mb-2 block'>Legal</span>
        <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4'>
          Privacy Policy
        </h1>
        <p className='text-gray-500'>Effective Date: 11-10-2024 | Last Updated: 11-10-2024</p>
      </div>

      <div className='max-w-4xl mx-auto bg-white/90 backdrop-blur-xl border border-white/50 shadow-soft-lift rounded-[40px] p-8 md:p-16' data-aos="fade-up" data-aos-delay="100">

        <div className='prose prose-lg prose-gray max-w-none prose-headings:font-extrabold prose-headings:text-gray-900 prose-headings:tracking-tight prose-a:text-blue prose-p:leading-relaxed prose-li:leading-relaxed'>

          <p>
            <strong>SKYSTAY LISTINGS SERVICES KENYA LIMITED</strong> operates the website <strong>www.skystay.homes</strong>. We are committed to protecting and respecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information in compliance with relevant data protection laws, including the General Data Protection Regulation (GDPR). By using our website and services, you agree to the collection and use of information as described in this policy.
          </p>

          <hr className='my-8 border-gray-100' />

          <h3>Information We Collect</h3>
          <p>We may collect and process the following types of information:</p>
          <ul>
            <li><strong>Personal Data:</strong> Information that identifies you, such as your name, email address, postal address, telephone number, payment information, and any other personal data you provide.</li>
            <li><strong>Usage Data:</strong> Information about how you access and use our website, including your IP address, browser type, pages visited, and duration of visit.</li>
            <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to enhance your experience on our website.</li>
          </ul>

          <h3>How We Use Your Information</h3>
          <p>We may use the information we collect for various purposes, including:</p>
          <ul>
            <li>To provide, operate, and maintain our services.</li>
            <li>To process your bookings and manage your account.</li>
            <li>To improve, personalize, and enhance your experience on our website.</li>
            <li>To communicate with you regarding promotions, updates, or customer service.</li>
            <li>To comply with legal obligations and enforce our policies.</li>
          </ul>

          <h3>Information Security Policy</h3>
          <p>We implement robust security measures to protect your information from unauthorized access, disclosure, alteration, or destruction. Our Information Security Policy establishes a framework for managing information security risks and is regularly reviewed.</p>

          <h3>Cybersecurity Policy</h3>
          <p>We are committed to preventing and responding to cyber threats. Our Cybersecurity Policy outlines the procedures we follow to protect against cybercrime and respond to cybersecurity incidents.</p>

          <h3>Access Control Policy</h3>
          <p>Access to personal and organizational information is restricted through both physical and logical access controls. These controls ensure that only authorized personnel have access to sensitive data and systems.</p>

          <h3>Data Protection Policy (GDPR Compliance)</h3>
          <p>SkyStay is committed to complying with GDPR and other applicable data protection laws. Our Data Protection Policy includes:</p>
          <ul>
            <li><strong>Data Minimization:</strong> We collect only the personal data that is necessary for specific purposes.</li>
            <li><strong>Encryption:</strong> Sensitive data is encrypted to protect it from unauthorized access.</li>
            <li><strong>Breach Notification:</strong> In the event of a data breach, we will notify affected individuals and the relevant supervisory authority as required by law.</li>
          </ul>

          <h3>Your Data Protection Rights</h3>
          <p>Under GDPR, you have the following rights:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong>Rectification:</strong> Request correction of any inaccurate or incomplete data.</li>
            <li><strong>Erasure:</strong> Request the deletion of your personal data when it is no longer needed.</li>
            <li><strong>Portability:</strong> Request that your data be transferred to another organization.</li>
            <li><strong>Objection:</strong> Object to the processing of your personal data, particularly for marketing purposes.</li>
          </ul>

          <hr className='my-8 border-gray-100' />

          <h3>Contact Us</h3>
          <p>If you have any questions or concerns about this Privacy Policy or how we handle your personal data, please contact us at:</p>
          <div className='bg-gray-50 p-6 rounded-2xl border border-gray-100 not-prose mt-6'>
            <p className='font-bold text-gray-900 mb-2'>SkyStay</p>
            <p className='text-gray-600 mb-1'><strong>Email:</strong> support@skystay.homes</p>
            <p className='text-gray-600'><strong>Website:</strong> www.skystay.homes</p>
          </div>

          <p className='text-sm text-gray-400 mt-8 italic'>By implementing these policies and adhering to strict procedures, SkyStay aims to provide a secure and reliable service to our customers while ensuring full compliance with privacy and information security regulations.</p>

        </div>
      </div>
    </div>
  )
}
