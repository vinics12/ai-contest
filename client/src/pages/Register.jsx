import { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    projectName: '',
    info: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Enviando...');
    try {
      const res = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Inscrição realizada com sucesso!');
        setFormData({ name: '', projectName: '', info: '' });
      } else {
        setStatus('Erro: ' + data.error);
      }
    } catch (err) {
      setStatus('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto glass-card mt-10">
      <h2 className="text-3xl font-bold mb-8 text-center neon-text">Inscrição de Projeto</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Nome do Participante</label>
          <input
            type="text"
            required
            className="input-field"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            placeholder="Seu nome completo"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Nome do Projeto</label>
          <input
            type="text"
            required
            className="input-field"
            value={formData.projectName}
            onChange={e => setFormData({...formData, projectName: e.target.value})}
            placeholder="Nome inovador do seu projeto"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Informações do Projeto</label>
          <textarea
            className="input-field h-32 resize-none"
            value={formData.info}
            onChange={e => setFormData({...formData, info: e.target.value})}
            placeholder="Descreva o que sua IA faz..."
          />
        </div>
        <button type="submit" className="w-full btn-primary mt-4">
          Inscrever
        </button>
        {status && <p className="text-center mt-4 text-neon-cyan">{status}</p>}
      </form>
    </div>
  );
}

export default Register;
