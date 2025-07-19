import React from 'react'
import AboutHero from './AboutHero'
import AboutUsDes from './AboutUsDes'
import WhyChooseUs from './WhyChooseUs'
import MainFooter from '@/components/MainFooter'
import MainHeader from '@/components/MainHeader'

const AboutUs = () => {
  return (
    <>
      <MainHeader />
        <div className="pt-[100px] md:pt-[150px] lg:pt-[100px]">
          <AboutHero />
        </div>
      <AboutUsDes />
      <WhyChooseUs />
      <MainFooter />
    </>
  )
}

export default AboutUs
