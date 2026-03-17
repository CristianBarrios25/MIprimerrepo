import { connect } from '../config/db/connect.js';

class ModuleModel {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  async addModule(req, res) {
    try {
      const { name, description } = req.body;
      if (!name || !description) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const sqlQuery = "INSERT INTO modules (Modules_name, Modules_description) VALUES (?,?)";
      const [result] = await connect.query(sqlQuery, [name, description]);
      res.status(201).json({
        data: [{ id: result.insertId, name, description }],
        status: 201
      });
    } catch (error) {
      res.status(500).json({ error: "Error adding module", details: error.message });
    }
  }

  async getModules(req, res) {
    try {
      const sqlQuery = "SELECT * FROM modules";
      const [result] = await connect.query(sqlQuery);
      res.status(200).json({ data: result, status: 200 });
    } catch (error) {
      res.status(500).json({ error: "Error fetching modules", details: error.message });
    }
  }

  async getModuleById(req, res) {
    try {
      const sqlQuery = "SELECT * FROM modules WHERE Modules_id = ?";
      const [result] = await connect.query(sqlQuery, [req.params.id]);
      if (result.length === 0) return res.status(404).json({ error: "Module not found" });
      res.status(200).json({ data: result[0], status: 200 });
    } catch (error) {
      res.status(500).json({ error: "Error fetching module", details: error.message });
    }
  }

  async updateModule(req, res) {
    try {
      const { name, description } = req.body;
      if (!name || !description) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const update_at = new Date().toLocaleString("en-CA", { timeZone: "America/Bogota" }).replace(",", "").replace("/", "-").replace("/", "-");
      const sqlQuery = "UPDATE modules SET Modules_name=?, Modules_description=?, update_at=? WHERE Modules_id=?";
      const [result] = await connect.query(sqlQuery, [name, description, update_at, req.params.id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: "Module not found" });
      res.status(200).json({
        data: [{ name, description, update_at }],
        status: 200,
        updated: result.affectedRows
      });
    } catch (error) {
      res.status(500).json({ error: "Error updating module", details: error.message });
    }
  }

  async deleteModule(req, res) {
    try {
      const sqlQuery = "DELETE FROM modules WHERE Modules_id = ?";
      const [result] = await connect.query(sqlQuery, [req.params.id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: "Module not found" });
      res.status(200).json({ message: "Module deleted", status: 200, deleted: result.affectedRows });
    } catch (error) {
      res.status(500).json({ error: "Error deleting module", details: error.message });
    }
  }
}

export default new ModuleModel();