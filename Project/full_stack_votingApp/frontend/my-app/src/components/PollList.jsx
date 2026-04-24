function PollList({ polls, onVote }) {
    if(!polls.length) {
      return <p>No polls yet. Create one above!</p>;
    }
  
    return (
      <div className="polls-list">
        {polls.map((poll) => (
          <div key={poll.id} className="poll-card">
            <h3 className="poll-question">{poll.question}</h3>
            <p className="poll-author">Created by: <strong>{poll.createdBy || 'Anonymous'}</strong></p>
            <div className="poll-options">
              {poll.options.map((opt, index) => (
                <button
                  key={index}
                  className="option-btn"
                  onClick={() => onVote(poll.id, index)}
                >
                  {opt.voteOptions} ({opt.voteCount} votes)
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default PollList;