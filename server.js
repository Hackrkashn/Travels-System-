const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbms'
});

connection.connect((err) => {
  if (err) {
    console.log('Database has not been connected yet');
    throw err;
  }

  console.log('Database connected successfully!');
});

app.get('/', (req, res) => {
  res.render('welcome.ejs');
});

app.get('/signup', (req, res) => {
    res.render('sign_up.ejs');
  });

  app.get('/c_login',(req,res)=>{
    res.render('c_login.ejs');
});

app.get('/c_home',(req,res)=>{
    res.render('c_home.ejs',{msg:'You are logged in successfully'});
    
});
  
//signup
  app.post('/signup', (req, res) => {
    const { username, password, email ,name , mobno} = req.body;
    const query = 'SELECT * FROM customers WHERE c_userid = ? AND password = ?';
    connection.query(query, [username, password], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        console.log('user is already in databases');
        res.redirect('/c_login');
      } else {
        const insertQuery =
          'INSERT INTO customers (c_name , c_mail , c_mobile , c_userid, password) VALUES (?, ?,?,?,?)';
        connection.query(
          insertQuery,
          [name , email , mobno , username, password,email],
          (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                const Query = `CREATE TABLE \`${username}\` (trip_id varchar(25))`;
        connection.query(
          Query,
         
          (err, result) => {
            if (err) throw err;
            
            res.redirect('/c_login');
            
          }
        );
            
            }
          }
        );
      }
    });
  }); 



//login

  app.post('/c_loginform', (req, res) => {
    const { c_userid, password } = req.body;
    const query = `SELECT COUNT(*) as count FROM customers WHERE c_userid='${c_userid}' AND password='${password}'`;
  
    connection.query(query, (err, results) => {
      if (err) {
        console.log(err);
        res.render('c_login', { msg: err });
      } else {
        const count = results[0].count;
        if (count === 1) {
          const userId = c_userid; 
          const newCurrent = 1; 

          const sql = 'UPDATE customers SET current = ? WHERE c_userid = ?';

          connection.query(sql, [newCurrent, userId], (error, results, fields) => {
            if (error) {
              console.log('Error updating data:', error);
            } else {
              console.log('Data updated successfully');
            }
          });
          res.render('c_home.ejs',{msg: 'You are Logged in Successfully',userId});
          
        } else {
          res.redirect('/c_login');
        }
      }
    });
  });




//current user

app.get('/getCustomer', (req, res) => {
  const newCurrent = 1;
  const sql = 'SELECT c_userid FROM customers WHERE current = ?';
  
  connection.query(sql, [newCurrent], (error, results, fields) => {
    if (error) {
      console.error('Error retrieving data:', error);
      res.status(500).send('Error retrieving data');
    } else {
      const cust = results[0].c_userid;
      console.log('Customer found:', cust);
      res.send(cust);
    }
  });
});



//logout 

app.post('/logout', (req, res) => {
  const newValue = 0;
  const oldValue = 1;

  const sql = 'UPDATE customers SET current = ? WHERE current = ?';
  connection.query(sql, [newValue, oldValue], (error, results, fields) => {
    if (error) {
      console.error('Error updating data:', error);
      res.status(500).send('Error updating data');
    } else {
      console.log('Logout successfully');
      res.render('c_login.ejs');
    }
  });
});

//book trip

app.get('/trips', (req, res) => {
  const query = `SELECT trip_id, st_city, ed_city, st_date FROM trips`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Failed to fetch trip data:', error);
      res.sendStatus(500);
    } else {
      res.render('book_trip.ejs', { rs: results });
    }
  });
});

//confirmation payment page

