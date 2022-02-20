import React, { useState, useEffect, useContext } from "react";
import { Context } from "../contexts/index.js";
import Splash from "./Splash.js";

export default function Loader({ children }) {
  const {
    fetchTexts,
    checkAuth,
    toggleLoading,
    state: { loading },
  } = useContext(Context);

  useEffect(() => {
    async function getTexts() {
      try {
        await fetchTexts();
        await checkAuth();
        toggleLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getTexts();
  }, []);

  if (loading) {
    return <Splash />;
  } else {
    return <>{children}</>;
  }
}
