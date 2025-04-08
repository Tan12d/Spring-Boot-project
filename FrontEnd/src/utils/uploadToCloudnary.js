const cloud_name = "ddgyi5tpp"

const upload_preset = "zosh-social-youtube"

export const uploadToCloudinary = async (pics, fileType) => {
    
    if(pics && fileType)
    {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", upload_preset);
        data.append("cloud_name", cloud_name);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
            {
                method: "post", 
                body: data
            }
        );

        console.log("res ",res);
        
        const fileData = await res.json();

        console.log("url ",fileData);
        
        return fileData.url;
    }

    else
    {
        console.log("error ........");
        
    }
}