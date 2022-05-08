const AdminJS = require('adminjs')
const AdminJSMongoose = require('@adminjs/mongoose')
const bcrypt = require('bcrypt')

//models
const userModel = require("../models/User");
const jobDetailModel = require("../models/JobDetail");
const jobApplicationModel = require("../models/JobApplication")
const adminModel = require("../models/admin")

AdminJS.registerAdapter(AdminJSMongoose)

const adminJsOptions = {
    resources: [
        {
            resource: adminModel,
            options: {
                properties: {
                    encryptedPassword: {
                        isVisible: false,
                    },
                    password: {
                        type: 'string',
                        isVisible: {
                            list: false, edit: true, filter: false, show: false,
                        },
                    },
                },
                actions: {
                    new: {
                        before: async (request) => {
                            if (request.payload.password) {
                                request.payload = {
                                    ...request.payload,
                                    encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                                    password: undefined,
                                }
                            }
                            return request
                        },
                    }
                }
            }
        },
        userModel,
        jobDetailModel,
        jobApplicationModel    
    ],
    rootPath: '/admin',
}

module.exports = adminJsOptions;