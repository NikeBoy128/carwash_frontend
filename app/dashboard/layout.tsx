import React, { ReactNode } from "react";
import Link from "next/link";
import {
  HiOutlineUsers,
  HiOutlineChartBar,
  HiOutlineDocumentText,
  HiOutlineShoppingCart,
  HiOutlineUserGroup,
  HiOutlineTruck,
  HiOutlineSquaresPlus,
} from "react-icons/hi2";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RiDashboard3Line } from "react-icons/ri";
import WelcomeMessage from "@/components/WelcomeMessage"; 
import DemoPage from "../payments/page"; 

interface AdminDashboardProps {
  children: ReactNode;
}

export default function AdminDashboard({ children }: AdminDashboardProps) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 h-screen shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <Link href="#" className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 transition-colors duration-200 hover:text-black">
            <RiDashboard3Line className="w-5 h-5 mr-3" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="#" className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 transition-colors duration-200 hover:text-black">
            <HiOutlineUsers className="w-5 h-5 mr-3" />
            <span className="font-medium">Users</span>
          </Link>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="reports" className="border-none">
              <AccordionTrigger className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-400 transition-colors duration-200 hover:text-black">
                <div className="flex items-center">
                  <HiOutlineChartBar className="w-5 h-5 mr-3" />
                  <span className="font-medium">Reports</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Link href="#" className="flex items-center pl-14 py-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200 hover:text-black">
                  <HiOutlineShoppingCart className="w-4 h-4 mr-2" />
                  Sales
                </Link>
                <Link href="#" className="flex items-center pl-14 py-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200 hover:text-black">
                  <HiOutlineUserGroup className="w-4 h-4 mr-2" />
                  Employees
                </Link>
                <Link href="#" className="flex items-center pl-14 py-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200 hover:text-black">
                  <HiOutlineTruck className="w-4 h-4 mr-2" />
                  Vehicles
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Link href="#" className="flex items-center px-6 py-3 mt-2 text-gray-600 dark:text-gray-400 transition-colors duration-200 hover:text-black">
            <HiOutlineDocumentText className="w-5 h-5 mr-3" />
            <span className="font-medium">Invoices</span>
          </Link>
          <Link href="#" className="flex items-center px-6 py-3 mt-2 text-gray-600 dark:text-gray-400 transition-colors duration-200 hover:text-black">
            <HiOutlineSquaresPlus className="w-5 h-5 mr-3" />
            <span className="font-medium">Concepts</span>
          </Link>
        </nav>
      </aside>
      <div className="flex-1 p-10">
        <WelcomeMessage />
        <DemoPage /> {/* Aquí se renderiza la tabla */}
        {children}
      </div>
    </div>
  );
}
