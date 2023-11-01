import { requestFile } from "../../services/api";
import { PropAddWarn } from "../../contexts/StateContext";

const ServicesAddWarning = {
  addWarning: async (formData: any[], title: string): Promise<PropAddWarn> => {
    let json = await requestFile<PropAddWarn>('/warnings', formData, title);
    return json;
  }
}
export default ServicesAddWarning;