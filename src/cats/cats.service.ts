import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat, CatDocument } from 'src/cats/entities/cat.entity';
import { CreateCatInput } from './dto/create-cat.input';
import { UpdateCatInput } from './dto/update-cat.input';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<CatDocument>,
  ) {}

  async create(data: CreateCatInput): Promise<Cat> {
    return await new this.catModel(data).save();
  }

  async findAll(): Promise<Cat[]> {
    return await this.catModel.find();
  }

  async findOne(_id: string): Promise<Cat> {
    return await this.catModel.findOne({ _id });
  }

  async update(
    _id: string,
    updateCatInput: Omit<UpdateCatInput, '_id'>,
  ): Promise<Cat> {
    return await this.catModel.findOneAndUpdate(
      { _id },
      { $set: updateCatInput },
      { new: true },
    );
  }

  async remove(_id: string): Promise<Cat> {
    const cat = this.catModel.findOneAndDelete({ _id });
    // this.cats = this.cats.filter((cat) => cat.id === id);
    return cat;
  }
}
