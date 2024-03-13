const getIssuesByUser = async (req, res, Issues) => {
  try {
    const issues = await Issues.findAll({
      where: { user_id: req.params.id },
    });
    res.json(issues);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getIssuesByProject = async (req, res, Issues) => {
  try {
    const issues = await Issues.findAll({
      where: { project_id: req.params.id },
    });
    res.json(issues);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export default { getIssuesByProject,getIssuesByUser };
