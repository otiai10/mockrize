import Endpoint from ".";
import Method from "../method";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default class JSONEndpoint extends Endpoint {
  constructor(method: Method, path: string, dict: Record<string, any>) {
    super(method, path, (req, res) => res.json(dict));
  }
}