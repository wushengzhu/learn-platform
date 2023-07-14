// {
//   "id": "EV-2018022511223320873",
//   "create_time": "2015-05-20T13:29:35+08:00",
//   "resource_type": "encrypt-resource",
//   "event_type": "TRANSACTION.SUCCESS",
//   "summary": "支付成功",
//   "resource": {
//       "original_type": "transaction",
//       "algorithm": "AEAD_AES_256_GCM",
//       "ciphertext": "",
//       "associated_data": "",
//       "nonce": ""
//   }
// }
export interface IWxpayResult {
  id: string;
  create_time: string;
  resource_type: string;
  event_type: string;
  summary: string;
  resource: {
    original_type: string;
    algorithm: string;
    ciphertext: string;
    associated_data: string;
    nonce: string;
  };
}
