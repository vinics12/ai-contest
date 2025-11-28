const Database = require('better-sqlite3');
const path = require('path');

const db = new Database('contest.db', { verbose: console.log });

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS participants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    project_name TEXT NOT NULL,
    info TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    participant_id INTEGER NOT NULL,
    voter_name TEXT NOT NULL,
    voter_email TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (participant_id) REFERENCES participants (id),
    UNIQUE(voter_email)
  );
`);

module.exports = {
  getParticipants: () => {
    return db.prepare('SELECT * FROM participants').all();
  },
  addParticipant: (name, projectName, info) => {
    const stmt = db.prepare('INSERT INTO participants (name, project_name, info) VALUES (?, ?, ?)');
    return stmt.run(name, projectName, info);
  },
  addVote: (participantId, voterName, voterEmail) => {
    // Check if email already voted
    const existing = db.prepare('SELECT id FROM votes WHERE voter_email = ?').get(voterEmail);
    if (existing) {
      throw new Error('Este email já votou.');
    }
    const stmt = db.prepare('INSERT INTO votes (participant_id, voter_name, voter_email) VALUES (?, ?, ?)');
    return stmt.run(participantId, voterName, voterEmail);
  },
  getResults: () => {
    return db.prepare(`
      SELECT p.id, p.name, p.project_name, p.info, COUNT(v.id) as vote_count
      FROM participants p
      LEFT JOIN votes v ON p.id = v.participant_id
      GROUP BY p.id
      ORDER BY vote_count DESC
    `).all();
  }
};
