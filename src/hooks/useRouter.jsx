// import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  function navigateTo(path) {
    navigate(path);
  }

  return {
    currentPath: location.pathname,
    navigateTo,
  };
}

//   const [currentPath, setCurrentPath] = useState(window.location.pathname);

//   useEffect(() => {
//     // Función que actualiza el estado con la nueva ruta
//     const handleLocationChange = () => {
//       setCurrentPath(window.location.pathname);
//     };
//     // Escuchar el evento popstate
//     window.addEventListener("popstate", handleLocationChange);
//     // Limpiar el event listener al desmontar
//     return () => window.removeEventListener("popstate", handleLocationChange);
//   }, [currentPath]);

//   function navigateTo(path) {
//     if (!document.startViewTransition) {
//       window.history.pushState({}, "", path);
//       window.scrollTo(0, 0);
//       setCurrentPath(path);
//       return;
//     }
//     document.startViewTransition(() => {
//       window.history.pushState({}, "", path);
//       setCurrentPath(path);
//       window.scrollTo(0, 0);
//     });
//     window.dispatchEvent(new PopStateEvent("popstate"));
//   }

//   return { currentPath, navigateTo };
// }
