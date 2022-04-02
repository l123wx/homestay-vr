export declare type HomestayData = {
  bannerPath: string
  isCollect: number
  buildingType: string
  houseType: string
  homestayName: string
  price: string
  roomerInfo: {
    peopleNumber: string
    roomNumber: string
    bedNumber: string
  },
  address: {
    text: string
    value: string
    detail: string
  },
  toilet: {
    number: string
    type: string
  },
  servicesList: [],
  landlordInfo: {
    avatarPath: string
    name: string
    phone: string
  }
}

/**
  0: 价格降序
  1：价格升序
*/
export declare type SortType = 0 | 1