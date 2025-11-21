import { BiSortDown, BiSortUp } from "react-icons/bi";
import { CgRemoveR } from "react-icons/cg";
import { SiTicktick } from "react-icons/si";

export const THeadAttributeConstants = [
  {
    id: 1,
    label: "User ID",
    attribute: "id",
    requiredSort: true,
    width: 10,
    menu: [
      { menuId: 1, label: "No sort", value: "normal", },
      { menuId: 2, label: "Ascending", value: "asc", icon: <BiSortUp /> },
      { menuId: 3, label: "Descending", value: "desc", icon: <BiSortDown /> },
    ],
  },
  {
    id: 2,
    label: "Full Name",
    attribute: "fullName",
    requiredSort: false,
    width: 20,
  },
  {
    id: 3,
    label: "Role",
    attribute: "role",
    requiredSort: false,
    width: 10,
  },
  {
    id: 4,
    label: "Email",
    attribute: "email",
    requiredSort: false,
    width: 20,
  },
  {
    id: 5,
    label: "Department",
    attribute: "department",
    requiredSort: true,
    width: 20,
    menu: [
      { menuId: 1, label: "No sort", value: "normal" },
      { menuId: 2, label: "Ascending", value: "asc", icon: <BiSortUp /> },
      { menuId: 3, label: "Descending", value: "desc", icon: <BiSortDown /> },
    ],
  },
  {
    id: 6,
    label: "Status",
    attribute: "status",
    requiredSort: true,
    width: 5,
    menu: [
      { menuId: 1, label: "No sort", value: "normal" },
      { menuId: 2, label: "Active", value: "active", icon: <SiTicktick />, color: 'text-green-600' },
      { menuId: 3, label: "Inactive", value: "inactive", icon: <CgRemoveR />, color: 'text-yellow-600' },
    ],
  },
];