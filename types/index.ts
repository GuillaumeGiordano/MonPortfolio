export interface AddProjectProps {
    project: string;
    setProject: (project: string) => void;
    handleCreateProject: () => void;
}



export interface IProject {
    _id: string;
    image: string;
    title: string;
    mission: string;
    description: string;
    languages: string;
    url: string;
}