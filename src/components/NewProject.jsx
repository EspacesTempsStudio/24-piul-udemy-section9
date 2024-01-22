import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({ onAddProject, onStopAddProject }) {
    const modalRef = useRef();

    const titleRef = useRef()
    const descriptionRef = useRef()
    const dateRef = useRef()

    function handleSave() {
        const enteredTitle = titleRef.current.value;
        const enteredDescription = descriptionRef.current.value;
        const enteredDate = dateRef.current.value;

        // validation
        // verifier les champs "vide" uniquement
        if (enteredTitle.trim() === "" || enteredDescription.trim() === "" || enteredDate.trim() === "") {
            //indiquer l'erreur à l'utilisateur
            modalRef.current.open();
            return;
        }

        let projectDatas = { title: enteredTitle, description: enteredDescription, date: enteredDate }

        // console.log(projectDatas)
        onAddProject(projectDatas)
    }

    return (
        <>
            <Modal ref={modalRef} btnCaption={"Ok"}>
                <h2 className="text-xl font-bold text-stone-700 my-4">Erreur de saisie</h2>
                <p className="text-stone-600 mb-4">Chaque champ doit être rempli</p>
            </Modal>
            <div className="w-[35rem] mt-16" >
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button
                            onClick={onStopAddProject}
                            className="text-stone-800 hover:text-stone-950"
                        >
                            Annuler
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                        >
                            Enregistrer
                        </button>
                    </li>
                </menu>
                <div>
                    <Input type="text" ref={titleRef} label="Titre" />
                    <Input ref={descriptionRef} label="Description" textarea />
                    <Input type="date" ref={dateRef} label="Date" />
                </div>
            </div>
        </>)
}