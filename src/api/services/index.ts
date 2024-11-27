import { http } from "../http";

// Auth
export const authLogin = (data: any) => {
  return http.post("/auth/login", data);
};


// User Profiles
export const getUserProfile = (id: string) => {
  return http.get(`/users/profile/${id}`);
};









// Users
export const getUsers = () => {
  return http.get("/users");
};

export const getUser = (id: string) => {
  return http.get(`/users/${id}`);
};

export const addUser = (data: any) => {
  return http.post("/users", data);
};

export const updateUser = (userId: string, data: any) => {
  return http.patch(`/users/${userId}`, data);
};

export const deleteUser = (userId: string) => {
  return http.delete(`/users/${userId}`);
};












// Projects

export const getProjectsNew = (params: {
  searchItem?: string;
  propertyType?: string;
  location?: string;
  sortBy?: string;
  currentPage?: number;
  itemsPerPage?: number;
}) => {
  return http.get("/projects", { params });
};

export const getProjects = () => {
  return http.get("/projects");
}

export const getProjectDetails = (projectId: string) => {
  return http.get(`/projects/${projectId}`);
};

export const addProject = (data: any) => {
  return http.post("/projects", data);
};

export const updateProject = (projectId: string, data: any) => {
  return http.patch(`/projects/${projectId}`, data);
};

export const deleteProject = (projectId: string) => {
  return http.delete(`/projects/${projectId}`);
};

// Reviews
export const addReview = (projectId: string, review: any) => {
  return http.post(`/projects/${projectId}/reviews`, review);
};

// Bank Offers
export const createBankOffer = (projectId: string, bankOffer: any) => {
  return http.post(`/projects/${projectId}/bankoffers`, bankOffer);
};

export const updateBankOffer = (projectId: string, id: string, updatedBankOffer: Partial<any>) => {
  return http.patch(`/projects/${projectId}/bankoffers/${id}`, updatedBankOffer);
};

// Amenities
export const addAmenity = (projectId: string, amenity: any) => {
  return http.post(`/projects/${projectId}/amenities`, amenity);
};

export const updateAmenity = (projectId: string, id: string, amenity: Partial<any>) => {
  return http.patch(`/projects/${projectId}/amenities/${id}`, amenity);
};

export const removeAmenity = (projectId: string, id: string) => {
  return http.delete(`/projects/${projectId}/amenities/${id}`);
};

// Floor Plans
export const addFloorPlan = (projectId: string, floorPlan: any) => {
  return http.post(`/projects/${projectId}/floorplans`, floorPlan);
};

export const updateFloorPlan = (projectId: string, id: string, floorPlan: Partial<any>) => {
  return http.patch(`/projects/${projectId}/floorplans/${id}`, floorPlan);
};

export const removeFloorPlan = (projectId: string, id: string) => {
  return http.delete(`/projects/${projectId}/floorplans/${id}`);
};

// Location Highlights
export const addLocationHighlight = (projectId: string, highlight: any) => {
  return http.post(`/projects/${projectId}/locationhighlights`, highlight);
};

export const updateLocationHighlight = (projectId: string, id: string, highlight: Partial<any>) => {
  return http.patch(`/projects/${projectId}/locationhighlights/${id}`, highlight);
};

export const removeLocationHighlight = (projectId: string, id: string) => {
  return http.delete(`/projects/${projectId}/locationhighlights/${id}`);
};

// Nearby Projects
export const findNearbyProjects = (params: {
  street: string;
  zone: string;
  pincode: string;
  city: string;
}) => {
  return http.get("/projects/nearbyprojects", { params });
};

// Search Projects
export const searchProjects = (searchItem: string) => {
  return http.get("/projects/search", { params: { searchItem } });
};







// Reviews
export const getReviews = (projectId: string) => {
  return http.get(`/projects/${projectId}/reviews`);
};











// Builders
export const getBuilders = () => {
  return http.get("/builder");
};

export const getBuilder = (id: string) => {
  return http.get(`/builder/${id}`);
};

export const addBuilder = (data: any) => {
  return http.post("/builder", data);
};

export const updateBuilder = (builderId: string, data: any) => {
  return http.patch(`/builder/${builderId}`, data);
};

export const deleteBuilder = (builderId: string) => {
  return http.delete(`/builder/${builderId}`);
};








// Leads
export const getLeads = () => {
  return http.get("/leads");
};

export const getLeadDetails = (leadId: string) => {
  return http.get(`/leads/${leadId}`);
};

export const addLead = (data: any) => {
  return http.post("/leads", data);
};

export const updateLead = (leadId: string, data: any) => {
  return http.patch(`/leads/${leadId}`, data);
};

export const deleteLead = (leadId: string) => {
  return http.delete(`/leads/${leadId}`);
};










// Channel Partners
export const getChannelPartners = () => {
  return http.get("/channelpartners");
};

export const getChannelPartner = (id: string) => {
  return http.get(`/channelpartners/${id}`);
};

export const addChannelPartner = (data: any) => {
  return http.post("/channelpartners", data);
};

export const updateChannelPartner = (partnerId: string, data: any) => {
  return http.patch(`/channelpartners/${partnerId}`, data);
};


export const ApprovalchannelPartner = (partnerId: string, data: any) => {
  return http.patch(`/channelpartners/${partnerId}/approval`, data);
};

export const deleteChannelPartner = (partnerId: string) => {
  return http.delete(`/channelpartners/${partnerId}`);
};








export const FileUpload = (folderName: string, file: File) => {
  const formData = new FormData();
  formData.append('file', file); // Append the file to FormData
  return http.post(`/bunny/upload/${folderName}`, formData);
};