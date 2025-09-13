import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/input";
import { validateEmail } from "../util/validation";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email address!");
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password!");
      setIsLoading(false);
      return;
    }

    setError("");

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        setUser(user);
        toast.success("User successfully logged in!");
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.Message) {
        // backend return a specific error
        toast.error(error.response.data.Message);
      } else if (error.response?.status === 403) {
        // account not activated
        toast.error("Account not activated. please check your email");
      } else if (error.response?.status === 401) {
        // invalid credentials
        toast.error("Invalid email or password");
      } else {
        // network malfunction
        console.error("Something went wrong. Please try again later", error);
        toast.error(
          "Something went wrong. Please try again later",
          error.message
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      {/* Background */}
      <img
        src={assets.login_bg}
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />
      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-teal-200 opacity-75 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-5xl text-black text-center mb-3 font-semibold">
            Login Account
          </h3>
          <p className="text-xl text-slate-700 text-center mb-8">
            Welcome To Catat Dulu!
          </p>

          {/* Form fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-md">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  placeholder="ex. 123@gmail.com"
                  type="text"
                />
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  placeholder="********"
                  type="password"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-lg text-center">{error}</p>
            )}

            <button
              className={`bg-cyan-100 w-full py-3 text-xl font-medium rounded-lg hover:bg-cyan-200 flex items-center justify-center gap-2 ${
                isLoading ? "opacity-60 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin w-5 h-5" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
            <p className="text-lg text-black text-center mt-1">
              Don't have an account?
              <Link to="/signup" className="text-blue-500 hover:text-blue-700">
                {" "}
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
