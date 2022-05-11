import { useState } from "react";

export const useModal = (initialState: boolean = false) => {
    const [isModalOpen, setIsModalOpen] = useState(initialState);
    const toggleModal = () => setIsModalOpen(!isModalOpen);
    return [isModalOpen, setIsModalOpen, toggleModal] as const;
}
