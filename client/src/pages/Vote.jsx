import { useState, useEffect } from 'react';

function Vote() {
  const [participants, setParticipants] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [voterData, setVoterData] = useState({ name: '', email: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      fetch('http://localhost:3001/api/participants')
        .then(res => res.json())
        .then(data => setParticipants(data))
        .catch(err => console.error('Error fetching participants:', err));
    }
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (voterData.name && voterData.email) {
      setIsLoggedIn(true);
    }
  };

  const handleVote = async () => {
    if (!selectedProject) return;

    setStatus('Enviando voto...');
    try {
      const res = await fetch('http://localhost:3001/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participantId: selectedProject.id,
          voterName: voterData.name,
          voterEmail: voterData.email
        })
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Voto computado com sucesso!');
        setSelectedProject(null);
        // Optional: Redirect to awards or show success message and logout
      } else {
        setStatus('Erro: ' + data.error);
      }
    } catch (err) {
      setStatus('Erro ao conectar com o servidor.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto glass-card mt-20">
        <h2 className="text-3xl font-bold mb-6 text-center neon-text">Identificação</h2>
        <p className="text-gray-300 mb-6 text-center">Informe seus dados para acessar a votação.</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Seu Nome</label>
            <input
              type="text"
              required
              className="input-field"
              value={voterData.name}
              onChange={e => setVoterData({...voterData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Seu Email</label>
            <input
              type="email"
              required
              className="input-field"
              value={voterData.email}
              onChange={e => setVoterData({...voterData, email: e.target.value})}
            />
          </div>
          <button type="submit" className="w-full btn-primary mt-4">Acessar Votação</button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold neon-text">Vote no Melhor Projeto</h2>
        <div className="text-right">
          <p className="text-sm text-gray-400">Logado como:</p>
          <p className="text-neon-cyan">{voterData.name}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {participants.map(p => (
          <div key={p.id} className="glass-card hover:border-neon-purple/50 transition-all cursor-pointer group" onClick={() => setSelectedProject(p)}>
            <h3 className="text-xl font-bold text-neon-cyan mb-2 group-hover:text-neon-purple transition-colors">{p.project_name}</h3>
            <p className="text-gray-400 text-sm mb-4">por {p.name}</p>
            <p className="text-gray-300 line-clamp-3">{p.info}</p>
            <button className="mt-4 text-neon-purple text-sm group-hover:underline">Votar neste projeto &rarr;</button>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-card max-w-md w-full relative">
            <button 
              onClick={() => { setSelectedProject(null); setStatus(''); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-4 text-white">Confirmar Voto</h3>
            <p className="mb-6 text-gray-300">
              Você está votando em <span className="text-neon-cyan font-bold">{selectedProject.project_name}</span>.
              <br/>
              <span className="text-sm text-gray-500">Atenção: Este voto é definitivo.</span>
            </p>
            
            <button onClick={handleVote} className="w-full btn-primary">Confirmar Voto</button>
            {status && <p className="text-center mt-4 text-neon-cyan">{status}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Vote;
