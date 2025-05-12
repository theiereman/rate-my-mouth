export default function Footer() {
  const links = [
    {
      name: "Github",
      href: "https://github.com/theiereman/rate-my-mouth",
    },
    {
      name: "Report a bug",
      href: "https://github.com/theiereman/rate-my-mouth/issues",
    },
    {
      name: "Contribute",
      href: "https://github.com/theiereman/rate-my-mouth/pulls",
    },
    {
      name: "Latest updates",
      href: "https://github.com/theiereman/rate-my-mouth/commits/main/",
    },
  ];

  return (
    <footer className="flex justify-between p-3 text-neutral-500 text-sm">
      <p>© {new Date().getFullYear()} RateMyMouth. All rights reserved.</p>

      <div id="details" className="flex-1 hidden md:flex">
        <nav className={`flex-1 flex justify-center gap-2`}>
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              className="hover:text-primary-600 hover:underline"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <p>
          Made by{" "}
          <a
            href="https://github.com/theiereman"
            target="_blank"
            className="text-primary-600 hover:underline"
          >
            Thomas Eyermann
          </a>
        </p>
      </div>
    </footer>
  );
}
