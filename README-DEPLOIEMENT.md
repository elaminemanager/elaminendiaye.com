# elaminendiaye.com : guide de déploiement sur Hostinger

Site statique (HTML, CSS, JS), sans base de données ni CMS. Il fonctionne sur n'importe quel hébergement web Hostinger (Single, Premium, Business) et se met en ligne en moins de 10 minutes.

## 1. Structure du site

```
public_html/
  index.html                                  Accueil (français)
  communication-c4d/index.html                Page expertise C4D (FR)
  entrepreneuriat-icc/index.html              Page expertise ICC (FR)
  en/index.html                               Home (English)
  en/c4d-communication/index.html             C4D page (EN)
  en/creative-industries-entrepreneurship/    CCI page (EN)
  assets/css/style.css                        Styles
  assets/js/main.js                           Menu mobile, animations, bandeau langue
  assets/img/                                 Portrait, favicon
  sitemap.xml                                 Plan du site pour Google
  robots.txt                                  Autorisation d'indexation
  .htaccess                                   HTTPS forcé, cache, sécurité
  404.html                                    Page d'erreur
```

## 2. Mise en ligne (hPanel)

1. Connectez-vous à hPanel, puis Sites web > Gérer (sur elaminendiaye.com).
2. Menu Fichiers > Gestionnaire de fichiers.
3. Ouvrez le dossier `public_html` et supprimez le fichier `default.php` s'il existe.
4. Cliquez sur Importer (icône en haut à droite) et déposez le fichier `elaminendiaye-site.zip`.
5. Clic droit sur le zip > Extraire, dans `public_html`. Vérifiez que `index.html` se trouve bien directement dans `public_html` (pas dans un sous-dossier `site/`). Si c'est le cas, déplacez tout le contenu d'un niveau vers le haut.
6. Supprimez le zip.

Alternative : FTP (FileZilla) avec les identifiants de hPanel > Fichiers > Comptes FTP, en envoyant le contenu du dossier `site/` dans `public_html`.

## 3. Domaine et HTTPS

1. hPanel > Domaines : vérifiez que elaminendiaye.com pointe vers l'hébergement (DNS Hostinger ou enregistrement A vers l'IP indiquée).
2. hPanel > Sécurité > SSL : installez le certificat gratuit Let's Encrypt et activez "Forcer HTTPS". Le fichier `.htaccess` fait aussi la redirection vers `https://elaminendiaye.com` sans www.

## 4. Formulaire de contact (à faire une fois)

Le site est statique : il faut un service pour recevoir les messages. Deux options.

Option A (recommandée, gratuite) : Formspree
1. Créez un compte sur formspree.io avec l'adresse elaminendiaye@noisydigital.com.
2. Créez un formulaire ; Formspree donne une URL du type `https://formspree.io/f/xxxxxxxx`.
3. Dans les 6 fichiers `index.html`, remplacez `https://formspree.io/f/REMPLACER_PAR_VOTRE_ID` par cette URL (recherche/remplacement dans le gestionnaire de fichiers ou un éditeur de texte).

Option B : ne rien faire. Tant que l'ID n'est pas remplacé, le bouton "Envoyer" ouvre le logiciel de messagerie du visiteur avec un e-mail prérempli (mailto). Cela fonctionne, mais moins de visiteurs vont au bout.

## 5. Référencement Google : les 5 actions qui comptent

1. Google Search Console : ajoutez la propriété `elaminendiaye.com`, validez-la (méthode DNS ou fichier HTML), puis soumettez `https://elaminendiaye.com/sitemap.xml`.
2. Google Business Profile : créez une fiche "El Amine Ndiaye - Consultant" (catégorie Consultant / Agence de communication), localisée à Dakar, avec le site en lien. C'est le levier le plus rapide pour apparaître sur "consultant communication Dakar".
3. LinkedIn : ajoutez elaminendiaye.com dans la rubrique "Site web" du profil et dans la section Infos. Les liens LinkedIn > site sont lus par Google.
4. Backlinks : demandez à ajouter un lien depuis noisydigital.com et amazingafrika.org vers elaminendiaye.com (page équipe ou fondateur). Idem pour les annuaires YALI / Mandela Washington Fellowship alumni et les pages partenaires des programmes auxquels vous participez.
5. Contenu : publiez une étude de cas ou un article tous les 1 à 2 mois (par exemple "Comment concevoir une campagne C4D sur la migration" ou "Financer une startup créative à Dakar"). Chaque article = une nouvelle porte d'entrée Google. Il suffit de créer un dossier `blog/mon-article/index.html` sur le modèle des pages existantes et de l'ajouter au `sitemap.xml`.

Ce qui est déjà en place dans le code :
- titres et descriptions optimisés sur chaque page (mots-clés : consultant expert, communication pour le développement, C4D, entrepreneuriat ICC, Dakar, Sénégal, Afrique de l'Ouest)
- balises hreflang FR/EN et canonical sur toutes les pages
- données structurées Schema.org (Person, ProfessionalService, FAQPage, BreadcrumbList)
- sitemap XML multilingue, robots.txt, page 404
- site rapide (pas de framework, fichiers légers), lisible sur mobile

## 6. Personnalisation

- Portrait : trois fichiers dans `assets/img/` : `portrait-card.jpg` (format 4:5, 960 x 1200 px, carte postale de l'accueil), `portrait-square.jpg` (carré 1200 x 1200 px, vignette du bloc contact et aperçus LinkedIn / WhatsApp) et `portrait.png` (rond, non utilisé actuellement, disponible si besoin). Pour changer de photo, remplacez ces fichiers en conservant les mêmes noms et proportions.
- Mots animés du hero ("consultant", "stratège", "producteur", "coach") : modifiables dans l'attribut `data-words` de la balise `hero__word` de chaque page d'accueil, mots séparés par `|`.
- Textes : modifiez directement les fichiers `index.html` (les textes sont en clair, aucun outil requis). Pensez à modifier les deux langues.
- Couleurs et polices : tout est dans `assets/css/style.css`, bloc `:root` en haut du fichier.
- Adresse e-mail dédiée : vous pouvez créer contact@elaminendiaye.com dans hPanel > E-mails, puis remplacer `elaminendiaye@noisydigital.com` dans les pages.
- Statistiques : ajoutez le script Google Analytics 4 (ou Plausible) juste avant `</head>` dans chaque page.

## 7. Pourquoi pas Wix

Un site créé dans l'éditeur Wix ne peut pas être exporté ni hébergé ailleurs. Ce site reproduit la direction artistique du modèle Wix de référence (fond crème, serif Bodoni, mot animé dans le hero, composition carte postale, grille pleine largeur, témoignage sur dégradé ciel, icônes sociales verticales) en code standard : il est hébergeable chez Hostinger, plus rapide, mieux référencé et sans abonnement supplémentaire.
