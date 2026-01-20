let compteurPiecePoste = 1;
        let compteurPieceEtape = 1;

        function btn1_suiv() {
            const a = document.getElementById("nbPost");
            a.classList.remove('on');
            a.classList.add('off');

            const b = document.getElementById("confPste");
            b.classList.remove("off");
            b.classList.add("on");
        }

        function next() {
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
                    <button type="button" class="btn-remove-piece" onclick="retirerPiece(this)">Retirer</button>
                </div>
                <div class="piece-row">
                    <div class="piece-field">
                        <label>Nom de la pièce</label>
                        <input type="text" class="piName" placeholder="Ex: Roue, Cadre...">
                    </div>
                    <div class="piece-field">
                        <label>Quantité max</label>
                        <input type="number" class="piQuant" min="1">
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
                    <button type="button" class="btn-remove-piece" onclick="retirerPiece(this)">Retirer</button>
                </div>
                <div class="piece-row">
                    <div class="piece-field">
                        <label>Nom de la pièce</label>
                        <input type="text" placeholder="Ex: Vis, Écrou...">
                    </div>
                    <div class="piece-field">
                        <label>Quantité</label>
                        <input type="number" min="1">
                    </div>
                </div>
            `;
            
            container.appendChild(pieceGroup);
        }

        function retirerPiece(button) {
            const pieceGroup = button.closest('.piece-group');
            pieceGroup.remove();
        }

        function terminer() {
            alert("Configuration terminée !");
            // Ici vous pouvez ajouter le code pour sauvegarder la configuration
        }