import { IsString, IsNumber, Min, Max, IsNotEmpty, IsDate } from 'class-validator';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  nombre: string;

  @IsString()
  @Column()
  descripcion: string;

  @IsNumber()
  @Min(0)
  @Max(100000)
  @Column()
  precio: number;

  @IsDate()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;
}