app.post('/confirm_booking', (req, res) => {
  const {trip_id } = req.body;
  

  let s = `SELECT amount FROM trips WHERE trip_id='${trip_id}'`;
  connection.query(s, (err, result) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const n = result[0].amount;

    s = `SELECT * FROM trips WHERE trip_id='${trip_id}'`;
    connection.query(s, (err, result) => {
      if (err) {
        console.error('Error executing query: ', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      const st_city = result[0].st_city;
      const ed_city = result[0].ed_city;
      const st_date = result[0].st_date;
      const ed_date = result[0].ed_date;
      const m_userid = result[0].m_userid;
      const cust_count = result[0].cust_count;

      s = 'SELECT DATE_FORMAT(CURDATE(), "%M-%d-%Y")';
      connection.query(s, (err, result) => {
        if (err) {
          console.error('Error executing query: ', err);
          res.status(500).send('Internal Server Error');
          return;
        }

        const today = result[0][Object.keys(result[0])[0]];

        res.render('confirm_booking.ejs', {trip_id,today,n,st_city,ed_city,st_date,ed_date,m_userid,cust_count});
      });
    });
  });
});

app.post('/confirm_booking', (req, res) => {
  res.render('confirm_booking.ejs');
  
});

//Operation after booking confirmed

app.post('/done_booking', (req, res) => {
  const { trip_id } = req.body;

  const sql = 'SELECT c_userid FROM customers WHERE current = 1';
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error('Error in retrieving data:', error);
      res.status(500).send('Error updating data');
    } else {
      const username = results[0].c_userid;
      let sqlInsert = `INSERT INTO \`${username}\` (trip_id) VALUES (?)`;
      connection.query(sqlInsert, [trip_id], (error, results, fields) => {
        if (error) {
          console.error('Error updating data:', error);
          res.status(500).send('Error updating data');
        } else {
          console.log('Data updated successfully');
          res.render('c_home.ejs', { msg: 'Successfully booked for trip (id: ' + trip_id + ')' });
        }
      });
    }
  });
});


//Booked trips
  app.get('/c_bookedtrips', (req, res) => {
    
    const sql = 'SELECT c_userid FROM customers WHERE current = 1';
    
    connection.query(sql, (error, results, fields) => {
      if (error) {
        console.error('Error retrieving data:', error);
        res.status(500).send('Error retrieving data');
      } else {
        const cust = results[0].c_userid;
          const query = `SELECT trip_id, st_city, ed_city, st_date FROM trips NATURAL JOIN \`${cust}\`;`;
      connection.query(query, (error, result, fields) => {
        if (error) {
          console.error('Error retrieving trip data:', error);
          res.status(500).send('Error retrieving trip data');
        } else {
          console.log('trips found');
          res.render('c_bookedtrips.ejs', { trips: result});
        }
      });
        
      }
    });
  
	
});

//All available trips

app.get('/c_alltrips', (req, res) => {
  const query = `SELECT trip_id, st_city, ed_city, st_date FROM trips`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Failed to fetch trip data:', error);
      res.sendStatus(500);
    } else {
      res.render('c_alltrips.ejs', { rs: results });
    }
  });
});

//trip details

app.post('/view_trip', (req, res) => {
  const {trip_id } = req.body;

  let s = `SELECT amount FROM trips WHERE trip_id='${trip_id}'`;
  connection.query(s, (err, result) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const n = result[0].amount;

    s = `SELECT * FROM trips WHERE trip_id='${trip_id}'`;
    connection.query(s, (err, result) => {
      if (err) {
        console.error('Error executing query: ', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      const st_city = result[0].st_city;
      const ed_city = result[0].ed_city;
      const st_date = result[0].st_date;
      const ed_date = result[0].ed_date;
      const m_userid = result[0].m_userid;

      s = 'SELECT DATE_FORMAT(CURDATE(), "%M-%d-%Y")';
      connection.query(s, (err, result) => {
        if (err) {
          console.error('Error executing query: ', err);
          res.status(500).send('Internal Server Error');
          return;
        }

        const today = result[0][Object.keys(result[0])[0]];

        res.render('view_trip.ejs', {trip_id,today,n,st_city,ed_city,st_date,ed_date,m_userid});
      });
    });
  });
});

//managers contact

app.get('/c_contact', (req, res) => {
  const query = `SELECT * from managers`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Failed to fetch trip data:', error);
      res.sendStatus(500);
    } else {
      res.render('c_contact.ejs', { rs: results });
    }
  });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });