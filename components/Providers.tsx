'use client';
import { AuthProvider } from "@/context/AuthContext";
import { LoaderProvider } from "@/context/LoaderContext";
import { ModalProvider } from "@/context/ModalContext";

interface ProvidersProps {
    children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <AuthProvider>
            <LoaderProvider>
                <ModalProvider>
                    {children}
                </ModalProvider>
            </LoaderProvider>
        </AuthProvider>
    );
};

export default Providers;