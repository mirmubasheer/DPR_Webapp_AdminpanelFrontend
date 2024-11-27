import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  Button,
  Typography,
  CircularProgress,
  InputLabel,
} from '@mui/material';
import {
  updateProject,
  updateBankOffer,
  updateAmenity,
  updateFloorPlan,
  updateLocationHighlight,
} from '../../../api/services';
import { Project, LocationHighlight, FloorPlan, Amenity, BankOffer } from '../ProjectInterface';
import CustomInput from '../../../Components/Inputs/CustomInput';
import FileUploadContainer from '../../../Components/FileUploadContainer';
import { toast } from 'react-toastify';

interface EditProjectProps {
  open: boolean;
  onClose: () => void;
  selectedItem: LocationHighlight | FloorPlan | Amenity | BankOffer | Project;
  editType: string;
  projectId: string;
  refetch: () => void;
}

const EditProject: React.FC<EditProjectProps> = ({ open, onClose, selectedItem, editType, projectId, refetch }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const [imageUploaded, setImageUploaded] = useState(false);



  const handleImageDeletefloorplan = () => {
    setFormData({ ...formData, floorImage: null });
    setImageUploaded(false);
  }
  
  const handleImageDeletebankoffer = () => {
    setFormData({ ...formData, bankIcon: null });
    setImageUploaded(false);
  }


  useEffect(() => {
    setFormData(selectedItem);
  }, [selectedItem]);

  const handleSave = async () => {
    setLoading(true);
    try {
      switch (editType) {
        case 'mainDetails':
          await updateProject(projectId, formData);
          toast.success("Project updated successfully");
          break;
        case 'locationHighlight':
          await updateLocationHighlight(projectId, formData._id, formData);
          toast.success("Location Highlight updated successfully");
          break;
        case 'floorPlan':
          await updateFloorPlan(projectId, formData._id, formData);
          toast.success("Floor Plan updated successfully");
          break;
        case 'amenity':
          await updateAmenity(projectId, formData._id, formData);
          toast.success("Amenity updated successfully");
          break;
        case 'bankOffer':
          await updateBankOffer(projectId, formData._id, formData);
          toast.success("Bank Offer updated successfully");
          break;
        
        case 'otherDetails':
          await updateProject(projectId, formData);
          toast.success("Project updated successfully");
          break;


        default:
          throw new Error("Unknown edit type");
      }
      refetch();
      onClose();
    } catch (error) {
      toast.error("Error updating project section");
      console.error("Error updating project section", error);
    } finally {
      setLoading(false);
    }
  };

  const renderEditFields = () => {
    switch (editType) {
      case 'mainDetails':
        return (
          <>
            {/* //name  */}
            <CustomInput
                placeholder="Name"
                fullWidth
                value={formData?.name || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
            />

            <CustomInput
              placeholder="Description"
              fullWidth
              multiline
              rows={3}
              value={formData?.description || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, description: e.target.value })}
            />
            <CustomInput
              placeholder="Established Year"
              fullWidth
              value={formData?.establishedYear || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, establishedYear: e.target.value })}
            />
            <CustomInput
              placeholder="SFT Price"
              fullWidth
              type="number"
              value={formData?.sftPrice || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, sftPrice: e.target.value })}
            />
            {/* <CustomInput
              placeholder="EMI Price"
              fullWidth
              type="number"
              value={formData?.emiPrice || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, emiPrice: e.target.value })}
            /> */}
            <CustomInput
              placeholder="Builder Name"
              fullWidth
              value={formData?.builderName || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, builderName: e.target.value })}
            />
          </>
        );

        
        
        case "Address":
            return (
                <>
                
                  <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="email-input">Location</InputLabel>
                    <CustomInput
                      placeholder="Location"
                      fullWidth
                      value={formData?.location || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, location: e.target.value })}
                    />

                    <CustomInput
                      placeholder="City"
                      fullWidth
                      value={formData?.city || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, city: e.target.value })}
                    />

                    <CustomInput
                    placeholder="Zone"
                    fullWidth
                    value={formData?.zone || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, zone: e.target.value })}
                    />

                    <CustomInput
                    placeholder="street"
                    fullWidth
                    value={formData?.street || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, street: e.target.value })}
                    />

                    {/* pincode */}
                    <CustomInput
                    placeholder="Pincode"
                    fullWidth
                    value={formData?.pincode || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, pincode: e.target.value })}
                    />

                </>
            )


      case 'locationHighlight':
        return (
          <>
            <CustomInput
              placeholder="Location Type"
              fullWidth
              value={formData?.locationType || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, locationType: e.target.value })}
            />
            <CustomInput
              placeholder="Location Name"
              fullWidth
              value={formData?.locationName || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, locationName: e.target.value })}
            />
            <CustomInput
              placeholder="Time (min)"
              fullWidth
              type="number"
              value={formData?.time || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, time: e.target.value })}
            />
            <CustomInput
              placeholder="Distance (km)"
              fullWidth
              type="number"
              value={formData?.distance || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, distance: e.target.value })}
            />
          </>
        );

      case 'floorPlan':
        return (
          <>
            <CustomInput
              placeholder="Floor Number"
              fullWidth
              type="number"
              value={formData?.floorNumber || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, floorNumber: e.target.value })}
            />
            <CustomInput
              placeholder="Size (sqft)"
              fullWidth
              type="number"
              value={formData?.size || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, size: e.target.value })}
            />
            <CustomInput
              placeholder="Full Price"
              fullWidth
              type="number"
              value={formData?.fullPrice || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, fullPrice: e.target.value })}
            />
            {/* <CustomInput
              placeholder="EMI Price"
              fullWidth
              type="number"
              value={formData?.emiPrice || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, emiPrice: e.target.value })}
            /> */}


            <FileUploadContainer
              onFileSelect={(url) => {
                setFormData({ ...formData, floorImage: url || null });
                setImageUploaded(!!url);
              }}
              foldername="projectImages"
              existingImage={formData?.floorImage || ''}
              onDelete={handleImageDeletefloorplan}
            />
          </>
        );

      case 'amenity':
        return (
          <>
            <CustomInput
              placeholder="Amenity Name"
              fullWidth
              value={formData?.name || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
            />
            <CustomInput
              placeholder="Icon Name"
              fullWidth
              value={formData?.iconName || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, iconName: e.target.value })}
            />
          </>
        );

      case 'bankOffer':
        return (
          <>
            <CustomInput
              placeholder="Bank Name"
              fullWidth
              value={formData.bankName || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, bankName: e.target.value })}
            />
            <FileUploadContainer
              onFileSelect={(url) => {
                setFormData({ ...formData, bankIcon: url || null });
                setImageUploaded(!!url);
              }}
              foldername="projectImages"
              existingImage={formData?.bankIcon || ''}
              onDelete={handleImageDeletebankoffer}
            />
          </>
        );


      case 'otherDetails':
        return (
          <>
            <CustomInput
              placeholder="Min Size"
              fullWidth
              type="number"
              value={formData?.minSize || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, minSize: e.target.value })}

            />
            <CustomInput
              placeholder="Max Size"
              fullWidth
              type="number"
              value={formData?.maxSize || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, maxSize: e.target.value })}
            />

            {/* buildings  */}
            <CustomInput
              placeholder="Buildings"
              fullWidth
              type="number"
              value={formData?.buildings || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, buildings: e.target.value })}
            />

            <CustomInput
              placeholder="Parking Area"
              fullWidth
              type="number"
              value={formData?.parkingArea || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, parkingArea: e.target.value })}
            />

            {/* launchDate */}
            <CustomInput
              placeholder="Launch Date"
              fullWidth
              value={formData?.launchDate || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, launchDate: e.target.value })}
            />

            {/* locationIframe */}
            <CustomInput
              placeholder="Location Iframe"
              fullWidth
              value={formData?.locationIframe || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, locationIframe: e.target.value })}
            />

            {/* propertyType */}
            <CustomInput
              placeholder="Property Type"
              fullWidth
              value={formData?.propertyType || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, propertyType: e.target.value })}
            />

            {/* videoLink */}
            <CustomInput
              placeholder="Video Link"
              fullWidth
              value={formData?.videoLink || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, videoLink: e.target.value })}
            />

            {/* dimensions */}
            <CustomInput
              placeholder="Dimensions"
              fullWidth
              value={formData?.dimensions || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, dimensions: e.target.value })}
            />



          </>
        );

      default:
        return null;
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 300, padding: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Edit {editType.charAt(0).toUpperCase() + editType.slice(1)}
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {renderEditFields()}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ mt: 3 }}
              fullWidth
            >
              Update
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default EditProject;
