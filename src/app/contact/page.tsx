import React from 'react'
import ContactHero from './ContactHero'
import ContactDes from './ContactDes';
import UserGeneralComplaintForm from '@/components/forms/User-General-Complaint-Form';
import MainHeader from '@/components/MainHeader';
import MainFooter from '@/components/MainFooter';

const Contact = () => {
  return (
    <>
      <MainHeader />
        <div className="pt-[100px] md:pt-[150px] lg:pt-[100px]">
          <ContactHero />
        </div>
              {/* Header */}
      <div className="mx-auto my-10 text-center px-4 sm:px-6 md:px-10 lg:px-16 xl:px-32 2xl:px-48 w-full">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#7a1f1f] mb-4">
          Get In Touch Via The Details Below?
        </h2>
        <div className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
          Tmply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took.
        </div>
      </div>
      <UserGeneralComplaintForm type="create" />
      <ContactDes />
      <MainFooter />
    </>
  )
}

export default Contact
