import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const endpoint = isLogin ? "/login" : "/signup";
    const body = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),

        // 🔥 VERY IMPORTANT: Allows JWT Cookies
        credentials: "include",
      });

      const result = await response.json();
      alert(result.message);

      // If login was successful → redirect
      if (result.message === "Login successful") {
        navigate("/home");
      }

      // After signup → switch to login tab
      if (result.message === "Signup successful") {
        setIsLogin(true);
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">

        <div className="tabs">
          <button
            type="button"
            className={isLogin ? "tab active" : "tab"}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>

          <button
            type="button"
            className={!isLogin ? "tab active" : "tab"}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>

        <form className="form" onSubmit={onSubmitHandler}>
          {!isLogin && (
            <>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </>
          )}

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="submit-btn" type="submit">
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

      </div>
    </div>
  );
}

