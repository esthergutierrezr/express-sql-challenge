const express = require("express");
const router = express.Router();
const connection = require("../config");

// This route will send back all the movies
// http://localhost:5000/students
router.get("/", (request, response) => {
  connection.query("SELECT * FROM wizard", (err, results) => {
    if (err) response.status(500).send(err);
    response.json(results);
  });
});

// This route will send back only the movie that matches the Id from the request.params
// ex: localhost:3000/api/students/1
router.get("/:id", (request, response) => {
  const studentId = request.params.id;
  connection.query(
    `SELECT * from wizard WHERE id=${studentId}`,
    (err, results) => {
      if (err) {
        console.log(err);
        response.status(500).send("Error retrieving data");
      } else {
        response.status(200).json(results);
      }
    }
  );
});

// GET - A filter for firstnames that contains...

router.get("/filter/contains", (req, res) => {
  connection.query(
    `select * from wizard where firstname like ?`,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving filtered data ");
      } else {
        console.log(results);
        res.status(200).json(results);
      }
    }
  );
});

// GET - A filter for data that starts with...

router.get("/filter/startswith", (req, res) => {
  connection.query(
    "select * from wizard where firstname like ?",
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving filtered data for firstnames");
      } else {
        console.log(results);
        res.status(200).json(results);
      }
    }
  );
});

// GET - A filter for data that is greater than...

router.get("/filter/greater", (req, res) => {
  connection.query(
    'select * from wizard where birthday > "1960-01-29"',
    (err, results) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .send(
            "Error retrieving filtered data for birthdays greater than 1960-01-29"
          );
      } else {
        console.log(results);
        res.status(200).json(results);
      }
    }
  );
});

// router.get("/birthday", (req, res) => {
//   let sql = "SELECT * FROM wizard WHERE birthday > ?";
//   const sqlValue = [];
//   req.query.greaterThan && sqlValue.push(`${req.query.greaterThan}`);

//   connection.query(sql, sqlValue, (err, results) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("Error retrieving data");
//     } else if (results.length > 0) {
//       res.status(200).json(results);
//     } else {
//       res.status(404).send(`No student beyond '${req.query.greaterThan}'...`);
//     }
//   });
// });

//  GET - Ordered data recovery (i.e. ascending, descending)

router.get("/ascending", (req, res) => {
  connection.query(
    "select * from wizard order by firstname ASC",
    (err, results) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .send("Error retrieving filtered data for ascending names");
      } else {
        console.log(results);
        res.status(200).json(results);
      }
    }
  );
});

// POST - Insertion of a new entity
// http://localhost:5000/students

router.post("/", (req, res) => {
  const {
    firstname,
    lastname,
    birthday,
    birth_place,
    biography,
    is_muggle,
    registered,
    registeredd,
  } = req.body;

  connection.query(
    "insert into wizard (firstname, lastname, birthday, birth_place, biography, is_muggle, registered, registeredd) values(?,?,?,?,?,?,?,?)",
    [
      firstname,
      lastname,
      birthday,
      birth_place,
      biography,
      is_muggle,
      registered,
      registeredd,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error saving new person data");
      } else {
        res.status(200).send("New person data has been saved");
      }
    }
  );
});

// PUT - Modification of an entity

router.put("/:id", (req, res) => {
  const studentId = req.params.id;
  const updatedStudent = req.body;
  connection.query(
    "UPDATE wizard SET ? WHERE id = ?",
    [updatedStudent, studentId],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating data...");
      } else {
        res.status(200).send("Student successfully updated !");
      }
    }
  );
});

// PUT - Toggle a Boolean value

router.put("/toggle/:id", (req, res) => {
  const studentId = req.params.id;
  connection.query(
    "UPDATE wizard SET registeredd = !registeredd WHERE id = ?",
    [studentId],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating data...");
      } else {
        res
          .status(200)
          .send("Student's return status has been successfully updated !");
      }
    }
  );
});

//  DELETE - Delete an entity

router.delete("/delete/:id", (req, res) => {
  const studentId = req.params.id;
  connection.query(
    "DELETE FROM wizard WHERE id = ?",
    [studentId],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating data...");
      } else {
        res.status(200).send("Student successfully deleted !");
      }
    }
  );
});

//  DELETE - Delete all entities where boolean value is false

router.delete("/delete", (req, res) => {
  connection.query(
    "DELETE FROM wizard WHERE registeredd = 0",
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating data...");
      } else {
        res.status(200).send("Student not-registeredd successfully deleted !");
      }
    }
  );
});

module.exports = router;
