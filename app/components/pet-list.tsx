"use client";

import React from 'react';
import Image from "next/image";
import {usePetContext, useSearchContext} from "@/lib/hooks";
import {cn} from "@/lib/utils";

export default function PetList() {
    const { pets, handleChangeSelectedPetId, selectedPetId} = usePetContext();
    const { searchTerm } = useSearchContext();

    const filteredPets = pets.filter(pet => pet.name.toLowerCase().includes(searchTerm));

    return (
       <ul className={"bg-white border-b border-light"}>
           {filteredPets.map(pet => (
               <li key={pet.id}>
                   <button
                       className={cn("flex h-[70px] w-full cursor-pointer items-center px-5 text-base gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition",
                           {
                           "bg-[#EFF1F2]": pet.id === selectedPetId
                       })}
                       onClick={() => handleChangeSelectedPetId(pet.id)}
                   >
                       <Image
                           src={pet.imageUrl}
                           alt={"Pet image"}
                           width={45}
                           height={45}
                           className={"w-[45px] h-[45px] rounded-full object-cover"}
                       />
                       <p className={"font-semibold"}>{pet.name}</p>
                   </button>
               </li>
           ))}
       </ul>
    )
}
