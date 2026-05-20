import { useState } from "react";
import leftArrow from "./assets/left-arrow.svg";
import rightArrow from "./assets/right-arrow.svg";
const date = new Date();

function Widget() {
    // Get current month and year (Jan 2026) to display on calendar header
    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState(date.getMonth());
    const monthString = new Date(year, month).toLocaleString("default", { month: "short" });
    const [displayRightArrow, setDisplayRightArrow] = useState("none");

    const [selectedDate, setSelectedDate] = useState(date.getDate());
    const [selectedMonth, setSelectedMonth] = useState(date.getMonth());
    const [selectedYear, setSelectedYear] = useState(date.getFullYear());

    function handleLeftArrow() {
        setDisplayRightArrow("block");
        if (month === 0) {
            setYear(prev => prev - 1);
            setMonth(11);

            return;   
        }

        setMonth(prev => prev - 1);
    }

    function handleRightArrow() {
        const nextMonth = month === 11 ? 0 : month + 1;
        const nextYear = month === 11 ? year + 1 : year;

        if (nextMonth === date.getMonth() && nextYear === date.getFullYear()) {
            setDisplayRightArrow("none");
        }

        if (month === 11) {
            setYear(next => next + 1);
            setMonth(0);

            return;
        }

        setMonth(next => next + 1);
    }

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



            if (i === selectedDate && month === selectedMonth && year === selectedYear) {
                dates.push(<div className={`selected-date date-box`}>{i}</div>);
            } else {
                let placeholderDate = i;
                dates.push(<div className={"date-box"} onClick={() => { setSelectedDate(placeholderDate); setSelectedMonth(month); setSelectedYear(year)}} >{i}</div>);
            }
        }

        return dates;
    }

    return (
        <div className="widget-area">
            <div className="month-year"> 
                <img className="left-arrow" src={leftArrow} alt="left-arrow" onClick={handleLeftArrow} />
                {`${monthString} ${year}`} 
                <img style={{ display: displayRightArrow }} className="right-arrow" src={rightArrow} alt="right-arrow" onClick={handleRightArrow} />
            </div>

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
