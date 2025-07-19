import React from 'react'
import CourseHero from './CourseHero'
import MainCourse from '@/app/front/MainCourse'
import MainHeader from '@/components/MainHeader'
import MainFooter from '@/components/MainFooter'

const Course = () => {
  return (
    <>
      <MainHeader />
        <div className="pt-[100px] md:pt-[150px] lg:pt-[100px]">
          <CourseHero />
        </div>
      <MainCourse />
      <MainFooter />
    </>
  )
}

export default Course
