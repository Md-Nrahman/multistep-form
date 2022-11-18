import React from "react";

function Modal({ content }) {
  return (
    <div>
      <section className="modal">
        {/* <div className="flex">
          <img src="user.png" width="50px" height="50px" alt="user" />
          <button type="button" className="btn-close">
            ⨉
          </button>
        </div> */}
        <div>
          <h4>Uploading</h4>
          <h3>{content} %</h3>
        </div>
      </section>

      <div className="overlay" />
    </div>
  );
}

export default Modal;
