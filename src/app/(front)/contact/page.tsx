import React from 'react'
import ContactHero from './ContactHero'
// import UserGeneralComplaintForm from '@/components/forms/UserGeneralComplaintForm'
import UserGeneralComplaintForm from '../../../components/forms/UserGeneralComplaintForm';
import ContactDes from './ContactDes';

const Contact = () => {
  return (
    <>
      <ContactHero />
      <UserGeneralComplaintForm 
        type="create"
      />
      <ContactDes />
    </>
  )
}

export default Contact
