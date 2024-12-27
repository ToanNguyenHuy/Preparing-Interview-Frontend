import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
// Import the forgot password thunk action when you create it
// import { forgotPassword } from "@/reducers/authentication/authenticationThunk";

export default function ForgetPasswordForm({ onSignIn, ...props }) {
  const dispatch = useDispatch();

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid email format"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    criteriaMode: "all",
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(forgotPasswordSchema),
  });

  const setEmailError = function (emailError) {
    setError("email", { message: emailError });
  };

  const onSubmitForgotPasswordForm = function (formValue) {
    // Implement the forgot password dispatch when the API is ready
    // dispatch(forgotPassword(formValue));
    console.log("Forgot password submitted:", formValue);
  };

  const handleSignIn = function () {
    if (typeof onSignIn === "function") {
      onSignIn();
    } else {
      console.log("ForgetPasswordForm:", "Undefined onSignIn callback");
    }
  };

  return (
    <form
      className={"w-full mt-9 flex-col flex items-center"}
      onSubmit={handleSubmit(onSubmitForgotPasswordForm)}
    >
      <TextField
        {...register("email")}
        id={"email"}
        className={"w-[336px] input-field"}
        label={"Email"}
        error={errors.email !== undefined}
        helperText={errors.email !== undefined ? errors.email.message : ""}
      />
      <Button
        type={"submit"}
        variant={"contained"}
        className={"bg-sky-500 hover:bg-sky-600 w-full mt-4"}
      >
        Reset Password
      </Button>
      <div className={"mt-4"}>
        Remember your password?{" "}
        <Button variant={"text"} onClick={handleSignIn}>
          SIGN IN
        </Button>
      </div>
    </form>
  );
}
