// src/property/amenities/amenities.controller.ts

import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { AmenitiesService } from './amenities.service';
import { CreateAmenitiesDto } from './dto/amenities.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserId } from '../../common/decorators/user.decorator';
import { User } from '@prisma/client';
import { UpdateAmenitiesDto } from './dto/update-amentities.dto';

@ApiTags('Amenities')
@ApiBearerAuth('JWT')
@Controller('api/property/amenities')
export class AmenitiesController {
  constructor(private readonly amenitiesService: AmenitiesService) { }

  @Post()
  @ApiOperation({ summary: 'Create or update amenities' })
  @ApiResponse({ status: 201, description: 'Amenities created/updated.' })
  async create(
    @UserId() userId: string,
    @Body() dto: CreateAmenitiesDto,
  ) {
    const result = await this.amenitiesService.createOrUpdate(userId, dto);
    return { data: result };
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get amenities by user ID' })
  @ApiResponse({ status: 200, description: 'Amenities fetched.' })
  async getByUser(@Param('userId') userId: string) {
    const result = await this.amenitiesService.getByUser(userId);
    return { data: result };
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Update amenities (partial)' })
  @ApiResponse({ status: 200, description: 'Amenities updated.' })
  async update(
    @Param('userId') userId: string,
    @Body() updateDto: UpdateAmenitiesDto,
  ) {
    const result = await this.amenitiesService.update(userId, updateDto);
    return { data: result };
  }
}
