import { getWallet } from "../APIHandler/WalletAPIHandler";

export const fetchUserWallet = async (userId) => {
  try {
    if (!userId) {
      console.error("No userId provided");
      return null;
    }
    return await getWallet(userId);
  } catch (error) {
    console.error("Error fetching wallet:", error);
    throw error;
  }
};
