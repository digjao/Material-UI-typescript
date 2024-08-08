import { createContext, ReactNode, useCallback, useContext, useState } from "react";

interface IDrawerOption {
    icon: string
    label: string
    path: string
}

interface IDrawerContextData {
    isDrawerOpen: boolean
    drawerOptions: IDrawerOption[]
    toggleDrawerOpen: () => void;
    setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
    return useContext(DrawerContext)
}


export const DrawerProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [drawerOptions, setDrawerOptons] = useState<IDrawerOption[]>([])

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen)
    }, []);

    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
        setDrawerOptons(newDrawerOptions)
    }, []);

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions }}>
            {children}
        </DrawerContext.Provider>
    )
}