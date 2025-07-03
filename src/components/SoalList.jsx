import SoalCard from './SoalCard';

function SoalList() {
    const daftarSoal = [
        {
            soal: '5 + 3 = ...',
            opsi: ['7', '8', '9'],
        },
        {
            soal: '6 - 2 = ...',
            opsi: ['4', '3', '5'],
        },
        {
            soal: '7 + 4 = ...',
            opsi: ['11', '9', '12'],
        },
    ];

return (
    <div>
    {daftarSoal.map((item, idx) => (
        <SoalCard key={idx} soal={item.soal} opsi={item.opsi} />
    ))}
    </div>
);
}

export default SoalList;