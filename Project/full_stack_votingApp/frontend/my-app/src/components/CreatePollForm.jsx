import { useState } from 'react';

function CreatePollForm({ onCreatePoll }) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']); // start with 2 options
  const [submitting, setSubmitting] = useState(false);

  function handleOptionChange(index, value) {
    setOptions((prev) =>
      prev.map((opt, i) => (i === index ? value : opt)),
    );
  }

  function handleAddOption() {
    setOptions((prev) => [...prev, '']);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!question.trim()) return;

    const hasAtLeastTwoOptions =
      options.filter((opt) => opt.trim() !== '').length >= 2;

    if (!hasAtLeastTwoOptions) {
      alert('Please enter at least two options.');
      return;
    }

    setSubmitting(true);
    const success = await onCreatePoll({ question, options });
    setSubmitting(false);

    if (success) {
      setQuestion('');
      setOptions(['', '']);
    }
  }

  return (
    <form className="create-poll-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="poll-input"
        placeholder="Poll Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {options.map((opt, index) => (
        <input
          key={index}
          type="text"
          className="poll-input"
          placeholder="Option"
          value={opt}
          onChange={(e) => handleOptionChange(index, e.target.value)}
        />
      ))}

      <div className="create-poll-actions">
        <button
          type="button"
          className="secondary-btn"
          onClick={handleAddOption}
        >
          Add Another Poll
        </button>
        <button type="submit" className="primary-btn" disabled={submitting}>
          {submitting ? 'Creating...' : 'Create Poll'}
        </button>
      </div>
    </form>
  );
}

export default CreatePollForm;