export const ITEM_PER_PAGE = 10;

export const role = {
  ADMIN: "admin",
  TEACHER: "teacher",
  ACCOUNTANT: "accountant",
  RECEPTIONIST: "receptionist",
  LIBRARIAN: "librarian",
  PARENT: "parent",
  STUDENT: "student",
};

type RouteAccessMap = {
  [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
  // FOR DASHBOARD
  "/admin(.*)": ["admin"],
  "/teacher(.*)": ["teacher"],
  "/accountant(.*)": ["accountant"],
  "/receptionist(.*)": ["receptionist"],
  "/librarian(.*)": ["librarian"],
  "/parent(.*)": ["parent"],
  "/student(.*)": ["student"],

  // FOR FRONT OFFICE
  "/list/front-office/admission": ["admin", "teacher"],
  "/list/front-office/visitor": ["admin", "teacher"],
  "/list/front-office/phone-call-log": ["admin", "teacher"],
  "/list/front-office/postal-dispatch": ["admin", "teacher"],
  "/list/front-office/postal-receive": ["admin", "teacher"],
  "/list/front-office/complaint": ["admin", "teacher"],
  "/list/front-office/setup-front-office": ["admin", "teacher"],
  "/list/front-office/user-general-complaint": ["admin", "teacher"],

  // STUDENT INFO
  "/list/student-information/student-detail": ["admin", "teacher"],
  "/list/student-information/student-admission": ["admin", "teacher"],
  "/list/student-information/online-admission": ["admin", "teacher"],
  "/list/student-information/disable-student": ["admin", "teacher"],
  "/list/student-information/multi-class": ["admin", "teacher"],
  "/list/student-information/bulk-delete": ["admin"],
  "/list/student-information/setup-student-info": ["admin", "teacher"],

  // FEES COLLECTION
    "/list/fees-collection/collect-fees": ["admin", "teacher"],
  "/list/fees-collection/offline-bank-payment": ["admin", "teacher"],
  "/list/fees-collection/search-fees-payment": ["admin", "teacher"],
  "/list/fees-collection/search-fees-due": ["admin", "teacher"],
  "/list/fees-collection/fees-master": ["admin", "teacher"],
  "/list/fees-collection/quick-fees": ["admin", "teacher"],
  "/list/fees-collection/fees-group": ["admin", "teacher"],
  "/list/fees-collection/fees-type": ["admin", "teacher"],
  "/list/fees-collection/fees-discount": ["admin", "teacher"],
  "/list/fees-collection/fees-carry-forward": ["admin", "teacher"],
  "/list/fees-collection/fees-reminder": ["admin", "teacher"],

  // ONLINE COURSE
  "/list/online-courses/online-course": ["admin", "teacher"],
  "/list/online-courses/offline-payment": ["admin", "teacher"],
  "/list/online-courses/category": ["admin", "teacher"],
  "/list/online-courses/question-bank": ["admin", "teacher"],
  "/list/online-courses/report": ["admin", "teacher"],
  "/list/online-courses/setting": ["admin", "teacher"],

  // MULTI BRANCH
  "/list/multi-branch/overview": ["admin", "teacher"],
  "/list/multi-branch/branch-report": ["admin", "teacher"],
  "/list/multi-branch/branch-setting": ["admin", "teacher"],

  // GOOGLE MEET
  "/list/gmeet/live-classes": ["admin", "teacher"],
  "/list/gmeet/live-meeting": ["admin", "teacher"],
  "/list/gmeet/class-report": ["admin", "teacher"],
  "/list/gmeet/meeting-report": ["admin", "teacher"],
  "/list/gmeet/setting": ["admin", "teacher"],

  // ZOOM MEET
  "/list/zoom/live-meeting": ["admin", "teacher"],
  "/list/zoom/live-classes": ["admin", "teacher"],
  "/list/zoom/class-report": ["admin", "teacher"],
  "/list/zoom/meeting-report": ["admin", "teacher"],
  "/list/zoom/zoom-setting": ["admin", "teacher"],

  // BEHAVIOURAL RECORDS
  "/list/behaviour/assign-incident": ["admin", "teacher"],
  "/list/behaviour/incident": ["admin", "teacher"],
  "/list/behaviour/behaviour-report": ["admin", "teacher"],
  "/list/behaviour/behaviour-setting": ["admin", "teacher"],
  
  // INCOME
  "/list/income/add-income": ["admin", "teacher"],
  "/list/income/search-income": ["admin", "teacher"],
  "/list/income/head-income": ["admin", "teacher"],

  // EXPENSES
  "/list/expenses/add-expense": ["admin", "teacher"],
  "/list/expenses/search-expense": ["admin", "teacher"],
  "/list/expenses/head-expense": ["admin", "teacher"],

  // CBSE EXAMS
  "/list/cbse/exam": ["admin", "teacher"],
  "/list/cbse/exam-schedule": ["admin", "teacher"],
  "/list/cbse/print-mark-sheet": ["admin", "teacher"],
  "/list/cbse/exam-grade": ["admin", "teacher"],
  "/list/cbse/assign-observation": ["admin", "teacher"],
  "/list/cbse/observation": ["admin", "teacher"],
  "/list/cbse/observation-parameter": ["admin", "teacher"],
  "/list/cbse/assessment": ["admin", "teacher"],
  "/list/cbse/term": ["admin", "teacher"],
  "/list/cbse/template": ["admin", "teacher"],
  "/list/cbse/cbse-report": ["admin", "teacher"],
  "/list/cbse/cbse-setting": ["admin", "teacher"],

  // EXAMS
  "/list/examination/group-exam": ["admin", "teacher"],
  "/list/examination/exam-schedule": ["admin", "teacher"],
  "/list/examination/exam-result": ["admin", "teacher"],
  "/list/examination/design-admit-card": ["admin", "teacher"],
  "/list/examination/print-admit-card": ["admin", "teacher"],
  "/list/examination/design-mark-sheet": ["admin", "teacher"],
  "/list/examination/print-mark-sheet": ["admin", "teacher"],
  "/list/examination/marks-grade": ["admin", "teacher"],
  "/list/examination/marks-division": ["admin", "teacher"],

  // ATTENDANCE
  "/list/attendance/student-attendance": ["admin", "teacher"],
  "/list/attendance/approve-leave": ["admin", "teacher"],
  "/list/attendance/attendance-by-date": ["admin", "teacher"],

  // QR CODE ATTENDANCE
  "/list/qr-code/qr-attendance": ["admin", "teacher"],
  "/list/qr-code/qr-setting": ["admin", "teacher"],

  // ONLINE EXAMS
  "/list/online-exam/online-exam": ["admin", "teacher"],
  "/list/online-exam/question-bank": ["admin", "teacher"],

  // ACADEMICS
  "/list/academics/class-timetable": ["admin", "teacher"],
  "/list/academics/teacher-timetable": ["admin", "teacher"],
  "/list/academics/assign-teacher": ["admin", "teacher"],
  "/list/academics/promote-student": ["admin", "teacher"],
  "/list/academics/subject-group": ["admin", "teacher"],
  "/list/academics/subjects": ["admin", "teacher"],
  "/list/academics/class": ["admin", "teacher"],
  "/list/academics/sections": ["admin", "teacher"],

  // ANNUAL CALENDAR
  "/list/annual-calendar": ["admin", "teacher"],
  "/list/annual-calendar/holiday-type": ["admin", "teacher"],
  "/list/annual-calendar/holiday-two": ["admin", "teacher"],

  // LESSON PLAN
  "/list/lesson-plan/copy-old-lesson": ["admin", "teacher"],
  "/list/lesson-plan/manage-lesson": ["admin", "teacher"],
  "/list/lesson-plan/syllabus-status": ["admin", "teacher"],
  "/list/lesson-plan/lesson": ["admin", "teacher"],
  "/list/lesson-plan/topic": ["admin", "teacher"],

  // HUMAN RESOURCE
  "/list/human-resource/staff-directory": ["admin", "teacher"],
  "/list/human-resource/staff-attendance": ["admin", "teacher"],
  "/list/human-resource/payroll": ["admin", "teacher"],
  "/list/human-resource/approve-leave": ["admin", "teacher"],
  "/list/human-resource/apply-leave": ["admin", "teacher"],
  "/list/human-resource/leave-type": ["admin", "teacher"],
  "/list/human-resource/teachers-rating": ["admin", "teacher"],
  "/list/human-resource/department": ["admin", "teacher"],
  "/list/human-resource/designation": ["admin", "teacher"],
  "/list/human-resource/disable-staff": ["admin", "teacher"],

  // COMMUNICATION
  "/list/communication/notice-board": ["admin", "teacher"],
  "/list/communication/send-email": ["admin", "teacher"],
  "/list/communication/send-sms": ["admin", "teacher"],
  "/list/communication/email-sms-log": ["admin", "teacher"],
  "/list/communication/schedule-log": ["admin", "teacher"],
  "/list/communication/send-credentials": ["admin", "teacher"],
  "/list/communication/email-template": ["admin", "teacher"],
  "/list/communication/sms-template": ["admin", "teacher"],

  // DOWNLOAD CENTER
  "/list/download/content-type": ["admin", "teacher"],
  "/list/download/content-share-list": ["admin", "teacher"],
  "/list/download/upload-share-content": ["admin", "teacher"],
  "/list/download/video-tutorial": ["admin", "teacher"],

  // HOMEWORK
  "/list/homework/add-homework": ["admin", "teacher"],
  "/list/homework/daily-homework": ["admin", "teacher"],

  // LIBRARY
  "/list/library/book-list": ["admin", "teacher"],
  "/list/library/issue-return": ["admin", "teacher"],
  "/list/library/add-student": ["admin", "teacher"],
  "/list/library/add-staff-member": ["admin", "teacher"],

  // INVENTORY
  "/list/inventory/issue-item": ["admin", "teacher"],
  "/list/inventory/add-item-stock": ["admin", "teacher"],
  "/list/inventory/add-item": ["admin", "teacher"],
  "/list/inventory/item-category": ["admin", "teacher"],
  "/list/inventory/item-store": ["admin", "teacher"],
  "/list/inventory/item-supplier": ["admin", "teacher"],

  // STUDENT CV
  "/list/studentcv/build-cv": ["admin", "teacher"],
  "/list/studentcv/download-cv": ["admin", "teacher"],

  //  TRANSPORTATION
  "/list/transportation/fees-master": ["admin", "teacher"],
  "/list/transportation/pickup-point": ["admin", "teacher"],
  "/list/transportation/routes": ["admin", "teacher"],
  "/list/transportation/vehicles": ["admin", "teacher"],
  "/list/transportation/assign-vehicle": ["admin", "teacher"],
  "/list/transportation/route-pickup-point": ["admin", "teacher"],
  "/list/transportation/student-transport-fees": ["admin", "teacher"],

  // HOSTEL
  "/list/hostel/rooms": ["admin", "teacher"],
  "/list/hostel/room-type": ["admin", "teacher"],
  "/list/hostel": ["admin", "teacher"],

  // CERTIFICATE
  "/list/certificate/student-certificate": ["admin", "teacher"],
  "/list/certificate/generate-certificate": ["admin", "teacher"],
  "/list/certificate/student-id-card": ["admin", "teacher"],
  "/list/certificate/generate-id-card": ["admin", "teacher"],
  "/list/certificate/staff-id-card": ["admin", "teacher"],
  "/list/certificate/generate-staff-id-card": ["admin", "teacher"],

  // FRONT CMS
  "/list/front-cms/event": ["admin", "teacher"],
  "/list/front-cms/gallery": ["admin", "teacher"],
  "/list/front-cms/news": ["admin", "teacher"],
  "/list/front-cms/media-manager": ["admin", "teacher"],
  "/list/front-cms/pages": ["admin", "teacher"],
  "/list/front-cms/menus": ["admin", "teacher"],
  "/list/front-cms/banner-images": ["admin", "teacher"],

  // ALUMNI
  "/list/alumni/manage-alumni": ["admin", "teacher"],
  "/list/alumni/alumni-events": ["admin", "teacher"],

  // REPORTS
  "/list/reports/student-information": ["admin", "teacher"],
  "/list/reports/finance": ["admin", "teacher"],
  "/list/reports/attendance": ["admin", "teacher"],
  "/list/reports/examinations": ["admin", "teacher"],
  "/list/reports/online-examinations": ["admin", "teacher"],
  "/list/reports/lesson-plan": ["admin", "teacher"],
  "/list/reports/human-resource": ["admin", "teacher"],
  "/list/reports/homework": ["admin", "teacher"],
  "/list/reports/library": ["admin", "teacher"],
  "/list/reports/inventory": ["admin", "teacher"],
  "/list/reports/transport": ["admin", "teacher"],
  "/list/reports/hostel": ["admin", "teacher"],
  "/list/reports/alumni": ["admin", "teacher"],
  "/list/reports/user-log": ["admin", "teacher"],
  "/list/reports/audit-trail": ["admin", "teacher"],

  // SYSTEM SETTINGS
  "/list/system-setting/general": ["admin", "teacher"],
  "/list/system-setting/session": ["admin", "teacher"],
  "/list/system-setting/notification": ["admin", "teacher"],
  "/list/system-setting/sms": ["admin", "teacher"],
  "/list/system-setting/email": ["admin", "teacher"],
  "/list/system-setting/payment-methods": ["admin", "teacher"],
  "/list/system-setting/thermal-print": ["admin", "teacher"],
  "/list/system-setting/print-header-footer": ["admin", "teacher"],
  "/list/system-setting/front-cms": ["admin", "teacher"],
  "/list/system-setting/roles-permissions": ["admin", "teacher"],
  "/list/system-setting/backup-restore": ["admin", "teacher"],
  "/list/system-setting/languages": ["admin", "teacher"],
  "/list/system-setting/currency": ["admin", "teacher"],
  "/list/system-setting/users": ["admin", "teacher"],
  "/list/system-setting/addons": ["admin", "teacher"],
  "/list/system-setting/modules": ["admin", "teacher"],
  "/list/system-setting/custom-fields": ["admin", "teacher"],
  "/list/system-setting/captcha": ["admin", "teacher"],
  "/list/system-setting/system-fields": ["admin", "teacher"],
  "/list/system-setting/student-profile-update": ["admin", "teacher"],
  "/list/system-setting/online-admission": ["admin", "teacher"],
  "/list/system-setting/file-types": ["admin", "teacher"],
  "/list/system-setting/sidebar-menu": ["admin", "teacher"],
  "/list/system-setting/system-update": ["admin", "teacher"],
};
