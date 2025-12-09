import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";


const SidebarLink = ({ href, icon, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive
          ? "bg-blue-500 text-white"
          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
      }`}
    >
      <Image 
        src={icon} 
        alt={label} 
        width={20} 
        height={20}
        className={isActive ? "brightness-0 invert" : ""}
      />
      <span className="text-sm">{label}</span>
    </Link>
  );
};
export default SidebarLink;