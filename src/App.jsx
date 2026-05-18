import { useState } from "react";

function Widget() {
    function createCalender() {
        const days = [];

        let i = 0;
        while (i < 30) {
            i++;
            days.push(<div>{i}</div>)
        }

        return days;
    }

    return (
        <div className="widget-area">
            <div className="month-year">Jan 2020</div>
            <div className="calendar-area">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                { createCalender() }
            </div>
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
