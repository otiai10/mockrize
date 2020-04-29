import express from 'express';
import Method from '../method';

export default class Endpoint {

  constructor(
    public method: Method,
    public path: string,
    public handler?: express.Handler
  ) {
  }

  public isValid(): boolean {
    switch (this.method.toLowerCase()) {
    case Method.GET:
    case Method.POST:
    case Method.PUT:
    case Method.DELETE:
      return true;
    }
    return false;
  }

}
