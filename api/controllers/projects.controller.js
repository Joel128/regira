const getProjectsById = async (req, res, Model) => {
    try {
      const projects = await Model.findAll({
        where: { user_id: req.params.id },
      });
      res.json(projects);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  export default { getProjectsById };
  