import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { size } from "lodash";
import { Linking } from 'react-native';

//Función Validar Email 
export function validateEmail(email)
{
    console.log(email)
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//Escoger y Cargar Imagenes 
export const cargarImagenesxAspecto = async (array) =>{
    let imgResponse = {status:false,imagen:""}

    const {status} = await 
    Permissions.askAsync(Permissions.CAMERA_ROLL)

    if(status === "denied"){
      alert("Usted debe permitir el acceso para cargar la imagen")
    }else{
      const result = await
      ImagePicker.launchImageLibraryAsync({allowsEditing:true,aspect:array})

      if(!result.cancelled) { imgResponse = {status:true,imagen:result.uri}}
    }

    return imgResponse;
    
  }


//Función que convierte la imagen a formato blob para subirla al server
export const convertirFicheroBlob = async (rutafisica) => {

  const fichero = await fetch(rutafisica);

  const blob = await fichero.blob()

return blob;

}

//Validar Sesión por WA 
export const enviarWhatsapp = (numero, texto) =>
{
    let link = `whatsapp://send?phone=${numero.substring(1, size(numero))}&text=${texto}`

    Linking.canOpenURL(link)
    .then((supported) =>
    {
        if(!supported)
        {
            Alert.alert("Favor de instalar Whatsapp")
        }
        else
        {
            return Linking.openURL(link)
        }
    })
}


