import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductsService {
    constructor() {

    }

    getAllProducts() : string[] {
        return ["a", "b", "c"]
    }
}