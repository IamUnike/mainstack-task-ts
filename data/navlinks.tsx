import { BsHourglass } from "react-icons/bs";
import {
  MdOutlineDelete,
  MdOutlineSubscriptions,
  MdOutlineFilePresent,
  MdOutlineAddAPhoto,
  MdOutlineDashboard,
  MdOutlineModeEdit,
  MdOutlineGroup,
  MdAccessAlarm,
} from "react-icons/md";

const navLinks = [
  {
    name: "Dashboard",
    link: "/",
    icon: <MdOutlineDashboard fontSize="18px" fontWeight={300} />,
  },
  {
    name: "Item 1",
    link: "#",
    icon: <MdOutlineModeEdit fontSize="18px" fontWeight={300} />,
  },
  {
    name: "Item 2",
    link: "#",
    icon: <MdOutlineGroup fontSize="18px" fontWeight={300} />,
  },
  {
    name: "Item 3",
    link: "#",
    icon: <BsHourglass fontSize="18px" fontWeight={300} />,
  },
  {
    name: "OTHERS 1",
    link: "#",
    subLinks: [
      {
        name: "Item 4",
        link: "#",
        icon: <MdOutlineAddAPhoto fontSize="18px" fontWeight={300} />,
      },
      {
        name: "Item 5",
        link: "#",
        icon: <MdOutlineDelete fontSize="18px" fontWeight={300} />,
      },
    ],
  },
  {
    name: "OTHER 2",
    link: "#",
    subLinks: [
      {
        name: "Item 6",
        link: "#",
        icon: <MdOutlineSubscriptions fontSize="18px" fontWeight={300} />,
      },
      {
        name: "Item 7",
        link: "#",
        icon: <MdOutlineFilePresent fontSize="18px" fontWeight={300} />,
      },
      {
        name: "Item 8",
        link: "#",
        icon: <MdAccessAlarm fontSize="18px" fontWeight={300} />,
      },
    ],
  },
];

export { navLinks };
