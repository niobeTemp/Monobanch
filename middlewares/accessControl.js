const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.checkPrivileges = function(requiredPrivileges) {
  return function(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'RESTFULAPIs');
    User.findById(decoded._id).populate('roles').exec((err, user) => {
      if (err) return res.status(500).send("Access Denied");

      const privileges = user.roles.reduce((acc, role) => [...acc, ...role.privileges], []);
      const hasPrivilege = requiredPrivileges.every(priv => 
        privileges.some(p => p.action === priv.action && p.resource === priv.resource)
      );

      if (!hasPrivilege) return res.status(403).send("Access Denied");
      next();
    });
  };
};