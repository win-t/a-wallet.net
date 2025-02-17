import algosdk from "algosdk";

const actions = {
  async signAuthTx({ dispatch, commit }, { account, realm }) {
    try {
      if (!account) throw new Error("Address not found.");

      const url = new URL(this.state.config.algod);
      let algodclient = new algosdk.Algodv2(
        this.state.config.algodToken,
        this.state.config.algod,
        url.port
      );

      const suggestedParams = await algodclient.getTransactionParams().do();

      const authParams = suggestedParams;
      authParams.fee = 0;
      const note = Buffer.from(realm, "utf-8");
      const authObj = {
        from: account,
        to: account,
        amount: 0,
        note: new Uint8Array(note),
        suggestedParams: authParams,
      };
      const authTxn =
        algosdk.makePaymentTxnWithSuggestedParamsFromObject(authObj);
      let signedAuthTxn = await dispatch(
        "signer/signTransaction",
        { from: account, tx: authTxn },
        {
          root: true,
        }
      );
      if (!signedAuthTxn) {
        throw new Error("Error signing the transaction");
      }
      const b64 = Buffer.from(signedAuthTxn).toString("base64");
      const auth = "SigTx " + b64;
      return auth;
    } catch (error) {
      console.error("error", error, dispatch);
      const msg = error.response ? error.response : error.message;
      dispatch("toast/openError", msg, {
        root: true,
      });
    }
  },
};
export default {
  namespaced: true,
  actions,
};
