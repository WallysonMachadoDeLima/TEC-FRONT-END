import axios from "axios"
import {API_CONFIG} from "../../config/api.config"



async function inserirAlvara(id, file) {
    const response = await axios.post(`${API_CONFIG.url}/files/upload/alvara?solicitacao=${id}`, file)
    return response
}

async function inserirComprovante(id, file) {
    var formData = new FormData();
    formData.append("file", file[0])
    const response = await axios.post(`${API_CONFIG.url}/files/upload/comprovante?solicitacao=${id}`, formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    })
    return response
}

async function inserirDare(id, file) {
    var formData = new FormData();
    formData.append("file", file[0])
    const response = await axios.post(`${API_CONFIG.url}/files/upload/dare?solicitacao=${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    })
    return response
}

async function inserirCMB(id, file) {
    var formData = new FormData();
    formData.append("file", file[0])
    console.log("CBM",formData)
    const response = await axios.post(`${API_CONFIG.url}/files/upload/alvaracbm?solicitacao=${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    })
    return response
}


async function inserirOutro(id, files) {
    let formData = new FormData();
    for(var i in files) {
        console.log(files[i])
        formData.append("file", files[i])
    }
    
    console.log("OUTROS",formData)
    const response = await axios.post(`${API_CONFIG.url}/files/upload/outros?solicitacao=${id}`, formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    })
    return response
}

async function listarFiles(id) {
    const response = await axios.get(`${API_CONFIG.url}/files/solicitacao/${id}`)
    return response
}

async function downloadFile(url) {
    console.log("Darloud", url)
    axios.get(
        url,
        {
          responseType: "arraybuffer"
        }
      )
        .then((res) => {
          const url = window.URL.createObjectURL(
            new Blob([res.data], { type: res.headers['content-type'] })
          );
          window.open(url);
        });
}

const Files = {
    downloadFile,
    inserirAlvara,
    inserirComprovante,
    inserirDare,
    inserirCMB,
    inserirOutro,
    listarFiles,
}

export default Files