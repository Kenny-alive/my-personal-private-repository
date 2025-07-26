import { Routes, Route } from 'react-router';
import App from './App';
import About from './About';
import NotFound from './NotFound';

export default function RouterWrapper() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
