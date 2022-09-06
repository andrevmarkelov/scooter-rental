const { Scooter, Specifications } = require('../models/models');
const apiError = require('../error/apiError');


class scooterController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body;
            const fileName = req.file.filename;
            const scooter = await Scooter.create({ name, price, brandId, typeId, image: fileName });

            if (info) {
                info = JSON.parse(info);
                info.forEach(item => {
                    Specifications.create({
                        title: item.title,
                        description: item.description,
                        scooterId: scooter.id
                    });
                });
            }
            return res.json(scooter);

        } catch (error) {
            next(apiError.badRequest(error.message));
        }
    }

    async get(req, res) {
        let { brandId, typeId, limit, page } = req.query;

        // Offset
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;

        // Scooters
        let scooters;

        if (!brandId && !typeId) {
            scooters = await Scooter.findAndCountAll({ limit, offset });
        }

        if (brandId && !typeId) {
            scooters = await Scooter.findAndCountAll({ where: { brandId }, limit, offset });
        }

        if (!brandId && typeId) {
            scooters = await Scooter.findAndCountAll({ where: { typeId }, limit, offset });
        }

        if (brandId && typeId) {
            scooters = await Scooter.findAndCountAll({ where: { brandId, typeId }, limit, offset });
        }

        return res.json(scooters);
    }

    async getItem(req, res) {
        const { id } = req.params;
        const scooter = await Scooter.findOne({
            where: { id },
            include: [{ model: Specifications }]
        });

        return res.json(scooter);
    }
}

module.exports = new scooterController();