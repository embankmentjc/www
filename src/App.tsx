import { Routes, Route } from 'react-router-dom'
import ScrollToHash from './components/ScrollToHash'

// Pages
import Home from '../pages/index'
import About from '../pages/about'
import Vision from '../pages/vision'
import News from '../pages/news'
import Now from '../pages/now'
import Involved from '../pages/involved'
import Newsletter from '../pages/newsletter'
import Events2024 from '../pages/2024-events'
import Events2025 from '../pages/2025-events'
import Mayoral2025 from '../pages/mayoral-2025'
import EmbankmentOnMyMind from '../pages/embankment-on-my-mind'
import BotDrawing from '../pages/bot-drawing'
import OgTest from '../pages/og-test'

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/vision" element={<Vision />} />
      <Route path="/news" element={<News />} />
      <Route path="/now" element={<Now />} />
      <Route path="/involved" element={<Involved />} />
      <Route path="/newsletter" element={<Newsletter />} />
      <Route path="/2024-events" element={<Events2024 />} />
      <Route path="/2025-events" element={<Events2025 />} />
      <Route path="/mayoral-2025" element={<Mayoral2025 />} />
      <Route path="/embankment-on-my-mind" element={<EmbankmentOnMyMind />} />
      <Route path="/bot-drawing" element={<BotDrawing />} />
      <Route path="/og-test" element={<OgTest />} />
    </Routes>
    </>
  )
}
