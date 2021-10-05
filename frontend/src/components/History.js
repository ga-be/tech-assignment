import React from "react";

const History = ({ history, setPopUp, setPopUpImg }) => {
  const imageButtonHandler = (img) => {
    setPopUpImg(img);
    setPopUp(true);
  };

  const listPhotos = history.map((entry) => (
    <tr key={entry.id}>
      <td>
        <button onClick={() => imageButtonHandler(entry.image)}>Image</button>
      </td>
      <td>{JSON.stringify(entry.objects)}</td>
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Objects</th>
        </tr>
      </thead>
      <tbody>{listPhotos}</tbody>
    </table>
  );
};

export default History;
