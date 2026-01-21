let compteurPiecePoste = 1;
let compteurPieceEtape = 1;
let configuration = {
    nbPostes: 0,
    postes: []
};

function btn1_suiv() {
    const nbPostes = document.getElementById("inputNbPosts").value;
    
    if (!nbPostes || nbPostes < 1) {
        alert("Veuillez entrer un nombre de postes valide (minimum 1)");
        return;
    }
    
    configuration.nbPostes = parseInt(nbPostes);
    
    const a = document.getElementById("nbPost");
    a.classList.remove('on');
    a.classList.add('off');

    const b = document.getElementById("confPste");
    b.classList.remove("off");
    b.classList.add("on");
}

function next() {
    const nbEtapes = document.getElementById("inputNbEtapes").value;
    
    if (!nbEtapes || nbEtapes < 1) {
        alert("Veuillez entrer un nombre d'étapes valide (minimum 1)");
        return;
    }
    
    // Récupérer toutes les pièces du poste
    const piecesPoste = [];
    const piecesGroups = document.querySelectorAll("#piecesPosteContainer .piece-group");
    
    piecesGroups.forEach(group => {
        const nom = group.querySelector(".piName").value;
        const quantite = group.querySelector(".piQuant").value;
        
        if (nom && quantite) {
            piecesPoste.push({
                nom: nom,
                quantiteMax: parseInt(quantite)
            });
        }
    });
    
    if (piecesPoste.length === 0) {
        alert("Veuillez ajouter au moins une pièce pour ce poste");
        return;
    }
    
    configuration.postes.push({
        nbEtapes: parseInt(nbEtapes),
        pieces: piecesPoste,
        etapes: []
    });
    
    const a = document.getElementById("confPste");
    a.classList.remove('on');
    a.classList.add('off');

    const b = document.getElementById("confEtp");
    b.classList.remove("off");
    b.classList.add("on");
}

function ajouterPiecePoste() {
    compteurPiecePoste++;
    const container = document.getElementById("piecesPosteContainer");
    
    const pieceGroup = document.createElement("div");
    pieceGroup.className = "piece-group";
    pieceGroup.innerHTML = `
        <div class="piece-header">
            <span class="piece-title">Pièce ${compteurPiecePoste}</span>
            <button type="button" class="btn-remove-piece" onclick="retirerPiece(this, 'poste')">Retirer</button>
        </div>
        <div class="piece-row">
            <div class="piece-field">
                <label>Nom de la pièce</label>
                <input type="text" class="piName" placeholder="Ex: Roue, Cadre...">
            </div>
            <div class="piece-field">
                <label>Quantité max</label>
                <input type="number" class="piQuant" min="1" value="1">
            </div>
        </div>
    `;
    
    container.appendChild(pieceGroup);
}

function ajouterPieceEtape() {
    compteurPieceEtape++;
    const container = document.getElementById("piecesEtapeContainer");
    
    const pieceGroup = document.createElement("div");
    pieceGroup.className = "piece-group";
    pieceGroup.innerHTML = `
        <div class="piece-header">
            <span class="piece-title">Pièce ${compteurPieceEtape}</span>
            <button type="button" class="btn-remove-piece" onclick="retirerPiece(this, 'etape')">Retirer</button>
        </div>
        <div class="piece-row">
            <div class="piece-field">
                <label>Nom de la pièce</label>
                <input type="text" class="piNameEtape" placeholder="Ex: Vis, Écrou...">
            </div>
            <div class="piece-field">
                <label>Quantité</label>
                <input type="number" class="piQuantEtape" min="1" value="1">
            </div>
        </div>
    `;
    
    container.appendChild(pieceGroup);
}

function retirerPiece(button, type) {
    const pieceGroup = button.closest('.piece-group');
    const container = pieceGroup.parentElement;
    
    // Ne pas permettre de retirer s'il ne reste qu'une seule pièce
    if (container.children.length <= 1) {
        alert("Vous devez garder au moins une pièce");
        return;
    }
    
    pieceGroup.remove();
    
    // Renuméroter les pièces restantes
    renumeroterPieces(container);
}

function renumeroterPieces(container) {
    const pieces = container.querySelectorAll('.piece-group');
    pieces.forEach((piece, index) => {
        const titre = piece.querySelector('.piece-title');
        titre.textContent = `Pièce ${index + 1}`;
    });
}

function terminer() {
    // Récupérer toutes les pièces de l'étape
    const piecesEtape = [];
    const piecesGroups = document.querySelectorAll("#piecesEtapeContainer .piece-group");
    
    piecesGroups.forEach(group => {
        const nom = group.querySelector(".piNameEtape").value;
        const quantite = group.querySelector(".piQuantEtape").value;
        
        if (nom && quantite) {
            piecesEtape.push({
                nom: nom,
                quantite: parseInt(quantite)
            });
        }
    });
    
    if (piecesEtape.length === 0) {
        alert("Veuillez ajouter au moins une pièce pour cette étape");
        return;
    }
    
    // Ajouter l'étape au dernier poste
    const dernierPoste = configuration.postes[configuration.postes.length - 1];
    dernierPoste.etapes.push({
        pieces: piecesEtape
    });
    
    // Afficher la configuration finale
    console.log("Configuration finale:", configuration);
    alert("Configuration terminée !\nVérifiez la console pour voir les données.");
    
    // Ici vous pouvez sauvegarder la configuration dans le localStorage ou l'envoyer au serveur
    sauvegarderConfiguration();
}

function sauvegarderConfiguration() {
    // Sauvegarder dans le localStorage
    localStorage.setItem('cesibike_config', JSON.stringify(configuration));
    console.log("Configuration sauvegardée:", configuration);
}

// Fonction pour charger la configuration sauvegardée
function chargerConfiguration() {
    const saved = localStorage.getItem('cesibike_config');
    if (saved) {
        configuration = JSON.parse(saved);
        console.log("Configuration chargée:", configuration);
        return configuration;
    }
    return null;
}