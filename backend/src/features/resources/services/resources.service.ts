import { ResourcesRepository } from '../repositories/resources.repository';
import { ResourceItem } from '../types/resources.types';

export class ResourcesService {
  private resourcesRepository: ResourcesRepository;

  constructor() {
    this.resourcesRepository = new ResourcesRepository();
  }

  async getResources(): Promise<ResourceItem[]> {
    return [
      {
        id: 'res_placeholder',
        title: 'CS101 Midterm Notes',
        fileUrl: 'https://student-hub-assets.s3.amazonaws.com/cs101.pdf',
        category: 'NOTES',
        courseCode: 'CS101',
      },
    ];
  }
}
