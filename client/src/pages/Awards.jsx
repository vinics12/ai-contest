import { useState, useEffect } from 'react';

function Awards() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/results')
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error('Error fetching results:', err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
        Ranking de Vencedores
      </h2>

      <div className="space-y-6">
        {results.map((r, index) => (
          <div key={r.id} className={`glass-card flex items-center gap-6 ${index === 0 ? 'border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.2)]' : ''}`}>
            <div className={`text-4xl font-bold w-16 h-16 flex items-center justify-center rounded-full 
              ${index === 0 ? 'bg-yellow-500 text-black' : 
                index === 1 ? 'bg-gray-400 text-black' : 
                index === 2 ? 'bg-orange-700 text-white' : 'bg-dark-card text-gray-500'}`}>
              {index + 1}º
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white">{r.project_name}</h3>
              <p className="text-gray-400">por {r.name}</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-neon-cyan">{r.vote_count}</span>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Votos</p>
            </div>
          </div>
        ))}

        {results.length === 0 && (
          <p className="text-center text-gray-400">Ainda não há votos computados.</p>
        )}
      </div>
    </div>
  );
}

export default Awards;
