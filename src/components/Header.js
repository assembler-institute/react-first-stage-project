import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NavBar from "./NavBar";

export default function Header() {
  const { isLogged } = useContext(AuthContext);

  return (
    <>
      <header className="text-light">
        <h1 className="text-center">Free Videogames</h1>
        {isLogged && (
          <div className="d-flex flex-row justify-content-between py-4">
            <NavBar />
          </div>
        )}
      </header>
    </>
  );
}