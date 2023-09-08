import IdeaIcon from "@heroicons/react/24/outline/LightBulbIcon";
import OrganizeIcon from "@heroicons/react/24/outline/InboxIcon";
import ProfileIcon from "@heroicons/react/24/outline/UserCircleIcon";
import CollaborateIcon from "@heroicons/react/24/outline/UserGroupIcon"
import SecurityIcon from "@heroicons/react/24/outline/LockClosedIcon"
import PaintIcon from "@heroicons/react/24/outline/PaintBrushIcon"
import LinkIcon from "@heroicons/react/24/outline/LinkIcon"
import MobileIcon from "@heroicons/react/24/outline/DevicePhoneMobileIcon"
import DownloadIcon from "@heroicons/react/24/outline/ArrowDownTrayIcon"

const features = [
  {
    feature: "Visualize Your Ideas",
    description:
      "Transform your thoughts into stunning PlantUML diagrams, helping you express ideas and concepts effortlessly.",
    className:
      "md:row-span-2 bg-gradient-to-tl from-white/10 via-general via-transparent to-general",
    Icon: <IdeaIcon className="w-5 h-5 text-white" />,
  },
  {
    feature: "Organize with Collections",
    description:
      "Stay organized by grouping diagrams into collections, making it simple to manage and access your work.",
    className: "",
    Icon: <OrganizeIcon className="w-5 h-5 text-white" />,
  },
  {
    feature: "Collaborate Seamlessly",
    description:
      "Share your diagrams or collections with team members, enabling smooth collaboration and idea sharing.",
    className: "md:row-span-2 bg-secondary text-general",
    Icon: <CollaborateIcon className="w-5 h-5 text-general" />,
  },
  {
    feature: "Personalized Profiles",
    description:
      "Customize your user profile, add a personal touch, and make your dashboard truly yours.",
    className: "border-purple-500 bg-purple-900/30",
    Icon: <ProfileIcon className="w-5 h-5 text-white" />,
  },
  {
    feature: "Secure User Authentication",
    description:
      "rest easy knowing that your work is protected with our robust user authentication system.",
    className: "md:col-span-2 bg-green-900/50 border-green-500",
    Icon: <SecurityIcon className="w-5 h-5 text-white" />,
  },
  {
    feature: "Effortless Diagram Management",
    description:
      "Edit, view, or delete diagrams with ease, ensuring your diagrams are always up-to-date.",
    className: "",
    Icon: <PaintIcon className="w-5 h-5 text-white" />,
  },
  {
    feature: "Shareable Links",
    description:
      "Share your diagrams with the world by generating easy-to-share links, facilitating seamless collaboration.",
    className: "bg-white text-general",
    Icon: <LinkIcon className="w-5 h-5 text-general" />,
  },
  {
    feature: "Mobile-Friendly Design",
    description:
      "enjoy a responsive design that adapts to your device, so you can work on your diagrams from anywhere.",
    className: "bg-red-900/50 border-red-500",
    Icon: <MobileIcon className="w-5 h-5 text-white" />,
  },
 
  {
    feature: "Export and Download",
    description:
      "export your PlantUML diagrams in various formats or download them for offline use.",
    className: "bg-fuchsia-900/50 border-fuchsia-500",
    Icon: <DownloadIcon className="w-5 h-5 text-white" />,
  },
];

export default features;
