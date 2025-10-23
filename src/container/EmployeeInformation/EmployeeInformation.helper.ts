import { COMMON_CONSTANTS } from "../../constants/common.constant";

export const asyncFetchSchema = async () => {
  try {
    const response = await fetch(COMMON_CONSTANTS.BASE_URL);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const schema = await response.json();
    return schema;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
