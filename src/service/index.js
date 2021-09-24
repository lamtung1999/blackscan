import axiosClient from "../api/configApi";

const chainApi = {
  getList: () => {
    const url = "/chains";
    return axiosClient.get(url);
  },
  getListChain: (id, search, params) => {
    const url = `/${id}/address/${search}/balances/`;
    return axiosClient.get(url, { params });
  },
  getTransfersChain: (id, search, limit, address) => {
    const url = `/${id}/address/${search}/transfers/?limit=${limit}&contract-address=${address}`;
    return axiosClient.get(url);
  },
  getListExChange: (id, search, exchange) => {
    const url = `/${id}/address/${search}/stacks/${exchange}/balances`;
    return axiosClient.get(url);
  },
};
export default chainApi;
