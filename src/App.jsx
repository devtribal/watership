import { useState } from "react";

function Widget() {
    return (
        <div className="widget-area">

        </div>
    );
}



function Task({ onYesClick, onNoClick }) {
    return (
        <div className="task-area">
            <p className="task-message">Did you do this task today?</p>
            <div className="task-button-wrapper">
                <button className="task-button" onClick={onYesClick} >Yes</button>
                <button className="task-button" onClick={onNoClick} >No</button>
            </div>
        </div>
    );
}

function App() {
    const [taskCompletion, setTaskCompletion] = useState(null);

    function handleYesClick() {
        setTaskCompletion(true);
    }

    function handleNoClick() {
        setTaskCompletion(false);
    }

    return (
        <div className="wrapper" >
            <Task onYesClick={handleYesClick} onNoClick={handleNoClick}/>
            <Widget />
        </div>
    );
}

export default App;