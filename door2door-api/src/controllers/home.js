export const index = (req, res) => res.redirect('/api-docs');

export const status = async (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'Cars Service ok 🏎💨',
    status: 200,
    timestamp: Date.now(),
  };
  try {
    return res.json(healthcheck);
  } catch (error) {
    healthcheck.message = error;
    return res.status(503).send();
  }
};
