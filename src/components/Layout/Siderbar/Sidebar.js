import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SidebarLink from "../../../hooks/usepathActive.jsx";

export default function Sidebar() {
  const menuItems = [
    { href: "/customer", icon: "/icons/customer.png", label: "Customer" },
    { href: "/banner", icon: "/icons/banner.png", label: "Banner" },
    { href: "/new-plan", icon: "/icons/plan.png", label: "New Plan" },
    {
      href: "/special-campaign",
      icon: "/icons/special_campaign.png",
      label: "Special Campaign",
    },
    {
      href: "/our-services",
      icon: "/icons/services.png",
      label: "Our Services",
    },
  ];

  return (
    <div className="w-64 bg-white h-screen p-6 border-r flex flex-col gap-6 border-gray-200 ">
      <h1 className="text-2xl font-bold mb-8">CRM</h1>

      <nav className="flex flex-col gap-3 mt-4">
        {menuItems.map((item) => (
          <SidebarLink
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </nav>
    </div>
  );
}
