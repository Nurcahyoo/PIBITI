function SoalCard({ soal, opsi }) {
    return (
        <div
            className="card"
            style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            }}
        >
            {/* Soal */}
            <p style={{ fontWeight: 'bold' }}>{soal}</p>

            {/* Tombol Opsi */}
            <div
            style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}
            >
            {opsi.map((item, index) => (
                <button key={index}>{item}</button>
            ))}
            </div>
        </div>
    );
}

export default SoalCard;
