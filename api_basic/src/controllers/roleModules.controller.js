import roleModulesModel from "../models/roleModules.model";

export const showroleModules = async (req, res) => {
    try{
        const roleMoodules = new roleModulesModel();
        roleMoodules.getroleModules(req, res);  
    } catch (error) {
        res.status(500).json({ error: "Error fetching roleModules", details: error.message });      
    }
};

export const showroleModuleId = async (req, res) => {
    try{
        const roleMoodules = new roleModulesModel();
        roleMoodules.getroleModuleById(req, res);  
    } catch (error) {
        res.status(500).json({ error: "Error fetching roleModule", details: error.message });      
    }
};

export const addroleModule = async (req, res) => {
    try{
        const roleMoodules = new roleModulesModel();        
        roleMoodules.addroleModule(req, res);  
    } catch (error) {
        res.status(500).json({ error: "Error adding roleModule", details: error.message });      
    }   
};  

export const updateroleModule = async (req, res) => {
    try{
        const roleMoodules = new roleModulesModel();        
        roleModules.updateRoleModule(req, res);  
    }catch(error) {
        res.status(500).json({ error: "Error updating roleModule", details: error.message });      
    }   
};

export const deleteroleModule = async (req, res) => {
    try{
        const roleMoodules = new roleModulesModel();        
        roleModules.deleteRoleModule(req, res);  
     } catch (error) {
        res.status(500).json({ error: "Error deleting roleModule", details: error.message });      
     }
};
