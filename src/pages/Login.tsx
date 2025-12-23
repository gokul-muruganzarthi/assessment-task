import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";

type FormValues = {
  name: string;
  age: number;
  city: string;
  dob: string;
  address: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

export default function Login() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    age: 0,
    city: "",
    dob: "",
    address: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();

  const handleChange =
    (field: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        field === "age" ? Number(e.target.value) : e.target.value;

      setValues((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: "" })); // clear error on change
    };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    const { name, age, city, dob, address } = values;

    if (!name) newErrors.name = "Name is required";
    else if (name.length > 100)
      newErrors.name = "Max 100 characters allowed";

    if (!age) newErrors.age = "Age is required";
    else if (age < 7) newErrors.age = "Age should be at least 7";

    if (!city) newErrors.city = "City is required";
    else if (city.length > 50)
      newErrors.city = "Max 50 characters allowed";

    if (!dob) newErrors.dob = "Date of Birth is required";
    else {
      const dobDate = new Date(dob);
      const today = new Date();
      if (dobDate > today) newErrors.dob = "DOB cannot be in future";
      else {
        let ageFromDob =
          today.getFullYear() - dobDate.getFullYear();
        const m = today.getMonth() - dobDate.getMonth();
        if (
          m < 0 ||
          (m === 0 && today.getDate() < dobDate.getDate())
        )
          ageFromDob--;
        if (ageFromDob < 7)
          newErrors.dob = "Age from DOB should be at least 7";
      }
    }

    if (!address) newErrors.address = "Address is required";
    else if (address.length > 100)
      newErrors.address = "Max 100 characters allowed";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    localStorage.setItem("user", JSON.stringify(values));
    navigate("/", { replace: true });
  };

  return (
    <div className="login">
      <h2 className="log-head">Login</h2>

      <form onSubmit={handleSubmit} className="login-form" noValidate>
        <InputField
          label="Name"
          value={values.name}
          placeholder="Enter name"
          onChange={handleChange("name")}
          error={errors.name}
        />

        <InputField
          label="Age"
          type="number"
          value={values.age}
          placeholder="Enter age"
          onChange={handleChange("age")}
          error={errors.age}
        />

        <InputField
          label="City"
          value={values.city}
          placeholder="Enter city"
          onChange={handleChange("city")}
          error={errors.city}
        />

        <InputField
          label="Date of Birth"
          type="date"
          value={values.dob}
          onChange={handleChange("dob")}
          error={errors.dob}
        />

        <InputField
          label="Address"
          value={values.address}
          placeholder="Enter address"
          isTextArea
          onChange={handleChange("address")}
          error={errors.address}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
