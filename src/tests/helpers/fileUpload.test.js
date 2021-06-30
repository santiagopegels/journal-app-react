import cloudinary from 'cloudinary'
import { fileUpload } from "../../helpers/fileUpload"

cloudinary.config({ 
    cloud_name: 'dnj4s1btd', 
    api_key: '563342342927679', 
    api_secret: 'GQqhyiJ36XEYzKIowa0FO5RVfGo',
    secure: true
  });

describe('Test on fileUpload', () => {
    test('should load a file and return an url', async () => {
        
        const resp = await fetch('https://s3-us-west-2.amazonaws.com/lasaga-blog/media/original_images/grupo_imagen.jpg')
        const blob = await resp.blob()

        const file = new File([blob], 'foto.jpg')
        const url = await fileUpload(file)

        expect(typeof url).toBe('string')

        //Get image id
        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace('.jpg', '')
        
        cloudinary.v2.api.delete_resources(imageId, {}, ()=>{
        });
    })

    test('should return an error', async () => {
        const file = new File([], 'foto.png')
        const url = await fileUpload(file)

        expect(url.error?.message).toBeTruthy()
        
    })
    
    
})
