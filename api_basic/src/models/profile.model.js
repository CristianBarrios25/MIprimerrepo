import { connect } from '../config/db/connect.js';

class ProfileModel {
  constructor(id, first_name, last_name, email, phone, user_fk) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.user_fk = user_fk;
  }

  async addProfile(req, res) {
    try {
      const { first_name, last_name, email, phone, user_fk } = req.body;
      if (!first_name || !last_name || !email || !user_fk) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const sqlQuery = "INSERT INTO profile (Profile_first_name, Profile_last_name, Profile_email, Profile_phone, Users_fk) VALUES (?,?,?,?,?)";
      const [result] = await connect.query(sqlQuery, [first_name, last_name, email, phone, user_fk]);
      res.status(201).json({
        data: [{ id: result.insertId, first_name, last_name, email, phone, user_fk }],
        status: 201
      });
    } catch (error) {
      res.status(500).json({ error: "Error adding profile", details: error.message });
    }
  }

  async getProfiles(req, res) {
    try {
      const sqlQuery = "SELECT * FROM profile";
      const [result] = await connect.query(sqlQuery);
      res.status(200).json({ data: result, status: 200 });
    } catch (error) {
      res.status(500).json({ error: "Error fetching profiles", details: error.message });
    }
  }

  async getProfileById(req, res) {
    try {
      const sqlQuery = "SELECT * FROM profile WHERE Profile_id = ?";
      const [result] = await connect.query(sqlQuery, [req.params.id]);
      if (result.length === 0) return res.status(404).json({ error: "Profile not found" });
      res.status(200).json({ data: result[0], status: 200 });
    } catch (error) {
      res.status(500).json({ error: "Error fetching profile", details: error.message });
    }
  }

  async updateProfile(req, res) {
    try {
      const { first_name, last_name, email, phone, user_fk } = req.body;
      if (!first_name || !last_name || !email || !user_fk) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const update_at = new Date().toLocaleString("en-CA", { timeZone: "America/Bogota" }).replace(",", "").replace("/", "-").replace("/", "-");
      const sqlQuery = "UPDATE profile SET Profile_first_name=?, Profile_last_name=?, Profile_email=?, Profile_phone=?, Users_fk=?, update_at=? WHERE Profile_id=?";
      const [result] = await connect.query(sqlQuery, [first_name, last_name, email, phone, user_fk, update_at, req.params.id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: "Profile not found" });
      res.status(200).json({
        data: [{ first_name, last_name, email, phone, user_fk, update_at }],
        status: 200,
        updated: result.affectedRows
      });
    } catch (error) {
      res.status(500).json({ error: "Error updating profile", details: error.message });
    }
  }

  async deleteProfile(req, res) {
    try {
      const sqlQuery = "DELETE FROM profile WHERE Profile_id = ?";
      const [result] = await connect.query(sqlQuery, [req.params.id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: "Profile not found" });
      res.status(200).json({ message: "Profile deleted", status: 200, deleted: result.affectedRows });
    } catch (error) {
      res.status(500).json({ error: "Error deleting profile", details: error.message });
    }
  }
}

export default new ProfileModel();