import React from 'react'
import CalendarHero from './CalendarHero'
import CalendarListTable from './CalendarListTable'
import MainHeader from '@/components/MainHeader'
import MainFooter from '@/components/MainFooter'

const AnnualCalendar = () => {
  return (
    <>
      {/* <MainHeader /> */}
        <div className="pt-[100px] md:pt-[150px] lg:pt-[100px]">
          <CalendarHero />
        </div>
      <CalendarListTable />
      {/* <MainFooter /> */}
    </>
  )
}

export default AnnualCalendar
