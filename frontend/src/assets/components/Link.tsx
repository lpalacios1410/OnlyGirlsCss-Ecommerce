import { type ReactNode } from "react";
import { Link as NavLink } from "react-router";
import { useRouter } from "../../hooks/useRouter";

interface LinkCustomProps {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
  onClick?: () => void;
}

export function Link({
  href,
  children,
  className = "",
  activeClassName = "active",
  exact = true,
  onClick,
}: LinkCustomProps) {
  const { navigateTo, currentPath } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigateTo(href);
    onClick?.();
  };

  const isActive = exact ? currentPath === href : currentPath.startsWith(href);
  const lastClassName =
    `${className} ${isActive ? activeClassName : ""}`.trim();

  return (
    <NavLink
      className={lastClassName}
      to={href}
      onClick={handleClick}
    >
      {children}
    </NavLink>
  );
}
