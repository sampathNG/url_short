const express = require('express')

const router = express.Router()

const validUrl = require('valid-url')
const shortid = require('shortid')

const Url = require('../db/model')

const baseUrl = 'http:localhost:5000'

// POST REQUEST

router.post('/post/shorten', async(req,res)=>{
    const {longUrl} = req.body

    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('Invalid base URL')
    }

    const urlCode = shortid.generate()

    if(validUrl.isUri(longUrl)){
        try{
            let url = await Url.findOne({longUrl})
            if(url){
                res.json(url)
            }
            else{
                const shortUrl = baseUrl + '/'+ urlCode
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })
                await url.save()
                res.json(url)
            }
        }
        catch(err){
            console.log(err)
            res.status(500).json('Server Error')
        }
    }
    else{
        res.status(401).json('Invalid longUrl')
    }
})

// GET REQUEST

router.get('/get/:code', async(req, res)=>{
    try{
        const url = await Url.findOne({urlCode: req.params.code})

        if(url){
            return res.redirect(url.longUrl)
        }
        else{
            return res.status(404).json('No URL Found')
        }

    }
    catch(err){
        console.error(err)
        res.status(500).json('Server Error')
    }
})

module.exports = router