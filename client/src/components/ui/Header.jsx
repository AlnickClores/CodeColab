import { Link } from "react-router-dom";
import { Code, Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="px-4 py-6 sticky top-0 shadow-md bg-white dark:bg-slate-900 z-50">
      <div className="flex items-center justify-between max-w-[1024px] mx-auto">
        <div className="flex items-center space-x-2">
          <Code className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            CodeCollab
          </h1>
        </div>
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex space-x-6">
            <Link
              to="#features"
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              Features
            </Link>
            <Link
              to="#about"
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              About
            </Link>
          </nav>
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
