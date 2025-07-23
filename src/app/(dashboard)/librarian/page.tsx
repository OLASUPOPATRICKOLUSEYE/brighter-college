import UserCard from "@/components/UserCard";
import EventCalendar from "@/components/EventCalendar";
import Announcements from "@/components/Announcements";
import AttendanceCard from "@/components/AttendanceCard";
import BigCalender from "@/components/BigCalender";

const Librarian = () => {
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

        {/* BOTTOM CHARTS */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <AttendanceCard type="library-overview" />
            <AttendanceCard type="student-today-attendance" />
          </div>
        <BigCalender />
      </div>

      {/* RIGHT (Sidebar Widgets) */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        <AttendanceCard type="student-present-today" />
        <AttendanceCard type="staff-present-today" />
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default Librarian;
