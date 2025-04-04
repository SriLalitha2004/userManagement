const User = require('../models/Usermodel');

const Manager = require('../models/Managermodel');

const validatePAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan.toUpperCase());

const validateMobile = (mob) => /^\+?\d{10,12}$/.test(mob);

// Create User
exports.createUser = async (req, res) => {
    try {
        const { full_name, mob_num, pan_num, manager_id } = req.body;

        // Validation
        if (!full_name || !validateMobile(mob_num) || !validatePAN(pan_num)){
            res.status(400).json({message: "Input data not valid"})
        }

        const manager=await Manager.findOne({manager_id, is_active: true})
        
        if(!manager){
            res.status(400).json({message: "Invalid manager_id"})
        }

        // Creating User 
        const newUser=new User({full_name, mob_num, pan_num, manager_id})
        await newUser.save()
        res.status(201).json({message: "User created successfully"})
    }catch(error){
        res.status(500).json({message: "Server error", error})
        console.log(error.message)
    }
};

//Get All Users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//  Delete User
exports.deleteUser = async (req, res) => {
    try {
        const { user_id } = req.params;  // Use req.params instead of req.body
        const deletedUser = await User.findOneAndDelete({ _id: user_id });  //  Use _id instead of user_id

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update User
exports.updateUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const updates = req.body;
        updates.updated_at = Date.now();

        const updatedUser = await User.findByIdAndUpdate(user_id, updates, {new: true});  //  Use _id instead of user_id

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found"});
        }

        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error)
    }
};