

export const fileUpload = async (file) => {

    const url = 'https://api.cloudinary.com/v1_1/dnj4s1btd/upload'
    const formData = new FormData()
    formData.append('upload_preset', 'react-journal')
    formData.append('file', file)

    try {
        const resp = await fetch(url, {
            method: 'POST',
            body: formData
        })

        if (resp.ok) {
            const respJson = await resp.json()
            return respJson.secure_url
        } else {
            throw await resp.json()
        }

    } catch (error) {
        throw error
    }


}