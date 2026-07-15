/* ============================================================
   articles.js — SOURCE DE VÉRITÉ du blog.
   Ajouter un article = ajouter un objet ici + créer le fichier
   HTML correspondant dans /articles/. Rien d'autre à toucher :
   les rubriques, filtres et compteurs sont déduits de ce tableau.
   ============================================================ */

const ARTICLES = [
  {
    id: "bains-froids",
    titre: "Le bain froid et le Hulk",
    rubrique: "Récupération & santé",
    date: "2026-07-15",            // format ISO (AAAA-MM-JJ), utilisé pour le tri
    resume: "Ce que dit la science récente de l'immersion froide, relu pour un cycle force.",
    url: "articles/bains-froids.html",
    tempsLecture: 6,               // minutes
    tags: ["froid", "récupération", "hypertrophie"]
  }
  // ↓ Ajouter les nouveaux articles ici (l'ordre importe peu,
  //   la liste est triée par date décroissante à l'affichage).
];
