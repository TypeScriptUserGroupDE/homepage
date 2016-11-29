export class Training {
  events: any[];

  constructor(owner: string,
              title: string,
              tec: string,
              desc: string,
              company: string,
              website: string,
              cta_link: string,
              events?: [{
                [key: string]: any;
                address: string,
                houseNumber: number,
                city: string,
                zip: number,
                longitude: number,
                latitude: number,
                startDate: Date,
                endDate: Date,
              }],
              _id?: string,) {
  }
}
