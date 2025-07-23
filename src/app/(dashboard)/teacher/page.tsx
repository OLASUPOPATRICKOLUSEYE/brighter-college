import UserCard from "@/components/UserCard";
import CountChart from "@/components/CountChart";
import AttendanceChart from "@/components/AttendanceChart";
import FinanceChart from "@/components/FinanceChart";
import EventCalendar from "@/components/EventCalendar";
import Announcements from "@/components/Announcements";
import AttendanceBar from "@/components/AttendanceCard";
import AttendanceCard from "@/components/AttendanceCard";
import FinanceChartSession from "@/components/FinanceChartSession";
import BigCalender from "@/components/BigCalender";
import IncomeChart from "@/components/IncomeChart";
import ExpensesChart from "@/components/ExpensesChart";

const Teacher = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 py-6">
      {/* LEFT (Main Content) */}
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        {/* USER CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <UserCard type="Teachers" />
          <UserCard type="Librarians" />
          <UserCard type="Accountant" />
          <UserCard type="Parents" />
          <UserCard type="Receptionist" />
          <UserCard type="Students" />
          <UserCard type="Visitors" />
          <UserCard type="Alumni" />
        </div>

        {/* MIDDLE CHARTS */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/3 min-h-[300px]">
            <CountChart />
          </div>
          <div className="w-full lg:w-2/3 min-h-[300px]">
            <AttendanceChart />
          </div>
        </div>

        {/* BOTTOM CHARTS */}
        <div className="w-full bg-white h-full p-4 rounded-md">
          <h1 className="font-semibold text-xl">Schedule Class(4A)</h1>
          <BigCalender />
        </div>
      </div>

      {/* RIGHT (Sidebar Widgets) */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        <AttendanceCard type="student-present-today" />
        <AttendanceCard type="student-today-attendance" />
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default Teacher;
