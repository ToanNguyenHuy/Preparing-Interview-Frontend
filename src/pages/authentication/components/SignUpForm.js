import { useForm } from "react-hook-form";
import { Button, TextField, useControlled } from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { signUp } from "@/reducers/authentication/authenticationThunk";

export default function SignUpForm({ onSignIn, ...props }) {
  const dispatch = useDispatch();

  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username bắt buộc")
      .matches(
        /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){7,18}[a-zA-Z0-9]$/,
        "User không hợp lệ, Username bao gồm 7 đến 18 kí tự, số, chữ cái hoa, chữ cái thường"
      ),
    password: Yup.string()
      .required("Password bắt buộc")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Password phải bao gồm kí tự hoa, kí tự thường, và số và tối thiểu 8 kí tự"
      ),
    confirmPassword: Yup.string()
      .required("Password xác nhận bắt buộc")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Password xác nhận phải bao gồm kí tự hoa, kí tự thường, và số và tối thiểu 8 kí tự"
      )
      .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không đúng"),
    email: Yup.string()
      .required("Email bắt buộc")
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email không hợp lệ, vui lòng thử lại email"
      ),
  });

  const handleSignIn = function () {
    if (typeof onSignIn === "function") {
      onSignIn();
    } else {
      console.log("SignUpForm: ", "onSignIn callback is undefined");
    }
  };

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
      confirmPassword: "",
      email: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const setUserNameApiError = function (usernameMessage) {
    setError("username", { message: usernameMessage });
  };

  const setEmailApiError = function (emailError) {
    setError("username", { message: emailError });
  };

  const onSubmitSignUpForm = function (formValue) {
    dispatch(signUp(formValue));
  };

  return (
    <form
      className={"w-full mt-9 flex-col flex items-center"}
      onSubmit={handleSubmit(onSubmitSignUpForm)}
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
      <TextField
        type={"password"}
        {...register("confirmPassword")}
        id={"confirmPassword"}
        className={"w-[336px] mt-4 input-field"}
        label={"Confirm Password"}
        error={errors.confirmPassword !== undefined}
        helperText={
          errors.confirmPassword !== undefined
            ? errors.confirmPassword.message
            : ""
        }
      />
      <TextField
        type={"text"}
        {...register("email")}
        id={"email"}
        className={"w-[336px] mt-4 input-field"}
        label={"Email"}
        error={errors.email !== undefined}
        helperText={errors.email !== undefined ? errors.email.message : ""}
      />
      <Button
        type={"submit"}
        variant={"contained"}
        className={"bg-sky-500 hover:bg-sky-600 w-full mt-4"}
      >
        Sign Up
      </Button>
      <div className={"mt-4"}>
        You already have an account?{" "}
        <Button variant={"text"} onClick={handleSignIn}>
          SIGN IN
        </Button>
      </div>
    </form>
  );
}
