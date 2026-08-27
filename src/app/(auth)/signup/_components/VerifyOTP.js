import { resendOTPCode, verifyOTP } from "@/api/auth";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { otp: "" } });

  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    // Only allow numbers
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    setValue("otp", newOtp.join(""), { shouldValidate: true });
    // Auto-focus next input field if a digit is entered
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Auto-focus previous input field on Backspace if current field is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const submitOTP = (data) => {
    console.log("OTP Submitted:", data);
    verifyOTP({
      otp: data.otp,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const resendOTP = () => {
    const phoneNumber = localStorage.getItem("phoneNumber");
    console.log(phoneNumber);
    resendOTPCode({ phone_number: phoneNumber })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div className="bg-white shadow-2xl p-8 w-full max-w-sm md:max-w-md rounded-sm">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 text-[#4a4a4a]">
        <h2 className="text-md md:text-lg">Verify OTP</h2>
        <button
          onClick={resendOTP}
          className="px-4 ml-4 py-2 text-md md:text-lg text-primary transition-colors hover:text-white hover:bg-primary rounded-xl"
        >
          Resend code
        </button>
      </div>

      <form onSubmit={handleSubmit(submitOTP)}>
        <input
          type="hidden"
          {...register("otp", {
            required: "OTP is required",
            minLength: { value: 6, message: "Please enter all 6 digits" },
          })}
        />

        {/* OTP Input Boxes */}
        <div className="flex justify-center items-center gap-1.5 md:gap-2 mb-4 md:mb-6">
          {otp.map((data, index) => (
            <React.Fragment key={index}>
              <input
                type="text"
                name="otp"
                maxLength="1"
                className="w-6 h-6 md:w-10 md:h-10 text-center text-sm md:text-md font-medium bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-hover"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(ref) => (inputRefs.current[index] = ref)}
              />
              {/* Dashes between inputs */}
              {index < 5 && (
                <span className="text-[#4a4a4a] text-sm md:text-xl font-light">
                  –
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Display Validation Errors */}
        <div className="h-6 mb-4 text-center">
          {errors.otp && (
            <span className="text-red-500 text-sm">{errors.otp.message}</span>
          )}
        </div>

        {/* Instructions */}
        <p className="text-center text-gray-800 text-sm md:text-lg mb-6 md:mb-8">
          Enter the 6 Digit OTP you received on your phone
        </p>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-primary text-white text-sm md:text-lg font-medium px-8 py-2 rounded-lg shadow-md hover:bg-primary-hover transition-colors"
          >
            Verify OTP
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyOTP;
