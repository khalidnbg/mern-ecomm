import styles from "./auth.module.scss";
import registerImg from "../../assets/register.png";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
  cPassword: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, cPassword } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = () => {};

  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>Register</h2>
          <form onSubmit={registerUser}>
            <input
              type="text"
              placeholder="Name"
              required
              name={name}
              value={name}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              required
              name={email}
              value={email}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name={password}
              value={password}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              name={cPassword}
              value={cPassword}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>

          <span className={styles.register}>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </span>
        </div>
      </Card>

      <div className={styles.img}>
        <img src={registerImg} alt="Register" width={400} />
      </div>
    </section>
  );
};

export default Register;
