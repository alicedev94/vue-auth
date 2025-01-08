const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = '';
const GOOGLE_CLIENT_SECRET = '';

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3001/auth/google/callback',
  scope: ['profile', 'email']
}, (token, tokenSecret, profile, done) => {
  // Aquí es donde puedes buscar en tu base de datos y crear un usuario si no existe
  console.log('Profile', profile);
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
