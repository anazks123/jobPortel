const express = require('express');
const connectDB = require('./config/db');
const bcrypt = require("bcrypt")

const app = express();

const adminExist = require("./middleware/admin-exist")
const adminModel = require('./models/admin')

connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));
//check or create admin in db
app.use("/admin", adminExist)
//adminjs setup
const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const adminJsOptions = require('./middleware/admin-option');
const adminJs = new AdminJS(adminJsOptions)

// Build and use a router which will handle all AdminJS routes
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
        const admin = await adminModel.findOne({ email })
        if (admin) {
            const matched = await bcrypt.compare(password, admin.encryptedPassword)
            if (matched) {
                return admin;
            }
        }
        return false;
    },
    cookiePassword: 'some-secret-password-used-to-secure-cookie',
})
app.use(adminJs.options.rootPath, adminRouter)

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/jobs', require('./routes/api/jobs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));