import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { CategoryService } from '../category/category.service';
import { CampaignService } from '../campaign/campaign.service';
import { ProductService } from '../product/product.service';
import { UpdateProductDto } from '../product/dto/update.product.dto';
import { CreateProductDto } from '../product/dto/create.product.dto';
import { UpdateCategoryDto } from '../category/dto/update.category.dto';
import { CreateCategoryDto } from '../category/dto/create.category.dto';
import { CreateCampaignDto } from '../campaign/dto/create.campaign.dto';

@Injectable()
export class AdminService {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly productService: ProductService,
        private readonly campaignService: CampaignService,
    ) {}

    /**
     * For admin func.
     *
     * @param dto
     * @returns
     */
    async adminCreateCategory(dto: CreateCategoryDto) {
        try {
            return await this.categoryService.createCategory(dto);
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }

    /**
     * For admin func.
     *
     * @param _id
     * @returns
     */
    async adminDeleteCategory(_id: string) {
        try {
            return await this.categoryService.deleteCategory(_id);
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }

    /**
     * For admin func.
     *
     * @param _id
     * @param dto
     * @returns
     */
    async adminUpdateCategory(_id: string, dto: UpdateCategoryDto) {
        try {
            return await this.categoryService.updateCategory(_id, dto);
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }

    /**
     * For admin func.
     *
     * @param _id
     * @param dto
     * @returns
     */
    async adminCreateProduct(dto: CreateProductDto) {
        try {
            return await this.productService.createProduct(dto);
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }

    /**
     * For admin func.
     *
     * @param _id
     * @param dto
     * @returns
     */
    async adminUpdateProduct(_id: string, dto: UpdateProductDto) {
        try {
            return await this.productService.updateProduct(_id, dto);
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }

    /**
     * For admin func.
     *
     * @param dto
     * @returns
     */
    async adminCreateCampaign(dto: CreateCampaignDto) {
        try {
            return await this.campaignService.createCampaign(dto);
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }
}
