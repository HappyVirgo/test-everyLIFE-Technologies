import { css } from '@emotion/react';

export const ModalStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .modal-content {
    background-color: #EAD8B1;
    border-radius: 10px;
    padding: 20px;
    width: 400px;
    max-width: 100%;
    margin: 50px auto;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    font-family: 'Arial', sans-serif;
    color: #001F3F;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    overflow: hidden;
  }

  /* Modal Title */
  .modal-content h2 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #3A6D8C;
    margin: 0;
    text-align: center;
  }

  /* Modal Close Button */
  .modal-close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #6A9AB0;
    color: white;
    border: none;
    font-size: 1.2rem;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  .modal-close-button:hover {
    background-color: #3A6D8C;
  }

  /* Text Paragraph */
  .modal-content p {
    text-align: center;
    color: #6A9AB0;
    font-size: 1rem;
    margin-bottom: 20px;
  }

  /* Form Elements */
  .modal-content label {
    font-size: 0.9rem;
    margin-bottom: 5px;
    color: #001F3F;
  }

  .modal-content input {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    margin-bottom: 15px;
    border: 2px solid #3A6D8C;
    border-radius: 5px;
    font-size: 1rem;
    color: #001F3F;
  }

  .modal-content input:focus {
    outline: none;
    border-color: #6A9AB0;
  }

  /* Buttons */
  .modal-content button {
    background-color: #3A6D8C;
    color: white;
    font-size: 1rem;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 10px;
  }

  .modal-content button:hover {
    background-color: #001F3F;
  }

  .modal-content button:first-of-type {
    background-color: #6A9AB0;
  }

  .modal-content button:first-of-type:hover {
    background-color: #3A6D8C;
  }

  /* Responsive Design */
  @media (max-width: 500px) {
    .modal-content {
      width: 90%;
    }
  }
`;
