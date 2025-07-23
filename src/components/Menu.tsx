"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Link from "next/link";
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
      { icon: <MdSend />, label: "Accountant Dashboard", href: "/accountant", visible: "accountant" },
      { icon: <MdCall />, label: "Receptionist Dashboard", href: "/receptionist", visible: "receptionist" },
      { icon: <MdSend />, label: "Librarian Dashboard", href: "/librarian", visible: "librarian" },
      { icon: <MdSend />, label: "Parent Dashboard", href: "/parent", visible: "parent" },
      { icon: <MdSend />, label: "Student Dashboard", href: "/student", visible: "student" },
    ],
  },
  {
    title: "Front Office",
    icon: <MdQuestionAnswer className="text-lg" />,
    items: [
      { icon: <MdQuestionAnswer />, label: "Admission Enquiry", href: "/list/front-office/admission", visible: ["admin", "receptionist", "parent", "accountant", "librarian", "teacher", "student" ] },
      { icon: <MdBookOnline />, label: "Visitor Book", href: "/list/front-office/visitor", visible: ["admin", "receptionist", "parent", "accountant", "librarian", "teacher", "student"] },
      { icon: <MdCall />, label: "Phone Call Log", href: "/list/front-office/phone-call-log", visible: ["admin", "receptionist"] },
      { icon: <MdSend />, label: "Postal Dispatch", href: "/list/front-office/postal-dispatch", visible: ["admin", "receptionist"] },
      { icon: <MdInbox />, label: "Postal Receive", href: "/list/front-office/postal-receive", visible: ["admin", "receptionist"] },
      { icon: <MdReportProblem />, label: "Complaint", href: "/list/front-office/complaint", visible: ["admin", "receptionist"] },
      { icon: <MdSettings />, label: "Setup Front Office", href: "/list/front-office/setup-front-office", visible: ["admin", "receptionist"] },
      { icon: <MdSettings />, label: "User General Complaint", href: "/list/front-office/user-general-complaint", visible: ["admin"] },
    ],
  },
    {
    title: "Student Info",
    icon: <MdSchool className="text-lg" />,
    items: [
      { icon: <MdPerson />, label: "Student Details", href: "/list/student-information/student-detail", visible: ["admin", "teacher", "receptionist", "parent", "student"] },
      { icon: <MdPersonAdd />, label: "Student Admission", href: "/list/student-information/student-admission", visible: ["admin", "teacher"] },
      { icon: <MdOnlinePrediction />, label: "Online Admission", href: "/list/student-information/online-admission", visible: ["admin"] },
      { icon: <MdAccessibility />, label: "Disabled Students", href: "/list/student-information/disable-student", visible: ["admin", "teacher"] },
      { icon: <MdClass />, label: "Multi Class Student", href: "/list/student-information/multi-class", visible: ["admin", "teacher"] },
      { icon: <MdDelete />, label: "Bulk Delete", href: "/list/student-information/bulk-delete", visible: ["admin"] },
      { icon: <MdSettings />, label: "Setup Student Info", href: "/list/student-information/setup-student-info", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Fees Collection",
    icon: <MdAttachMoney className="text-lg" />,
    items: [
      { icon: <MdPayment />, label: "Collect Fees", href: "/list/fees-collection/collect-fees", visible: ["admin", "accountant", "parent", "student"] },
      { icon: <MdAccountBalance />, label: "Offline Bank Payment", href: "/list/fees-collection/offline-bank-payment", visible: ["admin"] },
      { icon: <MdSearch />, label: "Search Fees Payment", href: "/list/fees-collection/search-fees-payment", visible: ["admin", "accountant"] },
      { icon: <MdSearch />, label: "Search Due Fees", href: "/list/fees-collection/search-fees-due", visible: ["admin", "accountant"] },
      { icon: <MdAttachMoney />, label: "Fees Master", href: "/list/fees-collection/fees-master", visible: ["admin", "accountant"] },
      { icon: <MdAttachMoney />, label: "Quick Fees", href: "/list/fees-collection/quick-fees", visible: ["admin"] },
      { icon: <MdGroup />, label: "Fees Group", href: "/list/fees-collection/fees-group", visible: ["admin", "accountant"] },
      { icon: <MdLabel />, label: "Fees Type", href: "/list/fees-collection/fees-type", visible: ["admin", "accountant"] },
      { icon: <MdMoneyOff />, label: "Fees Discount", href: "/list/fees-collection/fees-discount", visible: ["admin", "accountant"] },
      { icon: <MdForward />, label: "Fees Carry Forward", href: "/list/fees-collection/fees-carry-forward", visible: ["admin", "accountant"] },
      { icon: <MdNotifications />, label: "Fees Reminder", href: "/list/fees-collection/fees-reminder", visible: ["admin", "accountant"] },
    ],
  },
  {
    title: "Online Courses",
    icon: <MdCastForEducation className="text-lg" />,
    items: [
      { icon: <MdCastForEducation />, label: "Online Course", href: "/list/online-courses/online-course", visible: ["admin", "teacher", "accountant", "parent", "student"] },
      { icon: <MdAccountBalanceWallet />, label: "Offline Payment", href: "/list/online-courses/offline-payment", visible: ["admin", "accountant"] },
      { icon: <MdCategory />, label: "Course Category", href: "/list/online-courses/category", visible: ["admin", "teacher", "receptionist", "librarian"] },
      { icon: <MdQuiz />, label: "Question Bank", href: "/list/online-courses/question-bank", visible: ["admin"] },
      { icon: <MdAssessment />, label: "Online Course Report", href: "/list/online-courses/report", visible: ["admin", "teacher", "accountant", "receptionist", "librarian"] },
      { icon: <MdSettings />, label: "Setting", href: "/list/online-courses/setting", visible: ["admin"] },
    ],
  },
  {
    title: "Multi Branch",
    icon: <MdDashboard className="text-lg" />,
    items: [
      { icon: <MdDashboard />, label: "Overview", href: "/list/multi-branch/overview", visible: ["admin", "teacher"] },
      { icon: <MdInsertChart />, label: "Report", href: "/list/multi-branch/branch-report", visible: ["admin"] },
      { icon: <MdSettings />, label: "Setting", href: "/list/multi-branch/branch-setting", visible: ["admin"] },
    ],
  },
  {
    title: "Gmeet Live Classes",
    icon: <MdLiveTv className="text-lg" />,
    items: [
      { icon: <MdLiveTv />, label: "Live Classes", href: "/list/gmeet/live-classes", visible: ["admin", "teacher", "parent", "student"] },
      { icon: <MdVideoCall />, label: "Live Meeting", href: "/list/gmeet/live-meeting", visible: ["admin", "teacher", "accountant", "receptionist", "librarian"] },
      { icon: <MdAssessment />, label: "Live Class Report", href: "/list/gmeet/class-report", visible: ["admin", "teacher", "accountant", "receptionist", "librarian"] },
      { icon: <MdAssessment />, label: "Live Meeting Report", href: "/list/gmeet/meeting-report", visible: ["admin", "teacher", "accountant", "receptionist", "librarian"] },
      { icon: <MdSettings />, label: "Setting", href: "/list/gmeet/setting", visible: ["admin", "teacher", "accountant", "receptionist", "librarian"] },
    ],
  },
  {
    title: "Zoom Live Classes",
    icon: <MdVideoCall className="text-lg" />,
    items: [
      { icon: <MdLiveTv />, label: "Live Classes", href: "/list/zoom/live-classes", visible: ["admin", "teacher", "parent", "student"] },
      { icon: <MdVideoCall />, label: "Live Meeting", href: "/list/zoom/live-meeting", visible: ["admin", "teacher", "accountant", "receptionist", "librarian"] },
      { icon: <MdAssessment />, label: "Live Class Report", href: "/list/zoom/class-report", visible: ["admin", "teacher", "accountant", "receptionist", "librarian"] },
      { icon: <MdAssessment />, label: "Live Meeting Report", href: "/list/zoom/meeting-report", visible: ["admin", "teacher", "accountant", "receptionist", "librarian"] },
      { icon: <MdSettings />, label: "Setting", href: "/list/zoom/zoom-setting", visible: ["admin", "teacher", "accountant", "receptionist", "librarian"] },
    ],
  },
  {
    title: "Behavioural Records",
    icon: <MdReportProblem className="text-lg" />,
    items: [
      { icon: <MdReportProblem />, label: "Assign Incident", href: "/list/behaviour/assign-incident", visible: ["admin", "teacher", "accountant", "librarian"] },
      { icon: <MdReportProblem />, label: "Incidents", href: "/list/behaviour/incident", visible: ["admin", "teacher", "accountant", "librarian"] },
      { icon: <MdAnalytics />, label: "Reports", href: "/list/behaviour/behaviour-report", visible: ["admin", "teacher", "accountant", "librarian"] },
      { icon: <MdSettings />, label: "Setting", href: "/list/behaviour/behaviour-setting", visible: ["admin", "teacher", "librarian"] },
    ],
  },
  {
    title: "Income",
    icon: <MdAttachMoney className="text-lg" />,
    items: [
      { icon: <MdAttachMoney />, label: "Add Income", href: "/list/income/add-income", visible: ["admin", "accountant"] },
      { icon: <MdSearch />, label: "Search Income", href: "/list/income/search-income", visible: ["admin", "accountant"] },
      { icon: <MdCategory />, label: "Income Head", href: "/list/income/head-income", visible: ["admin", "accountant"] },
    ],
  },
  {
    title: "Expenses",
    icon: <MdAttachMoney className="text-lg" />,
    items: [
      { icon: <MdAttachMoney />, label: "Add Expense", href: "/list/expenses/add-expense", visible: ["admin", "accountant"] },
      { icon: <MdSearch />, label: "Search Expense", href: "/list/expenses/search-expense", visible: ["admin", "accountant"] },
      { icon: <MdCategory />, label: "Expense Head", href: "/list/expenses/head-expense", visible: ["admin", "accountant"] },
    ],
  },
  {
    title: "CBSE Examinations",
    icon: <MdSchool className="text-lg" />,
    items: [
      { icon: <MdSchool />, label: "Exam", href: "/list/cbse/exam", visible: ["admin", "teacher", "accountant", "librarian"] },
      { icon: <MdEventNote />, label: "Exam Schedule", href: "/list/cbse/exam-schedule", visible: ["admin", "teacher", "accountant", "parent", "student"] },
      { icon: <MdPrint />, label: "Print Mark sheet", href: "/list/cbse/print-mark-sheet", visible: ["admin", "teacher"] },
      { icon: <MdGrade />, label: "Exam Grade", href: "/list/cbse/exam-grade", visible: ["admin", "teacher", "parent", "student"] },
      { icon: <MdSchool />, label: "Assign Observation", href: "/list/cbse/assign-observation", visible: ["admin", "teacher"] },
      { icon: <MdFactCheck />, label: "Observation", href: "/list/cbse/observation", visible: ["admin", "teacher"] },
      { icon: <MdTune />, label: "Observation Parameter", href: "/list/cbse/observation-parameter", visible: ["admin", "teacher", "receptionist"] },
      { icon: <MdSchool />, label: "Assessment", href: "/list/cbse/assessment", visible: ["admin", "teacher", "librarian"] },
      { icon: <MdSchool />, label: "Term", href: "/list/cbse/term", visible: ["admin", "teacher", "librarian"] },
      { icon: <MdOutlineArticle />, label: "Template", href: "/list/cbse/template", visible: ["admin", "teacher", "librarian"] },
      { icon: <MdAnalytics />, label: "Reports", href: "/list/cbse/cbse-report", visible: ["admin", "teacher"] },
      { icon: <MdSettings />, label: "Setting", href: "/list/cbse/cbse-setting", visible: ["admin"] },
    ],
  },
  {
    title: "Examinations",
    icon: <MdEventNote className="text-lg" />,
    items: [
      { icon: <MdEventNote />, label: "Exam Group", href: "/list/examination/group-exam", visible: ["admin", "teacher"] },
      { icon: <MdEventNote />, label: "Exam Schedule", href: "/list/examination/exam-schedule", visible: ["admin", "teacher", "parent", "student"] },
      { icon: <MdScore />, label: "Exam Result", href: "/list/examination/exam-result", visible: ["admin", "teacher", "parent", "student"] },
      { icon: <MdEditDocument />, label: "Design Admit Card", href: "/list/examination/design-admit-card", visible: ["admin", "teacher"] },
      { icon: <MdPrint />, label: "Print Admit Card", href: "/list/examination/print-admit-card", visible: ["admin", "teacher"] },
      { icon: <MdEditDocument />, label: "Design Marksheet", href: "/list/examination/design-mark-sheet", visible: ["admin", "teacher"] },
      { icon: <MdPrint />, label: "Print Marksheet", href: "/list/examination/print-mark-sheet", visible: ["admin", "teacher"] },
      { icon: <MdGrade />, label: "Marks Grade", href: "/list/examination/marks-grade", visible: ["admin", "teacher"] },
      { icon: <MdOutlineBarChart />, label: "Marks Division", href: "/list/examination/marks-division", visible: ["admin"] },
    ],
  },
  {
    title: "Attendance",
    icon: <MdToday className="text-lg" />,
    items: [
      { icon: <MdToday />, label: "Student Attendance", href: "/list/attendance/student-attendance", visible: ["admin", "teacher", "parent", "student"] },
      { icon: <MdCheckCircle />, label: "Approve Leave", href: "/list/attendance/approve-leave", visible: ["admin", "teacher"] },
      { icon: <MdDateRange />, label: "Attendance by Date", href: "/list/attendance/attendance-by-date", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "QR Code Attendance",
    icon: <MdQrCodeScanner className="text-lg" />,
    items: [
      { icon: <MdToday />, label: "Attendance", href: "/list/qr-code/qr-attendance", visible: ["admin", "teacher"] },
      { icon: <MdSettings />, label: "Setting", href: "/list/qr-code/qr-setting", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Online Examinatinos",
    icon: <MdQuiz className="text-lg" />,
    items: [
      { icon: <MdQuiz />, label: "Online Exam", href: "/list/online-exam/online-exam", visible: ["admin", "teacher", "parent", "student"] },
      { icon: <MdLibraryBooks />, label: "Question Bank", href: "/list/online-exam/question-bank", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Academics",
    icon: <MdSchedule className="text-lg" />,
    items: [
      { icon: <MdSchedule />, label: "Class Timetable", href: "/list/academics/class-timetable", visible: ["admin", "teacher", "receptionist", "parent", "student"] },
      { icon: <MdSchedule />, label: "Teacher Timetable", href: "/list/academics/teacher-timetable", visible: ["admin", "teacher"] },
      { icon: <MdPersonAdd />, label: "Assign Class Teacher", href: "/list/academics/assign-teacher", visible: ["admin", "teacher", "receptionist"] },
      { icon: <MdUpgrade />, label: "Promote Students", href: "/list/academics/promote-student", visible: ["admin"] },
      { icon: <MdGroupWork />, label: "Subject Group", href: "/list/academics/subject-group", visible: ["admin", "teacher", "receptionist"] },
      { icon: <MdMenuBook />, label: "Subjects", href: "/list/academics/subjects", visible: ["admin", "teacher", "receptionist"] },
      { icon: <MdClass />, label: "Class", href: "/list/academics/class", visible: ["admin", "teacher", "receptionist"] },
      { icon: <MdViewModule />, label: "Sections", href: "/list/academics/sections", visible: ["admin", "teacher", "receptionist"] },
    ],
  },
  {
    title: "Annual Calendar",
    icon: <MdCalendarMonth className="text-lg" />,
    items: [
      { icon: <MdCalendarMonth />, label: "Annual Calendar", href: "/list/annual-calendar", visible: ["admin"], },
      { icon: <MdCategory />, label: "Holiday Type", href: "/list/annual-calendar/holiday-type", visible: ["admin"], },
      { icon: <MdCategory />, label: "Holiday Two", href: "/list/annual-calendar/holiday-two", visible: ["admin"], },

    ],
  },
  {
    title: "Lesson Plan",
    icon: <MdLibraryBooks className="text-lg" />,
    items: [
      { icon: <MdContentCopy />, label: "Copy Old Lessons", href: "/list/lesson-plan/copy-old-lesson", visible: ["admin"] },
      { icon: <MdLibraryBooks />, label: "Manage Lesson Plan", href: "/list/lesson-plan/manage-lesson", visible: ["admin", "teacher"] },
      { icon: <MdRuleFolder />, label: "Manage Syllabus Status", href: "/list/lesson-plan/syllabus-status", visible: ["admin", "teacher", "parent", "student"] },
      { icon: <MdMenuBook />, label: "Lesson", href: "/list/lesson-plan/lesson", visible: ["admin", "teacher", "parent", "student"] },
      { icon: <MdTopic />, label: "Topic", href: "/list/lesson-plan/topic", visible: ["admin", "teacher"] },
    ],
  },
  {
    title: "Human Resources",
    icon: <MdGroups className="text-lg" />,
    items: [
      { icon: <MdGroups />, label: "Staff Directory", href: "/list/human-resource/staff-directory", visible: ["admin", "teacher", "accountant", "receptionist", "librarian"] },
      { icon: <MdChecklist />, label: "Staff Attendance", href: "/list/human-resource/staff-attendance", visible: ["admin", "accountant"] },
      { icon: <MdAttachMoney />, label: "Payroll", href: "/list/human-resource/payroll", visible: ["admin", "accountant"] },
      { icon: <MdCheckCircle />, label: "Approve Leave Request", href: "/list/human-resource/approve-leave", visible: ["admin", "accountant"] },
      { icon: <MdEditDocument />, label: "Apply Leave", href: "/list/human-resource/apply-leave", visible: ["admin", "teacher", "accountant", "parent"] },
      { icon: <MdLabel />, label: "Leave Type", href: "/list/human-resource/leave-type", visible: ["admin", "accountant"] },
      { icon: <MdOutlineBarChart />, label: "Teachers Rating", href: "/list/human-resource/teachers-rating", visible: ["admin", "accountant"] },
      { icon: <MdDashboard />, label: "Department", href: "/list/human-resource/department", visible: ["admin", "accountant"] },
      { icon: <MdPersonAdd />, label: "Designation", href: "/list/human-resource/designation", visible: ["admin", "accountant"] },
      { icon: <MdBlock />, label: "Disabled Staff", href: "/list/human-resource/disable-staff", visible: ["admin", "accountant"] },
    ],
  },
  {
    title: "Communuication",
    icon: <MdSend className="text-lg" />,
    items: [
      { icon: <MdNotifications />, label: "Notice Board", href: "/list/communication/notice-board", visible: ["admin", "teacher", "accountant", "receptionist", "librarian"] },
      { icon: <MdSend />, label: "Send Email", href: "/list/communication/send-email", visible: ["admin", "teacher", "accountant", "receptionist", "librarian"] },
      { icon: <MdSend />, label: "Send SMS", href: "/list/communication/send-sms", visible: ["admin", "teacher", "accountant", "receptionist", "librarian"] },
      { icon: <MdInbox />, label: "Email / SMS Log", href: "/list/communication/email-sms-log", visible: ["admin", "teacher", "accountant", "receptionist", "librarian"] },
      { icon: <MdSchedule />, label: "Schedule Email SMS Log", href: "/list/communication/schedule-log", visible: ["admin"] },
      { icon: <MdPerson />, label: "Login Credentials Send", href: "/list/communication/send-credentials", visible: ["admin"] },
      { icon: <MdOutlineArticle />, label: "Email Template", href: "/list/communication/email-template", visible: ["admin"] },
      { icon: <MdOutlineArticle />, label: "SMS Template", href: "/list/communication/sms-template", visible: ["admin"] },
    ],
  },
  
  {
    title: "Download Center",
    icon: <MdDownload className="text-lg" />,
    items: [
      { icon: <MdCategory />, label: "Content Type", href: "/list/download/content-type", visible: ["admin", "teacher"] },
      { icon: <MdList />, label: "Content Share List", href: "/list/download/content-share-list", visible: ["admin", "teacher", "parent", "student"] },
      { icon: <MdCloudUpload />, label: "Upload/Share Content", href: "/list/download/upload-share-content", visible: ["admin", "teacher"] },
      { icon: <MdVideoLibrary />, label: "Video Tutorial", href: "/list/download/video-tutorial", visible: ["admin", "teacher", "parent", "student"] },
    ],
  },
  {
    title: "Homework",
    icon: <MdAssignment className="text-lg" />,
    items: [
      { icon: <MdAddTask />, label: "Add Homework", href: "/list/homework/add-homework", visible: ["admin", "teacher"] },
      { icon: <MdCalendarToday />, label: "Daily Homework", href: "/list/homework/daily-homework", visible: ["admin", "teacher", "parent", "student"] },
    ],
  },
  {
    title: "Library",
    icon: <MdMenuBook className="text-lg" />,
    items: [
      { icon: <MdList />, label: "Book List", href: "/list/library/book-list", visible: ["admin", "librarian", "parent", "student"] },
      { icon: <MdSwapHoriz />, label: "Issue - Return", href: "/list/library/issue-return", visible: ["admin", "librarian", "parent", "student"] },
      { icon: <MdPersonAdd />, label: "Add Student", href: "/list/library/add-student", visible: ["admin", "librarian"] },
      { icon: <MdPersonAdd />, label: "Add Staff Member", href: "/list/library/add-staff-member", visible: ["admin", "librarian"] },
    ],
  },
  {
    title: "Inventory",
    icon: <MdInventory className="text-lg" />,
    items: [
      { icon: <MdAssignmentReturn />, label: "Issue Item", href: "/list/inventory/issue-item", visible: ["admin", "accountant"] },
      { icon: <MdAddBox />, label: "Add Item Stock", href: "/list/inventory/add-item-stock", visible: ["admin", "accountant"] },
      { icon: <MdAddBox />, label: "Add Item", href: "/list/inventory/add-item", visible: ["admin", "accountant"] },
      { icon: <MdCategory />, label: "Item Category", href: "/list/inventory/item-category", visible: ["admin", "accountant"] },
      { icon: <MdStore />, label: "Item Store", href: "/list/inventory/item-store", visible: ["admin", "accountant"] },
      { icon: <MdLocalShipping />, label: "Item Supplier", href: "/list/inventory/item-supplier", visible: ["admin", "accountant"] },
    ],
  },
  {
    title: "Student CV",
    icon: <MdDescription className="text-lg" />,
    items: [
      { icon: <MdBuild />, label: "Build CV", href: "/list/studentcv/build-cv", visible: ["admin"] },
      { icon: <MdDownload />, label: "Download CV", href: "/list/studentcv/download-cv", visible: ["admin"] },
    ],
  },
  {
    title: "Transportation",
    icon: <MdCommute className="text-lg" />,
    items: [
      { icon: <MdAttachMoney />, label: "Fees Master", href: "/list/transportation/fees-master", visible: ["admin"] },
      { icon: <MdLocationOn />, label: "Pickup Point", href: "/list/transportation/pickup-point", visible: ["admin"] },
      { icon: <MdMap />, label: "Routes", href: "/list/transportation/routes", visible: ["admin", "accountant", "parent", "student"] },
      { icon: <MdDirectionsBus />, label: "Vehicles", href: "/list/transportation/vehicles", visible: ["admin", "accountant"] },
      { icon: <MdAssignmentInd />, label: "Assign Vehicle", href: "/list/transportation/assign-vehicle", visible: ["admin", "accountant"] },
      { icon: <MdMap />, label: "Route Pickup Point", href: "/list/transportation/route-pickup-point", visible: ["admin"] },
      { icon: <MdAttachMoney />, label: "Student Transport Fees", href: "/list/transportation/student-transport-fees", visible: ["admin"] },
    ],
  },
  {
    title: "Hostel",
    icon: <MdHotel className="text-lg" />,
    items: [
      { icon: <MdMeetingRoom />, label: "Hostel Rooms", href: "/list/hostel/rooms", visible: ["admin", "accountant", "parent", "student"] },
      { icon: <MdCategory />, label: "Room Type", href: "/list/hostel/room-type", visible: ["admin", "accountant"] },
      { icon: <MdHome />, label: "Hostel", href: "/list/hostel", visible: ["admin", "accountant"] },
    ],
  },
  {
    title: "Certificate",
    icon: <MdVerifiedUser className="text-lg" />,
    items: [
      { icon: <MdSchool />, label: "Student Certificate", href: "/list/certificate/student-certificate", visible: ["admin"] },
      { icon: <MdCreate />, label: "Generate Certificate", href: "/list/certificate/generate-certificate", visible: ["admin"] },
      { icon: <MdCreditCard />, label: "Student ID Card", href: "/list/certificate/student-id-card", visible: ["admin"] },
      { icon: <MdCreate />, label: "Generate ID Card", href: "/list/certificate/generate-id-card", visible: ["admin"] },
      { icon: <MdCreditCard />, label: "Staff ID Card", href: "/list/certificate/staff-id-card", visible: ["admin", "teacher", "accountant", "receptionist"] },
      { icon: <MdCreate />, label: "Generate Staff ID Card", href: "/list/certificate/generate-staff-id-card", visible: ["admin", "teacher", "accountant", "receptionist"] },
    ],
  },
  {
    title: "Front CMS",
    icon: <MdWeb className="text-lg" />,
    items: [
      { icon: <MdEvent />, label: "Event", href: "/list/front-cms/event", visible: ["admin"] },
      { icon: <MdPhotoLibrary />, label: "Gallery", href: "/list/front-cms/gallery", visible: ["admin"] },
      { icon: <MdAnnouncement />, label: "News", href: "/list/front-cms/news", visible: ["admin"] },
      { icon: <MdPermMedia />, label: "Media Manager", href: "/list/front-cms/media-manager", visible: ["admin"] },
      { icon: <MdPages />, label: "Pages", href: "/list/front-cms/pages", visible: ["admin"] },
      { icon: <MdMenu />, label: "Menus", href: "/list/front-cms/menus", visible: ["admin"] },
      { icon: <MdPhotoSizeSelectActual />, label: "Banner Images", href: "/list/front-cms/banner-images", visible: ["admin"] },
    ],
  },
  {
    title: "Alumni",
    icon: <MdPeople className="text-lg" />,
    items: [
      { icon: <MdManageAccounts />, label: "Manage Alumni", href: "/list/alumni/manage-alumni", visible: ["admin"] },
      { icon: <MdEvent />, label: "Events", href: "/list/alumni/alumni-events", visible: ["admin"] },
    ],
  },
  {
    title: "Reports",
    icon: <MdAssessment className="text-lg" />,
    items: [
      { icon: <MdPerson />, label: "Student Information", href: "/list/reports/student-information", visible: ["admin", "teacher"] },
      { icon: <MdAttachMoney />, label: "Finance", href: "/list/reports/finance", visible: ["admin", "accountant"] },
      { icon: <MdEventNote />, label: "Attendance", href: "/list/reports/attendance", visible: ["admin", "teacher", "accountant"] },
      { icon: <MdSchool />, label: "Examinations", href: "/list/reports/examinations", visible: ["admin", "teacher"] },
      { icon: <MdOnlinePrediction />, label: "Online Examinations", href: "/list/reports/online-examinations", visible: ["admin", "teacher"] },
      { icon: <MdMenuBook />, label: "Lesson Plan", href: "/list/reports/lesson-plan", visible: ["admin", "teacher"] },
      { icon: <MdGroup />, label: "Human Resource", href: "/list/reports/human-resource", visible: ["admin", "accountant"] },
      { icon: <MdAssignment />, label: "Homework", href: "/list/reports/homework", visible: ["admin", "teacher"] },
      { icon: <MdMenuBook />, label: "Library", href: "/list/reports/library", visible: ["admin", "librarian"] },
      { icon: <MdInventory />, label: "Inventory", href: "/list/reports/inventory", visible: ["admin", "accountant"] },
      { icon: <MdCommute />, label: "Transport", href: "/list/reports/transport", visible: ["admin", "teacher", "accountant"] },
      { icon: <MdHotel />, label: "Hostel", href: "/list/reports/hostel", visible: ["admin", "teacher", "accountant"] },
      { icon: <MdPeople />, label: "Alumni", href: "/list/reports/alumni", visible: ["admin", "teacher", "accountant"] },
      { icon: <MdHistory />, label: "User Log", href: "/list/reports/user-log", visible: ["admin"] },
      { icon: <MdTrackChanges />, label: "Audit Trail Report", href: "/list/reports/audit-trail", visible: ["admin"] },
    ],
  },
  {
    title: "System Settings",
    icon: <MdSettings className="text-lg" />,
    items: [
      { icon: <MdSettingsApplications />, label: "General Setting", href: "/list/system-setting/general", visible: ["admin"] },
      { icon: <MdCalendarViewMonth />, label: "Session Setting", href: "/list/system-setting/session", visible: ["admin"] },
      { icon: <MdNotifications />, label: "Notification Setting", href: "/list/system-setting/notification", visible: ["admin"] },
      { icon: <MdSms />, label: "SMS Setting", href: "/list/system-setting/sms", visible: ["admin"] },
      { icon: <MdEmail />, label: "Email Setting", href: "/list/system-setting/email", visible: ["admin"] },
      { icon: <MdPayment />, label: "Payment Methods", href: "/list/system-setting/payment-methods", visible: ["admin"] },
      { icon: <MdPrint />, label: "Thermal Print", href: "/list/system-setting/thermal-print", visible: ["admin"] },
      { icon: <MdPrint />, label: "Print Header Footer", href: "/list/system-setting/print-header-footer", visible: ["admin", "accountant"] },
      { icon: <MdWeb />, label: "Front CMS Setting", href: "/list/system-setting/front-cms", visible: ["admin"] },
      { icon: <MdSecurity />, label: "Roles Permissions", href: "/list/system-setting/roles-permissions", visible: ["admin"] },
      { icon: <MdBackup />, label: "Backup Restore", href: "/list/system-setting/backup-restore", visible: ["admin"] },
      { icon: <MdLanguage />, label: "Languages", href: "/list/system-setting/languages", visible: ["admin"] },
      { icon: <MdAttachMoney />, label: "Currency", href: "/list/system-setting/currency", visible: ["admin"] },
      { icon: <MdPeople />, label: "Users", href: "/list/system-setting/users", visible: ["admin"] },
      { icon: <MdExtension />, label: "Addons", href: "/list/system-setting/addons", visible: ["admin"] },
      { icon: <MdWidgets />, label: "Modules", href: "/list/system-setting/modules", visible: ["admin"] },
      { icon: <MdBuild />, label: "Custom Fields", href: "/list/system-setting/custom-fields", visible: ["admin"] },
      { icon: <MdSecurity />, label: "Captcha Setting", href: "/list/system-setting/captcha", visible: ["admin"] },
      { icon: <MdViewHeadline />, label: "System Fields", href: "/list/system-setting/system-fields", visible: ["admin"] },
      { icon: <MdPerson />, label: "Student Profile Update", href: "/list/system-setting/student-profile-update", visible: ["admin"] },
      { icon: <MdPersonAdd />, label: "Online Admission", href: "/list/system-setting/online-admission", visible: ["admin"] },
      { icon: <MdFileCopy />, label: "File Types", href: "/list/system-setting/file-types", visible: ["admin"] },
      { icon: <MdMenu />, label: "Sidebar Menu", href: "/list/system-setting/sidebar-menu", visible: ["admin"] },
      { icon: <MdSystemUpdate />, label: "System Update", href: "/list/system-setting/system-update", visible: ["admin"] },
    ],
  },
];

  const Menu = () => {
    const [openGroup, setOpenGroup] = useState<string | null>(null);
    const { user } = useUser(); 

    if (!user) {
      return <div className="text-center justify-center items-center text-gray-500 p-4">Loading menu...</div>;
    }

    const userRole = user.publicMetadata?.role as string;

    const toggleGroup = (title: string) => {
      setOpenGroup((prev) => (prev === title ? null : title));
    };

    const isVisible = (visible: string | string[]) =>
      Array.isArray(visible) ? visible.includes(userRole) : visible === userRole;

    return (
      <div className="mt-2 text-sm">
        {menuItems.map((group) => {
          const visibleItems = group.items.filter((item) => isVisible(item.visible));
          if (visibleItems.length === 0) return null;

          return (
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
                  {visibleItems.map((item) => (
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
          );
        })}
      </div>
    );
  };

export default Menu;
