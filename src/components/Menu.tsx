"use client";

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import Link from "next/link";
import { role } from "@/lib/data";
import {
  MdDashboard,
  MdQuestionAnswer,
  MdAccessibility,
  MdAccountBalance,
  MdGroups,
  MdCalendarViewMonth,
  MdAccountBalanceWallet,
  MdAddBox,
  MdAddTask,
  MdAnalytics,
  MdAnnouncement,
  MdAssessment,
  MdAssignment,
  MdAssignmentInd,
  MdAssignmentReturn,
  MdAttachMoney,
  MdBackup,
  MdBlock,
  MdBookOnline,
  MdBuild,
  MdCalendarMonth,
  MdCalendarToday,
  MdCall,
  MdCastForEducation,
  MdCategory,
  MdCheckCircle,
  MdChecklist,
  MdClass,
  MdCloudUpload,
  MdCommute,
  MdContentCopy,
  MdCreditCard,
  MdCreate,
  MdDateRange,
  MdDelete,
  MdDescription,
  MdDirectionsBus,
  MdDownload,
  MdEditDocument,
  MdEmail,
  MdEvent,
  MdEventNote,
  MdExtension,
  MdFactCheck,
  MdFileCopy,
  MdForward,
  MdGrade,
  MdGroup,
  MdGroupWork,
  MdHistory,
  MdHome,
  MdHotel,
  MdInbox,
  MdInsertChart,
  MdInventory,
  MdLabel,
  MdLanguage,
  MdLibraryBooks,
  MdList,
  MdLiveTv,
  MdLocationOn,
  MdLocalShipping,
  MdMap,
  MdManageAccounts,
  MdMeetingRoom,
  MdMenu,
  MdMenuBook,
  MdMoneyOff,
  MdNotifications,
  MdOnlinePrediction,
  MdOutlineArticle,
  MdOutlineBarChart,
  MdPages,
  MdPayment,
  MdPeople,
  MdPermMedia,
  MdPerson,
  MdPersonAdd,
  MdPhotoLibrary,
  MdPhotoSizeSelectActual,
  MdPrint,
  MdQrCodeScanner,
  MdQuiz,
  MdReportProblem,
  MdRuleFolder,
  MdSchedule,
  MdSchool,
  MdScore,
  MdSearch,
  MdSecurity,
  MdSend,
  MdSettings,
  MdSettingsApplications,
  MdSms,
  MdStore,
  MdSwapHoriz,
  MdSystemUpdate,
  MdToday,
  MdTopic,
  MdTrackChanges,
  MdTune,
  MdUpgrade,
  MdVerifiedUser,
  MdVideoCall,
  MdVideoLibrary,
  MdViewHeadline,
  MdViewModule,
  MdWeb,
  MdWidgets,
} from "react-icons/md";

type MenuItem = {
  icon: JSX.Element;
  label: string;
  href: string;
  visible: string | string[];
};

type MenuGroup = {
  title: string;
  icon: JSX.Element;
  items: MenuItem[];
};

