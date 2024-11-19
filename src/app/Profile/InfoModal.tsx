// src/app/Profile/InfoModal.tsx

"use client"; // Mark this file as a Client Component

import { useState } from 'react';
import AllUser from './PopInfo/AllUser';
import Style  from './page.module.css';
function InfoModal() {
    const [modalVisible, setModalVisible] = useState(false);

    const handleClick = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <button 
                onClick={handleClick} 
                className={Style.info}
            >
                My Info
            </button>

            {modalVisible && (
                <div 
                    className={Style.personal}

                >
                    <AllUser />
                    <button onClick={closeModal} className={Style.butons}>Close</button>
                </div>
            )}
        </>
    );
}

export default InfoModal;
