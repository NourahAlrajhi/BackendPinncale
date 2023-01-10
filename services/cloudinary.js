const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: "ddkx3lmtt",
    api_key: "762496359684771",
    api_secret: "bWNYJYSFyDmkE__trELFtXPy7jQ"
})

uploadToCloudinary = (path, folder) => {

    try {
        console.log("enterrrrrr the uploadToCloudinaryyyyyyyyyyyy uploading")

        return cloudinary.v2.uploader.upload(path, {
            resource_type: "auto",
            folder
        }).then((data) => {
            console.log(data)
            return { url: data.url, public_id: data.public_id };
        }).catch((error) => {
            console.log(error)
        });


        /* cloudinary.v2.uploader.upload(path, {
             resource_type: "auto",
             folder
         }).then((data) => {
             console.log(data)
             return { url: data.url, public_id: data.public_id };
         }).catch((error) => {
             console.log(error)
         })*/
    }
    catch (error) {
        console.log(error)
    }
}

removeFromCloudinary = async (public_id) => {
    await cloudinary.v2.uploader.destroy(public_id, function (error, result) {
        console.log(result, error)
    })
}

module.exports = { uploadToCloudinary, removeFromCloudinary }