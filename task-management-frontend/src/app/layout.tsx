"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { metadata } from "./types/metadata";
import { notification } from 'antd'
import { NotificationType } from "./types/notification";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, message: string, description: string) => {
    api[type]({
      message: message,
      description: description,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (typeof window !== 'undefined') {
      if (!token) { router.push('/pages/login'); }
    }

    const isTokenExpired = () => {
      const now = new Date().getTime();
      const tokenTimestamp = localStorage.getItem('tokenTimestamp');
      const expiresIn = 1000 * 1000;

      if (!tokenTimestamp) {
        return true;
      }

      return now - Number(tokenTimestamp) > expiresIn;
    };

    const checkTokenExpiration = () => {
      if (isTokenExpired()) {
        localStorage.removeItem('userToken');
        localStorage.removeItem('tokenTimestamp');
        openNotificationWithIcon("warning", "Sessão expirada.", "Por favor, faça login novamente.");
        router.push("/pages/login");
        router.push("/pages/login");
        router.push("/pages/login");
      }
    };

    checkTokenExpiration();

  }, [router]);

  return (
    <html lang="en">
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50`}
      >
        <>
          {contextHolder}
          {children}
        </>
      </body>
    </html>
  );
}
