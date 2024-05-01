const Pool = require('pg').Pool;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const getUsers = (req, res) => {
  pool.query(
    'SELECT * FROM users ORDER BY id ASC', 
    (error, results) => {
      if (error) {
        throw error;
      }

      res.status(200).json(results.rows);
    }
  );
}

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(
    'SELECT * FROM users WHERE id = $1', 
    [id], 
    (error, results) => {
      if (error) throw error;

      res.status(200).json(results.rows);
    }
  )
}

const createUser = (req, res) => {
  const {name, email} = req.body;

  pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', 
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.status(201).json({
        message: `User added with ID: ${results.rows[0].id}`,
        data: {
          name,
          email
        }
      });
    }
  )
}

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) throw error;

      res.status(200).json({
          message: `User modified with ID: ${id}`,
          data: {
            name,
            email
          }
        })
    }
  );
}

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(
    'DELETE FROM users WHERE id = $1',
    [id],
    (error, results) => {
      if (error) throw error;

      res.status(200).json({
        message: `User deleted with ID: ${id}`
      })
    }
  );
}


module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}