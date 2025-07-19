import React from 'react'
import NewsHero from './NewsHero'
import NewsListTable from './NewsListTable'
import MainFooter from '@/components/MainFooter'
import MainHeader from '@/components/MainHeader'

const Events = () => {
  return (
    <>
      <MainHeader />
      <div className="pt-[100px] md:pt-[150px] lg:pt-[100px]">
        <NewsHero />
      </div>
      <NewsListTable />
      <MainFooter />
    </>
  )
}

export default Events
