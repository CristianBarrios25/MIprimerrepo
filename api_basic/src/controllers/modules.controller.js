import modulesModel from "../models/modules.model";

export const showModules = async (req, res) => {
  try {
    const modules = new modulesModel(); 
    modules.getModules(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error fetching modules", details: error.message });
  } 
};

export const showModuleId = async (req, res) => {
  try {
    const modules = new modulesModel(); 
    modules.getModuleById(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error fetching module", details: error.message });
  } 
};

export const addModule = async (req, res) => {
  try {
    const modules = new modulesModel(); 
    modules.addModule(req, res);
} catch (error) {       
    res.status(500).json({ error: "Error adding module", details: error.message });
  }
};

export const updateModule = async (req, res) => {
  try {
    const modules = new modulesModel();
    modules.updateModule(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error updating module", details: error.message });
    }   
};

export const deleteModule = async (req, res) => {
  try {
    const modules = new modulesModel();
    modules.deleteModule(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error deleting module", details: error.message });
  }
};
