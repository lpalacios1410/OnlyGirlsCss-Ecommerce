import React from "react";
import { Header } from "../assets/components/Header";

export function NotFoundPage() {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center text-4xl">
        {" "}
        No hemos encontrado la pagina
      </div>
    </>
  );
}
