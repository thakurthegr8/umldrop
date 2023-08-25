import React, { createContext, useContext, useMemo, useState } from 'react'

const ProfileProgessContext = createContext(null);

export const useProfileProgress = () => useContext(ProfileProgessContext);


const ProfileProgessProvider = (props) => {
    const solvedQuestionsByCategory = useMemo(() => {
        const { totalQuestions, solvedQuestions } = props.data;
        const res = {
            easy: {
                total: 0,
                solved: 0,
            },
            medium: {
                total: 0,
                solved: 0,
            },
            hard: {
                total: 0,
                solved: 0,
            },
        };
        totalQuestions.forEach((item) => {
            res[item.difficulty.toLowerCase()].total += 1;
        });
        solvedQuestions.forEach((item) => {
            res[item.difficulty.toLowerCase()].solved += 1;
        });
        return res;
    }, [props.data]);
    return (
        <ProfileProgessContext.Provider value={solvedQuestionsByCategory}>
            {props.children}
        </ProfileProgessContext.Provider>
    )
}

export default ProfileProgessProvider;