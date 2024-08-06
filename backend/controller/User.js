const { User } = require('../model/User');

exports.fetchAllUsers = async (req, res) => {
  let condition = {}
  
  let query = User.find(condition);
  let totalUsersQuery = User.find(condition);
  const totalUsers = await totalUsersQuery.count().exec();
  console.log({ totalUsers });

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    res.set('X-Total-Count', totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};


exports.fetchUserById = async (req, res) => {
  const { id } = req.user;
  console.log(id)
  try {
    const user = await User.findById(id);
    res.status(200).json({id:user.id,addresses:user.addresses,email:user.email,role:user.role});
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};
