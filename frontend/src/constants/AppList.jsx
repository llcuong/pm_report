
import PinholeIcon from "@assets/icons/pinhole-icon";
import { LuUser } from "react-icons/lu";
import { MdOutlineHighQuality } from "react-icons/md";
import { SiCountingworkspro } from "react-icons/si";

export const commonAppList = [
  {
    id: 1,
    name: "pinholeReport",
    icon: <PinholeIcon />,
    link: "pinhole-report",
  },
];

export const authAppList = [
  {
    id: 6,
    name: "ipqcData",
    icon: <MdOutlineHighQuality className="text-2xl" />,
    link: "auth-user/ipqc-data",
  },
  {
    id: 7,
    name: "countingData",
    icon: <SiCountingworkspro className="text-2xl" />,
    link: "auth-user/counting-data",
  },
  {
    id: 8,
    name: "userManagement",
    icon: <LuUser className="text-2xl" />,
    link: "auth-user/user-management",
  },
];