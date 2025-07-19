import React from 'react'
import ContactHero from './ContactHero'
import ContactDes from './ContactDes';
import UserGeneralComplaintForm from '@/components/forms/UserGeneralComplaintForm';
import MainHeader from '@/components/MainHeader';
import MainFooter from '@/components/MainFooter';

const Contact = () => {
  return (
    <>
      <MainHeader />
        <div className="pt-[100px] md:pt-[150px] lg:pt-[100px]">
          <ContactHero />
        </div>
      <UserGeneralComplaintForm type="create" />
      <ContactDes />
      <MainFooter />
    </>
  )
}

export default Contact
