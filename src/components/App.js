import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => {
        if (isMounted) setQuestions(data);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  function handleAddQuestion(newQuestion) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((r) => r.json())
      .then((addedQuestion) => setQuestions((qs) => [...qs, addedQuestion]));
  }

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setQuestions((qs) => qs.filter((q) => q.id !== id));
    });
  }

  function handleUpdateQuestion(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQ) =>
        setQuestions((qs) =>
          qs.map((q) => (q.id === id ? updatedQ : q))
        )
      );
  }

  return (
    <main>
      <h1>Quiz Admin</h1>
      <button onClick={() => setShowForm((f) => !f)}>
        {showForm ? "View Questions" : "New Question"}
      </button>
      {showForm ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;