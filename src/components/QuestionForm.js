import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  function handleAnswerChange(index, value) {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddQuestion({
      prompt,
      answers,
      correctIndex: Number(correctIndex),
    });
    setPrompt("");
    setAnswers(["", "", "", ""]);
    setCorrectIndex(0);
  }

  return (
    <section>
      <h2>New Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Prompt:{" "}
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
          </label>
        </div>
        {answers.map((ans, i) => (
          <div key={i}>
            <label>
              Answer {i + 1}:{" "}
              <input
                type="text"
                value={ans}
                onChange={(e) => handleAnswerChange(i, e.target.value)}
                required
              />
            </label>
          </div>
        ))}
        <div>
          <label>
            Correct Answer:{" "}
            <select
              value={correctIndex}
              onChange={(e) => setCorrectIndex(Number(e.target.value))}
            >
              {answers.map((_, i) => (
                <option key={i} value={i}>
                  {`Answer ${i + 1}`}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;