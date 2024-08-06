import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import "./basket.scss";
import useCartStore from "@Core/Store/cart";
import ModelsBasket from "./Atoms/ModelsBasket";
import TypeDelivery from "./Atoms/StepByStep/TypeDelivery/TypeDelivery";
import Confirmation from "./Atoms/StepByStep/TypeDelivery/ConfirmOrder/Confirmation";

function Basket() {
  const [modalOpen, setModalOpen] = useState(false);
  const { cartItems, loadCart } = useCartStore();
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartDetails, setCartDetails] = useState([]);

  const [step, setStep] = useState("basket");

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleClickRefStep = (name) => {
    setStep(name);
  };

  const handleClickStepTypeDelivery = () => {
    if (cartDetails.length) {
      setStep("typeDelivery");
    } else return;
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      );
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [cartItems]);

  return (
    <>
      {!modalOpen && (
        <div className="basket_container">
          <div className="basket-trigger" onClick={toggleModal}>
            Корзина ({totalPrice} руб.)
          </div>
        </div>
      )}
      <Modal isOpen={modalOpen} onClose={toggleModal}>
        <div className="modal-basket">
          <div onClick={toggleModal}>Закрыть</div>
          {cartItems.length && step === "basket" && (
            <ModelsBasket
              cartDetails={cartDetails}
              setCartDetails={setCartDetails}
              handleClickStepTypeDelivery={handleClickStepTypeDelivery}
              textStep="Оформить заказ"
            />
          )}
          {step === "typeDelivery" && cartItems.length && (
            <TypeDelivery handleClickRefStep={handleClickRefStep} />
          )}
          {step === "confirmOrder" && cartItems.length && (
            <Confirmation handleClickRefStep={handleClickRefStep} />
          )}
        </div>
      </Modal>
    </>
  );
}

export default Basket;
