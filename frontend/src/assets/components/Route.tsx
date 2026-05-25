import type { ComponentType } from "react";
import { useRouter } from "../../hooks/useRouter";

interface RouteProps {
  path: string;
  component: ComponentType;
}

export function Route({ path, component: Component }: RouteProps) {
  const { currentPath } = useRouter();

  if (currentPath !== path) return null;
  return <Component />;
}
