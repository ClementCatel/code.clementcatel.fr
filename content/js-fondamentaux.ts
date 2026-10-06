import { defineCurriculum } from './define'

export default defineCurriculum({
  id: 'js-fondamentaux',
  title: 'Les fondamentaux de JavaScript',
  description: 'Variables, conditions, boucles, fonctions, tableaux et objets : les bases du langage JavaScript.',
  exercises: [
    {
      slug: 'let',
      title: 'Déclarer une variable',
      statement: `
        Une variable stocke une valeur pour la réutiliser. On la déclare avec le mot-clé let, suivi de son nom, du signe = et de sa valeur.

        Exemple :
        let city = 'Caen';

        Le texte s'écrit entre guillemets, les nombres sans guillemets. Pour afficher une valeur dans la console sous l'aperçu, utilisez console.log(city);

        Objectifs :
        - Déclarez une variable « firstName » qui contient votre prénom.
        - Déclarez une variable « age » qui contient votre âge.
        - Affichez « firstName » dans la console.
      `,
      starterFiles: {
        js: `
          // Déclarez vos variables ici
        `,
      },
      solutionFiles: {
        js: `
          let firstName = 'Alice';
          let age = 25;

          console.log(firstName);
        `,
      },
      tests: [
        {
          label: 'La variable « firstName » contient du texte',
          code: `return typeof firstName === 'string' && firstName.trim() !== ''`,
        },
        {
          label: 'La variable « age » contient un nombre',
          code: `return typeof age === 'number' && age > 0`,
        },
        {
          label: 'Les variables sont déclarées avec let',
          code: `return typeof firstName !== 'undefined' && typeof age !== 'undefined' && !('firstName' in window) && !('age' in window)`,
        },
        {
          label: '« firstName » est affiché dans la console',
          code: `return typeof firstName === 'string' && logs.includes(firstName)`,
        },
      ],
    },
    {
      slug: 'const',
      title: 'Les constantes',
      statement: `
        Une constante se déclare avec const au lieu de let. Sa valeur ne peut plus changer : la réaffecter provoque une erreur.

        Exemple :
        const country = 'France';

        Une variable let, elle, peut être réaffectée. On écrit alors son nom sans let : city = 'Rouen';
        Utilisez const par défaut, et let seulement pour une valeur qui doit changer.

        Objectifs :
        - Le nom du jeu ne change jamais : déclarez « gameName » avec const.
        - Sous le commentaire, réaffectez la valeur 10 à « score ».
      `,
      starterFiles: {
        js: `
          let gameName = 'Pong';
          let score = 0;
          console.log(score);

          // Réaffectez la valeur 10 à score

          console.log(score);
        `,
      },
      solutionFiles: {
        js: `
          const gameName = 'Pong';
          let score = 0;
          console.log(score);

          // Réaffectez la valeur 10 à score
          score = 10;

          console.log(score);
        `,
      },
      tests: [
        {
          label: '« score » passe de 0 à 10',
          code: `var i = logs.indexOf('0'); return score === 10 && i !== -1 && logs.indexOf('10', i + 1) !== -1`,
        },
        {
          label: `« gameName » est une constante qui vaut 'Pong'`,
          code: `if (gameName !== 'Pong') return false; try { gameName = 'Tetris' } catch (e) { return true } return false`,
        },
      ],
    },
    {
      slug: 'operateurs',
      title: 'Les opérateurs arithmétiques',
      statement: `
        JavaScript calcule avec les opérateurs + (addition), - (soustraction), * (multiplication) et / (division). L'opérateur % donne le reste d'une division.

        Exemple :
        const total = 3 * 4; // 12
        const rest = 14 % 4; // 2

        On peut calculer avec des variables : const priceWithTax = price * 1.2;
        Les priorités sont celles des maths : 2 + 3 * 4 vaut 14.

        Objectifs :
        - Calculez dans « totalPrice » le prix de « quantity » places de cinéma à « ticketPrice » euros chacune.
        - Calculez dans « leftover » le nombre de bonbons qui restent quand on partage « candies » bonbons équitablement entre « children » enfants.
      `,
      starterFiles: {
        js: `
          const ticketPrice = 9;
          const quantity = 4;
          // Calculez le prix total
          const totalPrice = 0;

          const candies = 17;
          const children = 5;
          // Calculez les bonbons restants
          const leftover = 0;

          console.log(totalPrice);
          console.log(leftover);
        `,
      },
      solutionFiles: {
        js: `
          const ticketPrice = 9;
          const quantity = 4;
          // Calculez le prix total
          const totalPrice = ticketPrice * quantity;

          const candies = 17;
          const children = 5;
          // Calculez les bonbons restants
          const leftover = candies % children;

          console.log(totalPrice);
          console.log(leftover);
        `,
      },
      tests: [
        {
          label: '« totalPrice » contient le prix des places',
          code: `return totalPrice === 36`,
        },
        {
          label: '« leftover » contient le nombre de bonbons restants',
          code: `return leftover === 2`,
        },
        {
          label: '« totalPrice » est calculé avec l\'opérateur *',
          code: `return /totalPrice\\s*=[^;\\n]*\\*/.test(source)`,
        },
        {
          label: '« leftover » est calculé avec l\'opérateur %',
          code: `return /leftover\\s*=[^;\\n]*%/.test(source)`,
        },
      ],
    },
    {
      slug: 'chaines',
      title: 'Les chaînes de caractères',
      statement: `
        Une chaîne de caractères est un texte entre guillemets simples ou doubles. L'opérateur + colle deux chaînes bout à bout : c'est la concaténation.

        Exemple :
        const greeting = 'Bonjour ' + firstName;

        Pour un texte qui contient une apostrophe, utilisez des guillemets doubles : "C'est parti".
        Attention : avec une chaîne, + concatène au lieu d'additionner. '5' + 3 vaut '53'.

        Objectifs :
        - Concaténez « firstName », un espace et « lastName » dans « fullName ».
        - Concaténez le texte "C'est parti, " et « fullName » dans « message ».
        - « nextYear » vaut 361 au lieu de 37 : corrigez la déclaration de « age ».
      `,
      starterFiles: {
        js: `
          const firstName = 'Ada';
          const lastName = 'Lovelace';

          // Concaténez firstName et lastName
          const fullName = '';

          // Écrivez le message
          const message = '';

          const age = '36';
          const nextYear = age + 1;

          console.log(fullName);
          console.log(message);
          console.log(nextYear);
        `,
      },
      solutionFiles: {
        js: `
          const firstName = 'Ada';
          const lastName = 'Lovelace';

          // Concaténez firstName et lastName
          const fullName = firstName + ' ' + lastName;

          // Écrivez le message
          const message = "C'est parti, " + fullName;

          const age = 36;
          const nextYear = age + 1;

          console.log(fullName);
          console.log(message);
          console.log(nextYear);
        `,
      },
      tests: [
        {
          label: '« fullName » contient le prénom et le nom séparés par un espace',
          code: `return fullName === 'Ada Lovelace'`,
        },
        {
          label: '« message » contient le texte demandé',
          code: `return message === "C'est parti, Ada Lovelace"`,
        },
        {
          label: '« nextYear » vaut 37',
          code: `return nextYear === 37`,
        },
      ],
    },
    {
      slug: 'template-strings',
      title: 'Les template strings',
      statement: `
        Une template string s'écrit entre backticks (\`) au lieu de guillemets. Elle insère une valeur avec \${...}, sans concaténation.

        Exemple :
        const greeting = \`Bonjour \${firstName} !\`;

        Entre \${ et } on peut écrire n'importe quelle expression, comme un calcul : \`Total : \${price * 2} euros\`
        Une template string accepte aussi les apostrophes : \`C'est parti\`.
        Elle peut s'écrire sur plusieurs lignes, et les retours à la ligne sont conservés :
        const card = \`Nom : Ada
        Âge : 36\`;

        Objectifs :
        - Avec une template string, affectez à « orderLine » le texte "2 x clavier", à partir de « quantity » et « product ».
        - Avec une template string, affectez à « summary » le texte "Total de l'achat : 90 euros", en calculant le total entre \${ et }.
      `,
      starterFiles: {
        js: `
          const product = 'clavier';
          const price = 45;
          const quantity = 2;

          // Utilisez des template strings
          const orderLine = '';
          const summary = '';

          console.log(orderLine);
          console.log(summary);
        `,
      },
      solutionFiles: {
        js: `
          const product = 'clavier';
          const price = 45;
          const quantity = 2;

          // Utilisez des template strings
          const orderLine = \`\${quantity} x \${product}\`;
          const summary = \`Total de l'achat : \${price * quantity} euros\`;

          console.log(orderLine);
          console.log(summary);
        `,
      },
      tests: [
        {
          label: '« orderLine » contient "2 x clavier"',
          code: `return orderLine === '2 x clavier'`,
        },
        {
          label: `« summary » contient "Total de l'achat : 90 euros"`,
          code: `return summary === "Total de l'achat : 90 euros"`,
        },
        {
          label: '« orderLine » et « summary » sont des template strings',
          code: `return /orderLine\\s*=\\s*\`[^\`]*\\$\\{/.test(source) && /summary\\s*=\\s*\`[^\`]*\\$\\{/.test(source)`,
        },
      ],
    },
    {
      slug: 'booleens',
      title: 'Booléens et comparaisons',
      statement: `
        Un booléen ne peut valoir que true (vrai) ou false (faux). Une comparaison renvoie un booléen.

        Exemple :
        const isAdult = age >= 18;

        Les opérateurs de comparaison sont === (égal), !== (différent), <, >, <= et >=.
        Utilisez toujours === et non == : == convertit les types avant de comparer, donc '5' == 5 vaut true alors que '5' === 5 vaut false.

        Objectifs :
        - Déclarez « canVote », qui vérifie que « age » est supérieur ou égal à 18.
        - Déclarez « isFree », qui vérifie que « ticketPrice » est égal à 0.
        - Déclarez « isTourist », qui vérifie que « city » est différent de "Caen".
      `,
      starterFiles: {
        js: `
          const age = 16;
          const ticketPrice = 0;
          const city = 'Caen';

          // Déclarez canVote, isFree et isTourist

          console.log(canVote, isFree, isTourist);
        `,
      },
      solutionFiles: {
        js: `
          const age = 16;
          const ticketPrice = 0;
          const city = 'Caen';

          // Déclarez canVote, isFree et isTourist
          const canVote = age >= 18;
          const isFree = ticketPrice === 0;
          const isTourist = city !== 'Caen';

          console.log(canVote, isFree, isTourist);
        `,
      },
      tests: [
        {
          label: '« canVote » vérifie que « age » est supérieur ou égal à 18',
          code: `return canVote === false`,
        },
        {
          label: '« isFree » vérifie que « ticketPrice » est égal à 0',
          code: `return isFree === true`,
        },
        {
          label: '« isTourist » vérifie que « city » est différent de "Caen"',
          code: `return isTourist === false`,
        },
        {
          label: 'Les valeurs sont calculées avec les opérateurs >=, === et !==',
          code: `return />=/.test(source) && /===/.test(source) && /!==/.test(source)`,
        },
      ],
    },
    {
      slug: 'recap-variables',
      title: 'Récapitulatif : variables, opérateurs, chaînes et booléens',
      statement: `
        Ce programme prépare une réservation de places de cinéma, mais il contient des erreurs. Corrigez-le pour obtenir les résultats suivants.

        Objectifs :
        - « total » vaut 27 : chaque place coûte « seatPrice » euros plus « fee » euro de frais.
        - « ticketsLeft » vaut 0 après la réservation.
        - « isSoldOut » vaut true, car il ne reste plus de places.
        - « seatsLine » contient "3 places pour Dune".
        - « confirmation » contient "Merci Alice, votre total est de 27 euros".
      `,
      starterFiles: {
        js: `
          const customer = 'Alice';
          const movie = 'Dune';
          const seats = 3;
          const seatPrice = 8;
          const fee = 1;

          // Chaque place coûte seatPrice plus fee de frais
          const total = seatPrice + fee * seats;

          const ticketsLeft = 3;
          ticketsLeft = ticketsLeft - seats;
          const isSoldOut = ticketsLeft === '0';

          const seatsLine = seats + ' places pour' + movie;
          const confirmation = 'Merci \${customer}, votre total est de \${total} euros';

          console.log(total);
          console.log(ticketsLeft, isSoldOut);
          console.log(seatsLine);
          console.log(confirmation);
        `,
      },
      solutionFiles: {
        js: `
          const customer = 'Alice';
          const movie = 'Dune';
          const seats = 3;
          const seatPrice = 8;
          const fee = 1;

          // Chaque place coûte seatPrice plus fee de frais
          const total = (seatPrice + fee) * seats;

          let ticketsLeft = 3;
          ticketsLeft = ticketsLeft - seats;
          const isSoldOut = ticketsLeft === 0;

          const seatsLine = seats + ' places pour ' + movie;
          const confirmation = \`Merci \${customer}, votre total est de \${total} euros\`;

          console.log(total);
          console.log(ticketsLeft, isSoldOut);
          console.log(seatsLine);
          console.log(confirmation);
        `,
      },
      tests: [
        {
          label: '« total » vaut 27',
          code: `return total === 27`,
        },
        {
          label: '« ticketsLeft » vaut 0 après la réservation',
          code: `return ticketsLeft === 0`,
        },
        {
          label: '« isSoldOut » vaut true',
          code: `return isSoldOut === true`,
        },
        {
          label: '« seatsLine » contient "3 places pour Dune"',
          code: `return seatsLine === '3 places pour Dune'`,
        },
        {
          label: '« confirmation » contient "Merci Alice, votre total est de 27 euros"',
          code: `return confirmation === 'Merci Alice, votre total est de 27 euros'`,
        },
      ],
    },
    {
      slug: 'if',
      title: 'La condition if',
      statement: `
        La condition if exécute un bloc de code seulement si une condition est vraie. Le bloc est délimité par des accolades.

        Exemple :
        if (temperature > 30) { console.log('Il fait chaud'); }

        Si la condition est un booléen, inutile de la comparer à true : écrivez if (isOpen) plutôt que if (isOpen === true).

        Objectifs :
        - Si « total » est supérieur ou égal à 50, réaffectez la valeur 0 à « shipping ».
        - Si « isMember » vaut true, affichez "Bienvenue, membre !" dans la console.
      `,
      starterFiles: {
        js: `
          const total = 64;
          const isMember = true;
          let shipping = 5;

          // Livraison offerte à partir de 50 euros

          // Message pour les membres

          console.log(shipping);
        `,
      },
      solutionFiles: {
        js: `
          const total = 64;
          const isMember = true;
          let shipping = 5;

          // Livraison offerte à partir de 50 euros
          if (total >= 50) {
            shipping = 0;
          }

          // Message pour les membres
          if (isMember) {
            console.log('Bienvenue, membre !');
          }

          console.log(shipping);
        `,
      },
      tests: [
        {
          label: '« shipping » vaut 0, car « total » est supérieur ou égal à 50',
          code: `return shipping === 0`,
        },
        {
          label: '"Bienvenue, membre !" est affiché dans la console',
          code: `return logs.includes('Bienvenue, membre !')`,
        },
        {
          label: 'Le code utilise deux conditions if',
          code: `return (source.match(/\\bif\\s*\\(/g) || []).length >= 2`,
        },
      ],
    },
    {
      slug: 'if-else',
      title: 'if / else',
      statement: `
        Le mot-clé else ajoute un bloc exécuté quand la condition du if est fausse. Un seul des deux blocs s'exécute.

        Exemple :
        if (age >= 18) { status = 'majeur'; } else { status = 'mineur'; }

        Objectifs :
        - Si « stock » est supérieur à 0, affectez "En stock" à « availability », sinon affectez "Rupture de stock".
        - Si « password » est égal à « confirmation », affichez "Mot de passe enregistré" dans la console, sinon affichez "Les mots de passe ne correspondent pas".
      `,
      starterFiles: {
        js: `
          const stock = 0;
          let availability = '';

          const password = 'soleil42';
          const confirmation = 'soleil42';

          // Disponibilité du produit

          // Vérification du mot de passe

          console.log(availability);
        `,
      },
      solutionFiles: {
        js: `
          const stock = 0;
          let availability = '';

          const password = 'soleil42';
          const confirmation = 'soleil42';

          // Disponibilité du produit
          if (stock > 0) {
            availability = 'En stock';
          } else {
            availability = 'Rupture de stock';
          }

          // Vérification du mot de passe
          if (password === confirmation) {
            console.log('Mot de passe enregistré');
          } else {
            console.log('Les mots de passe ne correspondent pas');
          }

          console.log(availability);
        `,
      },
      tests: [
        {
          label: '« availability » vaut "Rupture de stock"',
          code: `return availability === 'Rupture de stock'`,
        },
        {
          label: 'Seul "Mot de passe enregistré" est affiché dans la console',
          code: `return logs.includes('Mot de passe enregistré') && !logs.includes('Les mots de passe ne correspondent pas')`,
        },
        {
          label: 'Les deux conditions ont un bloc else',
          code: `return (source.match(/\\belse\\b/g) || []).length >= 2`,
        },
      ],
    },
    {
      slug: 'else-if',
      title: 'Enchaîner les conditions avec else if',
      statement: `
        else if enchaîne plusieurs conditions. Elles sont testées dans l'ordre, et seul le bloc de la première condition vraie s'exécute.

        Exemple :
        if (hour < 12) { greeting = 'Bonjour'; } else if (hour < 18) { greeting = 'Bon après-midi'; } else { greeting = 'Bonsoir'; }

        L'ordre compte : dès qu'une condition est vraie, les suivantes ne sont pas testées.

        Objectifs :
        - Affectez à « price » le prix du billet de cinéma selon « age » :
        moins de 4 ans : 0 euro
        moins de 12 ans : 5 euros
        65 ans et plus : 6 euros
        sinon : 9 euros
      `,
      starterFiles: {
        js: `
          const age = 8;
          let price = 0;

          // Calculez le prix du billet

          console.log(price);
        `,
      },
      solutionFiles: {
        js: `
          const age = 8;
          let price = 0;

          // Calculez le prix du billet
          if (age < 4) {
            price = 0;
          } else if (age < 12) {
            price = 5;
          } else if (age >= 65) {
            price = 6;
          } else {
            price = 9;
          }

          console.log(price);
        `,
      },
      tests: [
        {
          label: '« price » vaut 5 pour un enfant de 8 ans',
          code: `return price === 5`,
        },
        {
          label: 'Les conditions sont enchaînées avec else if',
          code: `return (source.match(/else\\s+if\\s*\\(/g) || []).length >= 2`,
        },
      ],
    },
    {
      slug: 'operateurs-logiques',
      title: 'Les opérateurs logiques',
      statement: `
        Les opérateurs logiques combinent des booléens :
        - a && b (ET) vaut true si a et b sont vrais.
        - a || b (OU) vaut true si au moins l'un des deux est vrai.
        - !a (NON) inverse la valeur : !true vaut false.

        Exemple :
        if (age >= 18 && hasTicket) { console.log('Entrée autorisée'); }

        Objectifs :
        - Déclarez « canRent », qui vérifie que « age » est supérieur ou égal à 18 et que « hasLicense » vaut true.
        - Déclarez « isWeekend », qui vérifie que « day » vaut "samedi" ou "dimanche".
        - Avec l'opérateur !, affichez "Veuillez vous connecter" dans la console si « isLoggedIn » vaut false.
      `,
      starterFiles: {
        js: `
          const age = 25;
          const hasLicense = false;
          const day = 'dimanche';
          const isLoggedIn = false;

          // Déclarez canRent et isWeekend

          // Message de connexion

          console.log(canRent, isWeekend);
        `,
      },
      solutionFiles: {
        js: `
          const age = 25;
          const hasLicense = false;
          const day = 'dimanche';
          const isLoggedIn = false;

          // Déclarez canRent et isWeekend
          const canRent = age >= 18 && hasLicense;
          const isWeekend = day === 'samedi' || day === 'dimanche';

          // Message de connexion
          if (!isLoggedIn) {
            console.log('Veuillez vous connecter');
          }

          console.log(canRent, isWeekend);
        `,
      },
      tests: [
        {
          label: '« canRent » combine l\'âge et le permis avec &&',
          code: `return canRent === false && /&&/.test(source)`,
        },
        {
          label: '« isWeekend » combine les deux jours avec ||',
          code: `return isWeekend === true && /\\|\\|/.test(source)`,
        },
        {
          label: '"Veuillez vous connecter" est affiché grâce à l\'opérateur !',
          code: `return logs.includes('Veuillez vous connecter') && /!\\s*isLoggedIn/.test(source)`,
        },
      ],
    },
    {
      slug: 'recap-conditions',
      title: 'Récapitulatif : les conditions',
      statement: `
        Ce programme gère l'entrée d'un parc d'attractions, mais il contient des erreurs. Corrigez-le pour obtenir les résultats suivants.

        Objectifs :
        - « price » vaut 0 : l'entrée est gratuite avant 4 ans.
        - « canRide » vaut true : le manège est accessible à partir de 1 m, ou accompagné d'un adulte.
        - « message » vaut "Bon tour !" quand « canRide » vaut true, et "Accès refusé" sinon.
        - "Manège fermé" n'est affiché que s'il pleut.
      `,
      starterFiles: {
        js: `
          const age = 3;
          const height = 95;
          const hasAdult = true;
          const weather = 'soleil';
          let price = 9;
          let message = '';

          // Entrée gratuite avant 4 ans, 5 euros avant 12 ans, 9 euros sinon
          if (age < 12) {
            price = 5;
          } else if (age < 4) {
            price = 0;
          }

          // Manège : 1 m minimum, ou accompagné d'un adulte
          const canRide = height >= 100 && hasAdult;

          if (canRide) {
            message = 'Bon tour !';
          }
          message = 'Accès refusé';

          console.log(price, canRide, message);

          // Le manège ferme quand il pleut
          if (weather = 'pluie') {
            console.log('Manège fermé');
          }
        `,
      },
      solutionFiles: {
        js: `
          const age = 3;
          const height = 95;
          const hasAdult = true;
          const weather = 'soleil';
          let price = 9;
          let message = '';

          // Entrée gratuite avant 4 ans, 5 euros avant 12 ans, 9 euros sinon
          if (age < 4) {
            price = 0;
          } else if (age < 12) {
            price = 5;
          }

          // Manège : 1 m minimum, ou accompagné d'un adulte
          const canRide = height >= 100 || hasAdult;

          if (canRide) {
            message = 'Bon tour !';
          } else {
            message = 'Accès refusé';
          }

          console.log(price, canRide, message);

          // Le manège ferme quand il pleut
          if (weather === 'pluie') {
            console.log('Manège fermé');
          }
        `,
      },
      tests: [
        {
          label: '« price » vaut 0',
          code: `return price === 0`,
        },
        {
          label: '« canRide » vaut true',
          code: `return canRide === true`,
        },
        {
          label: '« message » vaut "Bon tour !"',
          code: `return message === 'Bon tour !'`,
        },
        {
          label: 'La météo est comparée à "pluie" et "Manège fermé" n\'est pas affiché',
          code: `return /weather\\s*===/.test(source) && !logs.includes('Manège fermé')`,
        },
      ],
    },
    {
      slug: 'for',
      title: 'La boucle for',
      statement: `
        La boucle for répète un bloc de code tant qu'une condition est vraie, avec une variable qui change à chaque tour.

        Exemple :
        for (let i = 1; i <= 3; i++) { console.log(i); }

        Les trois parties, séparées par des points-virgules :
        - let i = 1 : la variable de départ, créée une seule fois.
        - i <= 3 : la condition, testée avant chaque tour.
        - i++ : exécuté après chaque tour. i++ ajoute 1 à i, et i-- lui retire 1.
        Attention : si la condition ne devient jamais fausse, la boucle ne s'arrête pas.

        Objectifs :
        - Avec une boucle for, affichez dans la console un compte à rebours de 5 à 1.
        - Avec une boucle for, affichez la table de 7. Chaque ligne affiche la multiplication complète, pas seulement le résultat :
        "7 x 1 = 7"
        "7 x 2 = 14"
        ...
        "7 x 10 = 70"
      `,
      starterFiles: {
        js: `
          // Compte à rebours de 5 à 1

          // Table de 7
        `,
      },
      solutionFiles: {
        js: `
          // Compte à rebours de 5 à 1
          for (let i = 5; i >= 1; i--) {
            console.log(i);
          }

          // Table de 7
          for (let i = 1; i <= 10; i++) {
            console.log(\`7 x \${i} = \${7 * i}\`);
          }
        `,
      },
      tests: [
        {
          label: 'Le compte à rebours 5, 4, 3, 2, 1 est affiché dans la console',
          code: `var i = logs.indexOf('5'); return i !== -1 && logs.slice(i, i + 5).join(',') === '5,4,3,2,1'`,
        },
        {
          label: 'Chaque ligne de la table de 7 est affichée en entier, de "7 x 1 = 7" à "7 x 10 = 70"',
          code: `var i = logs.indexOf('7 x 1 = 7'); if (i === -1) return false; for (var n = 1; n <= 10; n++) { if (logs[i + n - 1] !== '7 x ' + n + ' = ' + 7 * n) return false } return true`,
        },
        {
          label: 'Le code utilise deux boucles for',
          code: `return (source.match(/\\bfor\\s*\\(/g) || []).length >= 2`,
        },
      ],
    },
    {
      slug: 'fonction',
      title: 'Déclarer et appeler une fonction',
      statement: `
        Une fonction regroupe des instructions sous un nom. On la déclare avec le mot-clé function, puis on l'appelle avec son nom suivi de parenthèses.

        Exemple :
        function sayHello() { console.log('Bonjour !'); }
        sayHello();

        Déclarer une fonction n'exécute pas son code : il s'exécute à chaque appel, autant de fois qu'on l'appelle.

        Objectifs :
        - Déclarez une fonction « showMenu » qui affiche dans la console "1. Jouer", "2. Options" et "3. Quitter", une ligne par option.
        - Appelez « showMenu » deux fois.
      `,
      starterFiles: {
        js: `
          // Déclarez la fonction showMenu

          // Appelez-la deux fois
        `,
      },
      solutionFiles: {
        js: `
          // Déclarez la fonction showMenu
          function showMenu() {
            console.log('1. Jouer');
            console.log('2. Options');
            console.log('3. Quitter');
          }

          // Appelez-la deux fois
          showMenu();
          showMenu();
        `,
      },
      tests: [
        {
          label: '« showMenu » est appelée deux fois',
          code: `return logs.filter(function (l) { return l === '1. Jouer' }).length === 2`,
        },
        {
          label: 'Appeler « showMenu » affiche les trois options',
          code: `var n = logs.length; showMenu(); return logs.slice(n).join('|') === '1. Jouer|2. Options|3. Quitter'`,
        },
      ],
    },
    {
      slug: 'parametres',
      title: 'Les paramètres',
      statement: `
        Un paramètre est une variable qui reçoit une valeur à chaque appel. On le déclare entre les parenthèses de la fonction, et on passe la valeur, appelée argument, entre les parenthèses de l'appel.

        Exemple :
        function greet(name) { console.log(\`Bonjour \${name} !\`); }
        greet('Alice');

        Plusieurs paramètres se séparent par des virgules : function add(a, b) { ... }

        Objectifs :
        - Déclarez une fonction « welcome » avec un paramètre « name ». Elle affiche dans la console "Bienvenue, " suivi du nom : welcome('Bob') affiche "Bienvenue, Bob".
        - Appelez « welcome » avec votre prénom.
        - Déclarez une fonction « showPrice » avec deux paramètres, « product » et « price » : showPrice('clavier', 45) affiche "clavier : 45 euros".
      `,
      starterFiles: {
        js: `
          // Déclarez la fonction welcome

          // Appelez-la avec votre prénom

          // Déclarez la fonction showPrice
        `,
      },
      solutionFiles: {
        js: `
          // Déclarez la fonction welcome
          function welcome(name) {
            console.log(\`Bienvenue, \${name}\`);
          }

          // Appelez-la avec votre prénom
          welcome('Alice');

          // Déclarez la fonction showPrice
          function showPrice(product, price) {
            console.log(\`\${product} : \${price} euros\`);
          }
        `,
      },
      tests: [
        {
          label: '« welcome » est appelée avec votre prénom',
          code: `return logs.some(function (l) { return /^Bienvenue, \\S/.test(l) })`,
        },
        {
          label: '« welcome » affiche "Bienvenue, " suivi du nom reçu',
          code: `var n = logs.length; welcome('Bob'); welcome('Zoé'); return logs[n] === 'Bienvenue, Bob' && logs[n + 1] === 'Bienvenue, Zoé'`,
        },
        {
          label: '« showPrice » affiche le produit et son prix',
          code: `var n = logs.length; showPrice('clavier', 45); showPrice('souris', 20); return logs[n] === 'clavier : 45 euros' && logs[n + 1] === 'souris : 20 euros'`,
        },
      ],
    },
    {
      slug: 'return',
      title: 'Renvoyer une valeur avec return',
      statement: `
        return renvoie une valeur au code qui a appelé la fonction. On peut alors la stocker dans une variable ou l'utiliser dans un calcul.

        Exemple :
        function double(n) { return n * 2; }
        const result = double(4);

        return arrête aussi la fonction : les instructions placées après ne s'exécutent pas.
        Afficher une valeur avec console.log ne la renvoie pas : seul return permet de la réutiliser.

        Objectifs :
        - Déclarez une fonction « square » qui renvoie le carré du nombre reçu : square(3) renvoie 9.
        - Déclarez une fonction « priceWithTax » qui renvoie un prix augmenté de 20 % : priceWithTax(50) renvoie 60.
        - Déclarez une constante « total », la somme de priceWithTax(10) et priceWithTax(25).
      `,
      starterFiles: {
        js: `
          // Déclarez la fonction square

          // Déclarez la fonction priceWithTax

          // Déclarez total

          console.log(total);
        `,
      },
      solutionFiles: {
        js: `
          // Déclarez la fonction square
          function square(n) {
            return n * n;
          }

          // Déclarez la fonction priceWithTax
          function priceWithTax(price) {
            return price * 1.2;
          }

          // Déclarez total
          const total = priceWithTax(10) + priceWithTax(25);

          console.log(total);
        `,
      },
      tests: [
        {
          label: '« square » renvoie le carré du nombre reçu',
          code: `return square(3) === 9 && square(5) === 25 && square(-2) === 4`,
        },
        {
          label: '« priceWithTax » renvoie le prix augmenté de 20 %',
          code: `return priceWithTax(50) === 60 && priceWithTax(100) === 120`,
        },
        {
          label: '« total » est calculé avec deux appels à « priceWithTax »',
          code: `return total === 42 && (source.match(/priceWithTax\\s*\\(/g) || []).length >= 3`,
        },
      ],
    },
    {
      slug: 'fonction-conditions',
      title: 'Une fonction qui décide',
      statement: `
        Une fonction peut contenir des conditions et renvoyer une valeur différente selon le cas. Comme return arrête la fonction, chaque branche peut renvoyer sa propre valeur.

        Exemple :
        function getSign(n) { if (n > 0) { return 'positif'; } else if (n < 0) { return 'négatif'; } return 'zéro'; }

        Une comparaison est déjà un booléen : écrivez return n > 0; plutôt que if (n > 0) { return true; } else { return false; }

        Objectifs :
        - Déclarez une fonction « getGrade » qui reçoit une note sur 20 et renvoie la mention :
        16 et plus : "Très bien"
        14 et plus : "Bien"
        12 et plus : "Assez bien"
        10 et plus : "Passable"
        moins de 10 : "Insuffisant"
        - Déclarez une fonction « isEven » qui renvoie true si le nombre reçu est pair, et false sinon. Un nombre est pair quand le reste de sa division par 2 vaut 0.
      `,
      starterFiles: {
        js: `
          // Déclarez la fonction getGrade

          // Déclarez la fonction isEven

          console.log(getGrade(13), isEven(4));
        `,
      },
      solutionFiles: {
        js: `
          // Déclarez la fonction getGrade
          function getGrade(score) {
            if (score >= 16) {
              return 'Très bien';
            } else if (score >= 14) {
              return 'Bien';
            } else if (score >= 12) {
              return 'Assez bien';
            } else if (score >= 10) {
              return 'Passable';
            }
            return 'Insuffisant';
          }

          // Déclarez la fonction isEven
          function isEven(n) {
            return n % 2 === 0;
          }

          console.log(getGrade(13), isEven(4));
        `,
      },
      tests: [
        {
          label: '« getGrade » renvoie la bonne mention dans chaque tranche',
          code: `return getGrade(18) === 'Très bien' && getGrade(15) === 'Bien' && getGrade(13) === 'Assez bien' && getGrade(11) === 'Passable' && getGrade(5) === 'Insuffisant'`,
        },
        {
          label: '« getGrade » respecte les limites 16, 14, 12 et 10',
          code: `return getGrade(16) === 'Très bien' && getGrade(14) === 'Bien' && getGrade(12) === 'Assez bien' && getGrade(10) === 'Passable' && getGrade(9.5) === 'Insuffisant'`,
        },
        {
          label: '« isEven » indique si le nombre reçu est pair',
          code: `return isEven(4) === true && isEven(7) === false && isEven(0) === true`,
        },
      ],
    },
    {
      slug: 'portee-bloc',
      title: 'La portée de bloc',
      statement: `
        La portée d'une variable est la zone du code où elle existe. Une variable déclarée avec let ou const dans un bloc, entre accolades, n'existe que dans ce bloc.

        Exemple :
        if (isMember) { const discount = 10; }
        console.log(discount); // Erreur : discount is not defined

        Pour utiliser une valeur après le bloc, déclarez la variable avant le bloc, puis réaffectez-la à l'intérieur.

        Objectifs :
        - Corrigez « getShipping » : elle renvoie 0 si le total reçu est supérieur ou égal à 50, et 5 sinon.
        - Corrigez « sumTo » : elle renvoie la somme des nombres de 1 au nombre reçu. sumTo(4) renvoie 10 (1 + 2 + 3 + 4).
      `,
      starterFiles: {
        js: `
          function getShipping(total) {
            if (total >= 50) {
              let shipping = 0;
            } else {
              let shipping = 5;
            }
            return shipping;
          }

          function sumTo(n) {
            for (let i = 1; i <= n; i++) {
              let sum = 0;
              sum = sum + i;
            }
            return sum;
          }

          console.log(getShipping(64), sumTo(4));
        `,
      },
      solutionFiles: {
        js: `
          function getShipping(total) {
            let shipping = 5;
            if (total >= 50) {
              shipping = 0;
            }
            return shipping;
          }

          function sumTo(n) {
            let sum = 0;
            for (let i = 1; i <= n; i++) {
              sum = sum + i;
            }
            return sum;
          }

          console.log(getShipping(64), sumTo(4));
        `,
      },
      tests: [
        {
          label: '« getShipping » renvoie 0 à partir de 50, et 5 en dessous',
          code: `return getShipping(64) === 0 && getShipping(50) === 0 && getShipping(20) === 5`,
        },
        {
          label: '« sumTo » renvoie la somme des nombres de 1 au nombre reçu',
          code: `return sumTo(4) === 10 && sumTo(1) === 1 && sumTo(10) === 55`,
        },
      ],
    },
    {
      slug: 'portee-fonction',
      title: 'Variables locales et globales',
      statement: `
        Une variable déclarée hors de toute fonction est globale : elle est accessible partout, y compris dans les fonctions. Une variable déclarée dans une fonction est locale : elle n'existe que pendant l'appel, et elle est recréée à chaque appel.

        Exemple :
        let visits = 0;
        function visit() { visits++; }

        Préférez les variables locales : une variable globale peut être modifiée par n'importe quelle partie du programme.
        Attention : si vous affectez une variable sans la déclarer avec let ou const, JavaScript la crée comme variable globale, même à l'intérieur d'une fonction :
        function setTotal() { total = 10; }
        Après un appel à setTotal(), total existe partout dans le programme. Déclarez donc toujours vos variables avec let ou const.

        Objectifs :
        - Corrigez « addPoint » : à chaque appel, elle ajoute 1 à « score » et renvoie le nouveau score. Le score doit être conservé d'un appel à l'autre.
        - Corrigez « formatPrice » pour que « result » soit une variable locale.
      `,
      starterFiles: {
        js: `
          function addPoint() {
            let score = 0;
            score++;
            return score;
          }

          function formatPrice(price) {
            result = price + ' euros';
            return result;
          }

          addPoint();
          addPoint();
          addPoint();
          console.log(addPoint());
          console.log(formatPrice(5));
        `,
      },
      solutionFiles: {
        js: `
          let score = 0;

          function addPoint() {
            score++;
            return score;
          }

          function formatPrice(price) {
            const result = price + ' euros';
            return result;
          }

          addPoint();
          addPoint();
          addPoint();
          console.log(addPoint());
          console.log(formatPrice(5));
        `,
      },
      tests: [
        {
          label: 'Après quatre appels à « addPoint », « score » vaut 4',
          code: `return score === 4`,
        },
        {
          label: '« addPoint » ajoute 1 au score à chaque appel',
          code: `var a = addPoint(); var b = addPoint(); return b === a + 1 && score === b`,
        },
        {
          label: '« result » est une variable locale de « formatPrice »',
          code: `return formatPrice(5) === '5 euros' && formatPrice(12) === '12 euros' && typeof result === 'undefined'`,
        },
      ],
    },
    {
      slug: 'recap-fonctions',
      title: 'Récapitulatif : boucles, fonctions et portée',
      statement: `
        Ces fonctions gèrent les commandes d'une boutique, mais elles contiennent des erreurs. Corrigez-les pour obtenir les résultats suivants.

        Objectifs :
        - getTotal(20, 3) renvoie 60.
        - « getDiscount » renvoie 10 à partir de 100 euros, 5 à partir de 50 euros, et 0 sinon.
        - « getLabel » renvoie "Grosse commande" à partir de 100 euros, et "Commande" sinon.
        - Chaque appel à « placeOrder » ajoute 1 à « orderCount » et renvoie le nombre total de commandes.
        - showOrderNumbers(3) affiche "Commande n°1", "Commande n°2" et "Commande n°3".
      `,
      starterFiles: {
        js: `
          let orderCount = 0;

          // Renvoie le prix total : prix unitaire x quantité
          function getTotal(price, quantity) {
            console.log(price * quantity);
          }

          // Renvoie la remise : 10 à partir de 100 euros, 5 à partir de 50 euros, 0 sinon
          function getDiscount(total) {
            if (total >= 50) {
              return 5;
            } else if (total >= 100) {
              return 10;
            }
            return 0;
          }

          // Renvoie le libellé de la commande
          function getLabel(total) {
            if (total >= 100) {
              const label = 'Grosse commande';
            } else {
              const label = 'Commande';
            }
            return label;
          }

          // Enregistre une commande et renvoie le nombre de commandes passées
          function placeOrder() {
            let orderCount = 0;
            orderCount++;
            return orderCount;
          }

          // Affiche les numéros de commande de 1 à n
          function showOrderNumbers(n) {
            for (let i = 1; i < n; i++) {
              console.log(\`Commande n°\${i}\`);
            }
          }

          console.log(getTotal(20, 3), getDiscount(150), getLabel(120));
          showOrderNumbers(3);
        `,
      },
      solutionFiles: {
        js: `
          let orderCount = 0;

          // Renvoie le prix total : prix unitaire x quantité
          function getTotal(price, quantity) {
            return price * quantity;
          }

          // Renvoie la remise : 10 à partir de 100 euros, 5 à partir de 50 euros, 0 sinon
          function getDiscount(total) {
            if (total >= 100) {
              return 10;
            } else if (total >= 50) {
              return 5;
            }
            return 0;
          }

          // Renvoie le libellé de la commande
          function getLabel(total) {
            let label = 'Commande';
            if (total >= 100) {
              label = 'Grosse commande';
            }
            return label;
          }

          // Enregistre une commande et renvoie le nombre de commandes passées
          function placeOrder() {
            orderCount++;
            return orderCount;
          }

          // Affiche les numéros de commande de 1 à n
          function showOrderNumbers(n) {
            for (let i = 1; i <= n; i++) {
              console.log(\`Commande n°\${i}\`);
            }
          }

          console.log(getTotal(20, 3), getDiscount(150), getLabel(120));
          showOrderNumbers(3);
        `,
      },
      tests: [
        {
          label: 'getTotal(20, 3) renvoie 60',
          code: `return getTotal(20, 3) === 60 && getTotal(5, 2) === 10`,
        },
        {
          label: '« getDiscount » renvoie la bonne remise',
          code: `return getDiscount(150) === 10 && getDiscount(100) === 10 && getDiscount(60) === 5 && getDiscount(20) === 0`,
        },
        {
          label: '« getLabel » renvoie le bon libellé',
          code: `return getLabel(120) === 'Grosse commande' && getLabel(30) === 'Commande'`,
        },
        {
          label: '« placeOrder » ajoute 1 à « orderCount » à chaque appel',
          code: `var a = placeOrder(); var b = placeOrder(); return b === a + 1 && orderCount === b`,
        },
        {
          label: 'showOrderNumbers(3) affiche les commandes 1 à 3',
          code: `var n = logs.length; showOrderNumbers(3); return logs.slice(n).join('|') === 'Commande n°1|Commande n°2|Commande n°3'`,
        },
      ],
    },
    {
      slug: 'majuscules-espaces',
      title: 'Majuscules, minuscules et espaces',
      statement: `
        Les chaînes de caractères ont des méthodes : des fonctions qu'on appelle avec un point après la chaîne. Elles renvoient une nouvelle chaîne sans modifier celle d'origine.
        - text.toUpperCase() renvoie le texte en majuscules.
        - text.toLowerCase() renvoie le texte en minuscules.
        - text.trim() renvoie le texte sans les espaces du début et de la fin.

        Exemple :
        const city = 'caen'.toUpperCase(); // 'CAEN'

        Les méthodes s'enchaînent : '  Alice '.trim().toUpperCase() vaut 'ALICE'.

        Objectifs :
        - Déclarez une fonction « formatCity » qui renvoie le nom de ville reçu en majuscules : formatCity('Caen') renvoie "CAEN".
        - Déclarez une fonction « normalizeEmail » qui renvoie l'adresse reçue sans espaces autour et en minuscules : normalizeEmail('  Alice@Mail.com ') renvoie "alice@mail.com".
      `,
      starterFiles: {
        js: `
          // Déclarez la fonction formatCity

          // Déclarez la fonction normalizeEmail
        `,
      },
      solutionFiles: {
        js: `
          // Déclarez la fonction formatCity
          function formatCity(city) {
            return city.toUpperCase();
          }

          // Déclarez la fonction normalizeEmail
          function normalizeEmail(email) {
            return email.trim().toLowerCase();
          }
        `,
      },
      tests: [
        {
          label: '« formatCity » renvoie le nom de ville en majuscules',
          code: `return formatCity('Caen') === 'CAEN' && formatCity('saint-malo') === 'SAINT-MALO'`,
        },
        {
          label: '« normalizeEmail » renvoie l\'adresse sans espaces et en minuscules',
          code: `return normalizeEmail('  Alice@Mail.com ') === 'alice@mail.com' && normalizeEmail('BOB@MAIL.FR') === 'bob@mail.fr'`,
        },
      ],
    },
    {
      slug: 'longueur-positions',
      title: 'Longueur et positions',
      statement: `
        text.length donne le nombre de caractères d'une chaîne. C'est une propriété et non une méthode : elle s'écrit sans parenthèses.

        Chaque caractère a une position, qui commence à 0. text[0] renvoie le premier caractère, text[1] le deuxième, et ainsi de suite.

        Exemple :
        const word = 'Bonjour';
        word.length vaut 7 et word[0] vaut 'B'.

        Comme les positions commencent à 0, le dernier caractère est à la position length - 1 : word[word.length - 1] vaut 'r'.

        Objectifs :
        - Déclarez une fonction « isLongEnough » qui renvoie true si le mot de passe reçu contient au moins 8 caractères, et false sinon.
        - Déclarez une fonction « getInitials » qui reçoit un prénom et un nom et renvoie leurs initiales : getInitials('Ada', 'Lovelace') renvoie "AL".
      `,
      starterFiles: {
        js: `
          // Déclarez la fonction isLongEnough

          // Déclarez la fonction getInitials
        `,
      },
      solutionFiles: {
        js: `
          // Déclarez la fonction isLongEnough
          function isLongEnough(password) {
            return password.length >= 8;
          }

          // Déclarez la fonction getInitials
          function getInitials(firstName, lastName) {
            return firstName[0] + lastName[0];
          }
        `,
      },
      tests: [
        {
          label: '« isLongEnough » vérifie que le mot de passe a au moins 8 caractères',
          code: `return isLongEnough('soleil42') === true && isLongEnough('12345678') === true && isLongEnough('chat') === false`,
        },
        {
          label: '« getInitials » renvoie les initiales du prénom et du nom',
          code: `return getInitials('Ada', 'Lovelace') === 'AL' && getInitials('Alan', 'Turing') === 'AT'`,
        },
      ],
    },
    {
      slug: 'includes',
      title: 'Chercher dans une chaîne',
      statement: `
        text.includes(search) renvoie true si le texte contient search, et false sinon.

        Exemple :
        'Bonjour Alice'.includes('Alice'); // true

        includes tient compte des majuscules : 'Bonjour'.includes('bonjour') vaut false. Pour les ignorer, passez d'abord le texte en minuscules avec toLowerCase().

        Objectifs :
        - Déclarez une fonction « isEmail » qui renvoie true si le texte reçu contient "@", et false sinon.
        - Déclarez une fonction « mentionsJavaScript » qui renvoie true si le texte reçu contient "javascript", en majuscules ou en minuscules : mentionsJavaScript('Vive JavaScript') renvoie true.
      `,
      starterFiles: {
        js: `
          // Déclarez la fonction isEmail

          // Déclarez la fonction mentionsJavaScript
        `,
      },
      solutionFiles: {
        js: `
          // Déclarez la fonction isEmail
          function isEmail(text) {
            return text.includes('@');
          }

          // Déclarez la fonction mentionsJavaScript
          function mentionsJavaScript(text) {
            return text.toLowerCase().includes('javascript');
          }
        `,
      },
      tests: [
        {
          label: '« isEmail » indique si le texte contient "@"',
          code: `return isEmail('alice@mail.com') === true && isEmail('alice.mail.com') === false`,
        },
        {
          label: '« mentionsJavaScript » trouve "javascript" quelle que soit la casse',
          code: `return mentionsJavaScript('Vive JavaScript') === true && mentionsJavaScript('JAVASCRIPT') === true && mentionsJavaScript('Vive Java') === false`,
        },
      ],
    },
    {
      slug: 'tableaux',
      title: 'Les tableaux',
      statement: `
        Un tableau stocke une liste de valeurs dans une seule variable. Il s'écrit entre crochets, avec les valeurs séparées par des virgules.

        Exemple :
        const fruits = ['pomme', 'banane', 'kiwi'];

        Comme pour les chaînes, chaque élément a une position qui commence à 0 : fruits[0] vaut 'pomme'. fruits.length donne le nombre d'éléments, ici 3.

        Objectifs :
        - Déclarez un tableau « days » qui contient les jours de la semaine, de "lundi" à "dimanche".
        - Déclarez une fonction « getFirst » qui renvoie le premier élément du tableau reçu.
        - Déclarez une fonction « getLast » qui renvoie le dernier élément du tableau reçu.
      `,
      starterFiles: {
        js: `
          // Déclarez le tableau days

          // Déclarez la fonction getFirst

          // Déclarez la fonction getLast

          console.log(days);
        `,
      },
      solutionFiles: {
        js: `
          // Déclarez le tableau days
          const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

          // Déclarez la fonction getFirst
          function getFirst(list) {
            return list[0];
          }

          // Déclarez la fonction getLast
          function getLast(list) {
            return list[list.length - 1];
          }

          console.log(days);
        `,
      },
      tests: [
        {
          label: '« days » contient les sept jours, de "lundi" à "dimanche"',
          code: `return Array.isArray(days) && days.join(',') === 'lundi,mardi,mercredi,jeudi,vendredi,samedi,dimanche'`,
        },
        {
          label: '« getFirst » renvoie le premier élément',
          code: `return getFirst([3, 5, 8]) === 3 && getFirst(['a']) === 'a'`,
        },
        {
          label: '« getLast » renvoie le dernier élément',
          code: `return getLast([3, 5, 8]) === 8 && getLast(['a', 'b']) === 'b' && getLast(['a']) === 'a'`,
        },
      ],
    },
    {
      slug: 'modifier-tableau',
      title: 'Modifier un tableau',
      statement: `
        Un tableau se modifie après sa création :
        - list.push(value) ajoute une valeur à la fin.
        - list.pop() retire le dernier élément et le renvoie.
        - list[1] = value remplace l'élément à la position 1.

        Exemple :
        const cart = ['pain'];
        cart.push('lait'); // cart vaut ['pain', 'lait']

        Un tableau déclaré avec const peut être modifié : const empêche seulement de réaffecter la variable, pas de changer son contenu.

        Objectifs :
        - Déclarez une fonction « addItem » qui ajoute l'élément reçu à la fin du tableau reçu : addItem(list, 'beurre').
        - Déclarez une fonction « removeLast » qui retire le dernier élément du tableau reçu et le renvoie.
        - Déclarez une fonction « replaceFirst » qui remplace le premier élément du tableau reçu par l'élément reçu : replaceFirst(list, 'baguette').
      `,
      starterFiles: {
        js: `
          const shoppingList = ['pain', 'lait'];

          // Déclarez les fonctions addItem, removeLast et replaceFirst

          addItem(shoppingList, 'beurre');
          replaceFirst(shoppingList, 'baguette');
          console.log(removeLast(shoppingList));
          console.log(shoppingList);
        `,
      },
      solutionFiles: {
        js: `
          const shoppingList = ['pain', 'lait'];

          // Déclarez les fonctions addItem, removeLast et replaceFirst
          function addItem(list, item) {
            list.push(item);
          }

          function removeLast(list) {
            return list.pop();
          }

          function replaceFirst(list, item) {
            list[0] = item;
          }

          addItem(shoppingList, 'beurre');
          replaceFirst(shoppingList, 'baguette');
          console.log(removeLast(shoppingList));
          console.log(shoppingList);
        `,
      },
      tests: [
        {
          label: '« addItem » ajoute l\'élément à la fin du tableau',
          code: `var l = ['pain']; addItem(l, 'lait'); addItem(l, 'beurre'); return l.join(',') === 'pain,lait,beurre'`,
        },
        {
          label: '« removeLast » retire le dernier élément et le renvoie',
          code: `var l = ['a', 'b', 'c']; var removed = removeLast(l); return removed === 'c' && l.join(',') === 'a,b'`,
        },
        {
          label: '« replaceFirst » remplace le premier élément',
          code: `var l = ['a', 'b']; replaceFirst(l, 'z'); return l.join(',') === 'z,b'`,
        },
      ],
    },
    {
      slug: 'parcourir-tableau',
      title: 'Parcourir un tableau',
      statement: `
        Pour parcourir un tableau, une boucle for peut passer par toutes les positions, de 0 à length - 1 :
        for (let i = 0; i < fruits.length; i++) { console.log(fruits[i]); }

        La boucle for...of est plus simple quand la position est inutile : elle donne directement chaque élément.

        Exemple :
        for (const fruit of fruits) { console.log(fruit); }

        Objectifs :
        - Avec une boucle for...of, déclarez une fonction « sum » qui renvoie la somme des nombres du tableau reçu : sum([4, 8, 3]) renvoie 15.
        - Déclarez une fonction « showRanking » qui affiche dans la console chaque élément du tableau reçu, précédé de son rang en commençant à 1 : showRanking(['Alice', 'Bob']) affiche "1. Alice" puis "2. Bob".
      `,
      starterFiles: {
        js: `
          // Déclarez la fonction sum

          // Déclarez la fonction showRanking

          console.log(sum([4, 8, 3]));
          showRanking(['Alice', 'Bob', 'Zoé']);
        `,
      },
      solutionFiles: {
        js: `
          // Déclarez la fonction sum
          function sum(numbers) {
            let total = 0;
            for (const n of numbers) {
              total = total + n;
            }
            return total;
          }

          // Déclarez la fonction showRanking
          function showRanking(names) {
            for (let i = 0; i < names.length; i++) {
              console.log(\`\${i + 1}. \${names[i]}\`);
            }
          }

          console.log(sum([4, 8, 3]));
          showRanking(['Alice', 'Bob', 'Zoé']);
        `,
      },
      tests: [
        {
          label: '« sum » renvoie la somme des nombres du tableau',
          code: `return sum([4, 8, 3]) === 15 && sum([10]) === 10 && sum([]) === 0`,
        },
        {
          label: '« sum » utilise une boucle for...of',
          code: `return /for\\s*\\(\\s*(const|let)\\s+\\w+\\s+of\\b/.test(source)`,
        },
        {
          label: '« showRanking » affiche chaque élément précédé de son rang',
          code: `var n = logs.length; showRanking(['Alice', 'Bob', 'Zoé']); return logs.slice(n).join('|') === '1. Alice|2. Bob|3. Zoé'`,
        },
      ],
    },
    {
      slug: 'recap-tableaux',
      title: 'Récapitulatif : chaînes et tableaux',
      statement: `
        Ces fonctions gèrent la liste des inscrits d'un site, mais elles contiennent des erreurs. Corrigez-les pour obtenir les résultats suivants.

        Objectifs :
        - cleanName('  Alice ') renvoie "alice".
        - « isValidName » renvoie true pour un pseudo d'au moins 3 caractères, et false sinon.
        - « addUser » ajoute le pseudo reçu à la fin de « users ».
        - « getLastUser » renvoie le dernier élément de « users ».
        - « showUsers » affiche chaque inscrit dans la console, un par ligne.
      `,
      starterFiles: {
        js: `
          const users = ['alice', 'bob'];

          // Renvoie le pseudo sans espaces autour et en minuscules
          function cleanName(name) {
            return name.toLowerCase();
          }

          // Renvoie true si le pseudo a au moins 3 caractères
          function isValidName(name) {
            return name.length() >= 3;
          }

          // Ajoute le pseudo à la fin de la liste
          function addUser(name) {
            users[0] = name;
          }

          // Renvoie le dernier inscrit
          function getLastUser() {
            return users[users.length];
          }

          // Affiche chaque inscrit, un par ligne
          function showUsers() {
            for (const user of users) {
              console.log(users);
            }
          }

          addUser(cleanName('  Zoé '));
          console.log(getLastUser());
          showUsers();
          console.log(isValidName('zoé'));
        `,
      },
      solutionFiles: {
        js: `
          const users = ['alice', 'bob'];

          // Renvoie le pseudo sans espaces autour et en minuscules
          function cleanName(name) {
            return name.trim().toLowerCase();
          }

          // Renvoie true si le pseudo a au moins 3 caractères
          function isValidName(name) {
            return name.length >= 3;
          }

          // Ajoute le pseudo à la fin de la liste
          function addUser(name) {
            users.push(name);
          }

          // Renvoie le dernier inscrit
          function getLastUser() {
            return users[users.length - 1];
          }

          // Affiche chaque inscrit, un par ligne
          function showUsers() {
            for (const user of users) {
              console.log(user);
            }
          }

          addUser(cleanName('  Zoé '));
          console.log(getLastUser());
          showUsers();
          console.log(isValidName('zoé'));
        `,
      },
      tests: [
        {
          label: 'cleanName(\'  Alice \') renvoie "alice"',
          code: `return cleanName('  Alice ') === 'alice' && cleanName('BOB') === 'bob'`,
        },
        {
          label: '« isValidName » vérifie que le pseudo a au moins 3 caractères',
          code: `return isValidName('bob') === true && isValidName('al') === false`,
        },
        {
          label: '« addUser » ajoute le pseudo à la fin de « users »',
          code: `var before = users.length; var first = users[0]; addUser('marc'); return users.length === before + 1 && users[users.length - 1] === 'marc' && users[0] === first`,
        },
        {
          label: '« getLastUser » renvoie le dernier inscrit',
          code: `return getLastUser() !== undefined && getLastUser() === users[users.length - 1]`,
        },
        {
          label: '« showUsers » affiche chaque inscrit, un par ligne',
          code: `var n = logs.length; showUsers(); return logs.slice(n).join('|') === users.join('|')`,
        },
      ],
    },
    {
      slug: 'objets',
      title: 'Les objets',
      statement: `
        Un objet regroupe plusieurs valeurs sous forme de paires clé : valeur, appelées propriétés. Il s'écrit entre accolades, avec les propriétés séparées par des virgules.

        Exemple :
        const user = { name: 'Alice', age: 30 };

        Une propriété se lit avec un point suivi de son nom : user.name vaut 'Alice'.
        Les valeurs peuvent être de n'importe quel type : nombre, chaîne, booléen, tableau...

        Objectifs :
        - Déclarez un objet « book » dont la propriété « title » vaut "Le Petit Prince", « author » vaut "Antoine de Saint-Exupéry" et « pages » vaut 96.
        - Déclarez une fonction « describeBook » qui reçoit un livre et renvoie sa description : describeBook(book) renvoie "Le Petit Prince, par Antoine de Saint-Exupéry (96 pages)".
      `,
      starterFiles: {
        js: `
          // Déclarez l'objet book

          // Déclarez la fonction describeBook

          console.log(book);
          console.log(describeBook(book));
        `,
      },
      solutionFiles: {
        js: `
          // Déclarez l'objet book
          const book = {
            title: 'Le Petit Prince',
            author: 'Antoine de Saint-Exupéry',
            pages: 96,
          };

          // Déclarez la fonction describeBook
          function describeBook(b) {
            return \`\${b.title}, par \${b.author} (\${b.pages} pages)\`;
          }

          console.log(book);
          console.log(describeBook(book));
        `,
      },
      tests: [
        {
          label: '« book » a un titre, un auteur et un nombre de pages',
          code: `return book.title === 'Le Petit Prince' && book.author === 'Antoine de Saint-Exupéry' && book.pages === 96`,
        },
        {
          label: '« describeBook » renvoie la description du livre reçu',
          code: `return describeBook({ title: 'Dune', author: 'Frank Herbert', pages: 412 }) === 'Dune, par Frank Herbert (412 pages)'`,
        },
      ],
    },
    {
      slug: 'modifier-objet',
      title: 'Modifier un objet',
      statement: `
        Une propriété s'affecte comme une variable, avec = :
        - si la propriété existe déjà, sa valeur est remplacée ;
        - si elle n'existe pas encore, elle est créée.
        Le mot-clé delete supprime une propriété.

        Exemple :
        const user = { name: 'Alice', age: 30 };
        user.age = 31; // age existe : sa valeur est remplacée
        user.city = 'Caen'; // city n'existe pas : elle est créée
        delete user.age; // user vaut maintenant { name: 'Alice', city: 'Caen' }

        Les crochets donnent aussi accès à une propriété : user['city'] est équivalent à user.city. Ils deviennent indispensables quand le nom de la propriété est stocké dans une variable :
        const key = 'city';
        user[key] vaut 'Caen', car JavaScript utilise la valeur de key, c'est-à-dire 'city'.
        user.key, au contraire, cherche une propriété qui s'appelle "key", qui n'existe pas.

        Objectifs :
        - Déclarez une fonction « birthday » qui ajoute 1 à la propriété « age » de la personne reçue.
        - Déclarez une fonction « setProperty » qui reçoit un objet, un nom de propriété et une valeur, et affecte cette valeur à cette propriété : setProperty(user, 'city', 'Caen').
        - Déclarez une fonction « removePassword » qui supprime la propriété « password » de l'utilisateur reçu.
      `,
      starterFiles: {
        js: `
          const user = { name: 'Alice', age: 30, password: 'soleil42' };

          // Déclarez les fonctions birthday, setProperty et removePassword

          birthday(user);
          setProperty(user, 'city', 'Caen');
          removePassword(user);
          console.log(user);
        `,
      },
      solutionFiles: {
        js: `
          const user = { name: 'Alice', age: 30, password: 'soleil42' };

          // Déclarez les fonctions birthday, setProperty et removePassword
          function birthday(person) {
            person.age++;
          }

          function setProperty(object, key, value) {
            object[key] = value;
          }

          function removePassword(account) {
            delete account.password;
          }

          birthday(user);
          setProperty(user, 'city', 'Caen');
          removePassword(user);
          console.log(user);
        `,
      },
      tests: [
        {
          label: '« birthday » ajoute 1 à l\'âge',
          code: `var p = { name: 'Bob', age: 30 }; birthday(p); birthday(p); return p.age === 32`,
        },
        {
          label: '« setProperty » affecte la valeur à la propriété demandée',
          code: `var o = {}; setProperty(o, 'city', 'Caen'); setProperty(o, 'zip', 14000); return o.city === 'Caen' && o.zip === 14000 && !('key' in o)`,
        },
        {
          label: '« removePassword » supprime la propriété « password »',
          code: `var u = { name: 'Bob', password: 'secret' }; removePassword(u); return !('password' in u) && u.name === 'Bob'`,
        },
      ],
    },
    {
      slug: 'tableaux-objets',
      title: 'Les tableaux d\'objets',
      statement: `
        Un tableau peut contenir des objets. C'est la façon la plus courante de représenter une liste de données : des produits, des utilisateurs, des messages...

        Exemple :
        const products = [{ name: 'clavier', price: 45 }, { name: 'souris', price: 20 }];
        products[1].name vaut 'souris'.

        Une boucle for...of donne chaque objet à tour de rôle : for (const product of products) { console.log(product.name); }

        Objectifs :
        - Déclarez une fonction « getTotal » qui renvoie la somme des prix des produits reçus.
        - Déclarez une fonction « getNames » qui renvoie un nouveau tableau contenant les noms des produits reçus.
        - Déclarez une fonction « getCheaperThan » qui reçoit des produits et un prix, et renvoie un nouveau tableau contenant les produits dont le prix est inférieur à ce prix.
      `,
      starterFiles: {
        js: `
          const cart = [
            { name: 'clavier', price: 45 },
            { name: 'souris', price: 20 },
            { name: 'écran', price: 180 },
            { name: 'câble', price: 8 },
          ];

          // Déclarez les fonctions getTotal, getNames et getCheaperThan

          console.log(getTotal(cart));
          console.log(getNames(cart));
          console.log(getCheaperThan(cart, 30));
        `,
      },
      solutionFiles: {
        js: `
          const cart = [
            { name: 'clavier', price: 45 },
            { name: 'souris', price: 20 },
            { name: 'écran', price: 180 },
            { name: 'câble', price: 8 },
          ];

          // Déclarez les fonctions getTotal, getNames et getCheaperThan
          function getTotal(products) {
            let total = 0;
            for (const product of products) {
              total = total + product.price;
            }
            return total;
          }

          function getNames(products) {
            const names = [];
            for (const product of products) {
              names.push(product.name);
            }
            return names;
          }

          function getCheaperThan(products, maxPrice) {
            const result = [];
            for (const product of products) {
              if (product.price < maxPrice) {
                result.push(product);
              }
            }
            return result;
          }

          console.log(getTotal(cart));
          console.log(getNames(cart));
          console.log(getCheaperThan(cart, 30));
        `,
      },
      tests: [
        {
          label: '« getTotal » renvoie la somme des prix',
          code: `return getTotal([{ name: 'a', price: 45 }, { name: 'b', price: 20 }]) === 65 && getTotal([]) === 0`,
        },
        {
          label: '« getNames » renvoie le tableau des noms',
          code: `var r = getNames([{ name: 'clavier', price: 45 }, { name: 'souris', price: 20 }]); return Array.isArray(r) && r.join(',') === 'clavier,souris'`,
        },
        {
          label: '« getCheaperThan » renvoie les produits moins chers que le prix reçu',
          code: `var items = [{ name: 'clavier', price: 45 }, { name: 'souris', price: 20 }, { name: 'câble', price: 8 }]; var r = getCheaperThan(items, 30); return Array.isArray(r) && r.length === 2 && r[0].name === 'souris' && r[1].name === 'câble' && items.length === 3`,
        },
      ],
    },
  ],
})
