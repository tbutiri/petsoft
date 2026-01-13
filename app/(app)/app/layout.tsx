import React from 'react'
import BackgroundPattern from "@/app/components/background-pattern";
import AppHeader from "@/app/components/app-header";
import AppFooter from "@/app/components/app-footer";
import PetContextProvider from "@/contexts/pet-context-provider";
import {Pet} from "@/lib/types";
import SearchContextProvider from "@/contexts/search-context-provider";
import prisma from "@/lib/db";
import {Toaster} from "@/components/ui/sonner";

export default async function Layout({children}: { children: React.ReactNode }) {
    // const response = await fetch('https://bytegrad.com/course-assets/projects/petsoft/api/pets');
    // if (!response.ok) {
    //     throw new Error('Could not fetch pets');
    // }
    // const data: Pet[] = await response.json();

    const data = await prisma.pet.findMany();

    return (
        <>
            <BackgroundPattern/>
            <div className={"flex flex-col max-w-[1050px] mx-auto px-4 min-h-screen"}>
                <AppHeader/>

                <SearchContextProvider>
                    <PetContextProvider data={data}>{children}</PetContextProvider>
                </SearchContextProvider>

                <AppFooter/>
            </div>

            <Toaster position={"top-right"}/>
        </>
    )
}
