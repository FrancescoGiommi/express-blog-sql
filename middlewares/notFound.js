/* Middleware pagina non trovata */
function notFound(req, res, next) {
  res.status(404);
  res.json({
    status: "KO",
    error: "Page not Found",
  });
}

module.exports = notFound;
