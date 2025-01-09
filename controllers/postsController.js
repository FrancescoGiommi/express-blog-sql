const connection = require("../connection/connection");

/* Index */
function index(req, res) {
  /* Preparo la query */
  const sql = "SELECT * FROM posts";

  /* Eseguo la query */
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
}

/* Show */
function show(req, res) {
  /* Recupero l'id e lo trasformo in numero */
  const id = parseInt(req.params.id);

  /* Preparo la query */
  const sql = "SELECT * FROM posts WHERE id = ?";

  /* Eseguo la query */
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results[0]);
  });
  // /* Cerco il post tramite l'id */
  // const posts = postsData.find((post) => post.id == id);

  // /* Faccio il controllo*/
  // if (!posts) {
  //   const err = new Error("Id post not found");
  //   err.code = 404;
  //   throw err;
  // }

  // res.json(posts);
}

/* Create */
function create(req, res) {
  /* Creo un nuovo id incrementando l'ultimo id presente */
  // const id = postsData[postsData.length - 1].id + 1;
  // /* Creo il nuvove oggetto post */
  // const newPost = {
  //   id: id,
  //   titolo: req.body.titolo,
  //   contenuto: req.body.contenuto,
  //   immagine: req.body.immagine,
  //   tags: req.body.tags,
  // };
  // /* Pusho il nuovo oggetto nell'array */
  // postsData.push(newPost);
  // /* Imposto lo status a 201 */
  // res.status(201);
  // /* Restituisco il nuovo post */
  // res.json(newPost);
}

/* Update */
function update(req, res) {
  /* Recupero l'id e lo trasformo in numero */
  // const id = parseInt(req.params.id);
  // /* Cerco il post tramite l'id */
  // const post = postsData.find((post) => post.id == id);
  // /* Faccio il controllo*/
  // if (!post) {
  //   const err = new Error("Id post not found");
  //   err.code = 404;
  //   throw err;
  // }
  // /* Aggiorno il post */
  // post.titolo = req.body.titolo;
  // post.contenuto = req.body.contenuto;
  // post.immagine = req.body.immagine;
  // post.tags = req.body.tags;
  // /* Stampo l'Array in console */
  // console.log(postsData);
  // /* Genero il post aggiornato */
  // res.json(post);
}

/* Modify */
function modify(req, res) {
  // const id = parseInt(req.params.id);
  // res.json("Modifica parzialmente il post" + " " + id);
}

/* Delete */
function destroy(req, res) {
  const id = parseInt(req.params.id);
  /* Preparo la query */
  const sql = "DELETE FROM posts WHERE id = ?";

  /* Eseguo la query */
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to delete pizza" });
    res.sendStatus(204);
  });
  // const posts = postsData.find((post) => post.id == id);

  /* Faccio il controllo*/

  // if (!posts) {
  //   const err = new Error("Id post not found");
  //   err.code = 404;
  //   throw err;
  // }

  // const postsIndex = postsData.indexOf(posts);
  // postsData.splice(postsIndex, 1);
  // console.log(postsData);
  // res.status("200").json({
  //   message: `Post ${id} eliminato`,
  // });
}

/* Esporto tutte le funzioni */
module.exports = { index, show, create, update, modify, destroy };
