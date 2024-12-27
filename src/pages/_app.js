import "../styles/globals.css";
import NavBar from "../shared/navbar";
import {wrapper} from "../reducers/store";
import { Provider } from "react-redux";
import { verifyToken } from "@/reducers/authentication/authenticationThunk";
import { addRole, getAllUser, removeRole } from "@/reducers/adminReducer/adminThunk";
import { useEffect } from "react";
import { UserProvider } from "@/context/UserContext";

function App({ Component, ...rest }) {
  const {store, props} = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      store.dispatch(verifyToken());
    }
  }, [1]);

  return (
    <UserProvider>
    <Provider store={store}>
      <div>
          <NavBar/>
          <Component {...pageProps} />
      </div>
    </Provider>
    </UserProvider>
  )
};

export default App;
