import React, { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <section className="bg-gray-50 dark:bg-gray-800">
      <nav className="h-20 px-14  bg-slate-100 dark:bg-slate-900 flex justify-between items-center ">
        <div>
          <h1 className="dark:text-gray-100 text-gray-800 font-sans font-bold">
            Vinayak IDE
          </h1>
        </div>
        <ul>
          <li>
            <button
              onClick={() =>
                setTheme((prev) => {
                  if (prev == "dark") return "light";
                  return "dark";
                })
              }
              type="button"
              className="text-white bg-gray-200  dark:bg-gray-700 hover:dark:bg-gray-800 hover:bg-gray-300  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 "
            >
              <FaMoon className="dark:text-blue-200 text-blue-600" />
            </button>
          </li>
        </ul>
      </nav>
      {children}
    </section>
  );
};

export default Layout;
