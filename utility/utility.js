module.exports.parcourirObjet=(obj)=>{
    let champsObjet = [];
    let champsSousObjet = [];
  
    for (const [cle, valeur] of Object.entries(obj)) {
      if (typeof valeur === 'object' && valeur !== null) {
        // Si la valeur est un objet, ajoutez ses champs au tableau correspondant
        champsSousObjet = champsSousObjet.concat(Object.keys(valeur));
      } else {
        // Sinon, ajoutez la clé au tableau des champs de l'objet
        if(cle!=='__typename'){
          champsObjet.push(cle);
        }
      }
    }
    return {champsObjet,champsSousObjet}
  }
  
  // Exemple d'utilisation avec votre objet
  // const monObjet = { id: true, articles: { content: true } };
  // parcourirObjet(monObjet);
  