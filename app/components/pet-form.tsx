"use client"

import React from 'react'
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {usePetContext, useSearchContext} from "@/lib/hooks";
import {addPet, editPet} from "@/actions/actions";
import PetFormBtn from "@/app/components/pet-form-btn";
import {toast} from "sonner";

type PetFormType = {
    actionType: "add" | "edit";
    onFormSubmission: () => void;
}

export default function PetForm({
    actionType, onFormSubmission
}: PetFormType) {
    const { handleAddPet, handleEditPet, selectedPet } = usePetContext();

    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //
    //     const formData = new FormData(e.currentTarget);
    //     const pet = {
    //         name: formData.get("name") as string,
    //         ownerName: formData.get("ownerName") as string,
    //         imageUrl: formData.get("imageUrl") as string || "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
    //         age: +(formData.get("age") as string),
    //         notes: formData.get("notes") as string,
    //     };
    //
    //     if (actionType === "add") {
    //         handleAddPet(pet);
    //     } else if (actionType === "edit") {
    //         handleEditPet(selectedPet?.id as string, pet);
    //     }
    //
    //     onFormSubmission();
    // }

    return (
        <form action={async (formData) => {
            if (actionType === "add") {
                const error = await addPet(formData);
                if (error) {
                    toast.error(error.message);
                    return;
                }
            }
            else if (actionType === "edit") {
                const error = await editPet(selectedPet?.id, formData);
                if (error) {
                    toast.error(error.message);
                    return;
                }
            }

            onFormSubmission();
        }}
            className={"flex flex-col "}>
            <div className={"space-y-3"}>
                <div className={"space-y-1"}>
                    <Label htmlFor={"name"}>Name</Label>
                    <Input id="name"
                           name={"name"}
                           type={"text"}
                           required
                           defaultValue={actionType === "edit" ? selectedPet?.name : ''}/>
                </div>

                <div className={"space-y-1"}>
                    <Label htmlFor={"ownerName"}>Owner Name</Label>
                    <Input id="ownerName"
                           name={"ownerName"}
                           type={"text"}
                           required
                           defaultValue={actionType === "edit" ? selectedPet?.ownerName : ''}/>
                </div>

                <div className={"space-y-1"}>
                    <Label htmlFor={"imageUrl"}>Image Url</Label>
                    <Input id="imageUrl"
                           name="imageUrl"
                           type={"text"}
                           defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ''}/>
                </div>

                <div className={"space-y-1"}>
                    <Label htmlFor={"age"}>Age</Label>
                    <Input id="age"
                           name="age"
                           type={"number"}
                           required
                           defaultValue={actionType === "edit" ? selectedPet?.age : ''}
                    />
                </div>

                <div className={"space-y-1"}>
                    <Label htmlFor={"notes"}>Notes</Label>
                    <Textarea id="notes"
                              name="notes"
                              rows={3}
                              required
                              defaultValue={actionType === "edit" ? selectedPet?.notes : ''}
                    />
                </div>
            </div>
            <PetFormBtn actionType={actionType} />
        </form>
    )
}
