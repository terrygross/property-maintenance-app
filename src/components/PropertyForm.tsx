
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Property, PropertyType } from "@/types/property";
import PropertyImageUpload from "./property/PropertyImageUpload";
import PropertyBasicInfo from "./property/PropertyBasicInfo";
import PropertyLocationInfo from "./property/PropertyLocationInfo";
import PropertyDetailsInfo from "./property/PropertyDetailsInfo";
import { propertyFormSchema, PropertyFormValues } from "./property/propertyFormConfig";

interface PropertyFormProps {
  property: Property | null;
  onSave: (property: Property) => void;
  onCancel: () => void;
}

const PropertyForm = ({ property, onSave, onCancel }: PropertyFormProps) => {
  const [imageUrl, setImageUrl] = useState(property?.imageUrl || "");

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      name: property?.name || "",
      address: property?.address || "",
      city: property?.city || "",
      state: property?.state || "",
      zipCode: property?.zipCode || "",
      type: property?.type || "residential",
      units: property?.units || 1,
      status: property?.status || "active",
      contactEmail: property?.contactEmail || "",
      contactPhone: property?.contactPhone || "",
      imageUrl: property?.imageUrl || "",
    },
  });

  const handleImageChange = (url: string) => {
    setImageUrl(url);
    form.setValue("imageUrl", url);
  };

  const onSubmit = (data: PropertyFormValues) => {
    const propertyData: Property = {
      id: property?.id || "", // This will be replaced in handleSaveProperty for new properties
      name: data.name,
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      type: data.type as PropertyType,
      units: data.units,
      status: data.status,
      imageUrl: imageUrl || undefined,
      contactEmail: data.contactEmail || undefined,
      contactPhone: data.contactPhone || undefined,
    };

    onSave(propertyData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-2">
        <PropertyImageUpload 
          imageUrl={imageUrl}
          onImageChange={handleImageChange}
        />

        <PropertyBasicInfo form={form} />
        
        <PropertyLocationInfo form={form} />
        
        <PropertyDetailsInfo form={form} />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {property ? "Update Property" : "Add Property"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PropertyForm;
