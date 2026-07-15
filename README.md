# Carnet de bord — blog statique

Blog personnel en HTML/CSS/JS pur, sans framework, sans build, sans backend.
Fonctionne en local (double-clic sur `index.html`, protocole `file://`) comme sur GitHub Pages.

## Arborescence

```
/index.html                  → accueil : liste + filtres par rubrique + recherche
/articles.js                 → tableau ARTICLES (source de vérité des métadonnées)
/assets/style.css            → design system partagé (clair + sombre automatique)
/assets/article.css          → styles du gabarit d'article
/assets/covers/              → couvertures d'articles (SVG/images locales, 16:9)
/articles/bains-froids.html  → article de référence (gabarit complet)
/README.md                   → ce fichier
/.nojekyll                   → désactive le traitement Jekyll sur GitHub Pages
```

Le thème clair/sombre suit automatiquement le réglage du téléphone
(`prefers-color-scheme`) : rien à configurer, tout passe par les variables
CSS de `assets/style.css` (et les `<meta name="theme-color">` pour la barre
Safari sur iPhone).

## 1. Ajouter un article

### a) Dupliquer le gabarit

Copier `articles/bains-froids.html` sous un nouveau nom, par ex. `articles/sommeil-profond.html`.
C'est l'implémentation de référence du gabarit : tous les composants y sont illustrés.

Dans le fichier copié, remplir dans l'ordre :

1. `<title>` et `<meta name="description">` ;
2. le **masthead** : kicker (sur-titre mono), `<h1>`, chapô (`.standfirst`), byline (`<time datetime="AAAA-MM-JJ">`, temps de lecture) ;
3. le **corps** : sections numérotées (`.section-label` « 01 — … » + `.section-title`), premier paragraphe avec `class="dropcap"` pour la lettrine.

Composants disponibles (copier-coller depuis l'article de référence) :

| Composant | Classe(s) | Usage |
|---|---|---|
| Surlignage feutre | `<mark>`, `<mark class="attention">`, `<mark class="positif">` | chiffres/faits marquants dans les phrases |
| Encart chiffre-clé | `.keydata` (+ `attention`, `positif` ou `retenir`) | un gros chiffre isolé + label |
| Pull-quote | `.pull-quote` | citation en exergue |
| Note pratique | `.tip` | conseil actionnable |
| Comparatif 2 colonnes | `.comparatif` > `.colonne.faire` / `.colonne.eviter` | à faire (coches) / à éviter (croix) |
| Tableau récap | `.recap` avec `<caption>` et `<th scope="row">` | protocole clé → valeur |
| Séparateur | `<hr class="section-sep">` | entre sections |
| Footer article | `.article-footer` (`.sources` + `.disclaimer`) | sources cliquables + avertissement |

La barre de progression et le lien retour font partie du gabarit : ne pas y toucher.

### b) Déclarer l'article dans `articles.js`

Ajouter une entrée au tableau `ARTICLES` :

```js
{
  id: "sommeil-profond",                  // = nom du fichier sans .html
  titre: "Dormir comme un ours",
  rubrique: "Récupération & santé",       // libre : une nouvelle rubrique crée son filtre automatiquement
  date: "2026-08-02",                     // ISO AAAA-MM-JJ (sert au tri)
  resume: "Une ou deux phrases affichées sur la carte d'accueil.",
  url: "articles/sommeil-profond.html",
  tempsLecture: 5,                        // minutes
  tags: ["sommeil", "récupération"],      // utilisés par la recherche
  emoji: "😴",                            // optionnel : pastille + couverture générée
  image: "assets/covers/sommeil-profond.svg",  // optionnel : couverture 16:9
  imageAlt: "Description de l'illustration"    // avec image, pour l'accessibilité
}
```

**Couvertures** : déposer un visuel **16:9** (SVG ou image) dans `assets/covers/`,
nommé comme l'`id` de l'article. Sans champ `image`, la carte reçoit
automatiquement une couverture générée : dégradé de la couleur de la rubrique
+ l'`emoji` de l'article (ou 📝 par défaut) — aucun article n'a de carte « nue ».
Pour l'afficher aussi en tête d'article, reprendre la balise
`<img class="article-cover" …>` du gabarit (chemin préfixé `../`).

C'est tout. Les rubriques, les compteurs, les couleurs de pastille et les filtres
sont déduits automatiquement du tableau — rien d'autre à modifier.

## 2. Déployer sur GitHub Pages

1. Créer un dépôt GitHub (ex. `blog`) et pousser tous les fichiers **à la racine** de la branche `main` :

   ```bash
   git init
   git add .
   git commit -m "Premier déploiement du blog"
   git branch -M main
   git remote add origin https://github.com/<utilisateur>/blog.git
   git push -u origin main
   ```

2. Sur GitHub : **Settings → Pages → Build and deployment** :
   - *Source* : « Deploy from a branch » ;
   - *Branch* : `main`, dossier `/ (root)` ;
   - enregistrer.

3. Le site est servi sous `https://<utilisateur>.github.io/blog/` après une à deux minutes.

**Rôle du `.nojekyll`** : GitHub Pages passe par défaut les fichiers dans Jekyll,
qui ignore certains fichiers/dossiers (ceux préfixés par `_`) et ralentit le déploiement.
Ce fichier vide désactive complètement Jekyll : les fichiers sont servis tels quels.

Tous les chemins du site sont **relatifs** (`assets/…`, `articles/…`, `../index.html`),
donc le blog fonctionne indifféremment à la racine d'un domaine, dans un sous-chemin
GitHub Pages, ou en local en `file://`.

## 3. Convention de nommage

- **Fichiers d'articles** : `articles/<id>.html`, en minuscules, sans accents ni espaces,
  mots séparés par des tirets (*kebab-case*) : `bains-froids.html`, `gestion-planning-salle.html`.
- **`id`** : identique au nom de fichier sans l'extension (`bains-froids`).
  Il doit être unique dans `articles.js`.
- **`url`** : toujours `articles/<id>.html` (chemin relatif, pas de `/` initial).
- **`date`** : format ISO `AAAA-MM-JJ` — c'est elle qui ordonne l'accueil
  (l'affichage en français « 15 juillet 2026 » est généré automatiquement).
- **`rubrique`** : libellé libre et lisible (« Récupération & santé »).
  Réutiliser exactement la même chaîne pour regrouper des articles ;
  une chaîne nouvelle crée automatiquement un nouveau filtre avec sa couleur stable.
