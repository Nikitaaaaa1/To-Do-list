import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("data")));
    console.log(tasks);
  }, []);
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(tasks));
  }, [tasks]);

  const removeItem = (posts) => {
    setTasks(tasks.filter((p) => p.value !== posts.value));
  };

  return (
    <section>
      <form>
        <input
          className="input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
          <button
              type="submit"
              onClick={(e) => {
                  if (text) {
                      e.preventDefault();
                      setTasks([...tasks, { value: text, complete: { isReady } }]);
                      setText("");
                  } else {
                      alert("you haven`t any task to do");
                  }
              }}
          >
              {" "}
              click on me
          </button>
      </form>

      <div>
        {tasks.map((p) => (
          <div className="ItemCont">
            <button onClick={() => removeItem(p)}>Delete</button>
            <div
              className="taskText"
              style={
                p.complete ? { textDecoration: "underline" } : { color: "red" }
              }
            >
              {p.value}
            </div>

            <button
              onClick={() => {
                setIsReady(!isReady);
                p.complete = isReady;
              }}
            >
              is ready
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;
