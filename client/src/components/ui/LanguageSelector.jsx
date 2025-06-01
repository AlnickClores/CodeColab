import { Code } from "lucide-react";
import { languageIcons } from "../../assets/languages-svg";

const languages = [
  {
    id: "javascript",
    name: "JavaScript",
    icon: languageIcons.javascript,
  },
  {
    id: "python",
    name: "Python",
    icon: languageIcons.python,
  },
  { id: "java", name: "Java", icon: languageIcons.java },
  {
    id: "csharp",
    name: "C#",
    icon: languageIcons.csharp,
  },
];

const LanguageSelector = ({ onLanguageSelect, selectedLanguage }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-md shadow-md border border-slate-200 dark:border-slate-700 mt-6 p-4 transition-colors">
      <div className="flex items-center gap-2 mb-4">
        <Code className="h-5 w-5 text-slate-600 dark:text-slate-400" />
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Select Language
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {languages.map((language) => (
          <button
            key={language.id}
            onClick={() => onLanguageSelect(language.id)}
            className={`flex items-center p-3 rounded-md transition-colors border
              ${
                selectedLanguage === language.id
                  ? "bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
              } cursor-pointer`}
          >
            <span className="flex gap-2 items-center text-slate-900 dark:text-slate-100 font-medium">
              {language.icon}
              {language.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
