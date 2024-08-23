"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { navigation } from "@/constants/index";
import Button from "@/components/Shared/Button";
import { Menu, LogOut } from "lucide-react";
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

    // enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <header className="fixed top-0 left-0 z-50 bg-[#222324] flex h-20 w-full items-center justify-between px-4 md:px-6">
      <Link
        href="/"
        className="mr-6 flex items-center text-white"
        prefetch={false}
      >
        <ScissorsIcon className="w-7 h-7" />
        <span className="p-medium-20 lg:p-medium-24 text-white">
          Jenkins Haircut
        </span>
      </Link>
      <nav
        className={`${
          openNavigation ? "flex" : "hidden"
        } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
      >
        <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
          {navigation
            .filter((item) => {
              if (item.title === "Appointment") return !session?.user?.isAdmin; // Always show Appointment
              if (item.title === "Bookings")
                return session && !session.user?.isAdmin; // Show Bookings only for authenticated non-admin users
              if (item.title === "Dashboard" || item.title === "Services")
                return session?.user?.isAdmin; // Show Dashboard only for admin users
              return true; // Show all other items by default
            })
            .map((item) => (
              <Link
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code mx-0 p-regular-14 opacity-80 text-white text-n-1 transition-colors hover:text-[#028391] px-6 py-6 md:py-8  ${
                  item.url === pathname && "z-2 lg:text-[#028391]"
                } lg:leading-5 xl:px-6`}
              >
                {item.title}
              </Link>
            ))}
        </div>
      </nav>
      <div className="flex items-center gap-2">
        {session ? (
          <div className="flex gap-4 items-center">
            <span className="hidden lg:block text-[#028391] p-medium-16">
              Welcome {session.user?.name?.split(/\s+/)[0]}
            </span>
            <Button
              onClick={handleSignOut}
              className="hidden sm:inline-flex text-white bg-[#028391] hover:bg-white hover:text-[#028391]"
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <>
            <Link href="/sign-up">
              <Button
                variant="outline"
                className="hidden sm:inline-flex text-[#028391]"
              >
                Create Account
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button className="hidden sm:inline-flex text-white bg-[#028391] hover:bg-white hover:text-[#028391]">
                Sign In
              </Button>
            </Link>
          </>
        )}
        <Sheet>
          <SheetTrigger asChild>
            <div className="lg:hidden p-1 bg-white rounded">
              <Menu />
              <span className="sr-only">Toggle navigation menu</span>
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#222324]">
            <div className="grid gap-4 p-4">
              <Link
                href="/"
                className="flex items-center text-white"
                prefetch={false}
              >
                <ScissorsIcon className="w-7 h-7" />
                <span className="p-medium-20 lg:p-medium-24 text-white">
                  Jenkins Haircut
                </span>
              </Link>

              {session && (
                <span className="text-[#028391] p-medium-18">
                  Welcome {session.user?.name?.split(/\s+/)[0]}
                </span>
              )}
              <nav className="grid gap-2">
                {navigation
                  .filter((item) => {
                    if (item.title === "Appointment")
                      return !session?.user?.isAdmin; // Always show Appointment
                    if (item.title === "Bookings")
                      return session && !session.user?.isAdmin; // Show Bookings only for authenticated non-admin users
                    if (item.title === "Dashboard" || item.title === "Services")
                      return session?.user?.isAdmin; // Show Dashboard only for admin users
                    return true; // Show all other items by default
                  })
                  .map((item) => (
                    <Link
                      key={item.id}
                      href={item.url}
                      className={`flex items-center gap-2 text-sm text-white font-medium transition-colors ${
                        item.url === pathname &&
                        "z-2 text-[#028391] active:text-[#028391] focus:text-[#028391]"
                      } `}
                      prefetch={false}
                    >
                      {item.title}
                    </Link>
                  ))}
                {session && (
                  <Button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 mt-4 text-white bg-[#028391] w-full hover:bg-white hover:text-[#222324]"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </Button>
                )}
              </nav>
              {!session && (
                <div className="flex flex-col gap-2">
                  <Link href="/sign-up">
                    <Button
                      variant="outline"
                      className="inline-flex text-[#222324] hover:bg-[#028391] hover:text-white w-full"
                    >
                      Create Account
                    </Button>
                  </Link>
                  <Link href="/sign-in">
                    <Button className="flex items-center gap-3 text-white bg-[#028391] w-full hover:bg-white hover:text-[#222324]">
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
