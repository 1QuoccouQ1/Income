import "./App.css";
import Sidebar from "./layouts/Sidebar";
import { Outlet } from "react-router-dom";
import Dropdown from "./layouts/Dropdown";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { UserProvider } from "./context/UserContext";


function App() {
  return (
    <>
      <UserProvider>
        <Provider store={store}>
          <div className="flex h-screen bg-[#f4f7fe]">
            <Sidebar></Sidebar>
            <div className="w-full">
              <Dropdown></Dropdown>
              <Outlet />
            </div>
          </div>
        </Provider>
        </UserProvider>
    
   </>
  );
}

export default App;
