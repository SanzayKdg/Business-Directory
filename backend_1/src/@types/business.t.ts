export type BusinessAmenities = {
  wifi: boolean;
  parking: boolean;
  accept_card: boolean;
  delivery: boolean;
};

export type BusinessTimings = {
  sunday?: [
    {
      open: string;
      close: string;
    }
  ];
  monday?: [
    {
      open: string;
      close: string;
    }
  ];
  tuesday?: [
    {
      open: string;
      close: string;
    }
  ];
  wednesday?: [
    {
      open: string;
      close: string;
    }
  ];
  thursday?: [
    {
      open: string;
      close: string;
    }
  ];
  friday?: [
    {
      open: string;
      close: string;
    }
  ];
  saturday?: [
    {
      open: string;
      close: string;
    }
  ];
};
