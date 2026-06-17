import Unnamed from "../assets/unnamed (11).png";
import { useState } from "react";
import { signInWithRedirect, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    // Email Validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }

    // Password Validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // لو فيه errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccess("");
      return;
    }

    try {
      // Firebase Login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );

      const user = userCredential.user;

      // ✅ Save User in LocalStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
        }),
      );

      setErrors({});
      setSuccess("Successfully signed in!");

      navigate("/");
    } catch (error) {
      console.log(error);

      setErrors({
        firebase: "Invalid email or password",
      });
    }
  };

  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-[#141313] text-white min-h-screen selection:bg-blue-500 selection:text-white relative overflow-hidden">
      <main className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="z-10 w-full max-w-[1100px] flex flex-col md:flex-row overflow-hidden rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
          {/* Left Side */}
          <div className="hidden md:block w-1/2 h-[700px] relative group overflow-hidden">
            <img
              src={Unnamed}
              alt="Premium minimalist tech"
              className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            <div className="absolute bottom-10 left-10 right-10">
              <h2 className="text-4xl font-bold text-white mb-4 tracking-tighter">
                VELORA
              </h2>

              <p className="text-lg font-bold text-slate-400 max-w-[320px]">
                Precision engineering meets effortless sophistication.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-1/2 p-6 md:p-16 flex flex-col justify-center">
            <div className="mb-10">
              <h3 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h3>

              <p className="text-sm font-bold text-slate-400">
                Please enter your details to access your account.
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500 text-green-400 text-sm">
                {success}
              </div>
            )}

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="relative group">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 transition-colors group-focus-within:text-blue-500">
                  EMAIL ADDRESS
                </label>

                <input
                  value={formData.email}
                  onChange={handleEmailChange}
                  type="email"
                  className={`w-full bg-white text-slate-900 font-semibold rounded-xl p-3 border transition focus:outline-none ${errors.email
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="relative group">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 transition-colors group-focus-within:text-blue-500">
                    PASSWORD
                  </label>

                  <Link
                    to="/forgot-password"
                    type="button"
                    className="text-sm font-semibold hover:text-blue-500 transition-colors flex items-center justify-center"
                  >
                    Forget Password?
                  </Link>
                </div>

                <input
                  value={formData.password}
                  onChange={handlePasswordChange}
                  type="password"
                  className={`w-full bg-white text-slate-900 font-semibold rounded-xl p-3 border transition focus:outline-none ${errors.password
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                />

                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold rounded-md transition-all duration-300 w-full shadow-md hover:shadow-lg bg-gradient-to-br from-[#ffffff] to-[#d6d6d6] text-[#080808]"
                >
                  <span>SIGN IN</span>
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="h-[1px] flex-grow bg-slate-700/30"></div>

              <span className="text-[10px] uppercase tracking-widest text-slate-400/50">
                OR CONTINUE WITH
              </span>

              <div className="h-[1px] flex-grow bg-slate-700/30"></div>
            </div>
            <div>
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 border border-slate-600 py-3 rounded-xl hover:bg-white/10 transition"
              >
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>
            </div>
            {/* Sign Up Link */}
            <p className="text-center text-sm text-slate-400 mt-6">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-white font-semibold hover:text-blue-400 transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SignIn;
