import { create } from "zustand";

const useStatus = create((set) => ({
  statuses: [],
  changeStatusData: {
  orderId: null,
  statusId: null,
  },
  setStatuses: (statuses) =>
    set((state) => ({
      ...state,
      statuses: statuses,
      
    })),
    setChangeStatusData: (orderId, statusId) =>
      
      set((state) => ({
        ...state,
        changeStatusData: {
          orderId: orderId,
          statusId: statusId,
        },
      })),
}));
export default useStatus;
