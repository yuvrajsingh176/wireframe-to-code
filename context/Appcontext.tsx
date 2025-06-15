import { createContext } from "react";

export const Appcontext = createContext<{
    model: string;
    setModel: (model: string) => void;
}>({
    model: '',
    setModel: () => {}, 
});
