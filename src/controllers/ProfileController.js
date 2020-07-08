const mongoose = require('mongoose')

const Profile = mongoose.model('Profile')

module.exports = {
    async index(req, res) {
        const profile = await Profile.find()

        return res.json(profile)
    },

    async show(req, res) {
        const profile = await Profile.findById(req.params.id)

        return res.json(profile)
    },

    async store(req, res) {
        const profile = await Profile.create(req.body)
        return res.json(profile)
    },

    async update(req, res) {
        const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true })

        return res.json(profile)
    },

    async destroy(req, res) {
        const profile = await Profile.findByIdAndRemove(req.params.id)

        return res.send()
    }
}