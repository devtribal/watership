function Widget() {
    return (
        <div className="widget-area">

        </div>
    );
}

function Task() {
    return (
        <div className="task-area">
            <p>Did you do this task today?</p>
        </div>
    );
}

function App() {
    return (
        <div className="wrapper" >
            <Task />
            <Widget />
        </div>
    );
}

export default App;