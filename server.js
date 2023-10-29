//root server.js
const path = require('path')
const express = require('express');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({})
const sequelize = require('./config/connection');
const { User } = require('./models');
const userRoutes = require('./routes/user-routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')

app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
  res.send('Test route');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
}).catch(err => {
  console.error("Error syncing database:", err);
  res.status(500).send('Database sync error!');
});
