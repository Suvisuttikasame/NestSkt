import { Controller, Get, Param } from "@nestjs/common";
import { ProductsService } from "./product.service";


@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService : ProductsService
    ){}

    @Get()
    getAll(): string[] {
        return this.productsService.getAllProducts()
    }

    @Get(':id')
    getOne(@Param('id') id:string): string {
        return "hello world" + id
    }

}