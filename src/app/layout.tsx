"use client";
import { useEffect, useState } from "react";
import { initializeSocket } from "@/utils/socket";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [socketConnected, setSocketConnected] = useState(false);
  const socket = initializeSocket();

  useEffect(() => {

      socket.on("connect", () => {
          setSocketConnected(true);
          console.log("Connected to WebSocket Server");
      });

      socket.on("disconnect", () => {
          setSocketConnected(false);
          console.log("Disconnected from WebSocket Server");
      });

      return () => {
          socket.disconnect();
      };
  }, []);

  return (
    <html>
      <body>

        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex flex-col flex-1">
            {/* Navbar */}
            <Navbar />

            {/* Page Content */}
            <main className="p-6 overflow-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
