import { Duplex } from "stream";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default class Stream extends Duplex implements NodeJS.WritableStream /*, NodeJS.ReadStream */ {
    private __buffer = Buffer.alloc(0);
    public _write(chunk: Buffer | string | any, encoding: string, done: () => void): void {
        this.__buffer = Buffer.concat([this.__buffer, Buffer.from(chunk)]);
        done();
    }
    // public _read(size: number): void {
    //     this.push("echo 2000\n\n");
    // }
    public toString(): string {
        return String(this.__buffer);
    }
}