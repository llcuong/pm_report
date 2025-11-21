import { BiSortDown, BiSortUp } from "react-icons/bi";
import { CgRemoveR } from "react-icons/cg";
import { SiTicktick } from "react-icons/si";

export const THeadAttributeConstants = [
  {
    id: 1,
    label: "userId",
    attribute: "id",
    requiredSort: true,
    width: 10,
    menu: [
      { menuId: 1, label: "noSort", value: "normal", },
      { menuId: 2, label: "asc", value: "asc", icon: <BiSortUp /> },
      { menuId: 3, label: "desc", value: "desc", icon: <BiSortDown /> },
    ],
  },
  {
    id: 2,
    label: "fullName",
    attribute: "fullName",
    requiredSort: false,
    width: 20,
  },
  {
    id: 3,
    label: "role",
    attribute: "role",
    requiredSort: false,
    width: 10,
  },
  {
    id: 5,
    label: "factory",
    attribute: "factory",
    requiredSort: true,
    width: 20,
    menu: [
      { menuId: 1, label: "noSort", value: "normal" },
      { menuId: 2, label: "asc", value: "asc", icon: <BiSortUp /> },
      { menuId: 3, label: "desc", value: "desc", icon: <BiSortDown /> },
    ],
  },
  {
    id: 6,
    label: "status",
    attribute: "status",
    requiredSort: true,
    width: 5,
    menu: [
      { menuId: 1, label: "noSort", value: "normal" },
      { menuId: 2, label: "active", value: "active", icon: <SiTicktick />, color: 'text-green-600' },
      { menuId: 3, label: "inactive", value: "inactive", icon: <CgRemoveR />, color: 'text-yellow-600' },
    ],
  },
];