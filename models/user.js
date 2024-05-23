const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: [true,'username aleady taken!']},
  password: { type: String, required: true, minLength: [6, 'Minimum password length is6 charachters'] },
  region: { type: String, required: true },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
});
// fire a function before doc saved to db
UserSchema.pre('save', function(next) {
  if (this.isModified('password') || this.isNew) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

UserSchema.methods.comparePassword = function(pass) {
  return bcrypt.compareSync(pass, this.password);
};

// static method to login user
UserSchema.statics.login = async function(_username, _password) {
  const user = await this.findOne({ username :  _username});
  if (user) {
    const auth = await bcrypt.compare(_password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect username');
};
const User = mongoose.model('User', UserSchema);
module.exports = User;