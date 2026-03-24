// import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useCallback } from "react"; // <--- Importante

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  // Usamos useCallback para que la función no cambie en cada render
  const navigateTo = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate],
  );

  return {
    currentPath: location.pathname,
    navigateTo,
  };
}
