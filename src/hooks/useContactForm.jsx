import { useState, useEffect } from "react";

export function useContactForm() {
  const [_, setDataForm] = useState({
    name: "",
    email: "",
    message: "",
    title: "",
  });

  const onSubmiteSuccess = () => {
    alert("Message sent successfully!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const FinalData = Object.fromEntries(formData.entries());

    if (!FinalData.name || !FinalData.email || !FinalData.message) {
      alert("Please fill in all required fields.");
    } else {
      onSubmiteSuccess();
    }

    setDataForm({
      name: "",
      email: "",
      title: "",
      message: "",
    });
    console.log(FinalData);
  };

  useEffect(() => {
    document.title = "Contact Us - OnlyGirlsCCS";
  }, []);
  return { handleSubmit };
}
