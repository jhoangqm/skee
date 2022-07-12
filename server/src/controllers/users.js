const getRoom = (req, res) => {
  const randUser = (Math.random() + 1).toString(36).substring(4);
  res.status(200).send({ roomURL: randUser });
};
