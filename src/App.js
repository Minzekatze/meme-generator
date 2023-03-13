import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

function App() {
  const [memes, setMemes] = useState([]);
  const [newIndex, setNewIndex] = useState([0]);
  const url = "https://api.imgflip.com/get_memes";
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  var domtoimage = require("dom-to-image");
  const inputRef = useRef();
  const inputRef2 = useRef();

  useEffect(() => {
    fetch(url)
      .then((resolve) => {
        return resolve.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.data.memes);
        setMemes(data.data.memes);
      });
  }, []);

  function handleClick() {
    let oldNumber = newIndex;
    let newNumber = null;

    do {
      newNumber = Math.floor(Math.random() * 100);
    } while (oldNumber === newNumber);
    console.log(newNumber);
    setNewIndex(newNumber);
  }

  function handlePic() {
    domtoimage.toBlob(inputRef.current).then(function (blob) {
      window.saveAs(blob, "myMeme.png");
    });
  }

  function handlePic2() {
    domtoimage.toBlob(inputRef2.current).then(function (blob) {
      window.saveAs(blob, "myNewMeme.png");
    });
  }

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div
      className="container d-flex justify-content-center w-100"
      style={{ maxWidth: "100%" }}
    >
      <div className="d-flex justify-content-center flex-column text-align-center">
        <h1>Meme generator!</h1>
        <div
          className="d-flex justify-content-center flex-column align-self-center"
          ref={inputRef}
        >
          <input
            className="myInput"
            type="text"
            placeholder="Insert your text..."
            style={{
              WebkitTextFillColor: "white",
              width: `${memes[newIndex]?.width * 0.5}px`,
            }}
          />
          <img
            src={memes[newIndex]?.url}
            style={{
              width: `${memes[newIndex]?.width * 0.5}px`,
              height: "auto",
            }}
          />
          <input
            className="myInput"
            type="text"
            placeholder="Insert your text..."
            style={{
              bottom: "0px",
              WebkitTextFillColor: "white",
              width: `${memes[newIndex]?.width * 0.5}px`,
            }}
          />
        </div>
        <button style={{ margin: "1em auto 0 auto" }} onClick={handleClick}>
          Next meme
        </button>
        <button style={{ margin: "1em auto 1em auto" }} onClick={handlePic}>
          download meme
        </button>
        <h1>Upload your meme!</h1>
        <input
          className="align-self-center"
          type="file"
          accept="image/png, image/jpg"
          onChange={onSelectFile}
        />
        {selectedFile && (
          <div className="d-flex justify-content-center flex-column">
            <div className="d-flex container flex-column" ref={inputRef2}>
              <input
                className="myInput"
                type="text"
                placeholder="Insert your text..."
                style={{
                  WebkitTextFillColor: "white",
                }}
              />
              <img src={preview} />
              <input
                className="myInput"
                type="text"
                placeholder="Insert your text..."
                style={{
                  bottom: "0px",
                  WebkitTextFillColor: "white",
                }}
              />
            </div>
            <button
              style={{ margin: "1em auto 1em auto" }}
              onClick={handlePic2}
            >
              download meme
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
