import React from "react";

const Contact = () => {
  return (
    <div className="page-container kids-theme">
      <h1 className="page-title">📬 Kontak Kami</h1>
      <p className="page-paragraph">
        Ada pertanyaan? Atau ingin memberi saran? 🌟 Kamu (atau Ayah/Bunda) bisa hubungi kami ya!
      </p>

      <div className="contact-section">
        <h2 className="section-title">📇 Hubungi Kami di:</h2>
        <p className="page-paragraph"><strong>👤 Nama:</strong> Tim Belajar Yuk!</p>
        <p className="page-paragraph"><strong>📧 Email:</strong> belajar.yuk@edukreatif.com</p>
        <p className="page-paragraph"><strong>📞 Telepon:</strong> 0812-3456-7890</p>
      </div>

      <div className="contact-section">
        <h2 className="section-title">🏠 Kantor Kami</h2>
        <p className="page-paragraph">
          Jl. Ceria No. 45,<br />
          Kota Anak Pintar, Indonesia 🌍
        </p>
      </div>

      <p className="page-footer">Kami tunggu pesan dari kamu ya! 💌😊</p>
    </div>
  );
};

export default Contact;