const menuItems: MenuGroup[] = [
    {
      title: "Dashboard",
      icon: <MdDashboard className="text-lg" />,
      items: [
        { icon: <MdQuestionAnswer />, label: "Admin Dashboard", href: "/admin", visible: "admin" },
        { icon: <MdBookOnline />, label: "Teacher Dashboard", href: "/teacher", visible: "teacher" },
        { icon: <MdCall />, label: "Receptionist Dashboard", href: "/receptionist", visible: "receptionist" },
        { icon: <MdSend />, label: "Librarian Dashboard", href: "/librarian", visible: "librarian" },
        { icon: <MdSend />, label: "Accountant Dashboard", href: "/accountant", visible: "accountant" },
        { icon: <MdSend />, label: "Parent Dashboard", href: "/parent", visible: "parent" },
      ],
    },
    {
      title: "Front Office",
      icon: <MdQuestionAnswer className="text-lg" />,
      items: [
        { icon: <MdQuestionAnswer />, label: "Admission Enquiry", href: "/list/front-office/admission", visible: ["admin", "teacher"] },
        { icon: <MdBookOnline />, label: "Visitor Book", href: "/list/front-office/visitor", visible: ["admin", "teacher"] },
        { icon: <MdCall />, label: "Phone Call Log", href: "/list/front-office/phone-call-log", visible: ["admin", "teacher"] },
        { icon: <MdSend />, label: "Postal Dispatch", href: "/list/front-office/postal-dispatch", visible: ["admin", "teacher"] },
        { icon: <MdInbox />, label: "Postal Receive", href: "/list/front-office/postal-receive", visible: ["admin", "teacher"] },
        { icon: <MdReportProblem />, label: "Complaint", href: "/list/front-office/complaint", visible: ["admin", "teacher"] },
        { icon: <MdSettings />, label: "Setup Front Office", href: "/list/front-office/setup-front-office", visible: ["admin", "teacher"] },
      ],
    },
  {
    title: "Student Info",
    icon: <MdSchool className="text-lg" />,
    items: [
      { icon: <MdPerson />, label: "Student Details", href: "/list/studentinformation/studentdetail", visible: ["admin", "teacher"] },
      { icon: <MdPersonAdd />, label: "Student Admission", href: "/list/studentinformation/studentadmission", visible: ["admin", "teacher"] },
      { icon: <MdOnlinePrediction />, label: "Online Admission", href: "/list/studentinformation/onlineadmission", visible: ["admin", "teacher"] },
      { icon: <MdAccessibility />, label: "Disabled Students", href: "/list/studentinformation/disablestudent", visible: ["admin", "teacher"] },
      { icon: <MdClass />, label: "Multi Class Student", href: "/list/studentinformation/multiclass", visible: ["admin", "teacher"] },
      { icon: <MdDelete />, label: "Bulk Delete", href: "/list/studentinformation/bulkdelete", visible: ["admin"] },
      { icon: <MdSettings />, label: "Setup Student Info", href: "/list/studentinformation/setup-student-info", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Fees Collection",
    icon: <MdAttachMoney className="text-lg" />,
    items: [
      { icon: <MdPayment />, label: "Collect Fees", href: "/list/feescollection/collectfees", visible: ["admin", "teacher"] },
      { icon: <MdAccountBalance />, label: "Offline Bank Payment", href: "/list/feescollection/offlinebankpayment", visible: ["admin", "teacher"] },
      { icon: <MdSearch />, label: "Search Fees Payment", href: "/list/feescollection/searchfeespayment", visible: ["admin", "teacher"] },
      { icon: <MdSearch />, label: "Search Due Fees", href: "/list/feescollection/searchfeesdue", visible: ["admin", "teacher"] },
      { icon: <MdAttachMoney />, label: "Fees Master", href: "/list/feescollection/feesmaster", visible: ["admin", "teacher"] },
      { icon: <MdAttachMoney />, label: "Quick Fees", href: "/list/feescollection/quickfees", visible: ["admin", "teacher"] },
      { icon: <MdGroup />, label: "Fees Group", href: "/list/feescollection/feesgroup", visible: ["admin", "teacher"] },
      { icon: <MdLabel />, label: "Fees Type", href: "/list/feescollection/feestype", visible: ["admin", "teacher"] },
      { icon: <MdMoneyOff />, label: "Fees Discount", href: "/list/feescollection/feesdiscount", visible: ["admin", "teacher"] },
      { icon: <MdForward />, label: "Fees Carry Forward", href: "/list/feescollection/feescarryforward", visible: ["admin", "teacher"] },
      { icon: <MdNotifications />, label: "Fees Reminder", href: "/list/feescollection/feesreminder", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Online Courses",
    icon: <MdCastForEducation className="text-lg" />,
    items: [
      { icon: <MdCastForEducation />, label: "Online Course", href: "/list/onlinecourses/onlinecourse", visible: ["admin", "teacher"] },
      { icon: <MdAccountBalanceWallet />, label: "Offline Payment", href: "/list/onlinecourses/offlinepayment", visible: ["admin", "teacher"] },
      { icon: <MdCategory />, label: "Course Category", href: "/list/onlinecourses/category", visible: ["admin", "teacher"] },
      { icon: <MdQuiz />, label: "Question Bank", href: "/list/onlinecourses/questionbank", visible: ["admin", "teacher"] },
      { icon: <MdAssessment />, label: "Online Course Report", href: "/list/onlinecourses/report", visible: ["admin", "teacher"] },
      { icon: <MdSettings />, label: "Setting", href: "/list/onlinecourses/setting", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Multi Branch",
    icon: <MdDashboard className="text-lg" />,
    items: [
      { icon: <MdDashboard />, label: "Overview", href: "/list/multibranch/overview", visible: ["admin", "teacher"] },
      { icon: <MdInsertChart />, label: "Report", href: "/list/multibranch/branchreport", visible: ["admin", "teacher"] },
      { icon: <MdSettings />, label: "Setting", href: "/list/multibranch/branchsetting", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Gmeet Live Classes",
    icon: <MdLiveTv className="text-lg" />,
    items: [
      { icon: <MdLiveTv />, label: "Live Classes", href: "/list/gmeet/liveclasses", visible: ["admin", "teacher"] },
      { icon: <MdVideoCall />, label: "Live Meeting", href: "/list/gmeet/livemeeting", visible: ["admin", "teacher"] },
      { icon: <MdAssessment />, label: "Live Class Report", href: "/list/gmeet/classreport", visible: ["admin", "teacher"] },
      { icon: <MdAssessment />, label: "Live Meeting Report", href: "/list/gmeet/meetingreport", visible: ["admin", "teacher"] },
      { icon: <MdSettings />, label: "Setting", href: "/list/gmeet/setting", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Zoom Live Classes",
    icon: <MdVideoCall className="text-lg" />,
    items: [
      { icon: <MdVideoCall />, label: "Live Meeting", href: "/list/zoom/livemeeting", visible: ["admin", "teacher"] },
      { icon: <MdLiveTv />, label: "Live Classes", href: "/list/zoom/liveclasses", visible: ["admin", "teacher"] },
      { icon: <MdAssessment />, label: "Live Class Report", href: "/list/zoom/classreport", visible: ["admin", "teacher"] },
      { icon: <MdAssessment />, label: "Live Meeting Report", href: "/list/zoom/meetingreport", visible: ["admin", "teacher"] },
      { icon: <MdSettings />, label: "Setting", href: "/list/zoom/zoomsetting", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Behavioural Records",
    icon: <MdReportProblem className="text-lg" />,
    items: [
      { icon: <MdReportProblem />, label: "Assign Incident", href: "/list/behaviour/assignincident", visible: ["admin", "teacher"] },
      { icon: <MdReportProblem />, label: "Incidents", href: "/list/behaviour/incident", visible: ["admin", "teacher"] },
      { icon: <MdAnalytics />, label: "Reports", href: "/list/behaviour/behaviourreport", visible: ["admin", "teacher"] },
      { icon: <MdSettings />, label: "Setting", href: "/list/behaviour/behavioursetting", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Income",
    icon: <MdAttachMoney className="text-lg" />,
    items: [
      { icon: <MdAttachMoney />, label: "Add Income", href: "/list/income/addincome", visible: ["admin", "teacher"] },
      { icon: <MdSearch />, label: "Search Income", href: "/list/income/searchincome", visible: ["admin", "teacher"] },
      { icon: <MdCategory />, label: "Income Head", href: "/list/income/headincome", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Expenses",
    icon: <MdAttachMoney className="text-lg" />,
    items: [
      { icon: <MdAttachMoney />, label: "Add Expense", href: "/list/expenses/addexpense", visible: ["admin", "teacher"] },
      { icon: <MdSearch />, label: "Search Expense", href: "/list/expenses/searchexpense", visible: ["admin", "teacher"] },
      { icon: <MdCategory />, label: "Expense Head", href: "/list/expenses/headexpense", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "CBSE Examinations",
    icon: <MdSchool className="text-lg" />,
    items: [
      { icon: <MdSchool />, label: "Exam", href: "//list/cbse/exam", visible: ["admin", "teacher"] },
      { icon: <MdEventNote />, label: "Exam Schedule", href: "/list/cbse/examschedule", visible: ["admin", "teacher"] },
      { icon: <MdPrint />, label: "Print Mark sheet", href: "/list/cbse/printmarksheet", visible: ["admin", "teacher"] },
      { icon: <MdGrade />, label: "Exam Grade", href: "/list/cbse/examgrade", visible: ["admin", "teacher"] },
      { icon: <MdSchool />, label: "Assign Observation", href: "/list/cbse/assignobservation", visible: ["admin", "teacher"] },
      { icon: <MdFactCheck />, label: "Observation", href: "/list/cbse/observation", visible: ["admin", "teacher"] },
      { icon: <MdTune />, label: "Observation Parameter", href: "/list/cbse/observationparameter", visible: ["admin", "teacher"] },
      { icon: <MdSchool />, label: "Assessment", href: "/list/cbse/assessment", visible: ["admin", "teacher"] },
      { icon: <MdSchool />, label: "Term", href: "/list/cbse/term", visible: ["admin", "teacher"] },
      { icon: <MdOutlineArticle />, label: "Template", href: "/list/cbse/template", visible: ["admin", "teacher"] },
      { icon: <MdAnalytics />, label: "Reports", href: "/list/cbse/cbsereport", visible: ["admin", "teacher"] },
      { icon: <MdSettings />, label: "Setting", href: "/list/cbse/cbsesetting", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Examinations",
    icon: <MdEventNote className="text-lg" />,
    items: [
      { icon: <MdEventNote />, label: "Exam Group", href: "/list/examination/groupexam", visible: ["admin", "teacher"] },
      { icon: <MdEventNote />, label: "Exam Schedule", href: "/list/examination/examschedule", visible: ["admin", "teacher"] },
      { icon: <MdScore />, label: "Exam Result", href: "/list/examination/examresult", visible: ["admin", "teacher"] },
      { icon: <MdEditDocument />, label: "Design Admit Card", href: "/list/examination/designadmitcard", visible: ["admin", "teacher"] },
      { icon: <MdPrint />, label: "Print Admit Card", href: "/list/examination/printadmitcard", visible: ["admin", "teacher"] },
      { icon: <MdEditDocument />, label: "Design Marksheet", href: "/list/examination/designmarksheet", visible: ["admin", "teacher"] },
      { icon: <MdPrint />, label: "Print Marksheet", href: "/list/examination/printmarksheet", visible: ["admin", "teacher"] },
      { icon: <MdGrade />, label: "Marks Grade", href: "/list/examination/marksgrade", visible: ["admin", "teacher"] },
      { icon: <MdOutlineBarChart />, label: "Marks Division", href: "/list/examination/marksdivision", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Attendance",
    icon: <MdToday className="text-lg" />,
    items: [
      { icon: <MdToday />, label: "Student Attendance", href: "/list/attendance/studentattendance", visible: ["admin", "teacher"] },
      { icon: <MdCheckCircle />, label: "Approve Leave", href: "/list/attendance/approveleave", visible: ["admin", "teacher"] },
      { icon: <MdDateRange />, label: "Attendance by Date", href: "/list/attendance/attendancebydate", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "QR Code Attendance",
    icon: <MdQrCodeScanner className="text-lg" />,
    items: [
      { icon: <MdToday />, label: "Attendance", href: "/list/qrcode/qrattendance", visible: ["admin", "teacher"] },
      { icon: <MdSettings />, label: "Setting", href: "/list/qrcode/qrsetting", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Online Examinatinos",
    icon: <MdQuiz className="text-lg" />,
    items: [
      { icon: <MdQuiz />, label: "Online Exam", href: "/list/onlineexam/onlineexam", visible: ["admin", "teacher"] },
      { icon: <MdLibraryBooks />, label: "Question Bank", href: "/list/onlineexam/questionbank", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Academics",
    icon: <MdSchedule className="text-lg" />,
    items: [
      { icon: <MdSchedule />, label: "Class Timetable", href: "/list/academics/classtimetable", visible: ["admin", "teacher"] },
      { icon: <MdSchedule />, label: "Teacher Timetable", href: "/list/academics/teachertimetable", visible: ["admin", "teacher"] },
      { icon: <MdPersonAdd />, label: "Assign Class Teacher", href: "/list/academics/assignteacher", visible: ["admin", "teacher"] },
      { icon: <MdUpgrade />, label: "Promote Students", href: "/list/academics/promotestudent", visible: ["admin", "teacher"] },
      { icon: <MdGroupWork />, label: "Subject Group", href: "/list/academics/subjectgroup", visible: ["admin", "teacher"] },
      { icon: <MdMenuBook />, label: "Subjects", href: "/list/academics/subjects", visible: ["admin", "teacher"] },
      { icon: <MdClass />, label: "Class", href: "/list/academics/class", visible: ["admin", "teacher"] },
      { icon: <MdViewModule />, label: "Sections", href: "/list/academics/sections", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Annual Calendar",
    icon: <MdCalendarMonth className="text-lg" />,
    items: [
      { icon: <MdCalendarMonth />, label: "Annual Calendar", href: "/list/annualcalendar", visible: ["admin", "teacher"], },
      { icon: <MdCategory />, label: "Holiday Type", href: "/list/annualcalendar/holidaytype", visible: ["admin", "teacher"], },
    ],
  },
  {
    title: "Lesson Plan",
    icon: <MdLibraryBooks className="text-lg" />,
    items: [
      { icon: <MdContentCopy />, label: "Copy Old Lessons", href: "/list/lessonplan/copyoldlesson", visible: ["admin", "teacher"] },
      { icon: <MdLibraryBooks />, label: "Manage Lesson Plan", href: "/list/lessonplan/managelesson", visible: ["admin", "teacher"] },
      { icon: <MdRuleFolder />, label: "Manage Syllabus Status", href: "/list/lessonplan/syllabusstatus", visible: ["admin", "teacher"] },
      { icon: <MdMenuBook />, label: "Lesson", href: "/list/lessonplan/lesson", visible: ["admin", "teacher"] },
      { icon: <MdTopic />, label: "Topic", href: "/list/lessonplan/topic", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Human Resources",
    icon: <MdGroups className="text-lg" />,
    items: [
      { icon: <MdGroups />, label: "Staff Directory", href: "/list/humanresource/staffdirectory", visible: ["admin", "teacher"] },
      { icon: <MdChecklist />, label: "Staff Attendance", href: "/list/humanresource/staffattendance", visible: ["admin", "teacher"] },
      { icon: <MdAttachMoney />, label: "Payroll", href: "/list/humanresource/payroll", visible: ["admin", "teacher"] },
      { icon: <MdCheckCircle />, label: "Approve Leave Request", href: "/list/humanresource/approveleave", visible: ["admin", "teacher"] },
      { icon: <MdEditDocument />, label: "Apply Leave", href: "/list/humanresource/applyleave", visible: ["admin", "teacher"] },
      { icon: <MdLabel />, label: "Leave Type", href: "/list/humanresource/leavetype", visible: ["admin", "teacher"] },
      { icon: <MdOutlineBarChart />, label: "Teachers Rating", href: "/list/humanresource/teachersrating", visible: ["admin", "teacher"] },
      { icon: <MdDashboard />, label: "Department", href: "/list/humanresource/department", visible: ["admin", "teacher"] },
      { icon: <MdPersonAdd />, label: "Designation", href: "/list/humanresource/designation", visible: ["admin", "teacher"] },
      { icon: <MdBlock />, label: "Disabled Staff", href: "/list/humanresource/disablestaff", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Communuication",
    icon: <MdSend className="text-lg" />,
    items: [
      { icon: <MdNotifications />, label: "Notice Board", href: "/list/communication/noticeboard", visible: ["admin", "teacher"] },
      { icon: <MdSend />, label: "Send Email", href: "/list/communication/sendemail", visible: ["admin", "teacher"] },
      { icon: <MdSend />, label: "Send SMS", href: "/list/communication/sendsms", visible: ["admin", "teacher"] },
      { icon: <MdInbox />, label: "Email / SMS Log", href: "/list/communication/emailsmslog", visible: ["admin", "teacher"] },
      { icon: <MdSchedule />, label: "Schedule Email SMS Log", href: "/list/communication/schedulelog", visible: ["admin", "teacher"] },
      { icon: <MdPerson />, label: "Login Credentials Send", href: "/list/communication/sendcredentials", visible: ["admin", "teacher"] },
      { icon: <MdOutlineArticle />, label: "Email Template", href: "/list/communication/emailtemplate", visible: ["admin", "teacher"] },
      { icon: <MdOutlineArticle />, label: "SMS Template", href: "/list/communication/smstemplate", visible: ["admin", "teacher"] },
    ],
  },
  
  {
    title: "Download Center",
    icon: <MdDownload className="text-lg" />,
    items: [
      { icon: <MdCategory />, label: "Content Type", href: "/list/download/contenttype", visible: ["admin", "teacher"] },
      { icon: <MdList />, label: "Content Share List", href: "/list/download/contentsharelist", visible: ["admin", "teacher"] },
      { icon: <MdCloudUpload />, label: "Upload/Share Content", href: "/list/download/uploadsharecontent", visible: ["admin", "teacher"] },
      { icon: <MdVideoLibrary />, label: "Video Tutorial", href: "/list/download/videotutorial", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Homework",
    icon: <MdAssignment className="text-lg" />,
    items: [
      { icon: <MdAddTask />, label: "Add Homework", href: "/list/homework/add-homework", visible: ["admin", "teacher"] },
      { icon: <MdCalendarToday />, label: "Daily Homework", href: "/list/homework/daily-homework", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Library",
    icon: <MdMenuBook className="text-lg" />,
    items: [
      { icon: <MdList />, label: "Book List", href: "/list/library/book-list", visible: ["admin", "teacher"] },
      { icon: <MdSwapHoriz />, label: "Issue - Return", href: "/list/library/issue-return", visible: ["admin", "teacher"] },
      { icon: <MdPersonAdd />, label: "Add Student", href: "/list/library/add-student", visible: ["admin", "teacher"] },
      { icon: <MdPersonAdd />, label: "Add Staff Member", href: "/list/library/add-staff-member", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Inventory",
    icon: <MdInventory className="text-lg" />,
    items: [
      { icon: <MdAssignmentReturn />, label: "Issue Item", href: "/list/inventory/issue-item", visible: ["admin", "teacher"] },
      { icon: <MdAddBox />, label: "Add Item Stock", href: "/list/inventory/add-item-stock", visible: ["admin", "teacher"] },
      { icon: <MdAddBox />, label: "Add Item", href: "/list/inventory/add-item", visible: ["admin", "teacher"] },
      { icon: <MdCategory />, label: "Item Category", href: "/list/inventory/item-category", visible: ["admin", "teacher"] },
      { icon: <MdStore />, label: "Item Store", href: "/list/inventory/item-store", visible: ["admin", "teacher"] },
      { icon: <MdLocalShipping />, label: "Item Supplier", href: "/list/inventory/item-supplier", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Student CV",
    icon: <MdDescription className="text-lg" />,
    items: [
      { icon: <MdBuild />, label: "Build CV", href: "/list/studentcv/build-cv", visible: ["admin", "teacher"] },
      { icon: <MdDownload />, label: "Download CV", href: "/list/studentcv/download-cv", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Transportation",
    icon: <MdCommute className="text-lg" />,
    items: [
      { icon: <MdAttachMoney />, label: "Fees Master", href: "/list/transportation/fees-master", visible: ["admin", "teacher"] },
      { icon: <MdLocationOn />, label: "Pickup Point", href: "/list/transportation/pickup-point", visible: ["admin", "teacher"] },
      { icon: <MdMap />, label: "Routes", href: "/list/transportation/routes", visible: ["admin", "teacher"] },
      { icon: <MdDirectionsBus />, label: "Vehicles", href: "/list/transportation/vehicles", visible: ["admin", "teacher"] },
      { icon: <MdAssignmentInd />, label: "Assign Vehicle", href: "/list/transportation/assign-vehicle", visible: ["admin", "teacher"] },
      { icon: <MdMap />, label: "Route Pickup Point", href: "/list/transportation/route-pickup-point", visible: ["admin", "teacher"] },
      { icon: <MdAttachMoney />, label: "Student Transport Fees", href: "/list/transportation/student-transport-fees", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Hostel",
    icon: <MdHotel className="text-lg" />,
    items: [
      { icon: <MdMeetingRoom />, label: "Hostel Rooms", href: "/list/hostel/rooms", visible: ["admin", "teacher"] },
      { icon: <MdCategory />, label: "Room Type", href: "/list/hostel/room-type", visible: ["admin", "teacher"] },
      { icon: <MdHome />, label: "Hostel", href: "/list/hostel", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Certificate",
    icon: <MdVerifiedUser className="text-lg" />,
    items: [
      { icon: <MdSchool />, label: "Student Certificate", href: "/list/certificate/student-certificate", visible: ["admin", "teacher"] },
      { icon: <MdCreate />, label: "Generate Certificate", href: "/list/certificate/generate-certificate", visible: ["admin", "teacher"] },
      { icon: <MdCreditCard />, label: "Student ID Card", href: "/list/certificate/student-id-card", visible: ["admin", "teacher"] },
      { icon: <MdCreate />, label: "Generate ID Card", href: "/list/certificate/generate-id-card", visible: ["admin", "teacher"] },
      { icon: <MdCreditCard />, label: "Staff ID Card", href: "/list/certificate/staff-id-card", visible: ["admin", "teacher"] },
      { icon: <MdCreate />, label: "Generate Staff ID Card", href: "/list/certificate/generate-staff-id-card", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Front CMS",
    icon: <MdWeb className="text-lg" />,
    items: [
      { icon: <MdEvent />, label: "Event", href: "/list/frontcms/event", visible: ["admin", "teacher"] },
      { icon: <MdPhotoLibrary />, label: "Gallery", href: "/list/frontcms/gallery", visible: ["admin", "teacher"] },
      { icon: <MdAnnouncement />, label: "News", href: "/list/frontcms/news", visible: ["admin", "teacher"] },
      { icon: <MdPermMedia />, label: "Media Manager", href: "/list/frontcms/media-manager", visible: ["admin", "teacher"] },
      { icon: <MdPages />, label: "Pages", href: "/list/frontcms/pages", visible: ["admin", "teacher"] },
      { icon: <MdMenu />, label: "Menus", href: "/list/frontcms/menus", visible: ["admin", "teacher"] },
      { icon: <MdPhotoSizeSelectActual />, label: "Banner Images", href: "/list/frontcms/banner-images", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Alumni",
    icon: <MdPeople className="text-lg" />,
    items: [
      { icon: <MdManageAccounts />, label: "Manage Alumni", href: "/list/alumni/manage-alumni", visible: ["admin", "teacher"] },
      { icon: <MdEvent />, label: "Events", href: "/list/alumni/alumni-events", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Reports",
    icon: <MdAssessment className="text-lg" />,
    items: [
      { icon: <MdPerson />, label: "Student Information", href: "/list/reports/student-information", visible: ["admin", "teacher"] },
      { icon: <MdAttachMoney />, label: "Finance", href: "/list/reports/finance", visible: ["admin", "teacher"] },
      { icon: <MdEventNote />, label: "Attendance", href: "/list/reports/attendance", visible: ["admin", "teacher"] },
      { icon: <MdSchool />, label: "Examinations", href: "/list/reports/examinations", visible: ["admin", "teacher"] },
      { icon: <MdOnlinePrediction />, label: "Online Examinations", href: "/list/reports/online-examinations", visible: ["admin", "teacher"] },
      { icon: <MdMenuBook />, label: "Lesson Plan", href: "/list/reports/lesson-plan", visible: ["admin", "teacher"] },
      { icon: <MdGroup />, label: "Human Resource", href: "/list/reports/human-resource", visible: ["admin"] },
      { icon: <MdAssignment />, label: "Homework", href: "/list/reports/homework", visible: ["admin", "teacher"] },
      { icon: <MdMenuBook />, label: "Library", href: "/list/reports/library", visible: ["admin", "teacher"] },
      { icon: <MdInventory />, label: "Inventory", href: "/list/reports/inventory", visible: ["admin", "teacher"] },
      { icon: <MdCommute />, label: "Transport", href: "/list/reports/transport", visible: ["admin", "teacher"] },
      { icon: <MdHotel />, label: "Hostel", href: "/list/reports/hostel", visible: ["admin", "teacher"] },
      { icon: <MdPeople />, label: "Alumni", href: "/list/reports/alumni", visible: ["admin", "teacher"] },
      { icon: <MdHistory />, label: "User Log", href: "/list/reports/user-log", visible: ["admin", "teacher"] },
      { icon: <MdTrackChanges />, label: "Audit Trail Report", href: "/list/reports/audit-trail", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "System Settings",
    icon: <MdSettings className="text-lg" />,
    items: [
      { icon: <MdSettingsApplications />, label: "General Setting", href: "/list/system-setting/general", visible: ["admin", "teacher"] },
      { icon: <MdCalendarViewMonth />, label: "Session Setting", href: "/list/system-setting/session", visible: ["admin", "teacher"] },
      { icon: <MdNotifications />, label: "Notification Setting", href: "/list/system-setting/notification", visible: ["admin", "teacher"] },
      { icon: <MdSms />, label: "SMS Setting", href: "/list/system-setting/sms", visible: ["admin", "teacher"] },
      { icon: <MdEmail />, label: "Email Setting", href: "/list/system-setting/email", visible: ["admin", "teacher"] },
      { icon: <MdPayment />, label: "Payment Methods", href: "/list/system-setting/payment-methods", visible: ["admin", "teacher"] },
      { icon: <MdPrint />, label: "Thermal Print", href: "/list/system-setting/thermal-print", visible: ["admin", "teacher"] },
      { icon: <MdPrint />, label: "Print Header Footer", href: "/list/system-setting/print-header-footer", visible: ["admin", "teacher"] },
      { icon: <MdWeb />, label: "Front CMS Setting", href: "/list/system-setting/front-cms", visible: ["admin", "teacher"] },
      { icon: <MdSecurity />, label: "Roles Permissions", href: "/list/system-setting/roles-permissions", visible: ["admin", "teacher"] },
      { icon: <MdBackup />, label: "Backup Restore", href: "/list/system-setting/backup-restore", visible: ["admin", "teacher"] },
      { icon: <MdLanguage />, label: "Languages", href: "/list/system-setting/languages", visible: ["admin", "teacher"] },
      { icon: <MdAttachMoney />, label: "Currency", href: "/list/system-setting/currency", visible: ["admin", "teacher"] },
      { icon: <MdPeople />, label: "Users", href: "/list/system-setting/users", visible: ["admin", "teacher"] },
      { icon: <MdExtension />, label: "Addons", href: "/list/system-setting/addons", visible: ["admin", "teacher"] },
      { icon: <MdWidgets />, label: "Modules", href: "/list/system-setting/modules", visible: ["admin", "teacher"] },
      { icon: <MdBuild />, label: "Custom Fields", href: "/list/system-setting/custom-fields", visible: ["admin", "teacher"] },
      { icon: <MdSecurity />, label: "Captcha Setting", href: "/list/system-setting/captcha", visible: ["admin", "teacher"] },
      { icon: <MdViewHeadline />, label: "System Fields", href: "/list/system-setting/system-fields", visible: ["admin", "teacher"] },
      { icon: <MdPerson />, label: "Student Profile Update", href: "/list/system-setting/student-profile-update", visible: ["admin", "teacher"] },
      { icon: <MdPersonAdd />, label: "Online Admission", href: "/list/system-setting/online-admission", visible: ["admin", "teacher"] },
      { icon: <MdFileCopy />, label: "File Types", href: "/list/system-setting/file-types", visible: ["admin", "teacher"] },
      { icon: <MdMenu />, label: "Sidebar Menu", href: "/list/system-setting/sidebar-menu", visible: ["admin", "teacher"] },
      { icon: <MdSystemUpdate />, label: "System Update", href: "/list/system-setting/system-update", visible: ["admin", "teacher"] },
    ],
  },
];

const Menu = () => {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const toggleGroup = (title: string) => {
    setOpenGroup((prev) => (prev === title ? null : title));
  };

  const isVisible = (visible: string | string[]) =>
    Array.isArray(visible) ? visible.includes(role) : visible === role;

  return (
    <div className="mt-2 text-sm">
      {menuItems.map((group) => (
        <div key={group.title} className="mb-2">
          <button
            type="button"
            onClick={() => toggleGroup(group.title)}
            className={`w-full flex items-center justify-between px-2 py-2 rounded-md text-gray-700 font-semibold hover:bg-gray-100 ${
              openGroup === group.title ? "bg-gray-200" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              {group.icon}
              <span>{group.title}</span>
            </div>
            <span>{openGroup === group.title ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
          </button>

          {openGroup === group.title && (
            <div className="mt-2 flex flex-col gap-1">
              {group.items
                .filter((item) => isVisible(item.visible))
                .map((item) => (
                  <Link
                    href={item.href}
                    key={item.label}
                    className="flex items-center gap-2 py-2 px-2 rounded-md text-gray-600 hover:bg-gray-100 text-sm"
                  >
                    <div className="text-lg">{item.icon}</div>
                    <span>{item.label}</span>
                  </Link>
                ))}
            </div>
          )}
        </div>
      ))}

      <button className="bg-lamaYellow text-white w-full py-4 rounded-md hover:bg-lamaPurple mt-24 text-center">
        LOGOUT
      </button>
    </div>
  );
};

export default Menu;