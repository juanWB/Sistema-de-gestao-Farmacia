import { createContext, useCallback, useContext, useState } from 'react';
interface IDrawerOptions {
    label: string;
    path: string;
    icon: React.ReactNode;
}

interface IDrawerContextData {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
    drawerOptions: IDrawerOptions[];
    setDrawerOptions: (newDrawerOption: IDrawerOptions[]) => void
}

const DrawerContext = createContext({} as IDrawerContextData);


interface IDrawerProviderProps {
    children: React.ReactNode
}

export const useDrawerContext = () => {
    return useContext(DrawerContext);
}

export const DrawerProvider: React.FC<IDrawerProviderProps> = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([]);


    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, []);

    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOptions[]) => {
        setDrawerOptions(newDrawerOptions)
    }, []);

    return (
        <DrawerContext.Provider value={{isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions}}>
            {children}
        </DrawerContext.Provider>
    )
}