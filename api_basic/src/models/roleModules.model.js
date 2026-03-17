import { connect } from '../config/db/connect.js';

class RoleModuleModel {
  constructor(id, role_fk, module_fk) {
    this.id = id;
    this.role_fk = role_fk;
    this.module_fk = module_fk;
  }

  async addRoleModule(req, res) {
    try {
      const { role_fk, module_fk } = req.body;
      if (!role_fk || !module_fk) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const sqlQuery = "INSERT INTO role_modules (Roles_fk, Modules_fk) VALUES (?,?)";
      const [result] = await connect.query(sqlQuery, [role_fk, module_fk]);
      res.status(201).json({
        data: [{ id: result.insertId, role_fk, module_fk }],
        status: 201
      });
    } catch (error) {
      res.status(500).json({ error: "Error adding role-module", details: error.message });
    }
  }

  async getRoleModules(req, res) {
    try {
      const sqlQuery = `
        SELECT rm.RoleModules_id, r.Roles_name, m.Modules_name
        FROM role_modules rm
        INNER JOIN roles r ON rm.Roles_fk = r.Roles_id
        INNER JOIN modules m ON rm.Modules_fk = m.Modules_id
      `;
      const [result] = await connect.query(sqlQuery);
      res.status(200).json({ data: result, status: 200 });
    } catch (error) {
      res.status(500).json({ error: "Error fetching role-modules", details: error.message });
    }
  }

  async getRoleModuleById(req, res) {
    try {
      const sqlQuery = `
        SELECT rm.RoleModules_id, r.Roles_name, m.Modules_name
        FROM role_modules rm
        INNER JOIN roles r ON rm.Roles_fk = r.Roles_id
        INNER JOIN modules m ON rm.Modules_fk = m.Modules_id
        WHERE rm.RoleModules_id = ?
      `;
      const [result] = await connect.query(sqlQuery, [req.params.id]);
      if (result.length === 0) return res.status(404).json({ error: "Role-module not found" });
      res.status(200).json({ data: result[0], status: 200 });
    } catch (error) {
      res.status(500).json({ error: "Error fetching role-module", details: error.message });
    }
  }

  async updateRoleModule(req, res) {
    try {
      const { role_fk, module_fk } = req.body;
      if (!role_fk || !module_fk) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const update_at = new Date().toLocaleString("en-CA", { timeZone: "America/Bogota" }).replace(",", "").replace("/", "-").replace("/", "-");
      const sqlQuery = "UPDATE role_modules SET Roles_fk=?, Modules_fk=?, update_at=? WHERE RoleModules_id=?";
      const [result] = await connect.query(sqlQuery, [role_fk, module_fk, update_at, req.params.id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: "Role-module not found" });
      res.status(200).json({
        data: [{ role_fk, module_fk, update_at }],
        status: 200,
        updated: result.affectedRows
      });
    } catch (error) {
      res.status(500).json({ error: "Error updating role-module", details: error.message });
    }
  }

  async deleteRoleModule(req, res) {
    try {
      const sqlQuery = "DELETE FROM role_modules WHERE RoleModules_id = ?";
      const [result] = await connect.query(sqlQuery, [req.params.id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: "Role-module not found" });
      res.status(200).json({ message: "Role-module deleted", status: 200, deleted: result.affectedRows });
    } catch (error) {
      res.status(500).json({ error: "Error deleting role-module", details: error.message });
    }
  }
}

export default new RoleModuleModel();