var chat = {
    "Vidi (Kang Galon Komplek)": [
        { t: "Om mau pesen galon?", s: 0, j: "14:28" },
        { t: "Iya dong kirim 2 ya", s: 1, j: "14:29" },
        { t: "galonnyo om 🤏🤏", s: 0, j: "14:30" }
    ],
    "Karsten (Kang Wifi Indigo)": [
        { t: "Bang wifi mati dari tadi", s: 1, j: "12:10" },
        { t: "Wifi Gangguan om lagi diperbaiki", s: 0, j: "12:13" }
    ],
    "Alvaro (Kang Bangunan)": [
        { t: "Kang tolong pasang keramik ya", s: 1, j: "10:18" },
        { t: "Siap om laksanakan", s: 0, j: "10:20" }
    ],
    "Prince (Kang Utang)": [
        { t: "Halo bang apa kabar?", s: 0, j: "Kemarin" },
        { t: "Baik ada apa?", s: 1, j: "Kemarin" },
        { t: "pinjem 100 bang 😀", s: 0, j: "Kemarin" }
    ],
    "Irvin (Pebasket)": [
        { t: "latihan dk vin?", s: 0, j: "30 Apr" },
        { t: "latihan la", s: 1, j: "30 Apr" }
    ],
    "Zahran (Teman Mabar)": [
        { t: "maen dk ran?", s: 0, j: "29 Apr" },
        { t: "gas wi", s: 1, j: "29 Apr" }
    ],
    "Farzan (Pak RT)": [
        { t: "Bro agek tolong bantu umumke acara 17an", s: 0, j: "20 Apr" },
        { t: "siap pak kabarke b kapan", s: 1, j: "20 Apr" }
    ],
    "Dravin (Teman Irvin Basket)": [
        { t: "latihan dk dravin?", s: 1, j: "18 Apr" },
        { t: "y", s: 0, j: "18 Apr" }
    ],
    "Diego (Pemain Futsal)": [
        { t: "latihan dk diego?", s: 1, j: "14 Apr" },
        { t: "kurang tau jugo aku", s: 0, j: "14 Apr" }
    ],
    "Kenneth Anthony (Kang Pasir)": [
        { t: "pasir satu mobil om", s: 1, j: "12 Feb" },
        { t: "siap om agek ku kirim", s: 0, j: "12 Feb" }
    ],
    "Kenny (Marbot Masjid)": [
        { t: "bro", s: 1, j: "1 Jan" },
        { t: "minjem 100 bro, lagi BU", s: 1, j: "1 Jan" },
        { t: "jgn gitu lah broo", s: 0, j: "1 Jan" }
    ],
    "Sir Ilham (Guru Coding)": [
        { t: "Selamat pagi sir", s: 1, j: "12 Des" },
        { t: "Sir izin mengumpulkan tugas coding kemarin", s: 1, j: "12 Des" },
        { t: "ini link githubnya sir https://wilbertlabs.github.io/Whatsapp-Clone-using-HTML-CSS-JS/", s: 1, j: "12 Des" },
        { t: "terima kasih sir", s: 1, j: "12 Des" }
    ]
};

var headerKanan = document.querySelector(".kanan-utama");
var btnKembali = document.createElement("button");
btnKembali.className = "btn-kembali";
btnKembali.innerHTML = "&#8592;";
headerKanan.insertBefore(btnKembali, headerKanan.firstChild);

btnKembali.onclick = function () {
    document.querySelector(".utama-kanan").classList.remove("aktif");
};

var area = document.querySelector(".isi-chat-utama");
var input = document.querySelector(".input-bawah input");
var aktif = null;

area.classList.add("empty");

// Pake AI
function buatBubble(m) {
    var kelas = m.s ? "bbl-kanan" : "bbl-kiri";
    var centang = m.s ? " ✔✔" : "";
    return (
        "<div class='bbl " + kelas + "'>" +
            m.t +
            "<div class='bbl-jam'>" + m.j + centang + "</div>" +
        "</div>"
    );
}
// End

function bukaChat(el) {
    aktif = el.querySelector("h3").textContent;
    document.querySelector(".online h3").textContent = aktif;
    document.querySelector(".img-img img").src = el.querySelector(".chat-img img").src;

    var pesan = chat[aktif] || [];
    var html = "";

    for (var i = 0; i < pesan.length; i++) {
        html += buatBubble(pesan[i]);
    }

    area.innerHTML = html;
    area.classList.remove("empty");
    area.scrollTop = area.scrollHeight;

    document.querySelector(".utama-kanan").classList.add("aktif");
}

function kirim() {
    var t = input.value.trim();
    if (!t || !aktif) return;

    var j = new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit"
    });

    if (!chat[aktif]) chat[aktif] = [];
    chat[aktif].push({ t: t, s: 1, j: j });

    area.insertAdjacentHTML("beforeend", buatBubble({ t: t, s: 1, j: j }));
    area.scrollTop = area.scrollHeight;
    input.value = "";
}

var kotakChats = document.querySelectorAll(".kotak-chat, .kotak-chat1");
for (var i = 0; i < kotakChats.length; i++) {
    kotakChats[i].onclick = function () {
        bukaChat(this);
    };
}

input.onkeydown = function (e) {
    if (e.key === "Enter") kirim();
};

document.querySelector(".pesan-kanan img").onclick = kirim;