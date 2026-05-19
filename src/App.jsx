import { useState } from "react";

function Widget() {
    const date = new Date();
    // Get current month and year (Jan 2026) to display on calendar header
    let monthString = date.toLocaleString("default", { month: "short" });
    let year = date.getFullYear();
    let month = date.getMonth();

    function createCalender() {
        const dates = [];
        const lastDay = new Date(year, month + 1, 0).getDate();

        const firstDay = new Date(year, month, 1).getDay();


        let i = 0;
        while (i < firstDay) {
            dates.push(<div />);
            i++;
        }

        i = 0;
        while (i < lastDay) {
            i++;

            if (i === date.getDate()) {
                dates.push(<div className="current-day">{i}</div>);
            } else {
                dates.push(<div>{i}</div>);
            }
        }

        return dates;
    }

    return (
        <div className="widget-area">
            <div className="month-year"> {`${monthString} ${year}`} </div>
            <div className="calendar-area"> 
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                {createCalender()}
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
    const [, setTaskCompletion] = useState(null);

    function handleYesClick() {
        setTaskCompletion(true);
    }

    function handleNoClick() {
        setTaskCompletion(false);
    }

    return (
        <div className="wrapper" >
            <Task onYesClick={handleYesClick} onNoClick={handleNoClick} />
            <Widget />
        </div>
    );
}

export default App;
