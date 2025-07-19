import React from 'react'
import CalendarHero from './EventsHero'
import CalendarListTable from './EventsListTable'
import EventsHero from './EventsHero'
import EventsListTable from './EventsListTable'
import MainFooter from '@/components/MainFooter'
import MainHeader from '@/components/MainHeader'

const Events = () => {
  return (
    <>
      <MainHeader />
        <div className="pt-[100px] md:pt-[150px] lg:pt-[100px]">
          <EventsHero />
        </div>
      <EventsListTable />
      <MainFooter />
    </>
  )
}

export default Events
