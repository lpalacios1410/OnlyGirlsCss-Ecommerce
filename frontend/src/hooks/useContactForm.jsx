import { useState } from "react";

export function useContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [_, setDataForm] = useState({
    name: "",
    email: "",
    message: "",
    title: "",
  });

  const onSubmiteSuccess = () => {
    alert("Mensaje enviado con éxito!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const FinalData = Object.fromEntries(formData.entries());

    if (!FinalData.name || !FinalData.email || !FinalData.message) {
      alert("Por favor completa todos los campos requeridos.");
      setIsLoading(false);
      return;
    }

    // Simulate sending
    setTimeout(() => {
      onSubmiteSuccess();
      setIsLoading(false);
      setDataForm({ name: "", email: "", title: "", message: "" });
      console.log(FinalData);
    }, 1000);
  };

  return { handleSubmit, isLoading };
}
