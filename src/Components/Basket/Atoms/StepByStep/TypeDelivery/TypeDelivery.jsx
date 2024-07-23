import { useEffect, useState } from "react";
import "./TypeDelivery.scss";
import Api from "@Core/Api/api";
import useCartStore from "@Core/Store/cart";

import increment from "@assets/increments.svg";
import decrement from "@assets/decrement.svg";
import City from "./TypesDelivery/City/City";
import DeliveryCity from "./TypesDelivery/DeliveryCity/DeliveryCity";
import Sdek from "./TypesDelivery/Sdek/Sdek";

function TypeDelivery({ handleClickRefStep }) {
  const { loadTypesDelivery, typeDelivery } = useCartStore();
  const [openFormId, setOpenFormId] = useState(null);

  useEffect(() => {
    Api.getTypesDelivery().then((res) => loadTypesDelivery(res.data));
  }, [loadTypesDelivery]);

  const handleClickOpenForm = (id) => {
    setOpenFormId((prevId) => (prevId === id ? null : id));
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
                  {el.id === 1 && <City />}
                  {el.id === 2 && <DeliveryCity />}
                  {el.id === 3 && (
                    <div>
                      <Sdek />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default TypeDelivery;
