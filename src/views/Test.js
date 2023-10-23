import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Test() {
    const [file, setFile] = useState();
    const [data,setData]=useState([])
    const handleFile = (e) => {
        setFile(e.target.files[0])
    }
    useEffect(() => {
        axios.get('http://localhost:8080/')
        .then(res=>{
            console.log(res)
            setData(res.data[0])
        })
        .catch(err=>{
            console.log(err)
        })
    }, [])
    const handleUpload = () => {
        const formData = new FormData();
        formData.append('image', file)
        axios.post("http://localhost:8080/upload", formData)
            .then(res => {
                console.log(res)
                //for database
                if (res.data.status === "succses") {
                    console.log("succeded")
                }
                else {
                    console.log("failed")
                }
                //database
            }).catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <div className='container'>
                <input type='file' onChange={handleFile} />
                <button onClick={handleUpload}>uplaod</button>
                <br/>
                <img src={`http://localhost:8080/`+ data.image}/>
            </div>
        </div>
    )
}

export default Test
