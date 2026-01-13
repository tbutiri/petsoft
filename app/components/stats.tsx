"use client"

import React from 'react'
import {usePetContext} from "@/lib/hooks";

export default function Stats() {
    const { numberOfPets } = usePetContext();

    return (
        <section className={"text-center"}>
            <p className={"text-2xl fond-bold leading-6"}>{numberOfPets}</p>
            <p className={"opacity-80"}>Current guests</p>
        </section>
    )
}
