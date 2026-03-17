import profileModel from "../models/profile.model";

export const showProfile = async (req, res) => {
    try{
        const profile = new profileModel();
        profile.getProfile(req, res);  
    } catch (error) {
        res.status(500).json({ error: "Error fetching profiles", details: error.message });      
    }
};
 