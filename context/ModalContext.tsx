'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import Modal from '@/components/ui/Modal';

interface ModalContextType {
    showModal: (title: string, content: ReactNode) => void;
    hideModal: () => void;
    isOpen: boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
    children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState<ReactNode>(null);

    const showModal = (title: string, content: ReactNode) => {
        setModalTitle(title);
        setModalContent(content);
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
        setModalTitle('');
        setModalContent(null);
    };

    return (
        <ModalContext.Provider value={{ showModal, hideModal, isOpen }}>
            {children}
            <Modal
                title={modalTitle}
                isOpen={isOpen}
                onClose={hideModal}
            >
                {modalContent}
            </Modal>
        </ModalContext.Provider>
    );
};

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal debe ser usado dentro de un ModalProvider');
    }
    return context;
};