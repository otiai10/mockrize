import express from 'express';
import Method from '../method';

export default class Endpoint {
  constructor(
    public method: Method,
    public path: string,
    public handler?: express.Handler) {
  }
}
