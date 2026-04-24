import { useEffect, useState } from 'react';
import './App.css';
import { fetchPolls, createPoll, voteOnPoll } from './api/polls';
import CreatePollForm from './components/CreatePollForm';
import PollList from './components/PollList';
import Auth from './components/Auth';

function App() {
  const [user, setUser] = useState(null);
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is logged in (e.g., from localStorage)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadPolls();
    }
  }, [user]);

  async function loadPolls() {
    try {
      setLoading(true);
      setError('');
      const data = await fetchPolls();
      setPolls(data);
    } catch (err) {
      setError(err.message || 'Something went wrong while loading polls.');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreatePoll(formData) {
    const pollToSend = {
      question: formData.question,
      createdBy: user.username,
      options: formData.options
        .filter((opt) => opt.trim() !== '')
        .map((opt) => ({
          voteOptions: opt,
          voteCount: 0,
        })),
    };

    try {
      setError('');
      await createPoll(pollToSend);
      await loadPolls();
      return true;
    } catch (err) {
      setError(err.message || 'Could not create poll.');
      return false;
    }
  }

  async function handleVote(pollId, optionIndex) {
    try {
      setError('');
      await voteOnPoll(pollId, optionIndex);
      await loadPolls();
    } catch (err) {
      setError(err.message || 'Could not submit vote.');
    }
  }

  function handleAuthSuccess(loggedInUser) {
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem('user');
  }

  if (!user) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Voting App</h1>
        </header>
        <main className="app-main">
          <Auth onAuthSuccess={handleAuthSuccess} />
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Voting App</h1>
          <div className="user-info">
            <span>Welcome, <strong>{user.username}</strong></span>
            <button className="link-btn logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <section className="create-poll-section">
          <h2>Create a New Poll</h2>
          <CreatePollForm onCreatePoll={handleCreatePoll} />
        </section>

        <section className="polls-section">
          <h2>Available Polls</h2>

          {loading && <p>Loading polls...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && !error && (
            <PollList polls={polls} onVote={handleVote} />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;