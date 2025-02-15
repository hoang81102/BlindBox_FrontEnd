import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./LuckyBoxGame.scss";
import luckyBoxImage from "../../../Assets/Image/Labubu_NewYearCollection.png";
import prizeImage from "../../../Assets/Image/Labubu_Image(Homepage).png";

const prizes = [
  "10% Discount",
  "Free Shipping",
  "Exclusive Blind Box",
  "$5 Store Credit",
  "Better Luck Next Time!",
];

const LuckyBoxGame = () => {
  const [show, setShow] = useState(false);
  const [prize, setPrize] = useState(null);
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenBox = () => {
    if (!isOpened) {
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      setPrize(randomPrize);
      setIsOpened(true);
    }
  };

  const handleClose = () => {
    setShow(false);
    setIsOpened(false);
    setPrize(null);
  };

  return (
    <div className="lucky-box-game">
      <h2>🎁 Lucky Box Challenge 🎁</h2>
      <p>Try your luck and win amazing rewards!</p>
      <Button variant="warning" onClick={() => setShow(true)}>
        Play Now!
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="lucky-box-modal"
      >
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>🎁 Lucky Box 🎁</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center modal-body-custom">
          {!isOpened ? (
            <>
              <img
                src={luckyBoxImage}
                alt="Lucky Box"
                className="lucky-box animated-box"
                onClick={handleOpenBox}
              />
              <p className="click-text">Click on the box to open!</p>
            </>
          ) : (
            <>
              <img
                src={prizeImage}
                alt="Prize"
                className="prize-img animated-prize"
              />
              <h3 className="won-text">You've won:</h3>
              <p className="prize-text">{prize}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="modal-footer-custom">
          <Button
            variant="secondary"
            onClick={handleClose}
            className="close-btn"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LuckyBoxGame;
