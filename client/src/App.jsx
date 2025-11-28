import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Vote from './pages/Vote';
import Awards from './pages/Awards';

function App() {
  return (
    <Router>
      <div className="min-h-screen text-white font-sans">
        <nav className="p-6 flex justify-between items-center backdrop-blur-md bg-black/30 sticky top-0 z-50 border-b border-white/10">
          <Link to="/" className="text-2xl font-bold neon-text tracking-wider">AI CONTEST</Link>
          <div className="space-x-6">
            <Link to="/register" className="hover:text-neon-cyan transition-colors">Inscrição</Link>
            <Link to="/vote" className="hover:text-neon-purple transition-colors">Votação</Link>
            <Link to="/awards" className="hover:text-neon-blue transition-colors">Premiação</Link>
          </div>
        </nav>

        <main className="container mx-auto p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vote" element={<Vote />} />
            <Route path="/awards" element={<Awards />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan animate-pulse">
        O Futuro da IA
      </h1>
      <p className="text-xl text-gray-300 mb-10 max-w-2xl">
        Participe, vote e descubra os projetos mais inovadores criados com Inteligência Artificial.
      </p>
      <div className="flex gap-6">
        <Link to="/register" className="btn-primary">
          Inscrever Projeto
        </Link>
        <Link to="/vote" className="px-6 py-2 rounded-lg border border-neon-blue text-neon-blue hover:bg-neon-blue/10 transition-all">
          Ver Projetos
        </Link>
      </div>
    </div>
  );
}

export default App;
