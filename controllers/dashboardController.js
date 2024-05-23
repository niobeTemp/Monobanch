module.exports.home = async(req, res) => {
    res.render('./dashboard');
  };

  module.exports.C_S_S_get = async(req, res) => {
    res.render('./callout_sanitation_schedule');
  };
//   module.exports.C_S_S_post = async(req, res) => {
//     res.render('./callout_sanitation_schedule');
//   };