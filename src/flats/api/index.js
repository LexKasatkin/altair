import axios from "axios";
import {API_HOST} from "../../../config";

/**
 * Retrieves list of flats by params
 *
 * @param flat_id flat id
 * @returns {Promise<AxiosResponse<any>>}
 */
export function flats() {
    return axios.get(`${API_HOST}/flats`, {
        params: {
            // id: flat_id,
        },
    });
}
