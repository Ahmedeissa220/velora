import { useState } from "react";
import { Link } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setSuccess("Password changed successfully!");
  };

  return (
    <div className="min-h-screen bg-[#141313] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tight">VELORA</h1>

          <p className="text-slate-400 mt-2 text-sm">
            Create your new password
          </p>
        </div>

        {/* Success */}
        {success && (
          <div className="mb-4 rounded-xl border border-green-500 bg-green-500/10 p-3 text-sm text-green-400">
            {success}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-500 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleResetPassword} className="space-y-5">
          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-white text-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-white text-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-white py-3 text-black font-bold transition hover:bg-slate-200"
          >
            Reset Password
          </button>
        </form>

        {/* Back */}
        <div className="mt-6 text-center">
          <Link
            to="/signin"
            className="text-sm text-slate-400 hover:text-white transition"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
