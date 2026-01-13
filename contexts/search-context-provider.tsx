"use client"

import React, {createContext, useState} from 'react'

type SearchContextProvider = {
    children: React.ReactNode;
}

type TSearchContext = {
    searchTerm: string;
    handleChangeSearchTerm: (newValue: string) => void;
};

export const SearchContext = createContext<TSearchContext | null>(null);

export default function SearchContextProvider({children}: SearchContextProvider) {
    // state
    const [searchTerm, setSearchTerm] = useState("");

    //derived state


    // event handlers
    const handleChangeSearchTerm = (newValue: string) => {
        setSearchTerm(newValue);
    };

    return (
        <SearchContext.Provider
            value={{
                searchTerm,
                handleChangeSearchTerm
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}
