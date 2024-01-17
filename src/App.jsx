import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSideBar";
import SelectedProject from "./components/SelectedProject";

function App() {

  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    // valeurs attendues de selectedProject : undefined/null/index
    projects: [],
    tasks:[]
  });

  function handleAddTask(text) {
    setProjectsState(prevState => {
    let newTask = {
      text: text,
      projectId: prevState.selectedProjectId,
      id: Math.random()
    }

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      }
    })
  }

  function handleDeleteTask(taskId) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task)=> task.id !== taskId)
      }
    })
  }
  
  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    })
  }

  function handleStopAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      }
    })
  }

  function handleSelectProject(pid) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: pid,
      }
    })
  }

  function handleAddProject(projectDatas) {
    // console.log("projectDatas in App:", projectDatas)
    setProjectsState(prevState => {
    let newProject = {
      ...projectDatas,
      id: Math.random()
    }

      return {
        ...prevState,
        projects: [...prevState.projects, newProject],
        selectedProjectId: undefined
      }
    })
  }

  function handleDeleteProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project)=> project.id !== prevState.selectedProjectId)
      }
    })
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);
  let content = (
    <SelectedProject 
      project={selectedProject} 
      onDelete={handleDeleteProject} 
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks.filter((task)=> task.projectId === projectsState.selectedProjectId)}
    />
  )

  if (projectsState.selectedProjectId === null) {
    content =
      <NewProject onAddProject={handleAddProject} onStopAddProject={handleStopAddProject} />
  } else if (projectsState.selectedProjectId === undefined) {
    content =
      <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  console.log("APP STATE :", projectsState)

  return (
    <main className="h-screen my-8 flex gap-8" >
      <ProjectsSidebar 
        projects={projectsState.projects} 
        onStartAddProject={handleStartAddProject} 
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
