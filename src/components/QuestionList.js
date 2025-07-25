import React from "react";

function QuestionList({ questions, onDeleteQuestion, onUpdateQuestion }) {
  return (
    <section>
      <h2>Questions</h2>
      <ul>
        {questions.map((q) => (
          <li key={q.id}>
            <strong>{q.prompt}</strong>
            <ol type="A">
              {q.answers.map((a, i) => (
                <li
                  key={i}
                  style={{
                    fontWeight: i === q.correctIndex ? "bold" : "normal",
                  }}
                >
                  {a}
                </li>
              ))}
            </ol>
            <label>
              Correct Answer:
              <select
                aria-label="Correct Answer"
                value={q.correctIndex}
                onChange={(e) =>
                  onUpdateQuestion(q.id, Number(e.target.value))
                }
              >
                {q.answers.map((_, i) => (
                  <option key={i} value={i}>
                    {`Answer ${i + 1}`}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={() => onDeleteQuestion(q.id)}>
              Delete Question
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;