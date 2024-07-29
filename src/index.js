require('dotenv').config()

const PORT = process.env.port || 5000

const express = require('express');

const blogRoutes = require('./routes/blogs');

const educationsRoutes = require('./routes/educations');

const commentsRoutes = require('./routes/comments');

const admin_posRoutes = require('./routes/admin_pos');

const cleaning_servecisRoutes = require('./routes/cleaning_services');

const waste_reportsRoutes = require('./routes/waste_reports');

const middlewareLogRequest = require('./middleware/logs');

const upload = require('./middleware/multer');

const userRoutes = require('./routes/user');
const purchaseRoutes = require('./routes/purchase');
const productRoutes = require('./routes/product');

const app = express();

app.unsubscribe(express.json());
app.use(middlewareLogRequest);
app.use(express.urlencoded({extended:true}));
app.use('/assets', express.static('./public/image'));

app.use('/api/blogs', upload.single('image'), blogRoutes);
app.post('/upload', upload.single('image'), (req,res) =>{
    res.json({
        date: req.file,
        message: 'Upload Berhasil'
    })
})

app.use('/api/educations', upload.single('image'), educationsRoutes);
app.post('/upload', upload.single('image'), (req,res) =>{
    res.json({
        date: req.file,
        message: 'Upload Berhasil'
    })
})
app.use('/api/comments', upload.none(), commentsRoutes);

app.use('/api/admin_pos', upload.none(), admin_posRoutes);

app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/purchase', purchaseRoutes);

app.use('/api/cleaning_services', upload.none(), cleaning_servecisRoutes);

app.use('/api/waste_reports', upload.single('image'), waste_reportsRoutes);
app.post('/upload', upload.single('image'), (req,res) =>{
    res.json({
        date: req.file,
        message: 'Upload Berhasil'
    })
})

app.listen(PORT, () => {
    console.log(`Server berhasil di running di port ${PORT}`)
})