import axios from 'axios';


const getAllHS = () => {
    //return axios.get('https://6012349784695f0017779d27.mockapi.io/vanh/HS')
    return axios.get('http://localhost:8080/rest/hocsinh/getAll')
}

const getAllLop = () => {
    //return axios.get('https://6012349784695f0017779d27.mockapi.io/vanh/Lop')
    return axios.get('http://localhost:8080/rest/lop/getAll')
}

const addNewHS = (data) => {
    //return axios.post('https://6012349784695f0017779d27.mockapi.io/vanh/HS',data)
    return axios.post('http://localhost:8080/rest/hocsinh',data)
}

const deleteHS = (id) => {
   //return axios.delete(`https://6012349784695f0017779d27.mockapi.io/vanh/HS/${id}`)
    return axios.delete(`http://localhost:8080/rest/hocsinh/${id}`)

}

const updateHS  = (data) =>{
    //return axios.put(`https://6012349784695f0017779d27.mockapi.io/vanh/HS/${data.id}`,data)
    return axios.put(`http://localhost:8080/rest/hocsinh/${data.id}`,data)
}

const getPageHS = (page,limit) =>{
    return axios.get('http://localhost:8080/rest/hocsinh/page?pg='+page+'&lm='+limit);
}

const getPageHSBySearch = (page,limit,type,input) => {
    return axios.get('http://localhost:8080/rest/hocsinh/search?pg=' + page + '&lm=' + limit + '&' + type + '=' + input);
}
export {getAllHS , getAllLop, addNewHS, deleteHS, updateHS, getPageHS, getPageHSBySearch}