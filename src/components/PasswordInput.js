import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-all duration-300
            focus:border-primary focus:ring-4 focus:ring-primary/20"
        required
        {...props}
      />
      <button
        className="absolute top-1 right-1 p-2"
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff /> : <Eye />}
      </button>
    </div>
  );
};

export default PasswordInput;
