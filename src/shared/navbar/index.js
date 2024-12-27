import Link from "next/link";
import ASSET from "@/shared/assets";
import NavBarLink from "@/shared/navbar/components/NavBarLink";
import {
  changeToAdminPage,
  changeToAuthenPage,
  changeToHomePage,
  changeToListProblem,
  changeToProblemPage,
  changeToJobTrackerPage,
  changeToMockInterviewPage,
  changeToChatbotPage,
  ROUTES,
} from "@/reducers/appRoutes/appRoutesReducer";
import { useDispatch, useSelector } from "react-redux";
import { currentRoutes } from "@/reducers/appRoutes/appRoutesSelector";
import {
  currentRole,
  getAuthenRole,
  getUsername,
} from "@/reducers/authentication/authenticationSelector";
import { ROLE } from "@/constants/role";
import { logout } from "@/reducers/authentication/authenticationReducer";

export default function NavBar(props) {
  const page = useSelector(currentRoutes);
  const role = useSelector(currentRole);
  const username = useSelector(getUsername);
  const authenState = useSelector(getAuthenRole);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(changeToHomePage());
  };

  const displayWithAuthenState = function () {
    if (authenState.indexOf(ROLE.NON_AUTHORIZE) !== -1) {
      return (
        <NavBarLink
          href={loginPage.href}
          title={loginPage.title}
          isSelected={page === loginPage.enum}
          handleChangePage={() => handleChangePage(loginPage.enum)}
        />
      );
    } else {
      return (
        <div className="flex flex-row items-center gap-4">
          <div>
            Welcome, <b>{username}</b>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        </div>
      );
      return (
        <NavBarLink
          href={"#"}
          title={display}
          isSelected={false}
          handleChangePage={() => {}}
        />
      );
    }
  };

  const handleChangePage = function (toPage) {
    switch (toPage) {
      case ROUTES.HOME_PAGE:
        dispatch(changeToHomePage());
        break;

      case ROUTES.LIST_PROBLEM:
        dispatch(changeToListProblem());
        break;

      case ROUTES.DOING:
        dispatch(changeToProblemPage());
        break;

      case ROUTES.AUTHEN:
        dispatch(changeToAuthenPage());
        break;

      case ROUTES.JOB_TRACKER:
        dispatch(changeToJobTrackerPage());
        break;

      case ROUTES.MOCK_INTERVIEW:
        dispatch(changeToMockInterviewPage());
        break;

      case ROUTES.CHATBOT:
        dispatch(changeToChatbotPage());
        break;

      case "admin":
        dispatch(changeToAdminPage());
        break;

      default:
        console.error("Unknown route: " + toPage);
    }
  };

  const routes = [
    { href: "/", title: "Trang chủ", enum: ROUTES.HOME_PAGE },
    { href: "/problems", title: "Danh sách đề bài", enum: ROUTES.LIST_PROBLEM },
    { href: "/authentication", title: "Đăng nhập", enum: ROUTES.AUTHEN },
    { href: "/admin", title: "Admin", enum: ROUTES.ADMIN },
    { href: "/jobtracker", title: "Theo dõi quá trình tìm việc", enum: ROUTES.JOB_TRACKER }, 
    { href: "/mockinterview", title: "Phỏng vấn thử cùng AI", enum: ROUTES.MOCK_INTERVIEW },
    { href: "/chatbot", title: "Q&A cùng chatbot", enum: ROUTES.CHATBOT }
  ];

  const loginPage = routes[2];
  const adminPage = routes[3];

  return (
    <div
      className={
        "w-full h-12 flex flex-row justify-center drop-shadow-md bg-white "
      }
    >
      <div className={"w-10/12 flex flex-row justify-between"}>
        <div className={"flex flex-row"}>
          <Link
            href={"/"}
            onClick={() => handleChangePage(ROUTES.HOME_PAGE)}
            className={"w-10 h-10 self-center mr-5"}
          >
            <img src={ASSET.LOGO.src} alt={"Logo"} />
          </Link>
          {routes.map((route, index) => {
            if (index > 1) {
              return;
            }
            return (
              <NavBarLink
                key={"NavBarLink" + index}
                href={route.href}
                title={route.title}
                isSelected={page === route.enum}
                handleChangePage={() => handleChangePage(route.enum)}
              />
            );
          })}

          {role.indexOf(ROLE.ADMIN) !== -1 || role.indexOf(ROLE.MOD) !== -1 ? (
            <NavBarLink
              key={"NavBarLink_ADMIN"}
              href={adminPage.href}
              title={adminPage.title}
              isSelected={page === adminPage.enum}
              handleChangePage={() => handleChangePage(adminPage.enum)}
            />
          ) : (
            <></>
          )}

          {role.indexOf(ROLE.USER) !== -1 || role.indexOf(ROLE.ADMIN) !== -1 || role.indexOf(ROLE.MOD) !== -1 ? (
            <NavBarLink
              key={"NavBarLink_JOBTRACKER"}
              href={routes[4].href}
              title={routes[4].title}
              isSelected={page === routes[4].enum}
              handleChangePage={() => handleChangePage(routes[4].enum)}
            />
          ) : (
            <></>
          )}

          {role.indexOf(ROLE.USER) !== -1 || role.indexOf(ROLE.ADMIN) !== -1 || role.indexOf(ROLE.MOD) !== -1 ? (
            <NavBarLink
              key={"NavBarLink_MOCKINTERVIEW"}
              href={routes[5].href}
              title={routes[5].title}
              isSelected={page === routes[5].enum}
              handleChangePage={() => handleChangePage(routes[5].enum)}
            />
          ) : (
            <></>
          )}

          {role.indexOf(ROLE.USER) !== -1 || role.indexOf(ROLE.ADMIN) !== -1 || role.indexOf(ROLE.MOD) !== -1 ? (
            <NavBarLink
              key={"NavBarLink_CHATBOT"}
              href={routes[6].href}
              title={routes[6].title}
              isSelected={page === routes[6].enum}
              handleChangePage={() => handleChangePage(routes[6].enum)}
            />
          ) : (
            <></>
          )}

        </div>
        {displayWithAuthenState()}
      </div>
    </div>
  );
}
