var express = require('express');
var router = express.Router();

const config = require('../config');

const postPath = (filename) => {
    return `${config.POSTS}/${filename}`;
};

const fs = require('fs');

const {titleify, filenameify} = require('../titleify.js');
const {filenameIsValid} = require('../validation.js');

router.get(`${config.API_PATH}/post`, (req, res) => {
    const posts = fs.readdirSync(config.POSTS)
        .filter(filename => filename.endsWith('.md'))
        .map(filename => { 
            const stat = fs.statSync(postPath(filename));

            return {
                id: filename, 
                title: titleify(filename),
                created: stat.birthtime,
                changed: stat.ctime,
            } 
        });

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(posts));
});

router.get(`${config.API_PATH}/post/:id`, (req, res) => {
    const postId = req.params.id;
    const path = postPath(postId);

    // TODO: sanitize/reject res, if contains "/" etc
    try {
        if (fs.existsSync(path)) {
            fs.readFile(path, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    res.status(500).send(failure('server error'));
                    return;
                }

                const title = titleify(postId);
                const stat = fs.statSync(path);

                // check if file not too large etc
                res.setHeader('content-type', 'application/json');
                res.send({
                    id: postId, 
                    title: title,
                    text: data,
                    created: stat.birthtime,
                    changed: stat.ctime,
                });
            });
        } else {
            res.status(404).send(failure('post not found'));
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(failure('server error'));
    }
});

router.post(`${config.API_PATH}/post`, (req, res) => {
    if (!req.body) {
        console.error('request body missing');
        res.status(400).send(failure('bad request'));
        return;
    }

    const postId = filenameify(req.body.title);
    const path = postPath(postId);

    if (!filenameIsValid(postId)) {
        res.status(400).send(failure('invalid title'));
        return;
    }

    try {
        if (fs.existsSync(path)) {
            console.error('post already exists', path);
            res.status(404).send(failure('post already exists'));
            return;
        }

        fs.writeFile(path, req.body.contents, () => {
            res.status(200).send(postId);
        })
    } catch (err) {
        console.error(err);
        res.status(500).send(failure('server error'));
    }
});

router.patch(`${config.API_PATH}/post/:id`, (req, res) => {
    if (!req.body) {
        console.error('request body missing');
        res.status(400).send(failure('bad request'));
        return;
    }
    
    const postId = req.params.id;
    const path = postPath(postId);
    const newPostId = filenameify(req.body.title);
    const newPath = postPath(newPostId);

    if (!filenameIsValid(newPostId)) {
        res.status(400).send(failure('invalid title'));
        return;
    }

    if (!fs.existsSync(path)) {
        console.error('post not found', path);
        res.status(404).send(failure('post not found'));
        return;
    }

    if (path != newPath) {
        // make sure file can be safely renamed
        if (fs.existsSync(newPath)) {
            console.error('a post with the requested title already exists', newPath);
            res.status(404).send('a post with the requested title already exists');
            return;
        }

        // try to rename file
        try {
            fs.renameSync(path, newPath);
        } catch (error) {
            console.error('renaming the post failed', error);
            res.status(500).send('renaming the post failed');
            return;
        }
    }

    // replace file contents
    try {
        fs.writeFile(newPath, req.body.contents, () => {
            res.status(200).send(newPostId);
        })
    } catch (error) {
        console.error(error);
        res.status(500).send(failure('server error'));
    }
});

module.exports = router;