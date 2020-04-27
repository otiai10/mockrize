import Endpoint from ".";
import Method from "../method";

export default class JSONEndpoint extends Endpoint {
  constructor(method: Method, path: string, dict: Object) {
    super(method, path, (req, res) => res.json(dict));
  }
}