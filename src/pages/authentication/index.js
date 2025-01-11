import ASSET from "@/shared/assets";
import SignInForm from "@/pages/authentication/components/SignInForm";
import SignUpForm from "@/pages/authentication/components/SignUpForm";
import ForgetPasswordForm from "@/pages/authentication/components/ForgetPasswordForm";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeToAuthenPage } from "@/reducers/appRoutes/appRoutesReducer";
import { useRouter } from "next/router";
import {
  getAuthenRole,
  getFailMessage,
  getSuccessMessage,
} from "@/reducers/authentication/authenticationSelector";
import { resetMessage } from "@/reducers/authentication/authenticationReducer";
import { ROLE } from "@/constants/role";
import Swal from "sweetalert2";

export default function AuthenticationScreen() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLoginSuccess = function () {
    router.push("/problems");
  };

  useEffect(() => {
    dispatch(changeToAuthenPage());
  }, []);

  const STATE = {
    SIGN_IN: "sign_in",
    FORGOT_PASSWORD: "forgot_password",
    SIGN_UP: "sign_up",
  };

  const [authenState, setAuthenState] = useState(STATE.SIGN_IN);

  const changeFormType = function (type) {
    setAuthenState((state) => type);
  };

  const handleForgetPassword = function () {
    changeFormType(STATE.FORGOT_PASSWORD);
  };

  const handleSignUp = function () {
    changeFormType(STATE.SIGN_UP);
  };

  const handleSignIn = function () {
    changeFormType(STATE.SIGN_IN);
  };

  // For Snackbar
  const [open, setOpen] = useState(false);

  const authenFailMessage = useSelector(getFailMessage);
  const authenSuccessMessage = useSelector(getSuccessMessage);
  const role = useSelector(getAuthenRole);

  useEffect(() => {
    if (authenState === STATE.SIGN_IN) {
      if (authenFailMessage !== "") {
        handleShowSnakeBar();
      } else {
        if (role != ROLE.NON_AUTHORIZE) {
          handleLoginSuccess();
        }
      }
    } else {
      if (authenFailMessage !== "" || authenSuccessMessage !== "") {
        handleShowSnakeBar();
        if (authenSuccessMessage !== "") {
          handleSignIn();
        }
      }
    }
  }, [authenSuccessMessage, authenFailMessage, role]);

  const handleShowSnakeBar = () => {
    if (authenSuccessMessage !== "") {
      Swal.fire("Thông báo", authenSuccessMessage, "success").then(result => dispatch(resetMessage()));
    } else if (authenFailMessage !== "") {
      Swal.fire("Thông báo", authenFailMessage, "error").then((result) => dispatch(resetMessage()));
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    dispatch(resetMessage());
  };

  return (
    <>
      <main>
        <div
          className={`flex items-start justify-center min-h-screen h-full bg-[#ECF0F1] pt-12`}
        >
          <div
            className={
              "w-[400px] bg-white shadow-black pt-10 pb-5 px-8 flex flex-col items-center"
            }
          >
            <div>
              <img
                src={ASSET.LOGO.src}
                className={"w-full h-20 object-contain"}
              />
              <div className={"font-bold text-2xl mt-2 text-slate-800"}>
                Preparing Interview
              </div>
            </div>
            {authenState === STATE.SIGN_UP ? (
              <SignUpForm onSignIn={handleSignIn} />
            ) : authenState === STATE.SIGN_IN ? (
              <SignInForm
                onSignUp={handleSignUp}
              />
            ) : (
              <ForgetPasswordForm onForgotPassword={handleForgetPassword}/>
            ) }
          </div>
        </div>
        {authenFailMessage}
        {authenSuccessMessage}
      </main>
    </>
  );
}
