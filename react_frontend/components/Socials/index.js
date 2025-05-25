import React, { useState } from "react";
import Button from "../Button";
import { useTheme } from "next-themes";


import yourData from "../../data/data.json";

const Socials = ({ className }) => {
    const [selectedSocial, setSelectedSocial] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    

    const handleButtonClick = (social) => {
        setSelectedSocial(social);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedSocial(null);
    };

    return (
        <div className={`${className} flex flex-wrap mob:flex-nowrap link`}>
        {yourData.socials.map((social, index) => (
            <Button key={index} onClick={() => handleButtonClick(social)}>
            {social.title}
            </Button>
        ))}
        {modalOpen && selectedSocial && (
            <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: theme === "dark" ? "#111" : "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "24px",
            zIndex: 1000,
            minWidth: "250px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
            }}>
            <button
                onClick={closeModal}
                style={{
                    position: "absolute",
                    top: 8,
                    right: 12,
                    background: "transparent",
                    border: "none",
                    fontSize: 22,
                    cursor: "pointer",
                    color: theme === "dark" ? "#fff" : "#111"
                }}
                aria-label="Close"
            >
                &times;
            </button>
            <h2 style={{marginTop: 0}}>{selectedSocial.title}</h2>
            <p><a href={selectedSocial.link} target="_blank" rel="noopener noreferrer">{selectedSocial.link}</a></p>
            {selectedSocial.description && <p>{selectedSocial.description}</p>}
            </div>
        )}
        {modalOpen && (
            <div onClick={closeModal} style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            zIndex: 999
            }} />
        )}
        </div>
    );
};

export default Socials;
