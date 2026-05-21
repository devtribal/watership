import { useState } from "react";
import leftArrow from "./assets/left-arrow.svg";
import rightArrow from "./assets/right-arrow.svg";
const date = new Date();

function Widget({ habits, selectedHabit }) {
    // Get current month and year (Jan 2026) to display on calendar header
    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState(date.getMonth());
    const monthString = new Date(year, month).toLocaleString("default", { month: "short" });
    const [displayRightArrow, setDisplayRightArrow] = useState("none");

    const [selectedDate, setSelectedDate] = useState(new Date(year, month, date.getDate()).toLocaleDateString("en-GB"));

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

            const currentDate = new Date(year, month, i).toLocaleDateString("en-GB");

            const habit = habits.find((h) => h.category === selectedHabit);

            if (habit) {
                if (habit.items.includes(currentDate) && currentDate === selectedDate) {
                    dates.push(<div className={`completed-date selected-date date-box`}>{i}</div>);
                } else if (habit.items.includes(currentDate)) {
                                        let placeholderDate = currentDate;
                    dates.push(<div className={`completed-date date-box`} onClick={() => { setSelectedDate(placeholderDate)}}>{i}</div>);
                } else if (currentDate === selectedDate) {
                    dates.push(<div className={`selected-date date-box`}>{i}</div>);
                } else {
                    let placeholderDate = currentDate;
                    dates.push(<div className={"date-box"} onClick={() => { setSelectedDate(placeholderDate); }} >{i}</div>);
                }
            }

            // for (let x = 0; x < habits.length; x++) {
            //     if (habits[x].category === selectedHabit) {
            //         habits[x].items.forEach((date) => {
            //             if (date === currentDate) {
            //                 dates.push(<div className={`completed-date date-box`}>{i}</div>);
            //             } else if (currentDate === selectedDate) {
            //                 dates.push(<div className={`selected-date date-box`}>{i}</div>);
            //             } else {
            //                 let placeholderDate = currentDate;
            //                 dates.push(<div className={"date-box"} onClick={() => { setSelectedDate(placeholderDate); }} >{i}</div>);
            //             }
            //         })
            //     }
            // }
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
    const [selectedHabit, setSelectedHabit] = useState("coding");

    const [habits, setHabits] = useState([
        { category: "coding", items: ["19/05/2026", "15/05/2026"] }
    ]);

    function handleYesClick() {
        
    }

    function handleNoClick() {
        
    }

    return (
        <div className="wrapper" >
            <Task onYesClick={handleYesClick} onNoClick={handleNoClick} />
            <Widget habits={habits} selectedHabit={selectedHabit} />
        </div>
    );
}

export default App;
