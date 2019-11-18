import React, { useState } from 'react'
import Message from './Message';
import '../../../css/upload.css';

const FileUpload = (props) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose file');
  const [message, setMessage] = useState('');
  const [avatarPath,setAvatarPath] = useState('');

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  }

  const uploadAvatar = (filePath,avatarName) =>{
    props.updateAvatar(filePath,avatarName)
  }

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    const url = 'http://localhost:7101/uploadAvatar';
    var tag = await fetch(url, {
      method: 'POST',
      body:formData,
      mode: "cors",
    }).then(response => {
      if (response.ok) {
        console.log('upload success');
        setMessage('File Uploaded!');
        response.json().then((data)=>{
          setAvatarPath(data.filePath);
          uploadAvatar(data.filePath,data.fileName);
        })
      } else {
        response.json().then((data)=>{
          setMessage(data.msg);
        })
        console.log('upload failed');
      }
      // return response.ok;
    }).catch(error => {
      console.error(error);
    });
    console.log(tag);
  }
  

  return (
    <div>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
          <label className="custom-file-label" htmlFor="customFile">{filename}</label>
        </div>
        <input className="btn" type="submit" value="Upload" />
      </form>
      {
  
          <div className="row mt-5">
            <div className="col-md-6 m-auto">
              <h3 className="text-center"></h3>
              <img style={{width:'100%'}} src={avatarPath} alt=""/>
            </div>
          </div> 
      }
    </div>
  )
}


export default FileUpload
