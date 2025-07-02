import './index.css'
import backgroundVideo from './assets/background.mp4'
import profile from './assets/profile_bulat.png'

function App() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Glassmorphism Content */}
      <div className="relative z-10 text-center px-8">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-10 rounded-2xl shadow-xl max-w-md mx-auto">
          <img
            src={profile}
            alt="Profile"
            className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-white/30 shadow-md"
          />
          <h1 className="text-3xl font-bold mb-2">Afwan Sutdrajat</h1>
          <p className="text-white/80 mb-6">Website Portofolio Coming Soon</p>
          <p className="text-sm text-white/60">Sedang Dalam Tahap Pengerjaan Hehe...</p>
        </div>
      </div>
    </div>
  )
}

export default App
