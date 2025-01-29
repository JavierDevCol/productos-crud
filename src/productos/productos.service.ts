import { Injectable, NotFoundException } from '@nestjs/common';
import { Producto } from './product.entity';


@Injectable()
export class ProductosService {
  private productos: Producto[] = [];
  private idCounter = 1;

  crear(producto: Omit<Producto, 'id' | 'fechaCreacion'>): Producto {
    const nuevoProducto: Producto = {
      id: this.idCounter++,
      ...producto,
      fechaCreacion: new Date(),
    };
    this.productos.push(nuevoProducto);
    return nuevoProducto;
  }

  listar(): Producto[] {
    return this.productos;
  }

  obtenerPorId(id: number): Producto {
    const producto = this.productos.find((p) => p.id === id);
    if (!producto) throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    return producto;
  }

  actualizar(id: number, datos: Partial<Omit<Producto, 'id' | 'fechaCreacion'>>): Producto {
    const producto = this.obtenerPorId(id);
    Object.assign(producto, datos);
    return producto;
  }

  eliminar(id: number): void {
    const index = this.productos.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    this.productos.splice(index, 1);
  }
}
