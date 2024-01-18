export class FetchType {
    success!: boolean;
    business!: [
      {
        image: string;
        logo: string;
        name: string;
        address: string;
        contact: string;
        id: string;
        category: string;
        is_online: boolean;
        is_popular: boolean;
        is_featured: boolean;
      }
    ];
  }