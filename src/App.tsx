import React, { useEffect } from "react";
import { matchRoutes, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login-Register/Login";
import Inventory from "./pages/Inventory/Inventory";
import Profile from "./pages/Profile/Profile";
import MenuTop from "./components/MenuTop";
import { logStore } from "./store/logStore";
import { Item, useStore } from "./store/store";
import { Box, Flex } from "@mantine/core";

function App() {
  const log = logStore((state: any) => state.log);
  const inventory: Item[] = useStore((state: any) => state.inventory);
  const bag: Item[] = useStore((state: any) => state.bag);

  // change background image of #root element when is in inventory page
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === "/inventory") {
      document.getElementById("root")!.style.backgroundImage =
        "url('../img/Vitruviano.png')";
        console.log('inventory')
    } 
    else {
      document.getElementById("root")!.style.backgroundImage =
        "url('../img/white-parchment-paper.jpg')";
    }
  }, [location.pathname]);

  return (
    <>
      <MenuTop />
      <Flex justify="center" align="center" style={{height: window.innerHeight - 60}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login page={"profile"} />} />
          <Route
            path="/inventory"
            element={
              log ? (
                <Inventory />
              ) : (
                <Login page={"inventory"} />
              )
            }
          />
          <Route
            path="/profile"
            element={log ? <Profile /> : <Login page={"profile"} />}
          />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Flex>
    </>
  );
}

export default App;
