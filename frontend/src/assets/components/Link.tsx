import { type ReactNode } from "react";
import { NavLink } from "react-router";

interface LinkCustomProps {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}

export function Link({
  href,
  children,
  className = "",
  activeClassName = "active",
  exact = true,
  onClick,
  ariaLabel,
}: LinkCustomProps) {
  return (
    <NavLink
      to={href}
      end={exact}
      onClick={onClick}
      aria-label={ariaLabel}
      className={({ isActive }) =>
        `${className} ${isActive ? activeClassName : ""}`.trim()
      }
    >
      {children}
    </NavLink>
  );
}
