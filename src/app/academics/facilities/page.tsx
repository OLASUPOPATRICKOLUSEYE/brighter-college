import React from 'react'
import FacilitiesHero from './FacilitiesHero'
import Facilities from './Facilities'
import MainFooter from '@/components/MainFooter'
import MainHeader from '@/components/MainHeader'


const Facility = () => {
  return (
    <>
      <MainHeader />
        <div className="pt-[100px] md:pt-[150px] lg:pt-[100px]">
          <FacilitiesHero />
        </div>
      <Facilities />
      <MainFooter />
    </>
  )
}

export default Facility
