import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Fixed import
import useSignup from "../hooks/useSignup";

export const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
    yourWork: "", // Added new field
  });
  const { loading, signup } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(inputs); // Pass inputs to signup function
    if (success) navigate("/analytics");
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center p-4 bg-gradient-to-br from-purple-900 via-gray-900 to-black bg-cover bg-center bg-no-repeat text-black"
      style={{
        backgroundImage: `url('https://png.pngtree.com/background/20250102/original/pngtree-cool-purple-and-white-background-vector-picture-image_13216738.jpg')`,
      }}
    >
      <div className="md:w-1/3 border-2 border-[#6F4DF7] rounded-xl p-8 backdrop-blur-lg bg-white/10">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Sign Up <span className="text-purple-500">Postify</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm mb-2">Full Name</label>
            <input
              type="text"
              value={inputs.fullName}
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring focus:ring-[#6F4DF7] outline-none"
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm mb-2">Username</label>
            <input
              type="text"
              value={inputs.username}
              placeholder="johndoe"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring focus:ring-[#6F4DF7] outline-none"
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              value={inputs.password}
              placeholder="Enter Password"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring focus:ring-[#6F4DF7] outline-none"
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm mb-2">Confirm Password</label>
            <input
              type="password"
              value={inputs.confirmPassword}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring focus:ring-[#6F4DF7] outline-none"
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
            />
          </div>

          {/* Your Work */}
          <div>
            <label className="block text-sm mb-2">Your Work</label>
            <input
              type="text"
              value={inputs.yourWork}
              placeholder="e.g., Software Engineer"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring focus:ring-[#6F4DF7] outline-none"
              onChange={(e) => setInputs({ ...inputs, yourWork: e.target.value })}
            />
          </div>

          {/* Gender */}
          <div className="flex gap-6 my-4">
            <div className="flex items-center">
              <input
                type="radio"
                checked={inputs.gender === "male"}
                className="mr-2 text-purple-600"
                onChange={() => setInputs({ ...inputs, gender: "male" })}
              />
              <label className="">Male</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                checked={inputs.gender === "female"}
                className="mr-2 text-purple-600"
                onChange={() => setInputs({ ...inputs, gender: "female" })}
              />
              <label className="">Female</label>
            </div>
          </div>

          {/* Login Link */}
          <div className="flex gap-2 items-center">
            <p className="text-sm">Already have an account?</p>
            <Link className="text-sm text-purple-400 hover:underline" to="/login">
              Login
            </Link>
          </div>

          {/* Submit Button */}
          <button
            className={`w-full py-2 bg-purple-600 rounded-lg transition-all duration-200 ease-in-out ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-purple-700"
            }`}
            disabled={loading}
          >
            {loading ? <span className="loading-spinner"></span> : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};