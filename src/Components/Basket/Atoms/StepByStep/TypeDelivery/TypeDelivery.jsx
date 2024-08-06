/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./TypeDelivery.scss";
import Api from "@Core/Api/api";
import useCartStore from "@Core/Store/cart";

import increment from "@assets/increments.svg";
import decrement from "@assets/decrement.svg";
import Input from "@Ui/Input/Input";

function TypeDelivery({ handleClickRefStep }) {
  const {
    loadTypesDelivery,
    typeDelivery,
    clearTypeDelivery,
    typePickup,
    typeCity,
    typeSdek,
    updateTypePickup,
    updateTypeCity,
    updateTypeSdek,
    setSelectedDeliveryType,
  } = useCartStore();
  const [openFormId, setOpenFormId] = useState(null);

  useEffect(() => {
    Api.getTypesDelivery().then((res) => loadTypesDelivery(res.data));
  }, [loadTypesDelivery]);

  const handleClickOpenForm = (id) => {
    if (openFormId === id) {
      clearTypeDelivery(
        id === 1 ? "typePickup" : id === 2 ? "typeCity" : "typeSdek"
      );
    }
    setOpenFormId((prevId) => (prevId === id ? null : id));
  };

  const handleNextStep = (id) => {
    setSelectedDeliveryType(id);
    handleClickRefStep("confirmOrder");
  };

  const isFormValid = (formType) => {
    const form =
      formType === 1 ? typePickup : formType === 2 ? typeCity : typeSdek;
    return Object.values(form).every((value) => value.trim() !== "");
  };

  const renderForm = (formType) => {
    const form =
      formType === 1 ? typePickup : formType === 2 ? typeCity : typeSdek;
    const updateForm =
      formType === 1
        ? updateTypePickup
        : formType === 2
        ? updateTypeCity
        : updateTypeSdek;

    return (
      <div className="form-fields">
        {Object.keys(form).map((field) => (
          <Input
            key={field}
            text={field}
            value={form[field]}
            setValue={(value) => updateForm({ [field]: value })}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="type-delivery-content">
      <div
        className="type-delivery-content-back"
        onClick={() => handleClickRefStep("basket")}
      >
        Назад
      </div>
      <div className="type-delivery-content-types">
        {typeDelivery &&
          typeDelivery.length > 0 &&
          typeDelivery.map((el) => (
            <div
              key={el.id}
              className={`type-delivery-content-types-child ${
                openFormId === el.id ? "open" : ""
              }`}
            >
              <div className="type-delivery-content-types-child-name">
                <div>{el.name}</div>
                <img
                  src={openFormId === el.id ? increment : decrement}
                  className="toggle-icon"
                  onClick={() => handleClickOpenForm(el.id)}
                  alt={openFormId === el.id ? "Close" : "Open"}
                />
              </div>
              {openFormId === el.id && (
                <div className="type-delivery-content-types-child-form">
                  {renderForm(el.id)}
                </div>
              )}
              <div>
                {isFormValid(el.id) && (
                  <button
                    className="next-button"
                    onClick={() => handleNextStep(el.id)}
                  >
                    Далее
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TypeDelivery;
