import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Settings() {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl">Settings</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div
          className="space-y-4 sm:space-y-6 animate-fade-in"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <Label htmlFor="notifications" className="flex flex-col space-y-1 cursor-pointer">
              <span className="font-medium text-sm sm:text-base">Email Notifications</span>
              <span className="font-normal text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-md">
                Receive email updates about your progress
              </span>
            </Label>
            <Switch id="notifications" className="ml-0 mt-1 sm:mt-0" />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <Label htmlFor="public-profile" className="flex flex-col space-y-1 cursor-pointer">
              <span className="font-medium text-sm sm:text-base">Public Profile</span>
              <span className="font-normal text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-md">
                Allow others to see your profile
              </span>
            </Label>
            <Switch id="public-profile" className="ml-0 mt-1 sm:mt-0" />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <Label htmlFor="ai-assistant" className="flex flex-col space-y-1 cursor-pointer">
              <span className="font-medium text-sm sm:text-base">AI Learning Assistant</span>
              <span className="font-normal text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-md">
                Enable AI-powered learning recommendations
              </span>
            </Label>
            <Switch id="ai-assistant" className="ml-0 mt-1 sm:mt-0" />
          </div>
        </div>
      </CardContent>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </Card>
  );
}