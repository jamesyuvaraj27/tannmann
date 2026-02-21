import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error);
        return;
      }

      setMessage("User saved successfully!");

      setFormData({
        name: "",
        phone: "",
        email: "",
      });

    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="wrapper">

      <video
        className="bg-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/bgvid.mp4" type="video/mp4" />
      </video>

      <div className="overlay"></div>

      <div className="container">
        <h1 className="title">The Tann Mann Foundation</h1>

        <form onSubmit={handleSubmit} className="form-box">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Enter Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit</button>

          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default App;