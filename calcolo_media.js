const voto_textbox = document.getElementById('voto');
const peso = document.getElementById('peso');
const add_button = document.getElementById('add');
const table = document.getElementById('voti');
const matematica_btn = document.getElementById('mat');
const ponderata_btn = document.getElementById('pon');
const reset = document.getElementById('reset');
const voti = [];
const pesi = [];

function votivalidi(){
    if(voti.length == 0){
        swal("Errore", "Inserisci almeno un voto", "error")
        return false;
    }
    return true;
}

reset.addEventListener('click', () => {
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
});

add_button.addEventListener('click', () => {
    const voto = parseFloat(voto_textbox.value);
    var p = parseFloat(peso.value);
    if (isNaN(voto)) {
        swal("Errore", "Inserisci un voto valido", "error")
        return;
    }
    if (isNaN(p)) {
        p = 100;
    }
    voti.push(voto);
    pesi.push(p);
    const row = table.insertRow();
    const cell1 = row.insertCell();
    const cell2 = row.insertCell();
    cell1.textContent = voto;
    cell2.textContent = p;
    voto_textbox.value = '';
    peso.value = '';
});

matematica_btn.addEventListener('click', () => {
    if (!votivalidi()) return;
    const media = calcolaMediaMatematica(voti);
    verificareMedia(media);
});

ponderata_btn.addEventListener('click', () => {
    if (!votivalidi()) return;
    const media = calcolaMediaPonderata(voti, pesi);
    verificareMedia(media);
});

function calcolaMediaMatematica(voti) {
    const sum = voti.reduce((acc, voto) => acc + voto, 0);
    return sum / voti.length;
}

function calcolaMediaPonderata(voti, pesi) {
    const sum = voti.reduce((acc, voto, index) => acc + voto * pesi[index], 0);
    const sumPesi = pesi.reduce((acc, peso) => acc + peso, 0);
    return sum / sumPesi;
}

function verificareMedia(media) {
    if (media >= 8) {
        swal({
            title: "🥳",
            text: `La tua media è di ${media}, eccezzionale!`,
        })
    } else if (media >= 6) {
        swal({
            title: "😊",
            text: `La tua media è di ${media}, molto bene!`,
        })
    } else if (media >= 4.5) {
        swal({
            title: "😐",
            text: `La tua media è di ${media}, Attento!`
        })
    } else {
        swal({
            title: "😵",
            text: `La tua media è di ${media}, sei a rischio debito!`
        })
    }
}