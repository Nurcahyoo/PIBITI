import Navbar from './components/Navbar';
import SoalList from './components/SoalList';
import Footer from './components/Footer';

function App() {
    return (
      <>
        <Navbar
        title="Aplikasi Latihan Soal Matematika Dasar SD"
        description = "Belajar Matematika dengan Menyenangkan" 
        />
        <main>
          <SoalList />
        </main>
        <Footer />
      </>
    );
  }

export default App;