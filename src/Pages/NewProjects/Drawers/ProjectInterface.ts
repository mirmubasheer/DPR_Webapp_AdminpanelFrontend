// ProjectInterface.ts

export interface Review {
    // _id: string;
    name: string;
    email: string;
    rating: number;
    message: string;
}

export interface BankOffer {
    // _id: string;
    bankIcon: string;
    bankName: string;
}

export interface Amenity {
    // _id: string;
    iconName: string;
    name: string;
}

export interface FloorPlan {
    // _id: string;
    floorImage: string;
    size: number;
    fullPrice: number;
    emiPrice: number;
    floorNumber: number;
}

export interface LocationHighlight {
    // _id: string;
    locationType: string;
    locationName: string;
    icon: string;
    time: number;
    distance: number;
}

export interface Project {
    // _id: string;
    projectId: string;
    name: string;              
    description: string;
    establishedYear: string;
    sftPrice: number;     //
    emiPrice: number;
    builderName: string;
    builderId: string;
    location: string;     //
    city: string;   
    zone: string;
    street: string;
    pincode: string;
    whyThisProject: string[];
    projectBHK: number[];      //
    status: string;
    minSize: number;
    maxSize: number;
    buildings: number;
    launchDate: string;
    locationIframe: string;
    propertyType: string;         //
    videoLink: string;
    dimensions: string;
    parkingArea: number;
    reraId: string;
    approvals: string;
    visits: number;              //
    reviews: Review[];
    bankOffers: BankOffer[];
    amenities: Amenity[];
    floorPlans: FloorPlan[];
    locationHighlights: LocationHighlight[];
    projectImages: string[];
}
