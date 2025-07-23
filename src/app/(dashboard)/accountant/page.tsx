import UserCard from "@/components/UserCard";
import CountChart from "@/components/CountChart";
import AttendanceChart from "@/components/AttendanceChart";
import FinanceChart from "@/components/FinanceChart";
import EventCalendar from "@/components/EventCalendar";
import Announcements from "@/components/Announcements";
import AttendanceCard from "@/components/AttendanceCard";
import FinanceChartSession from "@/components/FinanceChartSession";
import BigCalender from "@/components/BigCalender";
import IncomeChart from "@/components/IncomeChart";
import ExpensesChart from "@/components/ExpensesChart";

const Accountant = () => {
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
          <UserCard type="Total Fees" />
          <UserCard type="Income" />
          <UserCard type="Monthly Fees" />
          <UserCard type="Expenses" />
          <UserCard type="Monthly Expenses" />
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
        <div className="flex flex-col gap-4">
          <div className="min-h-[300px]">
            <FinanceChart />
          </div>
          <div className="min-h-[300px]">
            <FinanceChartSession />
          </div>
        </div>
          <BigCalender />
      </div>

      {/* RIGHT (Sidebar Widgets) */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        <EventCalendar />
        <Announcements />
        <AttendanceCard type="fees-awaiting-payment" />
        <AttendanceCard type="staff-present-today" />
        <AttendanceCard type="student-present-today" />
        <AttendanceCard type="fees-overview" />
        <AttendanceCard type="enquiry-overview" />
        <IncomeChart />
        <ExpensesChart />
      </div>

    </div>
  );
};

export default Accountant;
