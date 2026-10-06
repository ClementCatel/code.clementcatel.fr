import { defineCurriculum } from './define'

export default defineCurriculum({
  id: 'js-dom',
  title: 'Interagir avec la page en JavaScript',
  description: 'Sélectionner, modifier, créer et supprimer des éléments, et réagir aux actions de l\'utilisateur : les bases du DOM.',
  exercises: [
    {
      slug: 'selectionner',
      title: 'Sélectionner un élément et modifier son texte',
      statement: `
        document.querySelector sélectionne le premier élément de la page qui correspond à un sélecteur CSS. La propriété textContent de cet élément contient son texte : on peut la lire ou la remplacer.

        Exemple :
        const title = document.querySelector('h1');
        title.textContent = 'Bienvenue';

        Si aucun élément ne correspond au sélecteur, querySelector renvoie null et la ligne suivante provoque l'erreur "Cannot set properties of null". Vérifiez alors le sélecteur : '.city' pour une classe, 'p' pour une balise.

        Objectifs (en JavaScript, sans modifier le HTML) :
        - Remplacez le texte du nom de la carte (classe « name ») par "Alice Martin".
        - Remplacez le texte de la ville (classe « city ») par "Caen".
      `,
      starterFiles: {
        html: `
          <div class="card">
            <h2 class="name">Prénom Nom</h2>
            <p class="city">Ville</p>
          </div>
        `,
        css: `
          .card { max-width: 240px; padding: 16px; border: 1px solid #ddd; border-radius: 8px; font-family: sans-serif; }
          .name { margin: 0 0 8px; }
          .city { margin: 0; color: #666; }
        `,
        js: `
          // Modifiez les textes de la carte ici
        `,
      },
      solutionFiles: {
        html: `
          <div class="card">
            <h2 class="name">Prénom Nom</h2>
            <p class="city">Ville</p>
          </div>
        `,
        css: `
          .card { max-width: 240px; padding: 16px; border: 1px solid #ddd; border-radius: 8px; font-family: sans-serif; }
          .name { margin: 0 0 8px; }
          .city { margin: 0; color: #666; }
        `,
        js: `
          // Modifiez les textes de la carte ici
          const cardName = document.querySelector('.name');
          cardName.textContent = 'Alice Martin';

          const cardCity = document.querySelector('.city');
          cardCity.textContent = 'Caen';
        `,
      },
      tests: [
        {
          label: 'Le nom de la carte est "Alice Martin"',
          code: `return $('.name').textContent === 'Alice Martin'`,
        },
        {
          label: 'La ville de la carte est "Caen"',
          code: `return $('.city').textContent === 'Caen'`,
        },
        {
          label: 'Les textes sont modifiés avec document.querySelector et textContent',
          code: `return /document\\.querySelector\\s*\\(/.test(source) && /\\.textContent\\s*=/.test(source)`,
        },
      ],
    },
    {
      slug: 'classes',
      title: 'Ajouter et retirer des classes',
      statement: `
        La propriété classList d'un élément gère ses classes. Ajouter ou retirer une classe applique les règles CSS prévues pour elle : c'est la façon habituelle de changer l'apparence d'un élément en JavaScript.

        Exemple :
        const box = document.querySelector('.box');
        box.classList.add('selected'); // ajoute la classe
        box.classList.remove('selected'); // retire la classe

        Le nom de la classe s'écrit sans point : add('active') et non add('.active'). Le point sert seulement dans les sélecteurs, comme querySelector('.active').

        Objectifs (en JavaScript, sans modifier le HTML) :
        - Ajoutez la classe « active » à l'élément Contact (classe « contact »).
        - Retirez la classe « active » de l'élément Accueil (classe « home »).
        - Affichez le message (classe « alert ») en retirant sa classe « hidden ».
      `,
      starterFiles: {
        html: `
          <ul class="menu">
            <li class="home active">Accueil</li>
            <li class="blog">Blog</li>
            <li class="contact">Contact</li>
          </ul>
          <p class="alert hidden">Nouveau message de Bob</p>
        `,
        css: `
          body { font-family: sans-serif; }
          .menu { display: flex; gap: 8px; padding: 0; list-style: none; }
          .menu li { padding: 6px 12px; border-radius: 6px; }
          .active { background: #2563eb; color: white; }
          .alert { padding: 8px 12px; background: #fef3c7; border-radius: 6px; }
          .hidden { display: none; }
        `,
        js: `
          // Modifiez les classes ici
        `,
      },
      solutionFiles: {
        html: `
          <ul class="menu">
            <li class="home active">Accueil</li>
            <li class="blog">Blog</li>
            <li class="contact">Contact</li>
          </ul>
          <p class="alert hidden">Nouveau message de Bob</p>
        `,
        css: `
          body { font-family: sans-serif; }
          .menu { display: flex; gap: 8px; padding: 0; list-style: none; }
          .menu li { padding: 6px 12px; border-radius: 6px; }
          .active { background: #2563eb; color: white; }
          .alert { padding: 8px 12px; background: #fef3c7; border-radius: 6px; }
          .hidden { display: none; }
        `,
        js: `
          // Modifiez les classes ici
          const contactItem = document.querySelector('.contact');
          contactItem.classList.add('active');

          const homeItem = document.querySelector('.home');
          homeItem.classList.remove('active');

          const message = document.querySelector('.alert');
          message.classList.remove('hidden');
        `,
      },
      tests: [
        {
          label: 'L\'élément Contact a la classe « active »',
          code: `return $('.contact').classList.contains('active')`,
        },
        {
          label: 'L\'élément Accueil n\'a plus la classe « active »',
          code: `return !$('.home').classList.contains('active')`,
        },
        {
          label: 'Le message est visible',
          code: `return !$('.alert').classList.contains('hidden') && style($('.alert')).display !== 'none'`,
        },
        {
          label: 'Les classes sont modifiées avec classList.add et classList.remove',
          code: `return /classList\\.add\\s*\\(/.test(source) && /classList\\.remove\\s*\\(/.test(source)`,
        },
      ],
    },
    {
      slug: 'click',
      title: 'Réagir à un clic',
      statement: `
        La méthode addEventListener exécute une fonction chaque fois qu'un événement se produit sur un élément. Elle reçoit le nom de l'événement ('click' pour un clic) et la fonction à exécuter, écrite directement à cet endroit, sans nom.

        Exemple :
        button.addEventListener('click', function () { console.log('Clic !'); });

        Une variable déclarée dans la fonction repart de sa valeur de départ à chaque clic. Pour compter les clics, déclarez le compteur en dehors de la fonction.

        Objectifs :
        - À chaque clic sur le bouton J'aime (classe « like »), augmentez de 1 le nombre affiché dans « count ».
        - Au clic sur le bouton Thème sombre (classe « theme »), ajoutez la classe « dark » au body.
      `,
      starterFiles: {
        html: `
          <div class="post">
            <p>Photo de vacances de Bob</p>
            <button class="like">J'aime</button>
            <span class="count">0</span>
          </div>
          <button class="theme">Thème sombre</button>
        `,
        css: `
          body { font-family: sans-serif; padding: 16px; }
          .post { padding: 12px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 16px; }
          .dark { background: #1f2937; color: white; }
        `,
        js: `
          // Gérez les clics ici
        `,
      },
      solutionFiles: {
        html: `
          <div class="post">
            <p>Photo de vacances de Bob</p>
            <button class="like">J'aime</button>
            <span class="count">0</span>
          </div>
          <button class="theme">Thème sombre</button>
        `,
        css: `
          body { font-family: sans-serif; padding: 16px; }
          .post { padding: 12px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 16px; }
          .dark { background: #1f2937; color: white; }
        `,
        js: `
          // Gérez les clics ici
          const likeButton = document.querySelector('.like');
          const likeCount = document.querySelector('.count');
          let likes = 0;

          likeButton.addEventListener('click', function () {
            likes = likes + 1;
            likeCount.textContent = likes;
          });

          const themeButton = document.querySelector('.theme');
          const body = document.querySelector('body');

          themeButton.addEventListener('click', function () {
            body.classList.add('dark');
          });
        `,
      },
      tests: [
        {
          label: 'Un clic sur J\'aime affiche 1',
          code: `$('.like').click(); return $('.count').textContent === '1'`,
        },
        {
          label: 'Chaque clic sur J\'aime ajoute 1',
          code: `$('.like').click(); $('.like').click(); return $('.count').textContent === '3'`,
        },
        {
          label: 'Un clic sur Thème sombre ajoute la classe « dark » au body',
          code: `$('.theme').click(); return document.body.classList.contains('dark')`,
        },
        {
          label: 'Les clics sont gérés avec addEventListener',
          code: `return /addEventListener\\s*\\(\\s*['"]click['"]/.test(source)`,
        },
      ],
    },
    {
      slug: 'valeur-champ',
      title: 'Lire un champ de saisie',
      statement: `
        La propriété value d'un champ de saisie (input) contient le texte tapé par l'utilisateur. Pour un champ, c'est value qu'il faut utiliser, pas textContent.

        Exemple :
        console.log(input.value); // affiche le texte tapé
        input.value = ''; // vide le champ

        Lisez value dans la fonction du clic : lue au chargement de la page, elle vaut encore '' car l'utilisateur n'a rien tapé.

        Objectifs :
        - Au clic sur le bouton Saluer (classe « greet »), affichez dans « greeting » le texte "Bonjour " suivi du prénom tapé dans le champ « first-name » : "Bonjour Alice" pour Alice.
        - Videz ensuite le champ.
      `,
      starterFiles: {
        html: `
          <input class="first-name" type="text" placeholder="Votre prénom">
          <button class="greet">Saluer</button>
          <p class="greeting"></p>
        `,
        css: `
          body { font-family: sans-serif; padding: 16px; }
          input { padding: 6px 8px; }
        `,
        js: `
          // Gérez le clic sur Saluer ici
        `,
      },
      solutionFiles: {
        html: `
          <input class="first-name" type="text" placeholder="Votre prénom">
          <button class="greet">Saluer</button>
          <p class="greeting"></p>
        `,
        css: `
          body { font-family: sans-serif; padding: 16px; }
          input { padding: 6px 8px; }
        `,
        js: `
          // Gérez le clic sur Saluer ici
          const firstNameInput = document.querySelector('.first-name');
          const greetButton = document.querySelector('.greet');
          const greeting = document.querySelector('.greeting');

          greetButton.addEventListener('click', function () {
            greeting.textContent = \`Bonjour \${firstNameInput.value}\`;
            firstNameInput.value = '';
          });
        `,
      },
      tests: [
        {
          label: 'Le message salue le prénom tapé',
          code: `$('.first-name').value = 'Alice'; $('.greet').click(); return $('.greeting').textContent === 'Bonjour Alice'`,
        },
        {
          label: 'Le message change avec un autre prénom',
          code: `$('.first-name').value = 'Bob'; $('.greet').click(); return $('.greeting').textContent === 'Bonjour Bob'`,
        },
        {
          label: 'Le champ est vidé après l\'affichage du message',
          code: `$('.first-name').value = 'Zoé'; $('.greet').click(); return $('.first-name').value === '' && $('.greeting').textContent === 'Bonjour Zoé'`,
        },
      ],
    },
    {
      slug: 'submit',
      title: 'Envoyer un formulaire',
      statement: `
        Un formulaire (form) déclenche l'événement submit quand on clique sur son bouton ou qu'on appuie sur Entrée dans un de ses champs. Écouter submit sur le formulaire gère donc les deux cas, alors que click sur le bouton ignore la touche Entrée.

        Par défaut, l'envoi d'un formulaire recharge la page, ce qui efface ce que votre code a affiché. La fonction reçoit l'événement en paramètre, et event.preventDefault() annule ce rechargement.

        Exemple :
        form.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log('Formulaire envoyé');
        });

        Objectifs :
        - À l'envoi du formulaire « newsletter », empêchez le rechargement de la page.
        - Affichez alors dans « confirmation » le texte "Inscription confirmée : " suivi de l'adresse tapée dans le champ « email » : "Inscription confirmée : alice@exemple.fr".
      `,
      starterFiles: {
        html: `
          <form class="newsletter">
            <input class="email" type="email" placeholder="Votre adresse e-mail">
            <button>S'inscrire</button>
          </form>
          <p class="confirmation"></p>
        `,
        css: `
          body { font-family: sans-serif; padding: 16px; }
          input { padding: 6px 8px; }
        `,
        js: `
          // Gérez l'envoi du formulaire ici
        `,
      },
      solutionFiles: {
        html: `
          <form class="newsletter">
            <input class="email" type="email" placeholder="Votre adresse e-mail">
            <button>S'inscrire</button>
          </form>
          <p class="confirmation"></p>
        `,
        css: `
          body { font-family: sans-serif; padding: 16px; }
          input { padding: 6px 8px; }
        `,
        js: `
          // Gérez l'envoi du formulaire ici
          const form = document.querySelector('.newsletter');
          const emailInput = document.querySelector('.email');
          const confirmation = document.querySelector('.confirmation');

          form.addEventListener('submit', function (event) {
            event.preventDefault();
            confirmation.textContent = \`Inscription confirmée : \${emailInput.value}\`;
          });
        `,
      },
      tests: [
        {
          label: 'L\'envoi du formulaire est annulé avec event.preventDefault()',
          code: `$('.email').value = 'alice@exemple.fr'; return !$('.newsletter').dispatchEvent(new Event('submit', { cancelable: true }))`,
        },
        {
          label: 'La confirmation affiche l\'adresse tapée',
          code: `$('.email').value = 'alice@exemple.fr'; $('.newsletter').dispatchEvent(new Event('submit', { cancelable: true })); return $('.confirmation').textContent === 'Inscription confirmée : alice@exemple.fr'`,
        },
        {
          label: 'La confirmation change avec une autre adresse',
          code: `$('.email').value = 'bob@exemple.fr'; $('.newsletter').dispatchEvent(new Event('submit', { cancelable: true })); return $('.confirmation').textContent === 'Inscription confirmée : bob@exemple.fr'`,
        },
      ],
    },
    {
      slug: 'recap-evenements',
      title: 'Récapitulatif : sélection, classes et événements',
      statement: `
        Ce formulaire de réservation de restaurant contient des erreurs. Corrigez-le pour obtenir les résultats suivants.

        Objectifs :
        - Le titre affiche "Chez Alice".
        - Chaque clic sur +1 augmente de 1 le nombre de personnes affiché.
        - L'envoi du formulaire ne recharge pas la page.
        - Après l'envoi, la confirmation est visible.
        - La confirmation affiche le nom tapé et le nombre de personnes : "Table réservée au nom de Bob pour 2 personnes".
      `,
      starterFiles: {
        html: `
          <h2 class="restaurant">Nom du restaurant</h2>
          <p>
            <button class="add-guest">+1</button>
            <span class="guest-count">2</span> personnes
          </p>
          <form class="booking">
            <input class="customer-name" type="text" placeholder="Votre nom">
            <button>Réserver</button>
          </form>
          <p class="confirmation hidden"></p>
        `,
        css: `
          body { font-family: sans-serif; padding: 16px; }
          input { padding: 6px 8px; }
          .confirmation { padding: 8px 12px; background: #dcfce7; border-radius: 6px; }
          .hidden { display: none; }
        `,
        js: `
          // Nom du restaurant
          const restaurantName = document.querySelector('.restaurant');
          restaurantName.value = 'Chez Alice';

          // Nombre de personnes : chaque clic sur +1 en ajoute une
          const addGuestButton = document.querySelector('.add-guest');
          const guestCount = document.querySelector('.guest-count');
          let guests = 2;

          addGuestButton.addEventListener('onclick', function () {
            guests = guests + 1;
            guestCount.textContent = guests;
          });

          // Réservation
          const form = document.querySelector('.booking');
          const nameInput = document.querySelector('.customer-name');
          const confirmation = document.querySelector('.confirmation');
          const customerName = nameInput.value;

          form.addEventListener('submit', function (event) {
            confirmation.textContent = \`Table réservée au nom de \${customerName} pour \${guests} personnes\`;
            confirmation.classList.remove('.hidden');
          });
        `,
      },
      solutionFiles: {
        html: `
          <h2 class="restaurant">Nom du restaurant</h2>
          <p>
            <button class="add-guest">+1</button>
            <span class="guest-count">2</span> personnes
          </p>
          <form class="booking">
            <input class="customer-name" type="text" placeholder="Votre nom">
            <button>Réserver</button>
          </form>
          <p class="confirmation hidden"></p>
        `,
        css: `
          body { font-family: sans-serif; padding: 16px; }
          input { padding: 6px 8px; }
          .confirmation { padding: 8px 12px; background: #dcfce7; border-radius: 6px; }
          .hidden { display: none; }
        `,
        js: `
          // Nom du restaurant
          const restaurantName = document.querySelector('.restaurant');
          restaurantName.textContent = 'Chez Alice';

          // Nombre de personnes : chaque clic sur +1 en ajoute une
          const addGuestButton = document.querySelector('.add-guest');
          const guestCount = document.querySelector('.guest-count');
          let guests = 2;

          addGuestButton.addEventListener('click', function () {
            guests = guests + 1;
            guestCount.textContent = guests;
          });

          // Réservation
          const form = document.querySelector('.booking');
          const nameInput = document.querySelector('.customer-name');
          const confirmation = document.querySelector('.confirmation');

          form.addEventListener('submit', function (event) {
            event.preventDefault();
            confirmation.textContent = \`Table réservée au nom de \${nameInput.value} pour \${guests} personnes\`;
            confirmation.classList.remove('hidden');
          });
        `,
      },
      tests: [
        {
          label: 'Le titre affiche "Chez Alice"',
          code: `return $('.restaurant').textContent === 'Chez Alice'`,
        },
        {
          label: 'L\'envoi du formulaire ne recharge pas la page',
          code: `$('.customer-name').value = 'Bob'; return !$('.booking').dispatchEvent(new Event('submit', { cancelable: true }))`,
        },
        {
          label: 'La confirmation est visible après l\'envoi',
          code: `$('.customer-name').value = 'Bob'; $('.booking').dispatchEvent(new Event('submit', { cancelable: true })); return !$('.confirmation').classList.contains('hidden') && style($('.confirmation')).display !== 'none'`,
        },
        {
          label: 'La confirmation affiche le nom tapé et le nombre de personnes',
          code: `$('.customer-name').value = 'Bob'; $('.booking').dispatchEvent(new Event('submit', { cancelable: true })); return $('.confirmation').textContent === 'Table réservée au nom de Bob pour 2 personnes'`,
        },
        {
          label: 'Chaque clic sur +1 ajoute une personne',
          code: `$('.add-guest').click(); var first = $('.guest-count').textContent; $('.add-guest').click(); return first === '3' && $('.guest-count').textContent === '4'`,
        },
      ],
    },
    {
      slug: 'creer-element',
      title: 'Créer un élément',
      statement: `
        document.createElement crée un nouvel élément, vide et encore absent de la page. Pour l'afficher, on l'ajoute dans un élément déjà présent, qu'on appelle son parent : par exemple un li dans un ul. La méthode append du parent place le nouvel élément à l'intérieur, après ceux qui y sont déjà.

        Exemple :
        const list = document.querySelector('ul'); // le parent, déjà dans la page
        const item = document.createElement('li'); // le nouvel élément
        item.textContent = 'Pain';
        list.append(item); // le ul contient maintenant <li>Pain</li>

        Créez un nouvel élément pour chaque ajout : ajouter plusieurs fois le même élément le déplace au lieu de le copier, et un seul reste affiché.

        Objectifs :
        - Déclarez une fonction « addSong » qui reçoit un paramètre « title » : elle crée un élément li qui contient « title », puis l'ajoute à la fin de la liste « playlist ».
        - Avec une boucle for...of, appelez « addSong » pour chaque titre du tableau « songs ».
      `,
      starterFiles: {
        html: `
          <h2>Ma playlist</h2>
          <ul class="playlist"></ul>
        `,
        css: `
          body { font-family: sans-serif; padding: 16px; }
          .playlist li { padding: 4px 0; }
        `,
        js: `
          const songs = ['La Vie en rose', 'Ne me quitte pas', 'Alors on danse'];
          const playlist = document.querySelector('.playlist');

          // Déclarez la fonction addSong

          // Appelez addSong pour chaque titre de songs
        `,
      },
      solutionFiles: {
        html: `
          <h2>Ma playlist</h2>
          <ul class="playlist"></ul>
        `,
        css: `
          body { font-family: sans-serif; padding: 16px; }
          .playlist li { padding: 4px 0; }
        `,
        js: `
          const songs = ['La Vie en rose', 'Ne me quitte pas', 'Alors on danse'];
          const playlist = document.querySelector('.playlist');

          // Déclarez la fonction addSong
          function addSong(title) {
            const item = document.createElement('li');
            item.textContent = title;
            playlist.append(item);
          }

          // Appelez addSong pour chaque titre de songs
          for (const song of songs) {
            addSong(song);
          }
        `,
      },
      tests: [
        {
          label: 'La liste affiche un li par titre de « songs », dans l\'ordre',
          code: `var items = $$('.playlist li'); return items.length === 3 && items.map(function (li) { return li.textContent }).join('|') === songs.join('|')`,
        },
        {
          label: '« addSong » ajoute à la fin de la liste un li qui contient « title »',
          code: `var n = $$('.playlist li').length; addSong('Imagine'); var items = $$('.playlist li'); return items.length === n + 1 && items[n].textContent === 'Imagine'`,
        },
        {
          label: 'Les titres sont parcourus avec une boucle for...of',
          code: `return /for\\s*\\(\\s*(const|let)\\s+\\w+\\s+of\\b/.test(source)`,
        },
      ],
    },
    {
      slug: 'ecouter-element-cree',
      title: 'Écouter un élément créé',
      statement: `
        Pour réagir au clic sur un élément créé en JavaScript, appelez addEventListener sur cet élément, juste après l'avoir créé.

        classList.toggle ajoute la classe si l'élément ne l'a pas, et la retire s'il l'a : appelée à chaque clic, elle alterne entre les deux états.

        Exemple :
        const item = document.createElement('li');
        item.addEventListener('click', function () {
        item.classList.toggle('selected');
        });

        Dans la fonction du clic, utilisez la variable item : document.querySelector('li') sélectionnerait toujours le premier li de la page, pas celui qui a été cliqué.

        Objectifs :
        - Dans « addSong », écoutez le clic sur le li créé.
        - À chaque clic, ajoutez ou retirez la classe « favorite » de ce li avec classList.toggle.
      `,
      starterFiles: {
        html: `
          <h2>Ma playlist</h2>
          <ul class="playlist"></ul>
        `,
        css: `
          body { font-family: sans-serif; padding: 16px; }
          .playlist li { padding: 4px 0; cursor: pointer; }
          .favorite { color: #db2777; font-weight: bold; }
          .favorite::before { content: '♥ '; }
        `,
        js: `
          const songs = ['La Vie en rose', 'Ne me quitte pas', 'Alors on danse'];
          const playlist = document.querySelector('.playlist');

          function addSong(title) {
            const item = document.createElement('li');
            item.textContent = title;
            // Écoutez le clic sur item ici

            playlist.append(item);
          }

          for (const song of songs) {
            addSong(song);
          }
        `,
      },
      solutionFiles: {
        html: `
          <h2>Ma playlist</h2>
          <ul class="playlist"></ul>
        `,
        css: `
          body { font-family: sans-serif; padding: 16px; }
          .playlist li { padding: 4px 0; cursor: pointer; }
          .favorite { color: #db2777; font-weight: bold; }
          .favorite::before { content: '♥ '; }
        `,
        js: `
          const songs = ['La Vie en rose', 'Ne me quitte pas', 'Alors on danse'];
          const playlist = document.querySelector('.playlist');

          function addSong(title) {
            const item = document.createElement('li');
            item.textContent = title;
            // Écoutez le clic sur item ici
            item.addEventListener('click', function () {
              item.classList.toggle('favorite');
            });

            playlist.append(item);
          }

          for (const song of songs) {
            addSong(song);
          }
        `,
      },
      tests: [
        {
          label: 'Un clic sur un titre lui ajoute la classe « favorite »',
          code: `var items = $$('.playlist li'); items[1].click(); return items[1].classList.contains('favorite') && !items[0].classList.contains('favorite')`,
        },
        {
          label: 'Un second clic retire la classe « favorite »',
          code: `var item = $$('.playlist li')[2]; item.click(); var afterFirst = item.classList.contains('favorite'); item.click(); return afterFirst && !item.classList.contains('favorite')`,
        },
        {
          label: 'Un titre ajouté avec « addSong » réagit aussi au clic',
          code: `addSong('Imagine'); var items = $$('.playlist li'); var last = items[items.length - 1]; last.click(); return last.classList.contains('favorite')`,
        },
        {
          label: 'La classe est alternée avec classList.toggle',
          code: `return /classList\\.toggle\\s*\\(/.test(source)`,
        },
      ],
    },
    {
      slug: 'supprimer-element',
      title: 'Supprimer un élément',
      statement: `
        La méthode remove() retire un élément de la page, avec tout ce qu'il contient.

        Exemple :
        item.remove();

        Un élément créé peut lui-même servir de parent : item.append(button) place le bouton dans le li. L'ordre compte, car textContent remplace tout le contenu d'un élément : modifié après l'ajout du bouton, il efface ce bouton.

        Objectifs :
        - Dans « addGuest », créez un bouton qui contient "Retirer" et ajoutez-le au li.
        - Toujours dans « addGuest », juste après avoir créé le bouton, écoutez son clic : retirez alors le li de la page avec remove().
      `,
      starterFiles: {
        html: `
          <h2>Invités</h2>
          <ul class="guests"></ul>
        `,
        css: `
          body { font-family: sans-serif; padding: 16px; }
          .guests li { padding: 4px 0; }
          .guests button { margin-left: 8px; }
        `,
        js: `
          const guests = ['Alice', 'Bob', 'Zoé'];
          const guestList = document.querySelector('.guests');

          function addGuest(name) {
            const item = document.createElement('li');
            item.textContent = name;
            // Créez le bouton Retirer ici

            guestList.append(item);
          }

          for (const guest of guests) {
            addGuest(guest);
          }
        `,
      },
      solutionFiles: {
        html: `
          <h2>Invités</h2>
          <ul class="guests"></ul>
        `,
        css: `
          body { font-family: sans-serif; padding: 16px; }
          .guests li { padding: 4px 0; }
          .guests button { margin-left: 8px; }
        `,
        js: `
          const guests = ['Alice', 'Bob', 'Zoé'];
          const guestList = document.querySelector('.guests');

          function addGuest(name) {
            const item = document.createElement('li');
            item.textContent = name;
            // Créez le bouton Retirer ici
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Retirer';
            removeButton.addEventListener('click', function () {
              item.remove();
            });
            item.append(removeButton);

            guestList.append(item);
          }

          for (const guest of guests) {
            addGuest(guest);
          }
        `,
      },
      tests: [
        {
          label: 'Chaque invité a un bouton "Retirer"',
          code: `var items = $$('.guests li'); return items.length === 3 && items.every(function (li, i) { var b = li.querySelector('button'); return b && b.textContent === 'Retirer' && li.textContent.indexOf(guests[i]) === 0 })`,
        },
        {
          label: 'Un clic sur "Retirer" retire l\'invité de la liste',
          code: `var items = $$('.guests li'); items[1].querySelector('button').click(); return $$('.guests li').length === 2 && !items[1].isConnected && items[0].isConnected`,
        },
        {
          label: 'Un invité ajouté avec « addGuest » a aussi un bouton qui fonctionne',
          code: `addGuest('Chloé'); var items = $$('.guests li'); var last = items[items.length - 1]; last.querySelector('button').click(); return !last.isConnected && $$('.guests li').length === items.length - 1`,
        },
      ],
    },
  ],
})
