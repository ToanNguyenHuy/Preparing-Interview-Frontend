import { useForm } from "react-hook-form";
import { Button, TextField, useControlled } from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { signIn } from "@/reducers/authentication/authenticationThunk";

export default function SignInForm({ onSignUp, onForgotPassword, ...props }) {
  const dispatch = useDispatch();

  const loginSchema = Yup.object().shape({
    username: Yup.string().required("Email is required"),
    // .matches( /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/, "Username không hợp lệ, vui lòng thử lại username"),
    password: Yup.string().required("Password is required"),
    // .matches( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "Password phải bao gồm kí tự hoa, kí tự thường, và số và tối thiểu 8 kí tự")
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm({
    criteriaMode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const setEmailError = function (emailError) {
    setError("username", { message: emailError });
  };

  const setPasswordError = function (passwordError) {
    setError("password", { message: passwordError });
  };

  const onSubmitSignInForm = function (formValue) {
    dispatch(signIn(formValue));
  };

  const handleSignUp = function () {
    if (typeof onSignUp === "function") {
      onSignUp();
    } else {
      console.log("SignInForm:", "Undefined onSignUp callback");
    }
  };

  const handleForgotPassword = function () {
    if (typeof onForgotPassword === "function") {
      onForgotPassword();
    } else {
      console.log("SignInForm:", "Undefined onForgotPassword callback");
    }
  };

  return (
    <form
      className={"w-full mt-9 flex-col flex items-center"}
      onSubmit={handleSubmit(onSubmitSignInForm)}
    >
      <TextField
        {...register("username")}
        id={"username"}
        className={"w-[336px] input-field"}
        label={"Username or E-mail"}
        error={errors.username !== undefined}
        helperText={
          errors.username !== undefined ? errors.username.message : ""
        }
      />
      <TextField
        type={"password"}
        {...register("password")}
        id={"password"}
        className={"w-[336px] mt-4 input-field"}
        label={"Password"}
        error={errors.password !== undefined}
        helperText={
          errors.password !== undefined ? errors.password.message : ""
        }
      />
      <Button
        type={"submit"}
        variant={"contained"}
        className={"bg-sky-500 hover:bg-sky-600 w-full mt-4"}
      >
        Sign In
      </Button>
      <div className={"w-full flex flex-row justify-between mt-4"}>
        <Button variant={"text"} onClick={handleForgotPassword}>
          Forgot password
        </Button>
        <Button variant={"text"} onClick={handleSignUp}>
          Sign Up
        </Button>
      </div>
    </form>
  );
}
