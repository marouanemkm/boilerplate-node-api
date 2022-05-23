const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  try {
    const email = req.body.username;
    const password = req.body.password;

    console.log(email, password);

    if (email != "admin@gmail.com" || password != "admin") {
      return res.status(401).json({ message: "identifiants incorrects !" });
    }

    const expiresIn = "1h";

    const xsrfToken = crypto.randomBytes(64).toString("hex");

    const accessToken = jwt.sign(
      { firstName: "John", lastName: "Doe", xsrfToken },
      "RANDOM_SECRET_KEY",
      { expiresIn }
    );

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
    });

    return res.status(200).json({ accessToken, expiresIn });

    // return res.status(200).json({ message: 'good' });
    // if (username == 'admin' && password == 'admin') {
    //     return res.status(200).json({ message: 'Données valides' });
    // } else if (username !== 'admin' || password !== 'admin') {
    //     return res.status(401).json({ message: 'Données invalides' })
    // }
  } catch (error) {
    console.log("error inconnue");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.auth = async (req, res) => {
  try {
    const { cookies } = req;

    /* On vérifie que le JWT est présent dans les cookies de la requête */
    if (!cookies || !cookies.access_token) {
      return res.status(401).json({ message: "Missing cookie !" });
    }

    const accessToken = cookies.access_token;

    /* On vérifie et décode le JWT à l'aide du secret et de l'algorithme utilisé pour le générer */
    const decodedToken = jwt.verify(accessToken, "RANDOM_SECRET_KEY");

    /* On vérifie que le token CSRF correspond à celui présent dans le JWT  */
    if (!decodedToken) {
      return res.status(401).json({ message: "Missing token !" });
    }

    return res.status(200).json({ message: "authenticated !" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
