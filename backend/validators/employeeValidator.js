
const validateEmployee = ({ name, email, position }) => {
  if (!name || typeof name !== 'string' || name.length < 2) return 'Name is required (min 2 chars)';
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) return 'Valid email required';
  if (!position || typeof position !== 'string' || position.length < 2) return 'Position is required (min 2 chars)';
  return null;
};

module.exports = { validateEmployee };
