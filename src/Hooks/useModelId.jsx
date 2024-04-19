import { useEffect } from "react";

import Api from "@Core/Api/api";
import useOneModel from "@Core/Store/oneModel";

function useModelId(id) {
  const { oneModel, setOneModel } = useOneModel();

  useEffect(() => {
    Api.getModelById(id).then((res) => setOneModel(res.data));
    console.log('запрос пошел');
  }, [id, setOneModel]);

  return { oneModel };
}

export default useModelId;
