const Footer = () => {
  return (
    <>
      <footer className="container mx-auto px-4 py-8 border-t border-slate-200 dark:border-slate-700">
        <div className="text-center text-slate-600 dark:text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Codlab. Built for developers, by
            <a
              className="text-blue-600 hover:underline ml-1 font-semibold"
              href="https://alnickdev.me/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alnick
            </a>
            .
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
