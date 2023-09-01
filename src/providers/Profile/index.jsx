import React, { createContext, useContext } from "react";

const ProfileContext = createContext(null);

export const useProfile = () => useContext(ProfileContext);


const ProfileProvider = (props) => {
    return <ProfileContext.Provider value={props.value}>{props.children}</ProfileContext.Provider>
}

export default ProfileProvider;