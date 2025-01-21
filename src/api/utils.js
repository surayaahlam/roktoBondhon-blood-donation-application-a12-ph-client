import axios from 'axios'

// Upload image and return image url
export const imageUpload = async imageData => {
    const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
    const formData = new FormData()
    formData.append('image', imageData)
    const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${image_hosting_key}`,
        formData
    )
    return data.data.display_url
};

// export const saveUser = async user => {
//     await axios.post(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
//         name: user?.displayName,
//         image: user?.photoURL,
//         email: user?.email,
//     })
// };