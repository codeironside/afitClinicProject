const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET


})
uploadToCloudinary = (path, folder)=>{
    return cloudinary.v2.uploader.upload(path,{folder}).then((data)=>{
        return {url: data.url, public_id: data.public_id}
    }).catch(error) => {
        console.log(error)
    }
}
removeFromCloudinary = async(public_id)=>{
    await cloudinary.v2.uploader.destroy(public_id, function(error, result){
        console.log(error, result)
    })
}
modules.exports= {uploadToCloudinary,removeFromCloudinary}