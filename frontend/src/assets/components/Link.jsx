import { Link as NavLink } from "react-router";
import { useRouter } from "../../hooks/useRouter.jsx";
export function Link({
  href,
  children,
  className = "",
  activeClassName = "active",
  exact = true,
  ...RestOfProps
}) {
  const { navigateTo, currentPath } = useRouter();

  const handleClick = (e) => {
    e.preventDefault();

    // React Router already updates browser history; avoid pushing twice.
    navigateTo(href);
  };

  const isActive = exact ? currentPath === href : currentPath.startsWith(href);
  const lastClassName =
    `${className} ${isActive ? activeClassName : ""}`.trim();

  return (
    <NavLink
      className={lastClassName}
      href={href}
      {...RestOfProps}
      onClick={handleClick}
    >
      {children}
    </NavLink>
  );
}
