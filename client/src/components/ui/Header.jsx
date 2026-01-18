import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="px-4 py-6 sticky top-0 shadow-md bg-white dark:bg-slate-900 z-50">
      <div className="flex items-center justify-between max-w-[1024px] mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            id="Code--Streamline-Solar-Broken"
            height="28"
            width="28"
          >
            <desc>Code Streamline Icon: https://streamlinehq.com</desc>
            <path
              d="m17 7.82959 1.6965 1.52682c1.5425 1.38829 2.3138 2.08249 2.3138 2.97319 0 0.8907 -0.7713 1.5849 -2.3138 2.9732L17 16.8296"
              stroke="#155dfc"
              stroke-linecap="round"
              stroke-width="2"
            ></path>
            <path
              d="m13.9868 5 -0.9934 3.70743M11.8432 13l-1.83 6.8297"
              stroke="#155dfc"
              stroke-linecap="round"
              stroke-width="2"
            ></path>
            <path
              d="M7.00005 7.82959 5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296c0 0.8907 0.77127 1.5849 2.31383 2.9732l1.69647 1.5268"
              stroke="#155dfc"
              stroke-linecap="round"
              stroke-width="2"
            ></path>
          </svg>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            CodeCollab
          </h1>
        </Link>
        <div className="flex items-center space-x-6">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 text-slate-600" />
            ) : (
              <Sun className="h-5 w-5 text-slate-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
