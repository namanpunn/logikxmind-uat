import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { useState, useEffect } from "react";

type Tab = {
  id: string;
  label: string;
  icon: keyof typeof Icons;
};

type VerticalNavProps = {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function VerticalNav({
  tabs,
  activeTab,
  setActiveTab,
}: VerticalNavProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Component icons
  const MenuIcon = Icons["Menu"] as LucideIcon;
  const XIcon = Icons["X"] as LucideIcon;

  // Determine content margin based on screen size
  const getContentMargin = () => {
    if (windowWidth < 768) return "ml-0";
    if (windowWidth >= 1536) return "ml-72"; // 2xl screens
    if (windowWidth >= 1280) return "ml-68"; // xl screens
    if (windowWidth >= 1024) return "ml-64"; // lg screens
    return "ml-56";                          // md screens
  };

  return (
    <div className="flex h-full">
      {/* Mobile menu button - fixed position for better accessibility */}
      <button
        className="md:hidden fixed top-2 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-md shadow-md"
        onClick={toggleNav}
        aria-label={isNavOpen ? "Close menu" : "Open menu"}
      >
        {isNavOpen ? (
          <XIcon className="w-6 h-6 text-emerald-500" />
        ) : (
          <MenuIcon className="w-6 h-6 text-emerald-500" />
        )}
      </button>

      {/* Overlay for mobile - only visible when menu is open */}
      {isNavOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleNav}
          aria-hidden="true"
        />
      )}

      {/* Navigation menu - responsive */}
      <motion.nav
        className={`fixed md:sticky top-0 left-0 h-full z-40 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${
          isMobile ? (isNavOpen ? "w-64" : "w-0") : 
          windowWidth >= 1536 ? "w-72" : 
          windowWidth >= 1280 ? "w-68" :
          windowWidth >= 1024 ? "w-64" : "w-56"
        }`}
        initial={false}
        animate={{ 
          width: isMobile ? (isNavOpen ? "16rem" : "0rem") : undefined,
          opacity: isMobile && !isNavOpen ? 0 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className={`space-y-4 p-4 ${isMobile ? "mt-16" : "mt-6"}`}>
          {/* Logo or brand name */}
          <div className="mb-8 flex items-center">
            <span className="font-bold text-lg text-emerald-600">Logikxmind</span>
          </div>
          
          {/* Nav items container with better overflow handling */}
          <div className="flex flex-col space-y-2 overflow-y-auto">
            {tabs.map((tab) => {
              const IconComponent = Icons[tab.icon] as LucideIcon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    // Close the menu on mobile after selecting a tab
                    if (isMobile) {
                      setIsNavOpen(false);
                    }
                  }}
                  className={`flex items-center w-full p-3 rounded-lg text-left transition-colors relative ${
                    activeTab === tab.id
                      ? "text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Active indicator background */}
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-lg"
                      layoutId="activeTabBackground"
                      initial={{ height: 0 }}
                      animate={{ height: "100%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Active indicator line */}
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-r-full"
                      layoutId="activeTabLine"
                      initial={{ height: 0 }}
                      animate={{ height: "100%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <IconComponent className="w-5 h-5 mr-3 relative z-10" />
                  <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* Main content area - adjust padding based on navigation state */}
      <div className={`flex-1 transition-all duration-300 ${getContentMargin()} ${isMobile ? "pt-16" : ""}`}>
        {/* Your main content goes here */}
      </div>
    </div>
  );
}