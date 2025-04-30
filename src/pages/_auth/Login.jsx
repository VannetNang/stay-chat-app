import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginValidation } from "../../config/firebase";
import { GlobalState } from "../../components/context/GlobalContext";

const Login = () => {
  const { loading, setLoading } = useContext(GlobalState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await loginValidation(email, password);
      toast.success("Login account successfully!");
      setEmail("");
      setPassword("");
      navigate("/home");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen md:grid md:grid-cols-2">
      <div>
        <div className="flex-center pt-[3rem]">
          <img
            src={assets.staychat_icon}
            alt="STAYCHAT ICON"
            className="w-[335px] xl:w-[407px] mb-[2rem] lg:mb-[3rem]"
          />
        </div>

        <div className="heading-mobile xl:heading text-center mb-[40px] text-gray">
          Login your account
        </div>

        <form
          className="flex flex-col gap-[2rem] px-[2rem] xl:px-[6rem]"
          onSubmit={submitHandler}
        >
          <div>
            <label
              htmlFor="email"
              className="absolute pl-[0.5em] regular-mobile xl:regular text-black"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[60px] xl:h-[78px] pl-[0.5em] pt-[0.65em] rounded-lg bg-gray flex-center heading-mobile"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="absolute pl-[0.5em] regular-mobile xl:regular text-black"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[60px] xl:h-[78px] pl-[0.5em] pt-[0.65em] rounded-lg bg-gray flex-center heading-mobile"
              required
            />
          </div>

          <div className="flex-center">
            <button
              type="submit"
              className="flex-center gap-2 regular-mobile xl:heading-mobile text-gray bg-purple w-[123px] h-[50px] xl:w-[200px] xl:h-[57px] rounded-lg cursor-pointer hover-light"
            >
              Login
              {loading && (
                <img
                  src={assets.loading_icon}
                  alt="..."
                  width={20}
                  height={20}
                />
              )}
            </button>
          </div>
        </form>

        <div className="mt-[2rem] flex flex-col gap-[38px]">
          <div className="flex-center text-gray gap-[12px] regular-mobile xl:regular">
            <p>Don't have an account?</p>
            <Link to="/sign-up" className="underline hover-text">
              Sign Up
            </Link>
          </div>

          <div className="flex-center text-gray gap-[12px] regular-mobile xl:regular">
            <p>Forgotten password?</p>
            <Link to="/recovery" className="underline hover-text">
              Recovery
            </Link>
          </div>
        </div>
      </div>

      <div>
        <img
          src={assets.staychat_bg}
          alt="STAYCHAT BACKGROUND"
          className="hidden md:block h-screen w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
