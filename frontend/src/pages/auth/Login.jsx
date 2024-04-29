import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils/index";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, login } from "../../redux/features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required!");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };

    await dispatch(login(userData));
  };

  // if login is successful redirect to home page
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/");
    }

    dispatch(RESET_AUTH());
  }, [isSuccess, isLoggedIn, dispatch, navigate]);

  return (
    <>
      {isLoading && <Loader />}

      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width={400} />
        </div>

        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
            </form>

            <span className={styles.register}>
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
