import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { ReduxProvider } from "../context/ReduxProvider";
import ScrollToTop from "../components/ScrollToTop";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://portfolio-backend-silk-eight.vercel.app/api";
  try {
    const res = await fetch(`${apiUrl}/profile`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      const profile = data?.data || data;
      return {
        title: `${profile?.name || "Portfolio"} | Full-Stack Developer`,
        description: profile?.shortBio || profile?.aboutMe || "Dynamic professional developer portfolio showcasing full-stack capabilities, premium admin dashboards, and custom backend systems.",
        icons: {
          icon: "/icon.png",
          apple: "/icon.png",
        },
      };
    }
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }

  return {
    title: "Portfolio | Full-Stack Developer",
    description: "Dynamic professional developer portfolio showcasing full-stack capabilities, premium admin dashboards, and custom backend systems.",
    icons: {
      icon: "/icon.png",
      apple: "/icon.png",
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ReduxProvider>
          <ThemeProvider>
            {children}
            <Toaster position="top-right" reverseOrder={false} />
            <ScrollToTop />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
