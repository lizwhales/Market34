const express = require('express');
const { default: mongoose } = require('mongoose');
const upload = require('../middleware/multer');
const cloudinary = require('../middleware/cloudinary');
const { authenticate } = require('../middleware/authenticate');
const {
    getGroups,
    getGroup,
    getGroupItems,
    deleteGroup,
    getGroupMembers,
    getGroupsByUser,
    getOtherGroups,
    addMember,
    removeMember,
    getGroupItemsWithCategory,
    addAdmin
} = require('../controllers/groupController')

const groupService = require('../services/group');

const router = express.Router();

// GET all groups
router.get('/groups', authenticate, getGroups);

// GET a group
router.get('/groups/group/:groupId', authenticate, getGroup);

// GET a group's items
router.get('/groups/items/:groupId', authenticate, getGroupItems);

// GET a group's items with a category
router.get('/groups/items/:groupId/category/:catId', authenticate, getGroupItemsWithCategory);

// GET group members
router.get('/groups/members/:groupId', authenticate, getGroupMembers);

// GET a user's groups
router.get('/groups/user/:user_id', authenticate, getGroupsByUser);

// GET groups a user is not a part of
router.get('/groups/other/:user_id', authenticate, getOtherGroups);

// POST a group
router.post('/groups', authenticate, async (req, res) => {
    const {name, description, members, admins, icon_url} = req.body;

    try {
        const group = await groupService.create({name, description, members, admins, icon_url});

        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

// DELETE a group
router.delete('/groups/:group_id', authenticate, deleteGroup);

// UPDATE a group
router.patch('/groups/:group_id', authenticate, async (req, res) => {
    const { group_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(group_id)) {
        return res.status(404).json({error: 'Invalid Mongo ID'});
    }

    const group = await groupService.readById(group_id);

    if (!group) {
        return res.status(404).json({error: 'Group does not exist with ID'});
    }

    for (const property in req.body) {
        group[property] = req.body[property];
    }
    
    await group.save();

    res.status(200).json(group);
});

// ADD group members
router.patch('/groups/:group_id/add/:user_id', authenticate, addMember);

// ADD admin 
router.patch('/groups/:group_id/admin/:user_id', authenticate, addAdmin);

// LEAVE group
router.patch('/groups/:group_id/leave/:user_id', authenticate, removeMember);

module.exports = router;
