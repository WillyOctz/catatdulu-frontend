import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import { validateEmail, validatePassword } from "../util/validation";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import ProfileImageSelector from "../components/ProfileImageSelector";
import uploadProfileImage from "../util/uploadProfileImage";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
    setIsLoading(true);

    // clear token before registration
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // validation
    if (!firstName.trim()) {
      toast.error("Please state your first name!");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address!");
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password must contain one uppercase,lowercase,number and special characters with 8 characters max!"
      );
      setIsLoading(false);
      return;
    }

    setError("");

    // submit function (register API)
    try {

      // upload image if present
      if (profileImage) {
        const imageUrl = await uploadProfileImage(profileImage);
        profileImageUrl = imageUrl || "";
      }

      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
        firstName,
        lastName,
        email,
        password,
        profileImage: profileImageUrl
      });

      if (response.status === 201) {
        toast.success("User Account created successfully!");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Something went wrong, Please try again later!");
      //setError(error.message);
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
        <div className="bg-teal-200 opacity-75 backdrop-blur-sm rounded-lg shadow-2xl p-8">
          <h3 className="text-5xl text-black text-center mb-3 font-semibold">
            Create Account
          </h3>
          <p className="text-xl text-slate-700 text-center mb-8">
            Start calculate your earnings
          </p>

          {/* Form fields */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex justify-center mb-7">
              {/* Profile Image */}
              <ProfileImageSelector image={profileImage} setImage={setProfileImage}/>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-full max-w-md">
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  label="First Name"
                  placeholder="Enter First Name"
                  type="text"
                />
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  label="Last Name"
                  placeholder="Enter Last Name"
                  type="text"
                />
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
              className={`bg-cyan-100 w-full py-3 text-xl font-medium rounded-lg hover:bg-cyan-200 flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin w-5 h-5"/>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
            <p className="text-lg text-black text-center mt-1">
              Already have an account?
              <Link to="/login" className="text-blue-500 hover:text-blue-700">
                {" "}
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
