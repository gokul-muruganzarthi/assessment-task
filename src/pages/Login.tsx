import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";

export default function Login() {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(0);
  const [city, setCity] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || name.length > 100) return setError("Name is required and maximum length is 100 chars");
    if (age < 7) return setError("Age should be at least 7");
    if (!city || city.length > 50) return setError("City is required and maximum length is 50 chars");
    if (!dob) return setError("Date of Birth is required");

    const dobDate = new Date(dob);
    const today = new Date();
    if (dobDate > today) return setError("DOB cannot be in future");

    let ageFromDob = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) ageFromDob--;
    if (ageFromDob < 7) return setError("Age from DOB should be at least 7");

    if (!address || address.length > 100)
      return setError("Address is required and maximum length is 100 chars");

    const user = { name, age, city, dob, address };
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/", { replace: true });
  };

  return (
    <div className="login">
      <h2 className="log-head">Login</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="login-form">
        <InputField
          label="Name"
          value={name}
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        />

        <InputField
          label="Age"
          type="number"
          value={age}
          placeholder="Enter age"
          onChange={(e) => setAge(Number(e.target.value))}
        />

        <InputField
          label="City"
          value={city}
          placeholder="Enter city"
          onChange={(e) => setCity(e.target.value)}
        />

        <InputField
          label="Date of Birth"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        <InputField
          label="Address"
          value={address}
          placeholder="Enter address"
          isTextArea
          onChange={(e) => setAddress(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
