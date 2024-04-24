import React, { useState, useEffect } from 'react';

function Petition() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState('');
  const [signatures, setSignatures] = useState([]);

  useEffect(() => {
    fetch('/signatures')
      .then(response => response.json())
      .then(data => setSignatures(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/signatures', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, comments })
    })
      .then(response => response.json())
      .then(data => {
        setSignatures([...signatures, data.signature]);
        setName('');
        setEmail('');
        setComments('');
      });
  };

  return (
    <div>
      <h1>Sign the Petition</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Comments:
          <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
        </label>
        <button type="submit">Sign</button>
      </form>
      <h2>People who have signed the petition:</h2>
      <ul>
        {signatures.map((signature, index) => (
          <li key={index}>{signature}</li>
        ))}
      </ul>
    </div>
  );
}

export default ReactPetition;