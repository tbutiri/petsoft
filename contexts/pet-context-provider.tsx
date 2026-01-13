"use client";

import React, {createContext, useState} from 'react'
import { Pet } from "@/lib/types";
import {addPet} from "@/actions/actions";

type PetContextProviderProps = {
    data: Pet[];
    children: React.ReactNode;
}

type TPetContext = {
    pets: Pet[];
    selectedPetId: string | null;
    handleChangeSelectedPetId: (id: string) => void;
    handleCheckoutPet: (id: string) => void;
    handleAddPet: (newPet: Omit<Pet, "id">) => void;
    handleEditPet: (petId: string, newPetData: Omit<Pet, "id">) => void;
    selectedPet: Pet | undefined;
    numberOfPets: number;
}

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({ data: pets, children }: PetContextProviderProps) {
    // state
    const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

    //derived state
    const selectedPet = pets.find(pet => pet.id === selectedPetId);
    const numberOfPets = pets.length;

    // event handlers
    const handleChangeSelectedPetId = (id: string) => {
        setSelectedPetId(id);
    }
    const handleCheckoutPet = (id: string) => {
        setPets(pets.filter(pet => pet.id !== id));
        setSelectedPetId(null);
    }
    const handleAddPet = async (newPet: Omit<Pet, "id">) => {
        // setPets(prev => [...pets, {
        //     ...newPet,
        //     id: Date.now().toString(),
        // }]);
        await addPet(newPet);
    }
    const handleEditPet = (petId: string, newPetData: Omit<Pet, "id">) => {
        setPets(prev => prev.map(pet => pet.id === petId ? {id: petId, ...newPetData} : pet));
    }

    return (
    <PetContext.Provider
        value={{
        pets,
        selectedPetId,
        handleChangeSelectedPetId,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,
        selectedPet,
        numberOfPets
    }}
    >
        {children}
    </PetContext.Provider>
    )
}
