import React, { useState } from "react";
import "./Button.css";

const Form = ({ history, setHistory }) => {
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [inputText, setInputText] = useState("");
  const [inputFile, setInputFile] = useState(null);

  const selectImgHandler = (e) => {
    try {
      setInputFile(e.target.files[0]);
      setInputText(e.target.files[0].name);
      if (!isFileSelected) {
        setIsFileSelected(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const inputUrlHandler = (e) => {
    setInputText(e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    let data = new FormData();
    let url = "http://localhost:8080/extractLocalizedObjects";

    if (isFileSelected) {
      data.append("file", inputFile);
    } else {
      data.append("url", inputText);
    }
    const requestOptions = {
      method: "POST",
      body: data,
    };

    const fetchData = async () => {
      try {
        const response = await fetch(
          isFileSelected ? url + "/File" : url + "/Url",
          requestOptions
        );
        const json = await response.json();
        setHistory([json, ...history]);
        setHistory((history) =>
          history.filter((item) => history.indexOf(item) < 5)
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    if (history.length >= 5) {
      console.log(history);
    }

    setInputFile(null);
    setIsFileSelected(false);
    setInputText("");
  };

  return (
    <form>
      <input
        type="file"
        className="custom-file-input"
        onChange={selectImgHandler}
        accept="image/*"
      />
      Or enter URL:
      <input type="text" value={inputText} onChange={inputUrlHandler} />
      <input type="submit" onClick={submitForm} />
    </form>
  );
};

export default Form;
