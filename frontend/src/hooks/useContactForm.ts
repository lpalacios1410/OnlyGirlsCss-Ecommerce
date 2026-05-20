import { useState } from "react";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  title: string;
}

export function useContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [, setDataForm] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
    title: "",
  });

  const onSubmiteSuccess = () => {
    alert("Mensaje enviado con éxito!");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const FinalData = Object.fromEntries(formData.entries()) as Record<string, string>;

    if (!FinalData.name || !FinalData.email || !FinalData.message) {
      alert("Por favor completa todos los campos requeridos.");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      onSubmiteSuccess();
      setIsLoading(false);
      setDataForm({ name: "", email: "", title: "", message: "" });
      console.log(FinalData);
    }, 1000);
  };

  return { handleSubmit, isLoading };
}
