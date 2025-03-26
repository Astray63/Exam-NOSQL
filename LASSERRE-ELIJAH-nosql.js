// 1. Insertion de deux nouveaux sets Lego

// Insertion du set "Lego Creator 3-in-1"
db.exam.insertOne({
  nom: "Lego Creator 3-in-1",
  annee_sortie: 2020,
  nombre_de_pieces: 564,
  prix: 59.99,
  evaluations: [
    { utilisateur: "Charlie", note: 4 }
  ]
});

// Insertion du set "Faucon Millenium"
db.exam.insertOne({
  nom: "Faucon Millenium",
  annee_sortie: 2019,
  nombre_de_pieces: 1050,
  prix: 89.99,
  theme: "Star Wars",
  evaluations: [
    { utilisateur: "David", note: 5 },
    { utilisateur: "Eve", note: 3 }
  ]
});


// 2. Modification

// a. 
db.exam.updateOne(
  { nom: "Lego Creator 3-in-1" },
  { $set: { prix: 49.99 } }
);

// b. 
db.exam.updateOne(
  { nom: "Faucon Millenium" },
  { $push: { evaluations: { utilisateur: "Frank", note: 4 } } }
);


// 3. Recherches

// a. 
db.exam.find({ theme: "Star Wars" }).sort({ annee_sortie: -1 });

// b. 
db.exam.find({ prix: { $gt: 100 } }).sort({ nombre_de_pieces: -1 });

// c. 
db.exam.find({}, { nom: 1, nombre_de_figures: 1, _id: 0 })
        .sort({ nombre_de_figures: -1 })
        .limit(3);

// d.
db.exam.find({ "evaluations.note": { $gte: 4 } });

// e.
db.exam.find({
  $or: [
    { theme: "Technic" },
    { theme: "Creator" }
  ],
  nombre_de_pieces: { $lt: 2000 }
});

// f. 
db.exam.find({
  theme: "Harry Potter",
  annee_sortie: { $gte: 2000, $lte: 2010 }
});

// g.
db.exam.find({
  note_moyenne: { $gte: 4 },
  nombre_de_pieces: { $gt: 1000 }
});

// h.
db.exam.find({
  evaluations: { $not: { $elemMatch: { note: { $ne: 5 } } } }
});


// 4. Suppression

// a.
db.exam.updateOne(
  { nom: "Faucon Millenium", annee_sortie: 2019 },
  { $pull: { evaluations: { utilisateur: "Bob" } } }
);

// b.
db.exam.deleteMany({ nombre_de_pieces: { $lt: 1000 } });
