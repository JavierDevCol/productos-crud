import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Producto } from './product.entity';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
crear(@Body(new ValidationPipe()) producto: Omit<Producto, 'id' | 'fechaCreacion'>): Producto {
  return this.productosService.crear(producto);
}

  @Get()
  listar(): Producto[] {
    return this.productosService.listar();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number): Producto {
    return this.productosService.obtenerPorId(id);
  }

  @Put(':id')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() datos: Partial<Omit<Producto, 'id' | 'fechaCreacion'>>): Producto {
    return this.productosService.actualizar(id, datos);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number): void {
    this.productosService.eliminar(id);
  }
}
