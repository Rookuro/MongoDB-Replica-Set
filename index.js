import { writeFile } from "fs";
import faker from "faker";

function createUsersJson(outputOptions) {
  //Nous mettons un paramètre et par la suite nous allons créer une const pour inclure plusieurs paramètres
  outputOptions.forEach((option) => {
    const users = [];

    // Générer des données pour chaque utilisateur
    for (let i = 0; i < option.numUsers; i++) {
      //Une boucle for on nous allons indiquer dans la déclaration de fonction en tout en bas du code
      const user = {
        name: faker.name.findName(), //Génére automatiquement un prénom/nom
        age: Math.floor(Math.random() * (90 - 18 + 1)) + 18, // Aléatoirement nous allons obtenir un nom compris entre 18 et 90
        email: faker.internet.email(), // Génére automatiquement une adresse email aléatoirement
        createdAt: faker.date.past().toISOString(), //Génére automatiquement une date du passé
      };
      users.push(user); //Nous envoyons les données créer dans la const user
    }

    // Conversion des données dans le format JSON
    const jsonData = JSON.stringify(users, null, 2);

    // Ecriture dans le fichier qui sera définir dans la const outputOptions
    writeFile(option.outputFile, jsonData, (err) => {
      if (err) {
        console.error(
          `Erreur lors de l'écriture du fichier ${option.outputFile} :`,
          err
        );
      } else {
        console.log(`Le fichier ${option.outputFile} a été créé avec succès.`);
      }
    });
  });
}

const outputOptions = [{ numUsers: 100, outputFile: "users.json" }];

createUsersJson(outputOptions);
