export interface AddProjectProps {
    formData: string[];
    setFormData: (formData: string[]) => void;
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