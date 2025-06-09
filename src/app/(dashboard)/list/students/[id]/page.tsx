import Image from "next/image";
import BigCalender from "@/components/BigCalender";
import Announcements from "@/components/Announcements";
import Link from "next/link"
import Performance from "@/components/Performance";

const SingleStudentPage = () => {
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* USER INFO CARD */}
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src="/avatar.jpg"
                alt="avatar"
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-center gap-4">
              <h1 className="text-xl font-semibold">Zach Pascal</h1>
              <p className="text-sm text-gray-500">
                Well, the way they make shows is.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image
                        src="/mail.png"
                        alt="avatar"
                        width={14}
                        height={14}
                        className=""
                    />    
                    <span>adejumo2019@gmail.com</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image
                        src="/blood.png"
                        alt="avatar"
                        width={14}
                        height={14}
                        className=""
                    />    
                    <span>A+</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image
                        src="/date.png"
                        alt="avatar"
                        width={14}
                        height={14}
                        className=""
                    />    
                    <span>June 2025/06/06</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image
                        src="/phone.png"
                        alt="avatar"
                        width={14}
                        height={14}
                        className=""
                    />    
                    <span>09021942611</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARD */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/*CARD  */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <Image src="/singleAttendance.png" alt="" width={24} height={24} className="w-6 h-6"/>
                <div className="">
                    <h1 className="text-xl font-semibold">90%</h1>
                    <span className="text-sm text-gray-400">Attendance</span>
                </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <Image src="/singleBranch.png" alt="" width={24} height={24} className="w-6 h-6"/>
                <div className="">
                    <h1 className="text-xl font-semibold">6th</h1>
                    <span className="text-sm text-gray-400">Grades</span>
                </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <Image src="/singleLesson.png" alt="" width={24} height={24} className="w-6 h-6"/>
                <div className="">
                    <h1 className="text-xl font-semibold">20</h1>
                    <span className="text-sm text-gray-400">Lessons</span>
                </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <Image src="/singleClass.png" alt="" width={24} height={24} className="w-6 h-6"/>
                <div className="">
                    <h1 className="text-xl font-semibold">6A</h1>
                    <span className="text-sm text-gray-400">Class</span>
                </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
            <h1 className="font-bold">Student&apos;s Schedule</h1>
            <BigCalender />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
      <div className="bg-white p-4 rounded-md">
        <h1 className="text-xl font-semibold">Shortcuts</h1>
        <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
          <Link className="p-3 rounded-md bg-lamaYellowLight" href="/">Student&apos;s Lessons</Link>
          <Link className="p-3 rounded-md bg-lamaSkyLight" href="/">Student&apos;s Teachers</Link>
          <Link className="p-3 rounded-md bg-pink-500" href="/">Student&apos;s Exams</Link>
          <Link className="p-3 rounded-md bg-lamaSkyLight" href="/">Student&apos;s Assignm ents</Link>
          <Link className="p-3 rounded-md bg-lamaSkyPurple" href="/">Student&apos;s Results</Link>
        </div>
      </div>
      <Performance />
      <Announcements />
      </div>
    </div>
  );
};

export default SingleStudentPage;
