import asyncHandler from "../middleware/asyncHandler.js";
import Lead from "../models/Leads.js";

// @desc Create loan leads
// @route POST /api/leads
// @access Public
const createLead = asyncHandler(async (req, res) => {
    const {
        fName,
        mName,
        lName,
        gender,
        dob,
        adhaar,
        pan,
        mobile,
        alternateMobile,
        personalEmail,
        officeEmail,
        loanAmount,
        salary,
        pinCode,
        state,
        city,
    } = req.body;
    const newLead = await Lead.create({
        fName,
        mName: mName ?? "",
        lName: lName ?? "",
        gender,
        dob,
        adhaar,
        pan,
        mobile,
        alternateMobile,
        personalEmail,
        officeEmail,
        loanAmount,
        salary,
        pinCode,
        state,
        city,
    });
    // const savedUserDetails = await newUserDetails.save();
    res.status(201).json(newLead);
});

// @desc Get all leads
// @route GET /api/leads
// @access Private
const getAllLeads = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1; // current page
    const limit = parseInt(req.query.limit) || 10; // items per page
    const skip = (page - 1) * limit;

    const leads = await Lead.find({
        $or: [{ screenerId: { $exists: false } }, { screenerId: null }],
    })
        .skip(skip)
        .limit(limit);
    const totalLeads = await Lead.countDocuments();

    res.json({
        totalLeads,
        totalPages: Math.ceil(totalLeads / limit),
        currentPage: page,
        leads,
    });
});

// @desc Get lead
// @route GET /api/leads/:id
// @access Private
const getLead = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const lead = await Lead.findOne({ _id: id });
    if (!lead) {
        res.status(404);
        throw new Error("Lead not found!!!!");
    }
    res.json(lead);
});

// @desc Allocate new lead
// @route PATCH /api/leads/:id
// @access Private
const allocateLead = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { emp_id } = req.body;

    const lead = await Lead.findByIdAndUpdate(
        { _id: id },
        { screenerId: emp_id },
        { new: true }
    );

    res.json(lead);
});

// @desc Allocated Leads
// @route GET /api/leads/allocated
// @access Private
const allocatedLeads = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1; // current page
    const limit = parseInt(req.query.limit) || 10; // items per page
    const skip = (page - 1) * limit;

    const leads = await Lead.find({
        screenerId: {
            $exists: true,
            $ne: null,
        },
    })
        .skip(skip)
        .limit(limit);
    const totalLeads = await Lead.countDocuments();

    res.json({
        totalLeads,
        totalPages: Math.ceil(totalLeads / limit),
        currentPage: page,
        leads,
    });
});

// @desc Particular employee allocated leads
// @route GET /api/leads/allocated/:id
// @access Private
const particularEmployeeAllocatedLeads = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1; // current page
    const limit = parseInt(req.query.limit) || 10; // items per page
    const skip = (page - 1) * limit;

    const { id } = req.params;

    const leads = await Lead.find({ screenerId: id }).skip(skip).limit(limit);
    const totalLeads = await Lead.countDocuments();

    res.json({
        totalLeads,
        totalPages: Math.ceil(totalLeads / limit),
        currentPage: page,
        leads,
    });
});

// Get user details by ID
// const getUserDetailsById = async (req, res) => {
//     try {
//         const userDetails = await UserDetails.findById(req.params.id);
//         if (!userDetails) {
//             return res.status(404).json({ message: 'User details not found' });
//         }
//         res.status(200).json(userDetails);
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving user details', error });
//     }
// };

// Update user details by ID
// const updateUserDetailsById = async (req, res) => {
//     try {
//         const updatedUserDetails = await UserDetails.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedUserDetails) {
//             return res.status(404).json({ message: 'User details not found' });
//         }
//         res.status(200).json(updatedUserDetails);
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating user details', error });
//     }
// };

// Delete user details by ID
// const deleteUserDetailsById = async (req, res) => {
//     try {
//         const deletedUserDetails = await UserDetails.findByIdAndDelete(req.params.id);
//         if (!deletedUserDetails) {
//             return res.status(404).json({ message: 'User details not found' });
//         }
//         res.status(200).json({ message: 'User details deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting user details', error });
//     }
// };

export {
    createLead,
    getAllLeads,
    getLead,
    allocateLead,
    allocatedLeads,
    particularEmployeeAllocatedLeads,
};
