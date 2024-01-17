import noProjectImage from '../assets/no-projects.png'
import Button from './Button'

export default function NoProjectSelected({onStartAddProject}) {
    return <div className="mt-24 text-center w-2/3">
        <img src={noProjectImage} alt="Une liste des tâches vide" className="w-16 h-16 object-contain mx-auto" />
        <h2 className="text-xl font-bold text-stone-500 my-4">Pas de projet sélectionné</h2>
        <p className="text-stone-400 mb-4" >Choisir un projet existant ou un Nouveau Projet</p>
        <p className="mt-8"><Button onClick={onStartAddProject}>Nouveau Projet</Button></p>
    </div>
}