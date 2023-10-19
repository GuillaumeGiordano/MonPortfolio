// PROPS
export interface AddProjectProps {
    formData: string[];
    setFormData: (formData: string[]) => void;
    handleCreateProject: () => void;
}


// BDD
export interface IProject {
    _id: string;
    image: string;
    title: string;
    mission: string;
    description: string;
    languages: string;
    url: string;
}
export interface IUser {
    _id: string;
    mail: string;
    passworld: string;
}