import React from 'react';
import './RankingHeader.css'; 

const RankingHeader = () => {
    return (
        <div className="ranking-header-container">
            <h2 className="ranking-header-title">RANKINGS</h2>
            <div className="ranking-header-tabs">
                <button className="ranking-tab-button">OPEN</button>
                <button className="ranking-tab-button active">NOVICE</button>
            </div>
        </div>
    );
};

export default RankingHeader;
