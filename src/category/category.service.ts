import { Types } from 'mongoose';

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create.category.dto';
import { UpdateCategoryDto } from './dto/update.category.dto';
import { ICreateCategoryInput } from './interface/ICreateCategoryInput';
import { IUpdateCategoryInput } from './interface/IUpdateCategoryInput';
import { IdPaginationDto } from 'src/common/dto/IdPagination';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    /**
     * Create Func.
     *
     * @param dto
     * @returns
     */
    async createCategory(dto: CreateCategoryDto) {
        try {
            const input: ICreateCategoryInput = {
                tittle: dto.tittle,
            };

            return await this.categoryRepository.createCategory(input);
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }

    /**
     *
     * @param _id
     * @returns
     */
    async deleteCategory(_id: string) {
        try {
            // Coming data type conversion string to Types.ObjectId
            const objId = new Types.ObjectId(_id);

            const dbResult = await this.categoryRepository.deleteCategory(objId);
            if (dbResult.deletedCount === 1) {
                return true;
            }
            throw new NotFoundException('CATEGORY_DID_NOT_FOUND');
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }

    /**
     * Update category.
     *
     * @param _id
     * @param dto
     * @returns
     */
    async updateCategory(_id: string, dto: UpdateCategoryDto): Promise<Boolean> {
        try {
            const objId = new Types.ObjectId(_id);

            const update: IUpdateCategoryInput = { tittle: dto.tittle };

            const dbResult = await this.categoryRepository.updateCategory(objId, update);
            // dbResult.matchedCount mean is the id exist or not
            if (dbResult.matchedCount === 1) {
                return dbResult.modifiedCount === 1 ? true : false;
            }
            throw new NotFoundException('CATEGORY_DID_NOT_FOUND');
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }

    /**
     * Get single category.
     *
     * @param _id
     * @returns
     */
    async getCategory(_id: string) {
        try {
            const objId = new Types.ObjectId(_id);

            return await this.categoryRepository.getCategory(objId);
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }

    /**
     * Get Categories..
     *
     * @returns
     */
    async getCategories(limit: number, _id?: string) {
        try {
            return await this.categoryRepository.getCategories(limit, _id);
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }
}
