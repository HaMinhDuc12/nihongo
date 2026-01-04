import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [words, setWords] = useState([]);
  const [input, setInput] = useState({ kanji: "", reading: "", meaning: "" });

  const addWord = () => {
    setWords([...words, { ...input, id: Date.now() }]);
    setInput({ kanji: "", reading: "", meaning: "" }); // Reset form
  };

  return (
    <div>
      <h1>Học Tiếng Nhật</h1>
      <input
        placeholder="Kanji"
        onChange={(e) => setInput({ ...input, kanji: e.target.value })}
      />
      <input
        placeholder="Reading"
        onChange={(e) => setInput({ ...input, reading: e.target.value })}
      />
      <input
        placeholder="Meaning"
        onChange={(e) => setInput({ ...input, meaning: e.target.value })}
      />
      <button onClick={addWord}>Thêm từ</button>

      <ul>
        {words.map((word) => (
          <li key={word.id}>
            {word.kanji} ({word.reading}): {word.meaning}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
