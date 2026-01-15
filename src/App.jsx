import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [words, setWords] = useState([]);
  const [input, setInput] = useState({ kanji: "", reading: "", meaning: "" });

  // States cho trắc nghiệm
  const [quizWord, setQuizWord] = useState(null);
  const [options, setOptions] = useState([]);

  const addWord = () => {
    if (!input.kanji || !input.meaning)
      return alert("Vui lòng nhập đủ Kanji và nghĩa!");
    setWords([...words, { ...input, id: Date.now() }]);
    setInput({ kanji: "", reading: "", meaning: "" });
  };

  const deleteWord = (id) => {
    setWords(words.filter((w) => w.id !== id));
  };

  // Logic tạo câu hỏi trắc nghiệm
  const startQuiz = () => {
    if (words.length < 4) return alert("Cần ít nhất 4 từ để tạo trắc nghiệm!");

    // 1. Chọn từ đúng
    const correct = words[Math.floor(Math.random() * words.length)];

    // 2. Lấy 3 từ sai (ngẫu nhiên từ các từ còn lại)
    const others = words.filter((w) => w.id !== correct.id);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random());
    const distractors = shuffledOthers.slice(0, 3);

    // 3. Trộn từ đúng vào danh sách đáp án
    const allChoices = [...distractors, correct].sort(
      () => 0.5 - Math.random()
    );

    setQuizWord(correct);
    setOptions(allChoices);
  };

  const handleAnswer = (selectedId) => {
    if (selectedId === quizWord.id) {
      startQuiz(); // Đổi câu hỏi mới
    } else {
      alert(`Sai rồi! Đáp án đúng là: ${quizWord.meaning}`);
    }
  };

  return (
    <div className="container">
      <h1>Học Tiếng Nhật</h1>

      {/* Form nhập từ */}
      <div className="form">
        <input
          placeholder="Kanji"
          value={input.kanji}
          onChange={(e) => setInput({ ...input, kanji: e.target.value })}
        />
        <input
          placeholder="Reading"
          value={input.reading}
          onChange={(e) => setInput({ ...input, reading: e.target.value })}
        />
        <input
          placeholder="Meaning"
          value={input.meaning}
          onChange={(e) => setInput({ ...input, meaning: e.target.value })}
        />
        <button onClick={addWord}>Thêm từ</button>
      </div>

      <hr />

      {/* Danh sách từ vựng */}
      <div className="list-section">
        <h2>Danh sách của bạn</h2>
        <ul>
          {words.map((word) => (
            <li key={word.id}>
              {word.kanji} ({word.reading}): {word.meaning}
              <button
                onClick={() => deleteWord(word.id)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                Xóa
              </button>
            </li>
          ))}
        </ul>
      </div>

      <hr />

      {/* Phần Trắc nghiệm */}
      <div className="quiz-section">
        <h2>Luyện tập</h2>
        <button onClick={startQuiz}>Bắt đầu trắc nghiệm</button>

        {quizWord && (
          <div className="quiz-box">
            <p>
              Nghĩa của từ <strong>{quizWord.kanji}</strong> là gì?
            </p>
            <div className="options-grid">
              {options.map((opt) => (
                <button key={opt.id} onClick={() => handleAnswer(opt.id)}>
                  {opt.meaning}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
