import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry">

            <div
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://www.w3schools.com/css/paris.jpg)'
                }}
            ></div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Test de title
                </p>
                <p className="journal__entry-content">
                    Nulla dolore anim minim qui ut id officia exercitation proident Lorem ullamco.
                    </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>
        </div>
    )
}
