import { FaFolderOpen } from "react-icons/fa";

export const menuItems = [
  {
    title: "FRONT OFFICE",
    icon: <FaFolderOpen />,
    items: [
      { label: "Admission Enquiry", href: "/front-office/admission-enquiry" },
      { label: "Visitor Book", href: "/front-office/visitor-book" },
      // … and so on
      { label: "Setup Front Office", href: "/front-office/setup" },
    ],
  },
  {
    title: "STUDENT INFORMATION",
    icon: <FaFolderOpen />,
    items: [
      { label: "Student Details", href: "/student-info/details" },
      // … more sub-items
      { label: "Disable Reason", href: "/student-info/disable-reason" },
    ],
  },
  // Repeat for all parent groups: FEES COLLECTION, ONLINE COURSE, etc...
];
