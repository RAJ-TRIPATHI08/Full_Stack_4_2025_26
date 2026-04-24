const BASE_URL = 'http://localhost:8080/api/polls'; // Spring Boot default port

export async function fetchPolls() {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error('Failed to load polls');
  }
  return res.json();
}

export async function createPoll(poll) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(poll),
  });

  if (!res.ok) {
    throw new Error('Failed to create poll');
  }
  return res.json();
}

export async function voteOnPoll(pollId, optionIndex) {
  const res = await fetch(`${BASE_URL}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pollId, optionIndex }),
  });

  if (!res.ok) {
    throw new Error('Failed to submit vote');
  }
}