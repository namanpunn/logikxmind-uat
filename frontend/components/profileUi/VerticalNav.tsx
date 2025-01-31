// import { motion } from "framer-motion";
// import { LucideIcon } from "lucide-react";
// import * as Icons from "lucide-react";

// type Tab = {
//   id: string;
//   label: string;
//   icon: keyof typeof Icons;
// };

// type VerticalNavProps = {
//   tabs: Tab[];
//   activeTab: string;
//   setActiveTab: (tab: string) => void;
// };

// export default function VerticalNav({
//   tabs,
//   activeTab,
//   setActiveTab,
// }: VerticalNavProps) {
//   return (
//     <nav className="w-64 bg-white dark:bg-gray-800 p-4 shadow-lg">
//       <div className="space-y-4">
//         {tabs.map((tab) => {
//           const IconComponent = Icons[tab.icon] as LucideIcon;
//           return (
//             <motion.button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center w-full p-3 rounded-lg text-left transition-colors ${activeTab === tab.id
//                 ? "bg-gradient-to-r from-emerald-500 to-emerald-700 text-white"
//                 : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                 }`}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <IconComponent className="w-5 h-5 mr-3" />
//               <span>{tab.label}</span>
//               {activeTab === tab.id && (
//                 <motion.div
//                   className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-emerald-600"
//                   layoutId="activeTab"
//                   initial={{ height: 0 }}
//                   animate={{ height: "100%" }}
//                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                 />
//               )}
//             </motion.button>
//           );
//         })}
//       </div>
//     </nav>
//   );
// }

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

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
  return (
    <nav className="w-64 bg-white dark:bg-gray-800 p-4 shadow-lg">
      <div className="space-y-4">
        {tabs.map((tab) => {
          const IconComponent = Icons[tab.icon] as LucideIcon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center w-full p-3 rounded-lg text-left transition-colors relative ${activeTab === tab.id
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
              <span className="relative z-10">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}