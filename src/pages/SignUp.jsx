import Unnamed from "../assets/unnamed (11).png";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!formData.email.includes("@")) newErrors.email = "Please enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, { displayName: formData.name });
      localStorage.setItem("user", JSON.stringify({
        uid: userCredential.user.uid,
        name: formData.name,
        email: formData.email,
      }));
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrors({ firebase: "An account with this email already exists." });
      } else {
        setErrors({ firebase: "Something went wrong. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      }));
      navigate("/");
    } catch {
      setErrors({ firebase: "Google sign-up failed. Please try again." });
    }
  };

  const inputClass = (field) =>
    `w-full bg-white text-slate-900 font-semibold rounded-xl p-3 border transition focus:outline-none ${
      errors[field]
        ? "border-red-500 focus:ring-2 focus:ring-red-500"
        : "border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    }`;

  return (
    <div className="bg-[#141313] text-white min-h-screen selection:bg-blue-500 selection:text-white relative overflow-hidden">
      <main className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="z-10 w-full max-w-[1100px] flex flex-col md:flex-row overflow-hidden rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
          {/* Left Side */}
          <div className="hidden md:block w-1/2 relative group overflow-hidden">
            <img
              src={Unnamed}
              alt="Velora premium tech"
              className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <h2 className="text-4xl font-bold text-white mb-4 tracking-tighter">VELORA</h2>
              <p className="text-lg font-bold text-slate-400 max-w-[320px]">
                Join thousands of customers who trust Velora for premium tech.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-1/2 p-6 md:p-16 flex flex-col justify-center">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-white mb-2">Create Account</h3>
              <p className="text-sm font-bold text-slate-400">
                Fill in your details to get started.
              </p>
            </div>

            {errors.firebase && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500 text-red-400 text-sm">
                {errors.firebase}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="relative group">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 transition-colors group-focus-within:text-blue-500">
                  FULL NAME
                </label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={inputClass("name")}
                />
                {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="relative group">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 transition-colors group-focus-within:text-blue-500">
                  EMAIL ADDRESS
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass("email")}
                />
                {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="relative group">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 transition-colors group-focus-within:text-blue-500">
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className={inputClass("password") + " pr-12"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="relative group">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 transition-colors group-focus-within:text-blue-500">
                  CONFIRM PASSWORD
                </label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={inputClass("confirmPassword") + " pr-12"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>}
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold rounded-md transition-all duration-300 w-full shadow-md hover:shadow-lg bg-gradient-to-br from-[#ffffff] to-[#d6d6d6] text-[#080808] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="h-[1px] flex-grow bg-slate-700/30" />
              <span className="text-[10px] uppercase tracking-widest text-slate-400/50">OR CONTINUE WITH</span>
              <div className="h-[1px] flex-grow bg-slate-700/30" />
            </div>

            {/* Google */}
            <button
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center gap-3 border border-slate-600 py-3 rounded-xl hover:bg-white/10 transition"
            >
              <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
              Continue with Google
            </button>

            {/* Sign In Link */}
            <p className="text-center text-sm text-slate-400 mt-6">
              Already have an account?{" "}
              <Link to="/signin" className="text-white font-semibold hover:text-blue-400 transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SignUp;
