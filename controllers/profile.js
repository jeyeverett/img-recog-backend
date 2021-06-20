module.exports.handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users')
        .where({id})
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('That user id does not exist.');
            }
        })
        .catch(err => res.status(400).json('Error retrieving user.'));
}