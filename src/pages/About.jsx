import React from "react";
import { motion } from "framer-motion";
import Maskot from "../assets/1.png"; // pastikan path ini benar

const About = () => {
  return (
    <div className="page-container kids-theme">
      {/* Maskot dengan animasi */}
      <motion.img
        src={Maskot}
        alt="Maskot Belajar Yuk"
        className="maskot-image"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, delay: 0.3 }}
      />

      {/* Judul */}
      <motion.h1
        className="page-title"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        👋 Hai Teman-Teman!
      </motion.h1>

      {/* Paragraf Pembuka */}
      <motion.p
        className="page-paragraph"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Selamat datang di <strong>🌈 Belajar Yuk!</strong> — tempat belajar yang seru, lucu, dan menyenangkan untuk anak-anak SD! 🎉📚
      </motion.p>

      {/* Tujuan */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="section-title">🎯 Apa Tujuannya?</h2>
        <p className="page-paragraph">
          Yuk belajar sambil bermain! Di sini kamu bisa mengerjakan soal-soal kuis dengan mudah dan seru. Tidak membosankan, karena tampilannya penuh warna dan banyak gambar! 🎨🧠
        </p>
      </motion.div>

      {/* Manfaat */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="section-title">💡 Apa Saja Manfaatnya?</h2>
        <ul className="page-list">
          <li>🕹️ Belajar sambil bermain kuis</li>
          <li>📱 Bisa diakses dari HP, tablet, atau komputer</li>
          <li>🏆 Dapat nilai dan melihat skor kamu</li>
          <li>👨‍👩‍👧 Orang tua dan guru bisa ikut membimbing juga</li>
        </ul>
      </motion.div>

      {/* Harapan */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h2 className="section-title">🚀 Harapan Kami</h2>
        <p className="page-paragraph">
          Kami ingin kamu semua semangat belajar dan menjadi anak yang pintar! 🌟
          Semoga <strong>Belajar Yuk!</strong> bisa jadi teman terbaik kamu saat belajar di rumah maupun di sekolah 🎓💖.
        </p>

        <p className="page-footer">Ayo belajar bersama dan jadi hebat! ✨💪</p>
      </motion.div>
    </div>
  );
};

export default About;
