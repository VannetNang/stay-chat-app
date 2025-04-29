import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "./config/firebase";
import { GlobalState } from "./components/context/GlobalContext";

const App = () => {
  const navigate = useNavigate();
  const { loadUserData } = useContext(GlobalState);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await loadUserData(user.uid);
      } else {
        navigate("/login");
      }
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default App;
