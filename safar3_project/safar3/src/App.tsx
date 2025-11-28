import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { FlightsPage } from './pages/FlightsPage';
import { HotelsPage } from './pages/HotelsPage';
import { TrainsPage } from './pages/TrainsPage';
import { CarsPage } from './pages/CarsPage';
import { MonitorPage } from './pages/MonitorPage';
import { AboutPage } from './pages/AboutPage';
import { AuthPage } from './pages/AuthPage';
import { UserDashboard } from './pages/UserDashboard';
import './index.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<ChatInterface />} />
                            <Route path="/flights" element={<FlightsPage />} />
                            <Route path="/hotels" element={<HotelsPage />} />
                            <Route path="/trains" element={<TrainsPage />} />
                            <Route path="/cars" element={<CarsPage />} />
                            <Route path="/monitor" element={<MonitorPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/auth" element={<AuthPage />} />
                            <Route path="/dashboard" element={<UserDashboard />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
