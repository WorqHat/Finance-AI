import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children, authentication = true }) => {
  const authStatus = useSelector((store) => store.auth.status);

  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/signin");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/dashboard");
    }
    setLoader(false);
  }, [authStatus, authentication, navigate]);

  return loader ? <h1>loading</h1> : <>{children}</>;
};

export default AuthLayout;
