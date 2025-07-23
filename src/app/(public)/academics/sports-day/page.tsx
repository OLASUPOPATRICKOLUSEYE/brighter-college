import React from 'react'
import SportHero from './SportHero'
import Sport from './Sport'
import MainFooter from '@/components/MainFooter'
import MainHeader from '@/components/MainHeader'

const SportsDay = () => {
  return (
    <>
      {/* <MainHeader /> */}
        <div className="pt-[100px] md:pt-[150px] lg:pt-[100px]">
          <SportHero />
        </div>
      <Sport />
      {/* <MainFooter /> */}
    </>
  )
}

export default SportsDay
