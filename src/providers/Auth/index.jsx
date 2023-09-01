import useLogin from "@/src/hooks/auth/useLogin";
import useFetch from "@/src/hooks/general/useFetch";
import { createContext, useCallback, useContext, useEffect, useMemo } from "react";

export const AuthContext = createContext(null);

const AuthProvider = (props) => {
  const authHandlers = useLogin();
  const signoutHandler = useFetch({
    method: "POST",
    url: "/api/auth/logout",
  });
  const updateBasicInfoHandler = useFetch({
    method: "PUT",
    url: "/api/auth/update",
  })
  const updateProfileInfoHandler = useFetch({
    method: "PUT",
    url: "/api/auth/profile/update",
  })
  const removeProfileImageHandler = useFetch({
    method: "DELETE",
    url: "/api/auth/profile-image",
  });
  const updateProfileImageHandler = useFetch({
    method: "PUT",
    url: "/api/auth/profile-image",
  });

  const removeProfileImage = useMemo(() => {
    if (removeProfileImageHandler.data) {
      authHandlers.init.dispatch(null);
    }
    return {
      ...removeProfileImageHandler,
    };
  }, [
    removeProfileImageHandler.data,
    removeProfileImageHandler.error,
    removeProfileImageHandler.loading,
  ]);

  const updateProfileImage = useMemo(() => {
    if (updateProfileImageHandler.data) {
      authHandlers.init.dispatch(null);
    }
    return {
      ...updateProfileImageHandler,
    };
  }, [
    updateProfileImageHandler.data,
    updateProfileImageHandler.error,
    updateProfileImageHandler.loading,
  ]);
  const updateBasicInfo = useMemo(() => {
    if (updateBasicInfoHandler.data) {
      authHandlers.init.dispatch(null);
    }
    return {
      ...updateBasicInfoHandler,
    };
  }, [
    updateBasicInfoHandler.data,
    updateBasicInfoHandler.error,
    updateBasicInfoHandler.loading,
  ]);
  const updateProfileInfo = useMemo(() => {
    if (updateProfileInfoHandler.data) {
      authHandlers.init.dispatch(null);
    }
    return {
      ...updateProfileInfoHandler,
    };
  }, [
    updateProfileInfoHandler.data,
    updateProfileInfoHandler.error,
    updateProfileInfoHandler.loading,
  ]);
  return (
    <AuthContext.Provider
      value={{
        ...authHandlers,
        removeProfileImage,
        updateProfileImage,
        signoutHandler,
        updateBasicInfo,
        updateProfileInfo
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);