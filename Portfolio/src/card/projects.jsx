import React from "react";
import '../projects.css'

export default function Projects({
    name,
    description,
    image,
    gitLink
}) {
    return (
        <div className="card-container">
            <img className="card-img-top" src={image} alt={name} />
            <h2>{name}</h2>
            <p>{description}</p>
            <a className="btn" href={gitLink} target="_blank" rel="noopener noreferrer">
                View Project
            </a>
        </div>
    )
}