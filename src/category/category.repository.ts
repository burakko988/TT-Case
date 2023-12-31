import { Model, Types } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Category, CategoryDoc } from './category.schema';
import { ICreateCategoryInput } from './interface/ICreateCategoryInput';
import { IUpdateCategoryInput } from './interface/IUpdateCategoryInput';

@Injectable()
export class CategoryRepository {
    constructor(
        @InjectModel(Category.name)
        private readonly categoryModel: Model<CategoryDoc>,
    ) {}

    /**
     * Create category.
     *
     * @param categoryName
     * @returns
     */
    async createCategory(input: ICreateCategoryInput) {
        return await new this.categoryModel(input).save();
    }

    /**
     * Force delete func.
     *
     * @param _id
     * @returns
     */
    async deleteCategory(_id: Types.ObjectId) {
        const filter = { _id };

        return await this.categoryModel.deleteOne(filter).exec();
    }

    /**
     * Force delete func.
     *
     * @param _id
     * @returns
     */
    async getCategory(_id: Types.ObjectId) {
        const filter = { _id };
        // This mean removed data from response as selected values.
        const projection = '-__v -updatedAt';

        return await this.categoryModel.findById(filter, projection).lean().exec();
    }

    /**
     * Force delete func.
     *
     * @param _id
     * @returns
     */
    async getCategories(limit: number, id: string) {
        const filter = {};
        if (id) {
            const objId = new Types.ObjectId(id);
            Object.assign(filter, { _id: { $gt: objId } });
        }
        return await this.categoryModel
            .find(filter)
            .sort({ _id: 1 })
            .limit(limit ? limit : 10)
            .lean()
            .exec();
    }

    /**
     * Single update func.
     *
     * @param _id
     * @returns
     */
    async updateCategory(_id: Types.ObjectId, input: IUpdateCategoryInput) {
        const filter = { _id };

        // Default update mean {$set} query.
        const update = { input };
        // Updateone returned some int datas and most important is modifiedCount.
        // If we wanna show updated date should use findOneAndUpdate and 1 more variable options = {new:true}
        return await this.categoryModel.updateOne(filter, update).lean().exec();
    }

    /**
     * Check the category exist.
     *
     * @param _id
     * @returns
     */
    async categoryExist(_id: Types.ObjectId): Promise<Boolean> {
        const filter = { _id };
        const result = await this.categoryModel.exists(filter).lean().exec();

        return result ? true : false;
    }
}
