import { ReactNode } from "react";

import { Poppins } from "next/font/google";

import Navbar from "@/layout/navbar";
import Footer from "@/layout/footer";
import { routes } from "@/data/navigationRoutes";
import { classNames } from "@/utility/classNames";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout(props: MainLayoutProps) {
  return (
    <>
      {/* Mesh gradient background */}
      <div className="mesh-bg">
        <div className="mesh-blob-1" />
        <div className="mesh-blob-2" />
      </div>
      <div className={classNames("min-h-screen", poppins.className)}>
        <Toaster position="top-right" />
        <Navbar routes={routes} />
        <div style={{ zIndex: 0 }}>{props.children}</div>
      </div>
      <Footer />
    </>
  );
}
