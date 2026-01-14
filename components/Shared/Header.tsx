"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { navigation } from "@/constants/index";
import Button from "@/components/Shared/Button";
import { Menu, LogOut, X } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import ScissorsIcon from "./icons/ScissorsIcon";

const Header = () => {
  const pathname = usePathname();
  const [openNavigation, setOpenNavigation] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const handleClick = () => {
    if (!openNavigation) return;
    setOpenNavigation(false);
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-black/95 backdrop-blur-lg border-b border-gray-800/50 shadow-lg">
      <div className="flex h-20 items-center justify-between px-4 md:px-6 max-w-[1400px] mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white group transition-all duration-300 hover:scale-105"
          prefetch={false}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-[#028391] to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-[#028391]/30 group-hover:shadow-[#028391]/50 transition-all duration-300">
            <ScissorsIcon className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Jenkins Haircut
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navigation
            .filter((item) => {
              if (item.title === "Appointment") return !session?.user?.isAdmin;
              if (item.title === "Bookings")
                return session && !session.user?.isAdmin;
              if (item.title === "Dashboard" || item.title === "Services")
                return session?.user?.isAdmin;
              return true;
            })
            .map((item) => (
              <Link
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  item.url === pathname
                    ? "text-[#028391] bg-[#028391]/10"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.title}
                {item.url === pathname && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-[#028391] to-cyan-600 rounded-full" />
                )}
              </Link>
            ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {session ? (
            <>
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-lg border border-gray-800">
                <div className="w-8 h-8 bg-gradient-to-br from-[#028391] to-cyan-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                  {session.user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-300">
                  {session.user?.name?.split(/\s+/)[0]}
                </span>
              </div>
              <Button
                onClick={handleSignOut}
                className="px-4 py-2 bg-gradient-to-r from-[#028391] to-cyan-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#028391]/30 transition-all duration-300 hover:scale-105"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/sign-up">
                <Button
                  variant="outline"
                  className="px-4 py-2 border-2 border-[#028391] text-[#028391] font-medium rounded-lg hover:bg-[#028391] hover:text-white transition-all duration-300"
                >
                  Create Account
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button className="px-4 py-2 bg-gradient-to-r from-[#028391] to-cyan-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#028391]/30 transition-all duration-300 hover:scale-105">
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="lg:hidden p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200">
              <Menu className="w-6 h-6 text-white" />
              <span className="sr-only">Toggle navigation menu</span>
            </button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="bg-black/95 backdrop-blur-lg border-r border-gray-800 w-[300px] p-0"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="p-6 border-b border-gray-800">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-white"
                  prefetch={false}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#028391] to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-[#028391]/30">
                    <ScissorsIcon className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-bold">Jenkins Haircut</span>
                </Link>
              </div>

              {/* User Info (if logged in) */}
              {session && (
                <div className="p-6 border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#028391] to-cyan-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-[#028391]/30">
                      {session.user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {session.user?.name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Navigation */}
              <nav className="flex-1 p-6 space-y-2">
                {navigation
                  .filter((item) => {
                    if (item.title === "Appointment")
                      return !session?.user?.isAdmin;
                    if (item.title === "Bookings")
                      return session && !session.user?.isAdmin;
                    if (item.title === "Dashboard" || item.title === "Services")
                      return session?.user?.isAdmin;
                    return true;
                  })
                  .map((item) => (
                    <Link
                      key={item.id}
                      href={item.url}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        item.url === pathname
                          ? "bg-[#028391]/10 text-[#028391] border-l-4 border-[#028391]"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                      prefetch={false}
                    >
                      {item.title}
                    </Link>
                  ))}
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="p-6 border-t border-gray-800 space-y-3">
                {session ? (
                  <Button
                    onClick={handleSignOut}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#028391] to-cyan-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#028391]/30 transition-all duration-200"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Link href="/sign-up" className="block">
                      <Button
                        variant="outline"
                        className="w-full py-3 border-2 border-[#028391] text-[#028391] font-medium rounded-lg hover:bg-[#028391] hover:text-white transition-all duration-200"
                      >
                        Create Account
                      </Button>
                    </Link>
                    <Link href="/sign-in" className="block">
                      <Button className="w-full py-3 bg-gradient-to-r from-[#028391] to-cyan-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#028391]/30 transition-all duration-200">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;